import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, firebaseEnabled, storage } from './firebase'
import { categories as demoCategories, products as demoProducts } from './data'
import type { Category, Product } from './types'

const MENU_UPDATED_EVENT = 'nislen-menu-updated'
const CATEGORY_STORAGE_KEY = 'nislen-local-categories'
const PRODUCT_STORAGE_KEY = 'nislen-local-products'

function emitMenuUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(MENU_UPDATED_EVENT))
  }
}

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as T
    return parsed
  } catch {
    return fallback
  }
}

function writeStored<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeCategory(value: Category): Category {
  return {
    id: value.id,
    name: value.name,
    description: value.description || '',
    order: value.order || 1
  }
}

function normalizeProduct(value: Product): Product {
  return {
    ...value,
    description: value.description || '',
    available: value.available !== false,
    featured: Boolean(value.featured)
  }
}

function loadLocalCategories(): Category[] {
  const stored = readStored<Category[]>(CATEGORY_STORAGE_KEY, demoCategories)
  return stored.map(normalizeCategory).sort((a, b) => a.order - b.order)
}

function loadLocalProducts(): Product[] {
  return readStored<Product[]>(PRODUCT_STORAGE_KEY, demoProducts).map(normalizeProduct)
}

function saveLocalCategories(categories: Category[]) {
  writeStored(CATEGORY_STORAGE_KEY, categories.map(normalizeCategory))
  emitMenuUpdated()
}

function saveLocalProducts(products: Product[]) {
  writeStored(PRODUCT_STORAGE_KEY, products.map(normalizeProduct))
  emitMenuUpdated()
}

export function subscribeMenu(
  setCategories: (v: Category[]) => void,
  setProducts: (v: Product[]) => void,
  setError?: (message: string) => void
) {
  const syncLocalData = () => {
    setCategories(loadLocalCategories())
    setProducts(loadLocalProducts())
  }

  if (!firebaseEnabled || !db) {
    syncLocalData()
    if (typeof window === 'undefined') return () => undefined
    window.addEventListener(MENU_UPDATED_EVENT, syncLocalData)
    window.addEventListener('storage', syncLocalData)
    return () => {
      window.removeEventListener(MENU_UPDATED_EVENT, syncLocalData)
      window.removeEventListener('storage', syncLocalData)
    }
  }

  const onError = () =>
    setError?.('Please check your connection and try again.')
  syncLocalData()
  const stopCategories = onSnapshot(
    query(collection(db, 'categories'), orderBy('order')),
    (s) =>
      setCategories(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Category)),
    onError
  )
  const stopProducts = onSnapshot(
    collection(db, 'products'),
    (s) =>
      setProducts(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Product)),
    onError
  )
  return () => {
    stopCategories()
    stopProducts()
  }
}

export async function saveCategory(value: Category) {
  const id = value.id || `${slugify(value.name || 'category')}-${Date.now()}`
  const normalized: Category = {
    ...value,
    id,
    description: value.description || '',
    order: value.order || 1
  }

  if (!db || !firebaseEnabled) {
    const next = loadLocalCategories().filter((category) => category.id !== id)
    next.push(normalized)
    next.sort((a, b) => a.order - b.order)
    saveLocalCategories(next)
    return id
  }

  const { id: _, ...data } = normalized
  return id
    ? setDoc(doc(db, 'categories', id), data)
    : addDoc(collection(db, 'categories'), data)
}

export async function removeCategory(id: string) {
  if (!db || !firebaseEnabled) {
    const next = loadLocalCategories().filter((category) => category.id !== id)
    saveLocalCategories(next)
    return
  }
  await deleteDoc(doc(db, 'categories', id))
}

export async function saveProduct(value: Product) {
  const id = value.id || `${slugify(value.name || 'product')}-${Date.now()}`
  const normalized: Product = {
    ...value,
    id,
    description: value.description || '',
    available: value.available !== false,
    featured: Boolean(value.featured)
  }

  if (!db || !firebaseEnabled) {
    const next = loadLocalProducts().filter((product) => product.id !== id)
    next.push(normalized)
    saveLocalProducts(next)
    return id
  }

  const { id: _, ...data } = normalized
  return id
    ? setDoc(doc(db, 'products', id), data)
    : addDoc(collection(db, 'products'), data)
}

export async function removeProduct(id: string) {
  if (!db || !firebaseEnabled) {
    const next = loadLocalProducts().filter((product) => product.id !== id)
    saveLocalProducts(next)
    return
  }
  await deleteDoc(doc(db, 'products', id))
}

export async function uploadImage(file: File) {
  if (!storage || !firebaseEnabled) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('Unable to read image file'))
      reader.readAsDataURL(file)
    })
  }

  const object = ref(storage, `products/${crypto.randomUUID()}-${file.name}`)
  await uploadBytes(object, file)
  return getDownloadURL(object)
}
