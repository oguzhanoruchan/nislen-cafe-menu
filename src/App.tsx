import { useEffect, useMemo, useState } from 'react'
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

type ThemePreference = 'light' | 'dark' | 'system'

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [themePreference, setThemePreference] =
    useState<ThemePreference>('system')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY)
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemePreference(storedTheme)
    } else {
      setThemePreference('system')
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      if (themePreference === 'system') {
        setDarkMode(media.matches)
        return
      }

      setDarkMode(themePreference === 'dark')
    }

    applyTheme()

    if (themePreference !== 'system') {
      return
    }

    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [themePreference])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    if (themePreference === 'system') {
      window.localStorage.removeItem(THEME_KEY)
      return
    }

    window.localStorage.setItem(THEME_KEY, themePreference)
  }, [themePreference])

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

  const handleToggleTheme = () => {
    setThemePreference((current) => {
      if (current === 'dark') {
        return 'light'
      }

      if (current === 'light') {
        return 'dark'
      }

      return darkMode ? 'light' : 'dark'
    })
  }

  return (
    <>
      <section className="top-shell">
        <Header darkMode={darkMode} onToggleTheme={handleToggleTheme}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={TEXTS.searchPlaceholder}
          />
        </Header>
      </section>

      <section className="mural-stage" aria-label="Nislen mural duvarı">
        <img
          className="mural-image"
          src="/images/nislen-mural-wall.webp"
          alt="Nislen Cafe mural duvarı"
        />
      </section>

      <section className="menu-surface">
        <main className="container app-main">
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
        </main>
      </section>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
