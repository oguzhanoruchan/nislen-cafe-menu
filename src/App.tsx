import { useEffect, useMemo, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { FooterLinks } from './components/FooterLinks'
import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { SearchBar } from './components/SearchBar'
import { categories, menuSections, products, type Product } from './data/menu'

const TEXTS = {
  allCategories: 'Tümü',
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

  const sectionedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (a.categoryOrder !== b.categoryOrder) {
        return a.categoryOrder - b.categoryOrder
      }

      if (a.sectionOrder !== b.sectionOrder) {
        return a.sectionOrder - b.sectionOrder
      }

      return a.name.localeCompare(b.name, 'tr')
    })

    const groups = new Map<string, { title: string; products: Product[] }>()

    sorted.forEach((product) => {
      const key = `${product.category}-${product.section}`

      if (!groups.has(key)) {
        groups.set(key, { title: product.section, products: [] })
      }

      groups.get(key)?.products.push(product)
    })

    const preferredOrder =
      activeCategory === 'all'
        ? categories.flatMap((category) =>
            (menuSections[category.id] || []).map(
              (section) => `${category.id}-${section.name}`
            )
          )
        : (menuSections[activeCategory] || []).map(
            (section) => `${activeCategory}-${section.name}`
          )

    const orderedGroups = preferredOrder
      .map((key) => groups.get(key))
      .filter((group): group is { title: string; products: Product[] } =>
        Boolean(group)
      )

    const remaining = [...groups.entries()]
      .filter(([key]) => !preferredOrder.includes(key))
      .map(([, group]) => group)

    return [...orderedGroups, ...remaining]
  }, [activeCategory, filteredProducts])

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

          {sectionedProducts.map((section) => (
            <section key={section.title} className="menu-section">
              <h2 className="menu-section-title">{section.title}</h2>
              <div className="product-grid">
                {section.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </section>
          ))}

          {sectionedProducts.length === 0 ? (
            <p className="empty-state">{TEXTS.emptyTitle}</p>
          ) : null}
        </main>
      </section>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <FooterLinks />
    </>
  )
}
