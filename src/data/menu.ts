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
  price: number
  doublePrice?: number
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
  { id: 'sicak-icecekler', name: 'Sıcak İçecekler', order: 6 },
  { id: 'icecek', name: 'Soğuk İçecekler', order: 7 },
  { id: 'nargile', name: 'Nargile', order: 8 }
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
  'sicak-icecekler': [
    {
      id: 'cay-sicak-icecekler',
      name: 'Çay & Sıcak İçecekler',
      order: 1
    },
    { id: 'meyve-caylari', name: 'Meyve Çayları', order: 2 },
    { id: 'bitki-caylari', name: 'Bitki Çayları', order: 3 }
  ],
  icecek: [
    { id: 'kutu-icecekler', name: 'Kutu İçecekler', order: 1 },
    { id: 'kokteyller', name: 'Kokteyller', order: 2 },
    { id: 'ozel-icecekler', name: 'Özel/İmza İçecekler', order: 3 }
  ],
  nargile: [{ id: 'nargile-cesitleri', name: 'Nargile Çeşitleri', order: 1 }]
}

type MenuImageSeed = Omit<
  MenuImage,
  'id' | 'order' | 'previewSrc' | 'price' | 'doublePrice'
>

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
    src: '/images/menü/Tavuk Sote2.webp'
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
    src: '/images/menü/Süvari2.webp'
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
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Çay',
    src: '/images/menü/Çay.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Fincan Çay',
    src: '/images/menü/Fincan Çay.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Oralet',
    src: '/images/menü/Oraletler.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Ballı Süt',
    src: '/images/menü/Ballı Süt.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Salep',
    src: '/images/menü/Salep.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Çay & Sıcak İçecekler',
    sectionOrder: 1,
    title: 'Sıcak Çikolata',
    src: '/images/menü/Sıcak Çikolata.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Nar Çayı',
    src: '/images/menü/Nar Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Kuşburnu Çayı',
    src: '/images/menü/Kuşburnu Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Elma Çayı',
    src: '/images/menü/Elma Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Tropikal Meyve Çayı',
    src: '/images/menü/Tropikal Meyve Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Elma - Tarçın Çayı',
    src: '/images/menü/Elma-Tarçın Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Meyve Çayları',
    sectionOrder: 2,
    title: 'Rezene Çayı',
    src: '/images/menü/Rezene Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Ada Çayı',
    src: '/images/menü/Ada Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Papatya Çayı',
    src: '/images/menü/Papatya Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Yeşil Çay',
    src: '/images/menü/Yeşil Çay.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Nane Limon',
    src: '/images/menü/Nane Limon.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Kış Çayı',
    src: '/images/menü/Kış Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Melisa Çayı',
    src: '/images/menü/Melisa Çayı.webp'
  },
  {
    category: 'sicak-icecekler',
    section: 'Bitki Çayları',
    sectionOrder: 3,
    title: 'Ihlamur',
    src: '/images/menü/Ihlamur Çayı.webp'
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
    title: 'Ayran',
    src: '/images/menü/Ayran.webp'
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

const menuPrices: Record<string, number> = {
  'Gurme Kahvaltı': 520,
  'Huzur Kahvaltı Tabağı': 430,
  'Kampüs Kahvaltı': 350,
  'Kaşarlı Omlet': 240,
  'Sucuklu Omlet': 250,
  'Pastırmalı Omlet': 260,
  Menemen: 250,
  'Kaşarlı Menemen': 260,
  'Sucuklu Menemen': 270,
  'Beyaz Peynirli Tost': 260,
  'Kaşarlı Tost': 270,
  'Karışık Tost': 310,
  'Ayvalık Tost': 300,
  'Kaşarlı Gözleme': 280,
  'Ispanaklı Gözleme': 290,
  'Mantar-Kaşar Gözleme': 290,
  'Kaşar-Tulum Gözleme': 300,
  'Karışık Gözleme': 310,
  'Patatesli Gözleme': 300,
  'İzmir Kumru': 330,
  'Ekmek Arası Köfte': 480,
  'Ekmek Arası Kaşar-Salam': 280,
  'Ekmek Arası Ton Balığı': 310,
  'Izgara Köfte Servis': 550,
  'Somun Tantuni': 370,
  'Lavaş Tantuni': 380,
  'Chicken Mushroom': 410,
  'Kiremitte Mantar': 270,
  'Yoğurtlu Akdeniz Kebabı': 430,
  'Kayseri Mantısı': 350,
  'Tavuk Sote': 430,
  'Köri Soslu Piliç': 460,
  'Mexican Soslu Piliç': 460,
  'Barbekü Soslu Piliç': 460,
  'Kekikli Kremalı Soslu Piliç': 460,
  'Tavuk Çökertme': 480,
  'Vegetarian Wrap': 310,
  'Tavuk Wrap': 370,
  'Sosisli Wrap': 330,
  'Penne Makarna': 320,
  'Anne Eli Makarna': 330,
  'Pesto Soslu Penne': 340,
  'Köri Soslu Makarna': 350,
  'İtalyan Makarna': 350,
  'Patates Tava': 250,
  "Cheddar'lı Patates Kızartması": 310,
  'Mix Tabak': 330,
  'Akdeniz Salata': 310,
  'Ton Balıklı Salata': 320,
  'Şinitzel Salatası': 330,
  'Sezar Salata': 340,
  'Tavuklu Şefin Salatası': 350,
  'Türk Kahvesi': 150,
  'Damla Sakızlı Türk Kahvesi': 160,
  'Dibek Kahvesi': 160,
  'Menengiç Kahvesi': 165,
  'Sütlü Türk Kahvesi': 160,
  Süvari: 180,
  'Filtre Kahve': 180,
  'Etiyopya Filtre Kahve': 180,
  'Kolombiya Filtre Kahve': 180,
  'Guatemala Filtre Kahve': 180,
  'Fransız Vanilyası Filtre Kahve': 180,
  'İsveç Çikolatası Filtre Kahve': 180,
  'İrlanda Kreması Filtre Kahve': 180,
  'Kenya Filtre Kahve': 180,
  'Brezilya Filtre Kahve': 180,
  Espresso: 150,
  Nescafe: 180,
  Cappucino: 190,
  Americano: 170,
  Latte: 180,
  Mocha: 190,
  Macchiato: 180,
  'Ice Latte': 210,
  'Ice Mocha': 220,
  'Ice Americano': 190,
  'Strawberry Ice Latte': 220,
  Sütlaç: 220,
  'Fıstık Rüyası': 240,
  Tiramisu: 230,
  'San Sebastian': 280,
  Fondü: 300,
  'Meyveli Pastalar': 270,
  Magnolya: 250,
  Supangle: 250,
  Frozen: 220,
  Smoothie: 220,
  Frappe: 220,
  Milkshake: 220,
  'Muzlu Süt': 230,
  Çay: 55,
  'Fincan Çay': 70,
  Oralet: 60,
  'Ballı Süt': 160,
  Salep: 170,
  'Sıcak Çikolata': 170,
  'Nar Çayı': 170,
  'Kuşburnu Çayı': 170,
  'Elma Çayı': 170,
  'Tropikal Meyve Çayı': 170,
  'Elma - Tarçın Çayı': 170,
  'Rezene Çayı': 170,
  'Ada Çayı': 180,
  'Papatya Çayı': 180,
  'Yeşil Çay': 180,
  'Nane Limon': 180,
  'Kış Çayı': 180,
  'Melisa Çayı': 180,
  Ihlamur: 180,
  Su: 45,
  Soda: 80,
  'Meyveli Soda': 90,
  Ayran: 60,
  'Ice Tea': 120,
  'Coca Cola': 120,
  Fanta: 120,
  Sprite: 120,
  Redbull: 180,
  'Meyve Suyu': 120,
  Mojito: 220,
  'Blue Lagoon': 220,
  'Mürver Ice Tea': 220,
  'Berry Lemonade': 230,
  Rainbow: 240,
  'Pina Colada': 240,
  'Liçi Fizz': 240,
  Cinderella: 240,
  'Dragon Lemonade': 240,
  'Nislen Mix': 250,
  'Redbull Twist': 260,
  Churchill: 140,
  Limonata: 170,
  'Portakal Suyu': 220,
  'Blonde Leaf': 520,
  'Dark Leaf': 700
}

const doubleCoffeePrices: Record<string, number> = {
  'Türk Kahvesi': 190,
  'Damla Sakızlı Türk Kahvesi': 200,
  'Dibek Kahvesi': 200,
  'Menengiç Kahvesi': 205,
  'Sütlü Türk Kahvesi': 200,
  Süvari: 220,
  Espresso: 190
}

export const menuImages: MenuImage[] = menuImagesSeed.map((image, index) => {
  const price = menuPrices[image.title]

  if (price === undefined) {
    throw new Error(`Missing price for menu item: ${image.title}`)
  }

  return {
    ...image,
    price,
    doublePrice: doubleCoffeePrices[image.title],
    previewSrc: image.src,
    id: `${image.category}-${index + 1}`,
    order: index + 1
  }
})

export const products: Product[] = []
