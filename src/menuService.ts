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
export function subscribeMenu(
  setCategories: (v: Category[]) => void,
  setProducts: (v: Product[]) => void
) {
  if (!firebaseEnabled || !db) {
    setCategories(demoCategories)
    setProducts(demoProducts)
    return () => undefined
  }
  const stopCategories = onSnapshot(
    query(collection(db, 'categories'), orderBy('order')),
    (s) =>
      setCategories(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Category))
  )
  const stopProducts = onSnapshot(collection(db, 'products'), (s) =>
    setProducts(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Product))
  )
  return () => {
    stopCategories()
    stopProducts()
  }
}
export async function saveCategory(value: Category) {
  if (!db) return
  const { id, ...data } = value
  return id
    ? setDoc(doc(db, 'categories', id), data)
    : addDoc(collection(db, 'categories'), data)
}
export async function removeCategory(id: string) {
  if (db) await deleteDoc(doc(db, 'categories', id))
}
export async function saveProduct(value: Product) {
  if (!db) return
  const { id, ...data } = value
  return id
    ? setDoc(doc(db, 'products', id), data)
    : addDoc(collection(db, 'products'), data)
}
export async function removeProduct(id: string) {
  if (db) await deleteDoc(doc(db, 'products', id))
}
export async function uploadImage(file: File) {
  if (!storage) throw new Error('Firebase Storage is not configured')
  const object = ref(storage, `products/${crypto.randomUUID()}-${file.name}`)
  await uploadBytes(object, file)
  return getDownloadURL(object)
}
