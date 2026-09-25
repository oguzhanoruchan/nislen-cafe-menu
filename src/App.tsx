import { Fragment, useEffect, useMemo, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { FooterLinks } from './components/FooterLinks'
import { Header } from './components/Header'
import { MenuImagePreview } from './components/MenuImagePreview'
import { SearchBar } from './components/SearchBar'
import { categories, menuImages, type MenuImage } from './data/menu'

const TEXTS = {
  allCategories: 'Tümü',
  searchPlaceholder: 'Menü bölümü ara'
}

const THEME_KEY = 'nislen-theme'

type ThemePreference = 'light' | 'dark' | 'system'

function formatPrice(value: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(value)
}

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

  const sectionedMenuImages = useMemo(() => {
    const groups = new Map<
      string,
      { category: string; title: string; images: MenuImage[] }
    >()

    filteredMenuImages.forEach((image) => {
      const key = `${image.category}-${image.sectionOrder}`
      const group = groups.get(key)

      if (group) {
        group.images.push(image)
        return
      }

      groups.set(key, {
        category: image.category,
        title: image.section,
        images: [image]
      })
    })

    return [...groups.values()]
  }, [filteredMenuImages])

  const categoryMenuGroups = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          sections: sectionedMenuImages.filter(
            (section) => section.category === category.id
          )
        }))
        .filter((category) => category.sections.length > 0),
    [sectionedMenuImages]
  )

  const priorityMenuImageIds = useMemo(
    () => new Set(filteredMenuImages.slice(0, 3).map((image) => image.id)),
    [filteredMenuImages]
  )

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

  const selectAdjacentMenuImage = (direction: -1 | 1) => {
    if (!selectedMenuImage) {
      return
    }

    const currentIndex = menuImages.findIndex(
      (image) => image.id === selectedMenuImage.id
    )
    const nextIndex =
      (currentIndex + direction + menuImages.length) % menuImages.length

    setSelectedMenuImage(menuImages[nextIndex] ?? null)
  }

  return (
    <>
      <section className="mural-stage" aria-label="Nislen mural duvarı">
        <img
          className="mural-image"
          src="/images/nislen-mural-wall.webp"
          alt="Nislen Cafe mural duvarı"
        />
      </section>

      <section className="top-shell">
        <Header darkMode={darkMode} onToggleTheme={handleToggleTheme}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={TEXTS.searchPlaceholder}
          />
        </Header>
      </section>

      <section className="menu-surface">
        <main className="container app-main">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            allLabel={TEXTS.allCategories}
          />

          {categoryMenuGroups.map((category) => (
            <Fragment key={category.id}>
              {category.sections.map((section) => (
                <section
                  key={`${category.id}-${section.title}`}
                  className="menu-section"
                  aria-label={section.title}
                >
                  <h3 className="menu-section-title">{section.title}</h3>
                  <div className="menu-image-grid">
                    {section.images.map((menuImage) => (
                      <button
                        key={menuImage.id}
                        className="menu-image-card"
                        onClick={() => setSelectedMenuImage(menuImage)}
                        aria-label={`${menuImage.title} menü görselini aç`}
                      >
                        <span
                          className="menu-image-thumb-wrap"
                          aria-hidden="true"
                        >
                          <MenuImagePreview
                            src={menuImage.src}
                            alt=""
                            priority={priorityMenuImageIds.has(menuImage.id)}
                          />
                        </span>
                        <span className="menu-image-copy">
                          <span className="menu-image-price-row">
                            <span className="menu-image-title">
                              {menuImage.title}
                            </span>
                            <strong className="menu-image-price">
                              {formatPrice(menuImage.price)}
                            </strong>
                          </span>
                          {menuImage.doublePrice !== undefined ? (
                            <span className="menu-image-price-row">
                              <span className="menu-image-title">
                                Double {menuImage.title}
                              </span>
                              <strong className="menu-image-price">
                                {formatPrice(menuImage.doublePrice)}
                              </strong>
                            </span>
                          ) : null}
                        </span>
                        <span className="menu-image-arrow" aria-hidden="true">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </Fragment>
          ))}
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
            <button
              className="modal-close"
              onClick={() => setSelectedMenuImage(null)}
              aria-label="Kapat"
            >
              ×
            </button>
            <div className="menu-image-modal-stage">
              <button
                className="menu-image-modal-nav is-previous"
                onClick={() => selectAdjacentMenuImage(-1)}
                aria-label="Önceki menü görseli"
              >
                ‹
              </button>
              <img
                src={selectedMenuImage.src}
                alt={selectedMenuImage.title}
                className="product-modal-image"
              />
              <button
                className="menu-image-modal-nav is-next"
                onClick={() => selectAdjacentMenuImage(1)}
                aria-label="Sonraki menü görseli"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <FooterLinks />
    </>
  )
}
