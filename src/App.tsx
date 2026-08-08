import { useEffect, useMemo, useState } from 'react'
import { CampaignSlider } from './components/CampaignSlider'
import { CategoryFilter } from './components/CategoryFilter'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { SearchBar } from './components/SearchBar'
import {
  categories,
  products,
  type Product
} from './data/menu'

export type Language = 'tr' | 'en' | 'ru'

export type UiText = {
  dark: string
  light: string
  allCategories: string
  searchPlaceholder: string
  emptyTitle: string
}

const texts: Record<Language, UiText> = {
  tr: {
    dark: 'Koyu',
    light: 'Aydınlık',
    allCategories: 'Tüm Kategoriler',
    searchPlaceholder: 'Yemek, içecek veya ürün ara',
    emptyTitle: 'Filtreye uygun ürün bulunamadı.'
  },
  en: {
    dark: 'Dark',
    light: 'Light',
    allCategories: 'All Categories',
    searchPlaceholder: 'Search food, drinks or products',
    emptyTitle: 'No products match this filter.'
  },
  ru: {
    dark: 'Temnyi',
    light: 'Svetlyi',
    allCategories: 'Vse kategorii',
    searchPlaceholder: 'Poisk blyud i napitkov',
    emptyTitle: 'Po etomu filtru net produktov.'
  }
}

const LANGUAGE_KEY = 'nislen-language'
const THEME_KEY = 'nislen-theme'

function nextLanguage(value: Language): Language {
  if (value === 'tr') return 'en'
  if (value === 'en') return 'ru'
  return 'tr'
}

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [language, setLanguage] = useState<Language>('tr')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY) as Language | null
    const storedTheme = window.localStorage.getItem(THEME_KEY)
    if (storedLanguage && texts[storedLanguage]) {
      setLanguage(storedLanguage)
    }
    if (storedTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const text = texts[language]

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return products.filter((item) => {
      const categoryMatches = activeCategory === 'all' || item.category === activeCategory
      if (!categoryMatches) return false
      if (!normalizedSearch) return true

      return `${item.name} ${item.description || ''}`
        .toLowerCase()
        .includes(normalizedSearch)
    })
  }, [activeCategory, search])

  return (
    <>
      <Header
        language={language}
        text={text}
        darkMode={darkMode}
        onCycleLanguage={() => setLanguage((current) => nextLanguage(current))}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />
      <main className="container app-main">
        <Hero />
        <CampaignSlider />
        <SearchBar value={search} onChange={setSearch} text={text} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          text={text}
        />

        <section className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
            />
          ))}
        </section>

        {filteredProducts.length === 0 ? (
          <p className="empty-state">{text.emptyTitle}</p>
        ) : null}
      </main>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
