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
    { id: 'izmir-kumru', name: 'İzmir Kumru', order: 1 },
    { id: 'ekmek-arasi-cesitleri', name: 'Ekmek Arası Çeşitleri', order: 2 },
    { id: 'izgara', name: 'Izgara', order: 3 },
    { id: 'tantuni', name: 'Tantuni', order: 4 },
    { id: 'special', name: 'Special', order: 5 },
    { id: 'beyaz-et', name: 'Beyaz Et', order: 6 },
    { id: 'wraplar', name: 'Wraplar', order: 7 },
    { id: 'makarnalar', name: 'Makarnalar', order: 8 },
    { id: 'ara-sicaklar', name: 'Ara Sıcaklar', order: 9 },
    { id: 'salatalar', name: 'Salatalar', order: 10 }
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
  tatli: [
    { id: 'tatlilar', name: 'Tatlılar', order: 1 },
    { id: 'esintili-tatlar', name: 'Esintili Tatlar', order: 2 }
  ],
  'tatli-serin': [{ id: 'tatli-serin', name: 'Tatlı & Serin', order: 1 }],
  icecek: [
    { id: 'kutu-icecekler', name: 'Kutu İçecekler', order: 1 },
    { id: 'kokteyller', name: 'Kokteyller', order: 2 },
    { id: 'ozel-icecekler', name: 'Özel İçecekler', order: 3 }
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

type MenuImageSeed = Omit<MenuImage, 'id' | 'order'>

const menuImagesSeed: MenuImageSeed[] = [
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Gurme Kahvaltı',
    src: '/images/menü/Gurme Kahvaltı.png'
  },
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Huzur Kahvaltı Tabağı',
    src: '/images/menü/Huzur Kahvaltı Tabağı.png'
  },
  {
    category: 'kahvalti',
    section: 'Kahvaltılar',
    sectionOrder: 1,
    title: 'Kampüs Kahvaltı',
    src: '/images/menü/Kampüs Kahvaltı Tabağı.png'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Kaşarlı Omlet',
    src: '/images/menü/Kaşarlı Omlet.png'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Sucuklu Omlet',
    src: '/images/menü/Sucuklu Omlet.png'
  },
  {
    category: 'kahvalti',
    section: 'Omlet Çeşitleri',
    sectionOrder: 2,
    title: 'Pastırmalı Omlet',
    src: '/images/menü/Pastırmalı Omlet.png'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Menemen',
    src: '/images/menü/Menemen.png'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Kaşarlı Menemen',
    src: '/images/menü/Kaşarlı Menemen.png'
  },
  {
    category: 'kahvalti',
    section: 'Menemen Çeşitleri',
    sectionOrder: 3,
    title: 'Sucuklu Menemen',
    src: '/images/menü/Sucuklu Menemen.png'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Beyaz Peynirli Tost',
    src: '/images/menü/Beyaz Peynirli Tost.png'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Kaşarlı Tost',
    src: '/images/menü/Kaşarlı Tost.png'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Karışık Tost',
    src: '/images/menü/Karışık Tost.png'
  },
  {
    category: 'kahvalti',
    section: 'Tost Çeşitleri',
    sectionOrder: 4,
    title: 'Ayvalık Tost',
    src: '/images/menü/Ayvalık Tost.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Kaşarlı Gözleme',
    src: '/images/menü/Kaşarlı Gözleme.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Ispanaklı Gözleme',
    src: '/images/menü/Ispanaklı Gözleme.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Mantar-Kaşar Gözleme',
    src: '/images/menü/Mantar-Kaşar Gözleme.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Kaşar-Tulum Gözleme',
    src: '/images/menü/Kaşar-Tulum Gözleme.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Karışık Gözleme',
    src: '/images/menü/Karışık Gözleme.png'
  },
  {
    category: 'kahvalti',
    section: 'Gözleme Çeşitleri',
    sectionOrder: 5,
    title: 'Patatesli Gözleme',
    src: '/images/menü/Patatesli Gözleme.png'
  },
  {
    category: 'yemek',
    section: 'İzmir Kumru',
    sectionOrder: 1,
    title: 'İzmir Kumru',
    src: '/images/menü/İzmir Kumru.png'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 2,
    title: 'Ekmek Arası Köfte',
    src: '/images/menü/Ekmek Arası Köfte.png'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 2,
    title: 'Ekmek Arası Kaşar-Salam',
    src: '/images/menü/Ekmek Arası Kaşar-Salam.png'
  },
  {
    category: 'yemek',
    section: 'Ekmek Arası Çeşitleri',
    sectionOrder: 2,
    title: 'Ekmek Arası Ton Balığı',
    src: '/images/menü/Ekmek Arası Ton Balığı.png'
  },
  {
    category: 'yemek',
    section: 'Izgara',
    sectionOrder: 3,
    title: 'Izgara Köfte Servis',
    src: '/images/menü/Izgara Köfte Servis.png'
  },
  {
    category: 'yemek',
    section: 'Tantuni',
    sectionOrder: 4,
    title: 'Somun Tantuni',
    src: '/images/menü/Somun Tantuni.png'
  },
  {
    category: 'yemek',
    section: 'Tantuni',
    sectionOrder: 4,
    title: 'Lavaş Tantuni',
    src: '/images/menü/Lavaş Tantuni.png'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 5,
    title: 'Chicken Mushroom',
    src: '/images/menü/Chicken Mushroom.png'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 5,
    title: 'Kiremitte Mantar',
    src: '/images/menü/Kiremitte Mantar.png'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 5,
    title: 'Yoğurtlu Akdeniz Kebabı',
    src: '/images/menü/Yoğurtlu Akdeniz Kebabı.png'
  },
  {
    category: 'yemek',
    section: 'Special',
    sectionOrder: 5,
    title: 'Kayseri Mantısı',
    src: '/images/menü/Kayseri Mantısı.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Tavuk Sote',
    src: '/images/menü/Tavuk Sote.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Köri Soslu Piliç',
    src: '/images/menü/Köri Soslu Piliç.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Mexican Soslu Piliç',
    src: '/images/menü/Mexican Soslu Piliç.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Barbekü Soslu Piliç',
    src: '/images/menü/Barbekü Soslu Piliç.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Kekikli Kremalı Soslu Piliç',
    src: '/images/menü/Kekikli Kremalı Soslu Piliç.png'
  },
  {
    category: 'yemek',
    section: 'Beyaz Et',
    sectionOrder: 6,
    title: 'Tavuk Çökertme',
    src: '/images/menü/Tavuk Çökertme.png'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 7,
    title: 'Vegetarian Wrap',
    src: '/images/menü/Vejeteryan Wrap.png'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 7,
    title: 'Tavuk Wrap',
    src: '/images/menü/Tavuk Wrap.png'
  },
  {
    category: 'yemek',
    section: 'Wraplar',
    sectionOrder: 7,
    title: 'Sosisli Wrap',
    src: '/images/menü/Sosisli Wrap.png'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 8,
    title: 'Penne Makarna',
    src: '/images/menü/Penne Makarna.png'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 8,
    title: 'Anne Eli Makarna',
    src: '/images/menü/Anne Eli Makarna.png'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 8,
    title: 'Pesto Soslu Penne',
    src: '/images/menü/Pesto Soslu Penne.png'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 8,
    title: 'Köri Soslu Makarna',
    src: '/images/menü/Köri Soslu Makarna.png'
  },
  {
    category: 'yemek',
    section: 'Makarnalar',
    sectionOrder: 8,
    title: 'İtalyan Makarna',
    src: '/images/menü/İtalyan Makarna.png'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 9,
    title: 'Patates Tava',
    src: '/images/menü/Patates Tava.png'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 9,
    title: "Cheddar'lı Patates Kızartması",
    src: '/images/menü/Cheddarlı Patates Kızartması.png'
  },
  {
    category: 'yemek',
    section: 'Ara Sıcaklar',
    sectionOrder: 9,
    title: 'Mix Tabak',
    src: '/images/menü/Mix Tabak.png'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 10,
    title: 'Akdeniz Salata',
    src: '/images/menü/Akdeniz Salata.png'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 10,
    title: 'Ton Balıklı Salata',
    src: '/images/menü/Ton Balıklı Salata.png'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 10,
    title: 'Şinitzel Salatası',
    src: '/images/menü/Şinitzel Salatası.png'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 10,
    title: 'Sezar Salata',
    src: '/images/menü/Sezar Salata.png'
  },
  {
    category: 'yemek',
    section: 'Salatalar',
    sectionOrder: 10,
    title: 'Tavuklu Şefin Salatası',
    src: '/images/menü/Tavuklu Şefin Salatası.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Türk Kahvesi',
    src: '/images/menü/Türk Kahvesi.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Damla Sakızlı Türk Kahvesi',
    src: '/images/menü/Damla Sakızlı Türk Kahvesi.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Dibek Kahvesi',
    src: '/images/menü/Dibek Kahvesi.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Menengiç Kahvesi',
    src: '/images/menü/Menengiç Kahvesi.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Sütlü Türk Kahvesi',
    src: '/images/menü/Sütlü Türk Kahvesi.png'
  },
  {
    category: 'kahveler',
    section: 'Türk Kahveleri',
    sectionOrder: 1,
    title: 'Süvari',
    src: '/images/menü/Süvari.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Filtre Kahve',
    src: '/images/menü/Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Etiyopya Filtre Kahve',
    src: '/images/menü/Etiyopya Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Kolombiya Filtre Kahve',
    src: '/images/menü/Kolombiya Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Guatemala Filtre Kahve',
    src: '/images/menü/Guatemala Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Fransız Vanilyası Filtre Kahve',
    src: '/images/menü/Fransız Vanilyası Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'İsveç Çikolatası Filtre Kahve',
    src: '/images/menü/İsveç Çikolatası Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'İrlanda Kreması Filtre Kahve',
    src: '/images/menü/İrlanda Kreması Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Kenya Filtre Kahve',
    src: '/images/menü/Kenya Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Filtre Kahveler',
    sectionOrder: 2,
    title: 'Brezilya Filtre Kahve',
    src: '/images/menü/Brezilya Filtre Kahve.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Espresso',
    src: '/images/menü/Espresso.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Nescafe',
    src: '/images/menü/Nescafe.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Cappucino',
    src: '/images/menü/Cappucino.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Latte',
    src: '/images/menü/Latte.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Mocha',
    src: '/images/menü/Mocha.png'
  },
  {
    category: 'kahveler',
    section: 'Espresso Bazlı Kahveler',
    sectionOrder: 3,
    title: 'Macchiato',
    src: '/images/menü/Macchiato.png'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Latte',
    src: '/images/menü/Ice Latte.png'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Mocha',
    src: '/images/menü/Ice Mocha.png'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Ice Americano',
    src: '/images/menü/Ice Americano.png'
  },
  {
    category: 'kahveler',
    section: 'Soğuk Kahveler',
    sectionOrder: 4,
    title: 'Strawberry Ice Latte',
    src: '/images/menü/Strawberry Ice Latte.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Sütlaç',
    src: '/images/menü/Sütlaç.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Fıstık Rüyası',
    src: '/images/menü/Fıstık Rüyası.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Tiramisu',
    src: '/images/menü/Tiramisu.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'San Sebastian',
    src: '/images/menü/San Sebastian.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Fondü',
    src: '/images/menü/Fondü.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Meyveli Pastalar',
    src: '/images/menü/Meyveli Pastalar.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Magnolya',
    src: '/images/menü/Magnolya.png'
  },
  {
    category: 'tatli',
    section: 'Tatlılar',
    sectionOrder: 1,
    title: 'Supangle',
    src: '/images/menü/Supangle.png'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Frozen',
    src: '/images/menü/Frozen.png'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Smoothie',
    src: '/images/menü/Smoothie.png'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Frappe',
    src: '/images/menü/Frappe.png'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Milkshake',
    src: '/images/menü/Milkshake.png'
  },
  {
    category: 'tatli-serin',
    section: 'Tatlı & Serin',
    sectionOrder: 1,
    title: 'Muzlu Süt',
    src: '/images/menü/Muzlu Süt.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Su',
    src: '/images/menü/Su.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Soda',
    src: '/images/menü/Soda.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Meyveli Soda',
    src: '/images/menü/Meyveli Soda.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Ice Tea',
    src: '/images/menü/Ice Tea.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Coca Cola',
    src: '/images/menü/Coca Cola.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Fanta',
    src: '/images/menü/Fanta.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Sprite',
    src: '/images/menü/Sprite.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Redbull',
    src: '/images/menü/Redbull.png'
  },
  {
    category: 'icecek',
    section: 'Kutu İçecekler',
    sectionOrder: 1,
    title: 'Meyve Suyu',
    src: '/images/menü/Meyve Suyu.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Mojito',
    src: '/images/menü/Mojito.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Blue Lagoon',
    src: '/images/menü/Blue Lagoon.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Mürver Ice Tea',
    src: '/images/menü/Mürve Ice Tea.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Berry Lemonade',
    src: '/images/menü/Berry Lemonade.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Rainbow',
    src: '/images/menü/Rainbow.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Pina Colada',
    src: '/images/menü/Pina Colada.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Liçi Fizz',
    src: '/images/menü/Liçi Fiz.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Cinderella',
    src: '/images/menü/Cindirella.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Dragon Lemonade',
    src: '/images/menü/Dragon Lemonade.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Nislen Mix',
    src: '/images/menü/Nişlen Mix.png'
  },
  {
    category: 'icecek',
    section: 'Kokteyller',
    sectionOrder: 2,
    title: 'Redbull Twist',
    src: '/images/menü/Redbull Twist.png'
  },
  {
    category: 'icecek',
    section: 'Özel İçecekler',
    sectionOrder: 3,
    title: 'Churchill',
    src: '/images/menü/Churchill.png'
  },
  {
    category: 'icecek',
    section: 'Özel İçecekler',
    sectionOrder: 3,
    title: 'Limonata',
    src: '/images/menü/Limonata.png'
  },
  {
    category: 'icecek',
    section: 'Özel İçecekler',
    sectionOrder: 3,
    title: 'Portakal Suyu',
    src: '/images/menü/Portakal Suyu.png'
  },
  {
    category: 'nargile',
    section: 'Nargile Çeşitleri',
    sectionOrder: 1,
    title: 'Blonde Leaf',
    src: '/images/menü/Blonde Leaf.png'
  },
  {
    category: 'nargile',
    section: 'Darleaf Nargile Çeşitleri',
    sectionOrder: 2,
    title: 'Dark Leaf',
    src: '/images/menü/Dark Leaf.png'
  }
]

export const menuImages: MenuImage[] = menuImagesSeed.map((image, index) => ({
  ...image,
  id: `${image.category}-${index + 1}`,
  order: index + 1
}))

export const products: Product[] = []
