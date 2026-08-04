import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
  WifiOff,
  X
} from 'lucide-react'
import type { Category, Product } from './types'

type Language = 'en' | 'tr' | 'ru'
const copy = {
  en: {
    menu: 'Menu',
    search: 'Search dishes, drinks & flavours',
    all: 'All',
    featured: 'Featured today',
    best: 'Best sellers',
    related: 'You may also love',
    ingredients: 'Ingredients',
    allergens: 'Allergens',
    unavailable: 'Sold out today',
    available: 'Available now',
    noResults: 'No matches found',
    offline: 'You’re offline — showing your saved menu',
    view: 'View item',
    filters: 'Filters',
    clear: 'Clear',
    back: 'Back to menu'
  },
  tr: {
    menu: 'Menü',
    search: 'Yemek, içecek ve tat ara',
    all: 'Tümü',
    featured: 'Bugünün seçkisi',
    best: 'En çok sevilenler',
    related: 'Bunları da sevebilirsiniz',
    ingredients: 'İçindekiler',
    allergens: 'Alerjenler',
    unavailable: 'Bugün tükendi',
    available: 'Şimdi hazır',
    noResults: 'Eşleşen ürün bulunamadı',
    offline: 'Çevrimdışısınız — kayıtlı menü gösteriliyor',
    view: 'Ürünü gör',
    filters: 'Filtreler',
    clear: 'Temizle',
    back: 'Menüye dön'
  },
  ru: {
    menu: 'Меню',
    search: 'Поиск блюд, напитков и вкусов',
    all: 'Все',
    featured: 'Сегодня рекомендуем',
    best: 'Хиты продаж',
    related: 'Вам также понравится',
    ingredients: 'Состав',
    allergens: 'Аллергены',
    unavailable: 'Сегодня нет',
    available: 'Доступно сейчас',
    noResults: 'Ничего не найдено',
    offline: 'Вы не в сети — показано сохранённое меню',
    view: 'Открыть блюдо',
    filters: 'Фильтры',
    clear: 'Сбросить',
    back: 'К меню'
  }
} as const
const labels = {
  new: { en: 'New', tr: 'Yeni', ru: 'Новинка' },
  popular: { en: 'Popular', tr: 'Popüler', ru: 'Популярное' },
  discount: { en: 'Offer', tr: 'Fırsat', ru: 'Скидка' }
}
const categoryNames: Record<string, Record<Language, string>> = {
  coffee: { en: 'Coffee', tr: 'Kahve', ru: 'Кофе' },
  breakfast: { en: 'Breakfast', tr: 'Kahvaltı', ru: 'Завтрак' },
  sweets: { en: 'Sweets', tr: 'Tatlılar', ru: 'Десерты' }
}
const campaigns = [
  {
    eyebrow: 'MORNING RITUAL',
    title: 'Two coffees, one pastry on us.',
    detail: 'Until 11:00 every weekday',
    color: 'from-amber-300 to-orange-400'
  },
  {
    eyebrow: 'SEASONAL POUR',
    title: 'Discover our citrus cold brew.',
    detail: 'Bright, floral, and limited',
    color: 'from-sky-300 to-cyan-500'
  },
  {
    eyebrow: 'SLOW WEEKEND',
    title: 'Brunch made for lingering.',
    detail: 'Saturday & Sunday, 09:00–15:00',
    color: 'from-rose-300 to-pink-500'
  }
]
const fallback =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
const name = (p: Product, lang: Language) =>
  p.nameTranslations?.[lang] || p.name
const description = (p: Product, lang: Language) =>
  p.descriptionTranslations?.[lang] || p.description
const price = (value: number, lang: Language) =>
  new Intl.NumberFormat(
    lang === 'tr' ? 'tr-TR' : lang === 'ru' ? 'ru-RU' : 'en-US',
    { style: 'currency', currency: 'USD' }
  ).format(value)
function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('nislen-favorites') || '[]')
  )
  useEffect(
    () => localStorage.setItem('nislen-favorites', JSON.stringify(favorites)),
    [favorites]
  )
  return [
    favorites,
    (id: string) =>
      setFavorites((v) =>
        v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
      )
  ] as const
}
function CustomerHeader({
  lang,
  setLang,
  favorites
}: {
  lang: Language
  setLang: (v: Language) => void
  favorites: number
}) {
  const [dark, setDark] = useState(
    () => localStorage.getItem('nislen-theme') === 'dark'
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('nislen-theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <header className="customer-header">
      <Link to="/" className="brand">
        nislen<span>.</span>
      </Link>
      <div className="header-actions">
        <div className="language-picker">
          <button
            aria-label="Language"
            onClick={() =>
              setLang(lang === 'en' ? 'tr' : lang === 'tr' ? 'ru' : 'en')
            }
          >
            {lang.toUpperCase()}
          </button>
        </div>
        <button
          className="customer-icon"
          aria-label="Toggle color scheme"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="favorite-count"
          aria-label={`${favorites} favorites`}
        >
          <Heart size={17} />
          <i>{favorites}</i>
        </button>
      </div>
    </header>
  )
}
function ProductCard({
  product,
  lang,
  favorite,
  toggle,
  compact = false
}: {
  product: Product
  lang: Language
  favorite: boolean
  toggle: () => void
  compact?: boolean
}) {
  const available = product.available !== false
  return (
    <article
      className={`premium-card ${compact ? 'premium-card-compact' : ''} ${!available ? 'is-unavailable' : ''}`}
    >
      <Link to={`/product/${product.id}`} className="card-image">
        <img
          src={product.image || fallback}
          alt={name(product, lang)}
          loading="lazy"
        />
        {product.badge && (
          <span className={`badge badge-${product.badge}`}>
            {product.badge === 'discount' && product.discountPercent
              ? `-${product.discountPercent}%`
              : labels[product.badge][lang]}
          </span>
        )}
        {!available && (
          <span className="sold-out">{copy[lang].unavailable}</span>
        )}
      </Link>
      <button
        className={`heart ${favorite ? 'is-favorite' : ''}`}
        aria-label="Toggle favorite"
        onClick={toggle}
      >
        <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <Link to={`/product/${product.id}`} className="card-copy">
        <div>
          <p>{name(product, lang)}</p>
          <small>{description(product, lang)}</small>
        </div>
        <strong>{price(product.price, lang)}</strong>
      </Link>
    </article>
  )
}
export function MenuSkeleton() {
  return (
    <main className="customer-shell">
      <div className="skeleton hero-skeleton" />
      <div className="skeleton campaign-skeleton" />
      <div className="skeleton search-skeleton" />
      <div className="skeleton-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton product-skeleton" key={i} />
        ))}
      </div>
    </main>
  )
}
export function CustomerMenu({
  categories,
  products,
  loading,
  error
}: {
  categories: Category[]
  products: Product[]
  loading: boolean
  error?: string
}) {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem('nislen-language') as Language) || 'en'
  )
  const [term, setTerm] = useState('')
  const [active, setActive] = useState('all')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [slide, setSlide] = useState(0)
  const [online, setOnline] = useState(navigator.onLine)
  const [favorites, toggle] = useFavorites()
  const t = copy[lang]
  useEffect(() => localStorage.setItem('nislen-language', lang), [lang])
  useEffect(() => {
    const next = () => setSlide((x) => (x + 1) % campaigns.length)
    const id = window.setInterval(next, 5200)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine)
    addEventListener('online', sync)
    addEventListener('offline', sync)
    return () => {
      removeEventListener('online', sync)
      removeEventListener('offline', sync)
    }
  }, [])
  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (active === 'all' || p.categoryId === active) &&
          (!onlyFavorites || favorites.includes(p.id)) &&
          `${name(p, lang)} ${description(p, lang)} ${p.ingredients?.join(' ')}`
            .toLowerCase()
            .includes(term.toLowerCase())
      ),
    [products, active, onlyFavorites, favorites, term, lang]
  )
  if (loading)
    return (
      <>
        <CustomerHeader
          lang={lang}
          setLang={setLang}
          favorites={favorites.length}
        />
        <MenuSkeleton />
      </>
    )
  if (error)
    return (
      <CustomerError
        lang={lang}
        title="We could not refresh the menu"
        detail={error}
      />
    )
  const featured = products.filter((p) => p.featured && p.available !== false)
  const best = products.filter((p) => p.bestSeller && p.available !== false)
  const campaign = campaigns[slide]
  return (
    <>
      <CustomerHeader
        lang={lang}
        setLang={setLang}
        favorites={favorites.length}
      />
      {!online && (
        <div className="offline-bar">
          <WifiOff size={15} />
          {t.offline}
        </div>
      )}
      <main className="customer-shell">
        <section className="premium-hero">
          <p>NEIGHBORHOOD CAFÉ · EST. 2014</p>
          <h1>
            Take a slow sip
            <br />
            <em>of something good.</em>
          </h1>
          <span>Seasonal food, thoughtful coffee, all day.</span>
        </section>
        <section
          className={`campaign-slider bg-gradient-to-br ${campaign.color}`}
        >
          <div>
            <p>{campaign.eyebrow}</p>
            <h2>{campaign.title}</h2>
            <span>{campaign.detail}</span>
          </div>
          <div className="campaign-controls">
            <button
              onClick={() =>
                setSlide((slide + campaigns.length - 1) % campaigns.length)
              }
              aria-label="Previous campaign"
            >
              <ChevronLeft />
            </button>
            <i>
              {slide + 1} / {campaigns.length}
            </i>
            <button
              onClick={() => setSlide((slide + 1) % campaigns.length)}
              aria-label="Next campaign"
            >
              <ChevronRight />
            </button>
          </div>
        </section>
        <section className="search-zone">
          <label className="premium-search">
            <Search size={20} />
            <input
              autoComplete="off"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder={t.search}
            />
            {term && (
              <button aria-label="Clear search" onClick={() => setTerm('')}>
                <X size={17} />
              </button>
            )}
          </label>
          <button
            className={`filter-button ${onlyFavorites ? 'active' : ''}`}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
          >
            <SlidersHorizontal size={17} />
            {onlyFavorites ? `${favorites.length}` : t.filters}
          </button>
        </section>
        <nav className="category-rail">
          <button
            className={active === 'all' ? 'selected' : ''}
            onClick={() => setActive('all')}
          >
            {t.all}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={active === c.id ? 'selected' : ''}
              onClick={() => setActive(c.id)}
            >
              {categoryNames[c.id]?.[lang] || c.name}
            </button>
          ))}
        </nav>
        {!term && active === 'all' && !onlyFavorites && featured.length > 0 && (
          <section className="showcase">
            <div className="section-head">
              <div>
                <p>HANDPICKED FOR YOU</p>
                <h2>{t.featured}</h2>
              </div>
              <span>{featured.length} picks</span>
            </div>
            <div className="featured-rail">
              {featured.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  lang={lang}
                  favorite={favorites.includes(p.id)}
                  toggle={() => toggle(p.id)}
                  compact
                />
              ))}
            </div>
          </section>
        )}
        {!term && active === 'all' && !onlyFavorites && best.length > 0 && (
          <section className="showcase">
            <div className="section-head">
              <div>
                <p>THE CROWD FAVOURITES</p>
                <h2>{t.best}</h2>
              </div>
              <span>♥ {best.length}</span>
            </div>
            <div className="best-grid">
              {best.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  lang={lang}
                  favorite={favorites.includes(p.id)}
                  toggle={() => toggle(p.id)}
                />
              ))}
            </div>
          </section>
        )}
        <section className="menu-results">
          <div className="section-head">
            <div>
              <p>
                {active === 'all'
                  ? t.menu.toUpperCase()
                  : categoryNames[active]?.[lang]?.toUpperCase()}
              </p>
              <h2>
                {term ? `“${term}”` : onlyFavorites ? 'Favorites' : t.menu}
              </h2>
            </div>
            <span>{visible.length} items</span>
          </div>
          <div className="menu-grid">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                lang={lang}
                favorite={favorites.includes(p.id)}
                toggle={() => toggle(p.id)}
              />
            ))}
          </div>
          {!visible.length && (
            <div className="empty-state">
              <Search />
              <h2>{t.noResults}</h2>
              <p>{t.search}</p>
              <button
                onClick={() => {
                  setTerm('')
                  setActive('all')
                  setOnlyFavorites(false)
                }}
              >
                {t.clear}
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
export function CustomerDetail({
  products,
  loading
}: {
  products: Product[]
  loading: boolean
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem('nislen-language') as Language) || 'en'
  )
  const [favorites, toggle] = useFavorites()
  const p = products.find((x) => x.id === id)
  const [selected, setSelected] = useState(0)
  if (loading)
    return (
      <>
        <CustomerHeader
          lang={lang}
          setLang={setLang}
          favorites={favorites.length}
        />
        <MenuSkeleton />
      </>
    )
  if (!p)
    return (
      <CustomerError
        lang={lang}
        title="That menu item has wandered off"
        detail="The item may no longer be available."
      />
    )
  const t = copy[lang]
  const gallery = p.gallery?.length ? p.gallery : [p.image || fallback]
  const related = products
    .filter((x) => x.categoryId === p.categoryId && x.id !== p.id)
    .slice(0, 3)
  return (
    <>
      <CustomerHeader
        lang={lang}
        setLang={setLang}
        favorites={favorites.length}
      />
      <main className="customer-shell detail-shell">
        <button className="back-premium" onClick={() => navigate(-1)}>
          <ArrowLeft size={17} />
          {t.back}
        </button>
        <article className="product-detail">
          <div className="gallery">
            <img src={gallery[selected]} alt={name(p, lang)} />
            <button
              className={`gallery-heart ${favorites.includes(p.id) ? 'is-favorite' : ''}`}
              onClick={() => toggle(p.id)}
            >
              <Heart
                fill={favorites.includes(p.id) ? 'currentColor' : 'none'}
              />
            </button>
            {gallery.length > 1 && (
              <div className="gallery-dots">
                {gallery.map((img, i) => (
                  <button
                    aria-label={`View image ${i + 1}`}
                    className={i === selected ? 'active' : ''}
                    key={img}
                    onClick={() => setSelected(i)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="detail-content">
            {p.badge && (
              <span className={`badge badge-${p.badge}`}>
                {p.badge === 'discount' && p.discountPercent
                  ? `-${p.discountPercent}%`
                  : labels[p.badge][lang]}
              </span>
            )}
            <div className="detail-title">
              <h1>{name(p, lang)}</h1>
              <strong>{price(p.price, lang)}</strong>
            </div>
            <span
              className={`availability ${p.available === false ? 'off' : ''}`}
            >
              {p.available === false ? t.unavailable : t.available}
            </span>
            <p className="detail-description">{description(p, lang)}</p>
            {p.ingredients?.length ? (
              <div className="info-block">
                <h3>{t.ingredients}</h3>
                <p>{p.ingredients.join(' · ')}</p>
              </div>
            ) : null}
            {p.allergens?.length ? (
              <div className="info-block">
                <h3>{t.allergens}</h3>
                <div>
                  {p.allergens.map((a) => (
                    <span className="allergen" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
        {related.length > 0 && (
          <section className="showcase related">
            <div className="section-head">
              <div>
                <p>MORE TO DISCOVER</p>
                <h2>{t.related}</h2>
              </div>
            </div>
            <div className="featured-rail">
              {related.map((x) => (
                <ProductCard
                  key={x.id}
                  product={x}
                  lang={lang}
                  favorite={favorites.includes(x.id)}
                  toggle={() => toggle(x.id)}
                  compact
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
export function CustomerError({
  lang = 'en',
  title,
  detail
}: {
  lang?: Language
  title: string
  detail: string
}) {
  return (
    <main className="error-page">
      <div className="error-orb">✦</div>
      <p>nislen.</p>
      <h1>{title}</h1>
      <span>{detail}</span>
      <Link to="/">{copy[lang].back}</Link>
    </main>
  )
}
