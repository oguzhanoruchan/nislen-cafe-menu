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
  section: string
  sectionOrder: number
  title: string
  src: string
  previewSrc: string
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
  { id: 'tatli-serin', name: 'Tatlı & Serin', order: 5 },
  { id: 'icecek', name: 'İçecek', order: 6 },
  { id: 'nargile', name: 'Nargile', order: 7 }
] as const

export const categories: Category[] = mainCategoriesSeed.map((category) => ({
  id: category.id,
  name: category.name,
  order: category.order
}))

export const menuSections: Record<string, MenuSection[]> = {
  kahvalti: [
    { id: 'kahvaltilar', name: 'Kahvaltılar', order: 1 },
    { id: 'omlet-cesitleri', name: 'Omlet Çeşitleri', order: 2 },
    { id: 'menemen-cesitleri', name: 'Menemen Çeşitleri', order: 3 },
    { id: 'tost-cesitleri', name: 'Tost Çeşitleri', order: 4 },
    { id: 'gozleme-cesitleri', name: 'Gözleme Çeşitleri', order: 5 }
  ],
  yemek: [
    { id: 'ekmek-arasi-cesitleri', name: 'Ekmek Arası Çeşitleri', order: 1 },
    { id: 'izgara', name: 'Izgara', order: 2 },
    { id: 'tantuni', name: 'Tantuni', order: 3 },
    { id: 'special', name: 'Special', order: 4 },
    { id: 'beyaz-et', name: 'Beyaz Et', order: 5 },
    { id: 'wraplar', name: 'Wraplar', order: 6 },
    { id: 'makarnalar', name: 'Makarnalar', order: 7 },
    { id: 'ara-sicaklar', name: 'Ara Sıcaklar', order: 8 },
    { id: 'salatalar', name: 'Salatalar', order: 9 }
  ],
  kahveler: [
    { id: 'turk-kahveleri', name: 'Türk Kahveleri', order: 1 },
    { id: 'filtre-kahveler', name: 'Filtre Kahveler', order: 2 },
    {
      id: 'espresso-bazli-kahveler',
      name: 'Espresso Bazlı Kahveler',
      order: 3
    },
    { id: 'soguk-kahveler', name: 'Soğuk Kahveler', order: 4 }
  ],
  tatli: [{ id: 'tatlilar', name: 'Tatlılar', order: 1 }],
  'tatli-serin': [{ id: 'tatli-serin', name: 'Tatlı & Serin', order: 1 }],
  icecek: [
    { id: 'kutu-icecekler', name: 'Kutu İçecekler', order: 1 },
    { id: 'kokteyller', name: 'Kokteyller', order: 2 },
    { id: 'ozel-icecekler', name: 'Özel/İmza İçecekler', order: 3 }
  ],
  nargile: [{ id: 'nargile-cesitleri', name: 'Nargile Çeşitleri', order: 1 }]
}

type MenuImageSeed = Omit<MenuImage, 'id' | 'order' | 'previewSrc'>

const menuImagesSeed: MenuImageSeed[] = [
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Gurme Kahvaltı',
    src: '/images/menü/Gurme Kahvaltı Tabağı.webp'
  },
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Huzur Kahvaltı Tabağı',
    src: '/images/menü/Huzur Kahvaltı Tabağı.webp'
  },
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Kampüs Kahvaltı',
    src: '/images/menü/Kampüs Kahvaltı Tabağı.webp'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Kaşarlı Omlet',
    src: '/images/menü/Kaşarlı Omlet.webp'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Sucuklu Omlet',
    src: '/images/menü/Sucuklu Omlet.webp'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Pastırmalı Omlet',
    src: '/images/menü/Pastırmalı Omlet.webp'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Menemen',
    src: '/images/menü/Menemen.webp'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Kaşarlı Menemen',
    src: '/images/menü/Kaşarlı Menemen.webp'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Sucuklu Menemen',
    src: '/images/menü/Sucuklu Menemen.webp'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Beyaz Peynirli Tost',
    src: '/images/menü/Beyaz Peynirli Tost.webp'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Kaşarlı Tost',
    src: '/images/menü/Kaşarlı Tost.webp'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Karışık Tost',
    src: '/images/menü/Karışık Tost.webp'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Ayvalık Tost',
    src: '/images/menü/Ayvalık Tost.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Kaşarlı Gözleme',
    src: '/images/menü/Kaşarlı Gözleme.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Ispanaklı Gözleme',
    src: '/images/menü/Ispanaklı Gözleme.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Mantar-Kaşar Gözleme',
    src: '/images/menü/Mantar-Kaşar Gözleme.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Kaşar-Tulum Gözleme',
    src: '/images/menü/Kaşar-Tulum Gözleme.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Karışık Gözleme',
    src: '/images/menü/Karışık Gözleme.webp'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Patatesli Gözleme',
    src: '/images/menü/Patatesli Gözleme.webp'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 1,
    title: 'İzmir Kumru',
    src: '/images/menü/İzmir Kumru.webp'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 1,
    title: 'Ekmek Arası Köfte',
    src: '/images/menü/Ekmek Arası Köfte.webp'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 1,
    title: 'Ekmek Arası Kaşar-Salam',
    src: '/images/menü/Ekmek Arası Kaşar-Salam.webp'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 1,
    title: 'Ekmek Arası Ton Balığı',
    src: '/images/menü/Ekmek Arası Ton Balığı.webp'
  },
  {
    category: 'yemek',
    section: 'Izgara',
    sectionOrder: 2,
    title: 'Izgara Köfte Servis',
    src: '/images/menü/Izgara Köfte Servis.webp'
  },
  {
    category: 'yemek',
    section: 'Tantuni',
    sectionOrder: 3,
    title: 'Somun Tantuni',
    src: '/images/menü/Somun Tantuni.webp'
  },
  {
    category: 'yemek',
    section: 'Tantuni',
    sectionOrder: 3,
    title: 'Lavaş Tantuni',
    src: '/images/menü/Lavaş Tantuni.webp'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 4,
    title: 'Chicken Mushroom',
    src: '/images/menü/Chicken Mushroom.webp'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 4,
    title: 'Kiremitte Mantar',
    src: '/images/menü/Kiremitte Mantar.webp'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 4,
    title: 'Yoğurtlu Akdeniz Kebabı',
    src: '/images/menü/Yoğurtu Akdeniz Kebabı.webp'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 4,
    title: 'Kayseri Mantısı',
    src: '/images/menü/Kayseri Mantısı.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Tavuk Sote',
    src: '/images/menü/Tavuk Sote.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Köri Soslu Piliç',
    src: '/images/menü/Köri Soslu Piliç.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Mexican Soslu Piliç',
    src: '/images/menü/Mexican Soslu Piliç.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Barbekü Soslu Piliç',
    src: '/images/menü/Barbekü Soslu Piliç.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Kekikli Kremalı Soslu Piliç',
    src: '/images/menü/Kekikli Kremalı Soslu Piliç.webp'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 5,
    title: 'Tavuk Çökertme',
    src: '/images/menü/Tavuk Çökertme.webp'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 6,
    title: 'Vegetarian Wrap',
    src: '/images/menü/Vejeteryan Wrap.webp'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 6,
    title: 'Tavuk Wrap',
    src: '/images/menü/Tavuk Wrap.webp'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 6,
    title: 'Sosisli Wrap',
    src: '/images/menü/Sosisli Wrap.webp'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 7,
    title: 'Penne Makarna',
    src: '/images/menü/Penne Makarna.webp'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 7,
    title: 'Anne Eli Makarna',
    src: '/images/menü/Anne Eli Makarna.webp'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 7,
    title: 'Pesto Soslu Penne',
    src: '/images/menü/Pesto Soslu Penne.webp'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 7,
    title: 'Köri Soslu Makarna',
    src: '/images/menü/Köri Soslu Makarna.webp'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 7,
    title: 'İtalyan Makarna',
    src: '/images/menü/İtalyan Makarna.webp'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 8,
    title: 'Patates Tava',
    src: '/images/menü/Patates Tava.webp'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 8,
    title: "Cheddar'lı Patates Kızartması",
    src: '/images/menü/Cheddarlı Patates Kızartması.webp'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 8,
    title: 'Mix Tabak',
    src: '/images/menü/Mix Tabak.webp'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 9,
    title: 'Akdeniz Salata',
    src: '/images/menü/Akdeniz Salata.webp'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 9,
    title: 'Ton Balıklı Salata',
    src: '/images/menü/Ton Balıklı Salata.webp'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 9,
    title: 'Şinitzel Salatası',
    src: '/images/menü/Şinitsel Salatası.webp'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 9,
    title: 'Sezar Salata',
    src: '/images/menü/Sezar Salata.webp'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 9,
    title: 'Tavuklu Şefin Salatası',
    src: '/images/menü/Tavuklu Şefin Salatası.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Türk Kahvesi',
    src: '/images/menü/Türk Kahvesi.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Damla Sakızlı Türk Kahvesi',
    src: '/images/menü/Damla Sakızlı Türk Kahvesi.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Dibek Kahvesi',
    src: '/images/menü/Dibek Kahvesi.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Menengiç Kahvesi',
    src: '/images/menü/Menengiç Kahvesi.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Sütlü Türk Kahvesi',
    src: '/images/menü/Sütlü Türk Kahvesi.webp'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Süvari',
    src: '/images/menü/Süvari.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Filtre Kahve',
    src: '/images/menü/Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Etiyopya Filtre Kahve',
    src: '/images/menü/Etiyopya Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Kolombiya Filtre Kahve',
    src: '/images/menü/Kolombiya Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Guatemala Filtre Kahve',
    src: '/images/menü/Guatemala Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Fransız Vanilyası Filtre Kahve',
    src: '/images/menü/Fransız Vanilyası Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'İsveç Çikolatası Filtre Kahve',
    src: '/images/menü/İsveç Çikolatası Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'İrlanda Kreması Filtre Kahve',
    src: '/images/menü/İrlanda Kreması Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Kenya Filtre Kahve',
    src: '/images/menü/Kenya Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Brezilya Filtre Kahve',
    src: '/images/menü/Brezilya Filtre Kahve.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Espresso',
    src: '/images/menü/Espresso.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Nescafe',
    src: '/images/menü/Nescafe.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Cappucino',
    src: '/images/menü/Cappucino.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Latte',
    src: '/images/menü/Latte.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Mocha',
    src: '/images/menü/Mocha.webp'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Macchiato',
    src: '/images/menü/Macchiato.webp'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Latte',
    src: '/images/menü/Ice Latte.webp'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Mocha',
    src: '/images/menü/Ice Mocha.webp'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Americano',
    src: '/images/menü/Ice Americano.webp'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Strawberry Ice Latte',
    src: '/images/menü/Strawberry Ice Latte.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Sütlaç',
    src: '/images/menü/Sütlaç.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Fıstık Rüyası',
    src: '/images/menü/Fıstık Rüyası.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Tiramisu',
    src: '/images/menü/Tiramisu.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'San Sebastian',
    src: '/images/menü/San Sebastian.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Fondü',
    src: '/images/menü/Fondü.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Meyveli Pastalar',
    src: '/images/menü/Meyveli Pastalar.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Magnolya',
    src: '/images/menü/Magnolya.webp'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Supangle',
    src: '/images/menü/Supangle.webp'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Frozen',
    src: '/images/menü/Frozen.webp'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Smoothie',
    src: '/images/menü/Smoothie.webp'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Frappe',
    src: '/images/menü/Frappe.webp'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Milkshake',
    src: '/images/menü/Milkshake.webp'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Muzlu Süt',
    src: '/images/menü/Muzlu Süt.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Su',
    src: '/images/menü/Su.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Soda',
    src: '/images/menü/Soda.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Meyveli Soda',
    src: '/images/menü/Meyveli Soda.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Ice Tea',
    src: '/images/menü/Ice Tea.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Coca Cola',
    src: '/images/menü/Coca Cola.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Fanta',
    src: '/images/menü/Fanta.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Sprite',
    src: '/images/menü/Sprite.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Redbull',
    src: '/images/menü/Redbull.webp'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Meyve Suyu',
    src: '/images/menü/Meyve Suları.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Mojito',
    src: '/images/menü/Mojito.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Blue Lagoon',
    src: '/images/menü/Blue Lagoon.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Mürver Ice Tea',
    src: '/images/menü/Mürve Ice Tea.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Berry Lemonade',
    src: '/images/menü/Berry Lemonade.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Rainbow',
    src: '/images/menü/Rainbow.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Pina Colada',
    src: '/images/menü/Pına Colada.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Liçi Fizz',
    src: '/images/menü/Liçi Fiz.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Cinderella',
    src: '/images/menü/Cindirella.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Dragon Lemonade',
    src: '/images/menü/Dragon Lemonade.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Nislen Mix',
    src: '/images/menü/Nişlen Mix.webp'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Redbull Twist',
    src: '/images/menü/Redbull Twist.webp'
  },
  {
    category: 'icecek',
    section: 'Özel/İmza İçecekler',
    sectionOrder: 3,
    title: 'Churchill',
    src: '/images/menü/Churchill.webp'
  },
  {
    category: 'icecek',
    section: 'Özel/İmza İçecekler',
    sectionOrder: 3,
    title: 'Limonata',
    src: '/images/menü/Limonata.webp'
  },
  {
    category: 'icecek',
    section: 'Özel/İmza İçecekler',
    sectionOrder: 3,
    title: 'Portakal Suyu',
    src: '/images/menü/Portakal Suyu.webp'
  },
  {
    category: 'nargile',
    section: 'Nargile Çeşitleri',
    sectionOrder: 1,
    title: 'Blonde Leaf',
    src: '/images/menü/Blonde Leaf.webp'
  },
  {
    category: 'nargile',
    section: 'Nargile Çeşitleri',
    sectionOrder: 1,
    title: 'Dark Leaf',
    src: '/images/menü/Dark Leaf.webp'
  }
]

export const menuImages: MenuImage[] = menuImagesSeed.map((image, index) => ({
  ...image,
  previewSrc: image.src,
  id: `${image.category}-${index + 1}`,
  order: index + 1
}))

export const products: Product[] = []
