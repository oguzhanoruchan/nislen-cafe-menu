export type Category = {
  id: string
  name: string
  order: number
}

export type MenuSection = {
  id: string
  name: string
  order: number
}

export type MenuImage = {
  id: string
  category: string
  title: string
  src: string
  order: number
}

export type Product = {
  id: string
  category: string
  categoryOrder: number
  section: string
  sectionOrder: number
  name: string
  description?: string
  price: number
  image?: string
  featured?: boolean
}

const mainCategoriesSeed = [
  { id: 'kahvalti', name: 'Kahvaltı', order: 1 },
  { id: 'yemek', name: 'Yemek', order: 2 },
  { id: 'kahveler', name: 'Kahveler', order: 3 },
  { id: 'tatli', name: 'Tatlı', order: 4 },
  { id: 'icecek', name: 'İçecek', order: 5 },
  { id: 'nargile', name: 'Nargile', order: 6 }
] as const

export const categories: Category[] = mainCategoriesSeed.map((category) => ({
  id: category.id,
  name: category.name,
  order: category.order
}))

export const menuSections: Record<string, MenuSection[]> = {
  kahvalti: [
    { id: 'gurme-kahvalti', name: 'Gurme Kahvaltı', order: 1 },
    { id: 'huzur-kahvalti-tabagi', name: 'Huzur Kahvaltı Tabağı', order: 2 },
    { id: 'kahvalti-tabagi', name: 'Kahvaltı Tabağı', order: 3 },
    { id: 'omlet-cesitleri', name: 'Omlet Çeşitleri', order: 4 },
    { id: 'menemen-cesitleri', name: 'Menemen Çeşitleri', order: 5 }
  ],
  yemek: [
    { id: 'tost-cesitleri', name: 'Tost Çeşitleri', order: 1 },
    { id: 'gozleme-cesitleri', name: 'Gözleme Çeşitleri', order: 2 },
    { id: 'aperatif-sicak', name: 'Aparatifler (Sıcak)', order: 3 },
    { id: 'aperatif-soguk', name: 'Aparatifler (Soğuk)', order: 4 },
    { id: 'tantuni', name: 'Tantuni', order: 5 },
    { id: 'special', name: 'Special', order: 6 },
    { id: 'beyaz-et', name: 'Beyaz Et', order: 7 },
    { id: 'wraplar', name: 'Wraplar', order: 8 },
    { id: 'makarnalar', name: 'Makarnalar', order: 9 },
    { id: 'ara-sicaklar', name: 'Ara Sıcaklar', order: 10 },
    { id: 'salatalar', name: 'Salatalar', order: 11 }
  ],
  kahveler: [
    { id: 'turk-kahveleri', name: 'Türk Kahveleri', order: 1 },
    { id: 'filtre-kahveler', name: 'Filtre kahveler', order: 2 },
    {
      id: 'espresso-bazli-kahveler',
      name: 'Espresso Bazlı Kahveler',
      order: 3
    },
    { id: 'soguk-icilen-kahveler', name: 'Soğuk İçilen Kahveler', order: 4 }
  ],
  tatli: [
    { id: 'tatlilar', name: 'Tatlılar', order: 1 },
    { id: 'esintili-tatlar', name: 'Esintili Tatlar', order: 2 }
  ],
  icecek: [
    { id: 'kutu-icecekler', name: 'Kutu İçecekler', order: 1 },
    { id: 'kokteyller', name: 'Kokteyller', order: 2 }
  ],
  nargile: [
    { id: 'nargile-cesitleri', name: 'Nargile Çeşitleri', order: 1 },
    {
      id: 'darleaf-nargile-cesitleri',
      name: 'Darleaf Nargile Çeşitleri',
      order: 2
    }
  ]
}

const menuImagesSeed: MenuImage[] = [
  {
    id: 'gurme-kahvalti',
    category: 'kahvalti',
    title: 'Gurme Kahvaltı',
    src: '/images/menü/Gurme Kahvaltı.png',
    order: 1
  },
  {
    id: 'huzur-kahvalti-tabagi',
    category: 'kahvalti',
    title: 'Huzur Kahvaltı Tabağı',
    src: '/images/menü/Huzur Kahvaltı Tabağı.png',
    order: 2
  },
  {
    id: 'kahvalti-tabagi',
    category: 'kahvalti',
    title: 'Kahvaltı Tabağı',
    src: '/images/menü/Kahvaltı Tabağı.png',
    order: 3
  },
  {
    id: 'omlet-cesitleri',
    category: 'kahvalti',
    title: 'Omlet Çeşitleri',
    src: '/images/menü/Omlet Çeşitleri.png',
    order: 4
  },
  {
    id: 'menemen-cesitleri',
    category: 'kahvalti',
    title: 'Menemen Çeşitleri',
    src: '/images/menü/Menemen Çeşitleri.png',
    order: 5
  },
  {
    id: 'tost-cesitleri',
    category: 'yemek',
    title: 'Tost Çeşitleri',
    src: '/images/menü/Tost Çeşitleri.png',
    order: 6
  },
  {
    id: 'gozleme-cesitleri',
    category: 'yemek',
    title: 'Gözleme Çeşitleri',
    src: '/images/menü/Gözleme Çeşitleri.png',
    order: 7
  },
  {
    id: 'aparatif-sicak',
    category: 'yemek',
    title: 'Aparatifler (Sıcak)',
    src: '/images/menü/Aparatifler (Sıcak).png',
    order: 8
  },
  {
    id: 'aparatif-soguk',
    category: 'yemek',
    title: 'Aparatifler (Soğuk)',
    src: '/images/menü/Aparatifler (Soğuk).png',
    order: 9
  },
  {
    id: 'tantuni',
    category: 'yemek',
    title: 'Tantuni',
    src: '/images/menü/Tantuni.png',
    order: 10
  },
  {
    id: 'special',
    category: 'yemek',
    title: 'Special',
    src: '/images/menü/Special.png',
    order: 11
  },
  {
    id: 'beyaz-et',
    category: 'yemek',
    title: 'Beyaz Et',
    src: '/images/menü/Beyaz Et.png',
    order: 12
  },
  {
    id: 'wraplar',
    category: 'yemek',
    title: 'Wraplar',
    src: '/images/menü/Wraplar.png',
    order: 13
  },
  {
    id: 'makarnalar',
    category: 'yemek',
    title: 'Makarnalar',
    src: '/images/menü/Makarnalar.png',
    order: 14
  },
  {
    id: 'ara-sicaklar',
    category: 'yemek',
    title: 'Ara Sıcaklar',
    src: '/images/menü/Ara Sıcaklar.png',
    order: 15
  },
  {
    id: 'salatalar',
    category: 'yemek',
    title: 'Salatalar',
    src: '/images/menü/Salatalar.png',
    order: 16
  },
  {
    id: 'turk-kahveleri',
    category: 'kahveler',
    title: 'Türk Kahveleri',
    src: '/images/menü/Türk Kahveleri.png',
    order: 17
  },
  {
    id: 'filtre-kahveler',
    category: 'kahveler',
    title: 'Filtre kahveler',
    src: '/images/menü/Filtre kahveler.png',
    order: 18
  },
  {
    id: 'espresso-bazli-kahveler',
    category: 'kahveler',
    title: 'Espresso Bazlı Kahveler',
    src: '/images/menü/Espresso Bazlı Kahveler.png',
    order: 19
  },
  {
    id: 'soguk-icilen-kahveler',
    category: 'kahveler',
    title: 'Soğuk İçilen Kahveler',
    src: '/images/menü/Soğuk İçilen Kahveler.png',
    order: 20
  },
  {
    id: 'tatlilar',
    category: 'tatli',
    title: 'Tatlılar',
    src: '/images/menü/Tatlılar.png',
    order: 21
  },
  {
    id: 'esintili-tatlar',
    category: 'tatli',
    title: 'Esintili Tatlar',
    src: '/images/menü/Esintili Tatlar.png',
    order: 22
  },
  {
    id: 'kutu-icecekler',
    category: 'icecek',
    title: 'Kutu İçecekler',
    src: '/images/menü/Kutu İçecekler.png',
    order: 23
  },
  {
    id: 'kokteyller',
    category: 'icecek',
    title: 'Kokteyller',
    src: '/images/menü/Kokteyller.png',
    order: 24
  },
  {
    id: 'nargile-cesitleri',
    category: 'nargile',
    title: 'Nargile Çeşitleri',
    src: '/images/menü/Nargile Çeşitleri.png',
    order: 25
  },
  {
    id: 'darleaf-nargile-cesitleri',
    category: 'nargile',
    title: 'Darleaf Nargile Çeşitleri',
    src: '/images/menü/Darleaf Nargile Çeşitleri.png',
    order: 26
  }
]

export const menuImages = menuImagesSeed.sort((a, b) => a.order - b.order)

type LegacyCategoryId =
  | 'kahvalti'
  | 'tostlar'
  | 'gozlemeler'
  | 'aperatif-sicak'
  | 'aperatif-soguk'
  | 'tantuni'
  | 'special'
  | 'beyaz-et'
  | 'wraplar'
  | 'makarnalar'
  | 'ara-sicak'
  | 'salatalar'
  | 'limonatalar'
  | 'milkshake'
  | 'frozen'
  | 'mojito'
  | 'kutu-icecekler'
  | 'nargile'

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

const mainCategoryOrder = Object.fromEntries(
  mainCategoriesSeed.map((category) => [category.id, category.order])
) as Record<string, number>

const legacyCategoryMappings: Record<
  LegacyCategoryId,
  { mainCategory: string; section: string; sectionOrder: number }
> = {
  kahvalti: {
    mainCategory: 'kahvalti',
    section: 'Kahvaltı Tabağı',
    sectionOrder: 3
  },
  tostlar: {
    mainCategory: 'yemek',
    section: 'Tost Çeşitleri',
    sectionOrder: 1
  },
  gozlemeler: {
    mainCategory: 'yemek',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 2
  },
  'aperatif-sicak': {
    mainCategory: 'yemek',
    section: 'Aparatifler (Sıcak)',
    sectionOrder: 3
  },
  'aperatif-soguk': {
    mainCategory: 'yemek',
    section: 'Aparatifler (Soğuk)',
    sectionOrder: 4
  },
  tantuni: { mainCategory: 'yemek', section: 'Tantuni', sectionOrder: 5 },
  special: { mainCategory: 'yemek', section: 'Special', sectionOrder: 6 },
  'beyaz-et': { mainCategory: 'yemek', section: 'Beyaz Et', sectionOrder: 7 },
  wraplar: { mainCategory: 'yemek', section: 'Wraplar', sectionOrder: 8 },
  makarnalar: { mainCategory: 'yemek', section: 'Makarnalar', sectionOrder: 9 },
  'ara-sicak': {
    mainCategory: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 10
  },
  salatalar: { mainCategory: 'yemek', section: 'Salatalar', sectionOrder: 11 },
  limonatalar: {
    mainCategory: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2
  },
  milkshake: { mainCategory: 'icecek', section: 'Kokteyller', sectionOrder: 2 },
  frozen: { mainCategory: 'icecek', section: 'Kokteyller', sectionOrder: 2 },
  mojito: { mainCategory: 'icecek', section: 'Kokteyller', sectionOrder: 2 },
  'kutu-icecekler': {
    mainCategory: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1
  },
  nargile: {
    mainCategory: 'nargile',
    section: 'Nargile Çeşitleri',
    sectionOrder: 1
  }
}

const resolveBreakfastSection = (productName: string) => {
  if (productName === 'Gurme Kahvaltı') {
    return { section: 'Gurme Kahvaltı', sectionOrder: 1 }
  }

  if (productName === 'Huzur Kahvaltı Tabağı') {
    return { section: 'Huzur Kahvaltı Tabağı', sectionOrder: 2 }
  }

  if (productName.includes('Omlet')) {
    return { section: 'Omlet Çeşitleri', sectionOrder: 4 }
  }

  if (productName.includes('Menemen')) {
    return { section: 'Menemen Çeşitleri', sectionOrder: 5 }
  }

  return { section: 'Kahvaltı Tabağı', sectionOrder: 3 }
}

export const products: Product[] = productsSeed.map((product, index) => {
  const mapping = legacyCategoryMappings[product.categoryId]

  if (product.categoryId === 'kahvalti') {
    const breakfastSection = resolveBreakfastSection(product.name)

    return {
      id: `${product.categoryId}-${index + 1}`,
      category: 'kahvalti',
      categoryOrder: mainCategoryOrder.kahvalti,
      section: breakfastSection.section,
      sectionOrder: breakfastSection.sectionOrder,
      name: product.name,
      price: product.price
    }
  }

  return {
    id: `${product.categoryId}-${index + 1}`,
    category: mapping.mainCategory,
    categoryOrder: mainCategoryOrder[mapping.mainCategory],
    section: mapping.section,
    sectionOrder: mapping.sectionOrder,
    name: product.name,
    price: product.price
  }
})
