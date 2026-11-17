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

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMenuImage, setSelectedMenuImage] = useState<MenuImage | null>(
    null
  )

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

  return (
    <>
      <section className="top-shell">
        <Header>
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
              >
                <img
                  src={menuImage.src}
                  alt={menuImage.title}
                  className="menu-image"
                  loading="lazy"
                />
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
