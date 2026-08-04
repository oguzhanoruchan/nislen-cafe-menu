import type { Category, Product } from './types'

const categoriesSeed: Array<Omit<Category, 'order'> & { sortOrder: number }> = [
  {
    id: 'kahvalti',
    name: 'Kahvaltı',
    sortOrder: 1
  },
  {
    id: 'tostlar',
    name: 'Tostlar',
    sortOrder: 2
  },
  {
    id: 'gozlemeler',
    name: 'Gözlemeler',
    sortOrder: 3
  }
]

const productsSeed = [
  { name: 'Gurme Kahvaltı', price: 480, categoryId: 'kahvalti' },
  { name: 'Huzur Kahvaltı Tabağı', price: 400, categoryId: 'kahvalti' },
  { name: 'Kampüs Kahvaltısı', price: 320, categoryId: 'kahvalti' },
  { name: 'Kaşarlı Omlet', price: 210, categoryId: 'kahvalti' },
  { name: 'Sucuklu Omlet', price: 220, categoryId: 'kahvalti' },
  { name: 'Pastırmalı Omlet', price: 230, categoryId: 'kahvalti' },
  { name: 'Menemen', price: 220, categoryId: 'kahvalti' },
  { name: 'Kaşarlı Menemen', price: 230, categoryId: 'kahvalti' },
  { name: 'Sucuklu Menemen', price: 240, categoryId: 'kahvalti' },
  { name: 'Beyaz Peynirli Tost', price: 230, categoryId: 'tostlar' },
  { name: 'Kaşarlı Tost', price: 240, categoryId: 'tostlar' },
  { name: 'Karışık Tost', price: 280, categoryId: 'tostlar' },
  { name: 'Ayvalık Tost', price: 270, categoryId: 'tostlar' },
  { name: '3 Peynirli Tost', price: 280, categoryId: 'tostlar' },
  { name: 'Kaşarlı', price: 250, categoryId: 'gozlemeler' },
  { name: 'Ispanaklı', price: 260, categoryId: 'gozlemeler' },
  { name: 'Mantar Kaşar', price: 260, categoryId: 'gozlemeler' },
  { name: 'Kaşar Tulum', price: 270, categoryId: 'gozlemeler' },
  { name: 'Karışık', price: 280, categoryId: 'gozlemeler' },
  { name: 'Patatesli', price: 270, categoryId: 'gozlemeler' }
] as const

export const categories: Category[] = categoriesSeed.map((category, index) => ({
  ...category,
  description: '',
  order: index + 1
}))

export const products: Product[] = productsSeed.map((product, index) => ({
  id: `${product.categoryId}-${index + 1}`,
  name: product.name,
  description: '',
  price: product.price,
  categoryId: product.categoryId,
  image: '',
  featured: false,
  available: true
}))
