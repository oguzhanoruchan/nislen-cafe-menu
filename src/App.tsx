import { useEffect, useMemo, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { FooterLinks } from './components/FooterLinks'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { categories, menuImages, type MenuImage } from './data/menu'

const TEXTS = {
  allCategories: 'Tümü',
  searchPlaceholder: 'Menü bölümü ara'
}

const THEME_KEY = 'nislen-theme'

type ThemePreference = 'light' | 'dark' | 'system'

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMenuImage, setSelectedMenuImage] = useState<MenuImage | null>(
    null
  )
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

  useEffect(() => {
    if (!selectedMenuImage) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMenuImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMenuImage])

  const filteredMenuImages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return menuImages.filter((item) => {
      const categoryMatches =
        activeCategory === 'all' || item.category === activeCategory
      if (!categoryMatches) return false
      if (!normalizedSearch) return true

      return item.title.toLowerCase().includes(normalizedSearch)
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

          <section className="menu-image-grid" aria-label="Menü görselleri">
            {filteredMenuImages.map((menuImage) => (
              <button
                key={menuImage.id}
                className="menu-image-card"
                onClick={() => setSelectedMenuImage(menuImage)}
                aria-label={`${menuImage.title} menü görselini aç`}
              >
                <span className="menu-image-thumb-wrap" aria-hidden="true">
                  <img
                    src={menuImage.src}
                    alt=""
                    className="menu-image"
                    loading="lazy"
                  />
                </span>
                <span className="menu-image-title">{menuImage.title}</span>
              </button>
            ))}
          </section>
        </main>
      </section>

      {selectedMenuImage ? (
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMenuImage(null)
            }
          }}
        >
          <div className="product-modal-card menu-image-modal-card">
            <div className="modal-head">
              <button
                className="modal-close"
                onClick={() => setSelectedMenuImage(null)}
                aria-label="Kapat"
              >
                ×
              </button>
            </div>
            <img
              src={selectedMenuImage.src}
              alt={selectedMenuImage.title}
              className="product-modal-image"
            />
          </div>
        </div>
      ) : null}

      <FooterLinks />
    </>
  )
}
