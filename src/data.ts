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
  },
  {
    id: 'aperatif-sicak',
    name: 'Aperatifler (Sıcak)',
    sortOrder: 4
  },
  {
    id: 'aperatif-soguk',
    name: 'Aperatifler (Soğuk)',
    sortOrder: 5
  },
  {
    id: 'tantuni',
    name: 'Tantuni',
    sortOrder: 6
  },
  {
    id: 'special',
    name: 'Special',
    sortOrder: 7
  },
  {
    id: 'beyaz-et',
    name: 'Beyaz Et',
    sortOrder: 8
  },
  {
    id: 'wraplar',
    name: 'Wraplar',
    sortOrder: 9
  },
  {
    id: 'makarnalar',
    name: 'Makarnalar',
    sortOrder: 10
  },
  {
    id: 'ara-sicak',
    name: 'Ara Sıcaklar',
    sortOrder: 11
  },
  {
    id: 'salatalar',
    name: 'Salatalar',
    sortOrder: 12
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
  { name: 'Patatesli', price: 270, categoryId: 'gozlemeler' },
  { name: 'İzmir Kumru', price: 300, categoryId: 'aperatif-sicak' },
  { name: 'Ekmek Arası Köfte', price: 450, categoryId: 'aperatif-sicak' },
  { name: 'Izgara Köfte Servis', price: 500, categoryId: 'aperatif-sicak' },
  { name: 'Ekmek Arası Kaşar Salam', price: 250, categoryId: 'aperatif-soguk' },
  { name: 'Ekmek Arası Ton Balığı', price: 280, categoryId: 'aperatif-soguk' },
  { name: 'Tantuni Somun', price: 340, categoryId: 'tantuni' },
  { name: 'Tantuni Lavaş', price: 350, categoryId: 'tantuni' },
  { name: 'Chicken Mushroom', price: 380, categoryId: 'special' },
  { name: 'Yoğurtlu Akdeniz Kebabı', price: 400, categoryId: 'special' },
  { name: 'Kayseri Mantısı', price: 320, categoryId: 'special' },
  { name: 'Kiremitte Mantar', price: 240, categoryId: 'special' },
  { name: 'Tavuk Sote', price: 400, categoryId: 'beyaz-et' },
  { name: 'Köri Soslu Piliç', price: 425, categoryId: 'beyaz-et' },
  { name: 'Mexican Soslu Piliç', price: 425, categoryId: 'beyaz-et' },
  { name: 'Barbekü Soslu Piliç', price: 425, categoryId: 'beyaz-et' },
  { name: 'Tavuk Çökertme', price: 450, categoryId: 'beyaz-et' },
  { name: 'Vejetaryen Wrap', price: 280, categoryId: 'wraplar' },
  { name: 'Tavuk Wrap', price: 340, categoryId: 'wraplar' },
  { name: 'Sosisli Wrap', price: 300, categoryId: 'wraplar' },
  { name: 'Penne Makarna', price: 290, categoryId: 'makarnalar' },
  { name: 'Anne Eli Makarna', price: 300, categoryId: 'makarnalar' },
  { name: 'Pesto Soslu Penne', price: 310, categoryId: 'makarnalar' },
  { name: 'Köri Soslu Makarna', price: 320, categoryId: 'makarnalar' },
  { name: 'İtalyan Makarna', price: 320, categoryId: 'makarnalar' },
  { name: 'Patates Tava', price: 230, categoryId: 'ara-sicak' },
  { name: 'Cheddarlı Patates Kızartması', price: 280, categoryId: 'ara-sicak' },
  { name: 'Mix Tabak', price: 300, categoryId: 'ara-sicak' },
  { name: 'Akdeniz Salata', price: 280, categoryId: 'salatalar' },
  { name: 'Ton Balıklı Salata', price: 290, categoryId: 'salatalar' },
  { name: 'Şinitzel Salatası', price: 300, categoryId: 'salatalar' },
  { name: 'Sezar Salata', price: 310, categoryId: 'salatalar' },
  { name: 'Tavuklu Şefin Salatası', price: 320, categoryId: 'salatalar' }
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
