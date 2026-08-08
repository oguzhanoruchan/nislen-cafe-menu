import { useEffect, useMemo, useState } from 'react'
import { CampaignSlider } from './components/CampaignSlider'
import { CategoryFilter } from './components/CategoryFilter'
import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { SearchBar } from './components/SearchBar'
import { categories, products, type Product } from './data/menu'

const TEXTS = {
  allCategories: 'Tüm Kategoriler',
  searchPlaceholder: 'Yemek, içecek veya ürün ara',
  emptyTitle: 'Filtreye uygun ürün bulunamadı.'
}

const THEME_KEY = 'nislen-theme'

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY)
    if (storedTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return products.filter((item) => {
      const categoryMatches =
        activeCategory === 'all' || item.category === activeCategory
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
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />
      <main className="container app-main">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={TEXTS.searchPlaceholder}
        />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          allLabel={TEXTS.allCategories}
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
          <p className="empty-state">{TEXTS.emptyTitle}</p>
        ) : null}

        <CampaignSlider />
      </main>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
