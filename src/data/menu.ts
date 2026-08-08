export type Category = {
  id: string
  name: string
  order: number
}

export type Product = {
  id: string
  category: string
  name: string
  description?: string
  price: number
  image?: string
  featured?: boolean
}

const categoriesSeed = [
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
  },
  {
    id: 'limonatalar',
    name: 'Limonatalar',
    sortOrder: 21
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    sortOrder: 22
  },
  {
    id: 'frozen',
    name: 'Frozen',
    sortOrder: 23
  },
  {
    id: 'mojito',
    name: 'Mojito',
    sortOrder: 24
  },
  {
    id: 'kutu-icecekler',
    name: 'Kutu İçecekler',
    sortOrder: 25
  },
  {
    id: 'nargile',
    name: 'Nargile',
    sortOrder: 26
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
  { name: 'Tavuklu Şefin Salatası', price: 320, categoryId: 'salatalar' },
  { name: 'Klasik Limonata', price: 150, categoryId: 'limonatalar' },
  { name: 'Çilekli Limonata', price: 160, categoryId: 'limonatalar' },
  { name: 'Naneli Limonata', price: 160, categoryId: 'limonatalar' },
  { name: 'Karpuzlu Limonata', price: 165, categoryId: 'limonatalar' },
  { name: 'Çikolata', price: 180, categoryId: 'milkshake' },
  { name: 'Çilek', price: 180, categoryId: 'milkshake' },
  { name: 'Muz', price: 180, categoryId: 'milkshake' },
  { name: 'Karamel', price: 185, categoryId: 'milkshake' },
  { name: 'Oreo', price: 190, categoryId: 'milkshake' },
  { name: 'Çilek', price: 170, categoryId: 'frozen' },
  { name: 'Mango', price: 170, categoryId: 'frozen' },
  { name: 'Karpuz', price: 170, categoryId: 'frozen' },
  { name: 'Yeşil Elma', price: 170, categoryId: 'frozen' },
  { name: 'Classic Mojito', price: 180, categoryId: 'mojito' },
  { name: 'Strawberry Mojito', price: 190, categoryId: 'mojito' },
  { name: 'Green Apple Mojito', price: 190, categoryId: 'mojito' },
  { name: 'Passion Mojito', price: 190, categoryId: 'mojito' },
  { name: 'Coca Cola', price: 90, categoryId: 'kutu-icecekler' },
  { name: 'Coca Cola Zero', price: 90, categoryId: 'kutu-icecekler' },
  { name: 'Fanta', price: 90, categoryId: 'kutu-icecekler' },
  { name: 'Sprite', price: 90, categoryId: 'kutu-icecekler' },
  { name: 'Fuse Tea', price: 90, categoryId: 'kutu-icecekler' },
  { name: 'Ayran', price: 70, categoryId: 'kutu-icecekler' },
  { name: 'Şalgam', price: 80, categoryId: 'kutu-icecekler' },
  { name: 'Meyve Suyu', price: 80, categoryId: 'kutu-icecekler' },
  { name: 'Soda', price: 45, categoryId: 'kutu-icecekler' },
  { name: 'Maden Suyu', price: 45, categoryId: 'kutu-icecekler' },
  { name: 'Su (0.5L)', price: 20, categoryId: 'kutu-icecekler' },
  { name: 'Tek Elma', price: 400, categoryId: 'nargile' },
  { name: 'Çift Elma', price: 400, categoryId: 'nargile' },
  { name: 'Lady Killer', price: 400, categoryId: 'nargile' },
  { name: 'Love 66', price: 400, categoryId: 'nargile' },
  { name: 'Blue Mist', price: 400, categoryId: 'nargile' },
  { name: 'Hawaii', price: 400, categoryId: 'nargile' },
  { name: 'Frozen', price: 400, categoryId: 'nargile' },
  { name: 'Özel Karışım', price: 450, categoryId: 'nargile' }
] as const

export const categories: Category[] = categoriesSeed.map((category, index) => ({
  id: category.id,
  name: category.name,
  order: index + 1
}))

export const products: Product[] = productsSeed.map((product, index) => ({
  id: `${product.categoryId}-${index + 1}`,
  category: product.categoryId,
  name: product.name,
  description: '',
  price: product.price,
  image: '',
  featured: false
}))
