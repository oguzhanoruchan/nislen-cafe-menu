import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from 'react-router-dom'
import {
  Moon,
  Search,
  Sun,
  ArrowLeft,
  Settings,
  X,
  Plus,
  Trash2,
  QrCode,
  LogIn,
  LogOut,
  ImageUp
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import { auth, firebaseEnabled } from './firebase'
import {
  removeCategory,
  removeProduct,
  saveCategory,
  saveProduct,
  subscribeMenu,
  uploadImage
} from './menuService'
import type { Category, Product } from './types'
import { CustomerDetail, CustomerMenu } from './customer'
import AdvancedAdmin from './adminAdvanced'
import {
  ContactPage,
  FeedbackPage,
  OperationsPage,
  ReservationPage,
  RestaurantAdminPanel,
  TablePage
} from './restaurantPages'

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    n
  )
function ProductImage({
  product,
  large = false
}: {
  product: Product
  large?: boolean
}) {
  return product.image ? (
    <img
      className={`object-cover ${large ? 'h-64 w-full' : 'h-24 w-24 rounded-2xl'}`}
      src={product.image}
      alt=""
    />
  ) : (
    <div
      className={`${large ? 'h-64' : 'h-24 w-24 rounded-2xl'} grid place-items-center bg-forest/10 text-4xl`}
      aria-hidden
    >
      ☕
    </div>
  )
}
function Header({ admin = false }: { admin?: boolean }) {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-cream/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="font-display text-2xl font-bold text-forest dark:text-emerald-300"
        >
          nislen<span className="text-terracotta">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            className="icon-button"
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            className="icon-button"
            aria-label={admin ? 'Back to menu' : 'Admin'}
            to={admin ? '/' : '/admin'}
          >
            {admin ? <ArrowLeft size={18} /> : <Settings size={18} />}
          </Link>
        </div>
      </div>
    </header>
  )
}
// Kept for the compact admin preview fallback; public routes use CustomerMenu.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Menu({
  categories,
  products
}: {
  categories: Category[]
  products: Product[]
}) {
  const [term, setTerm] = useState('')
  const [active, setActive] = useState('all')
  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          p.available !== false &&
          (active === 'all' || p.categoryId === active) &&
          `${p.name} ${p.description}`
            .toLowerCase()
            .includes(term.toLowerCase())
      ),
    [products, active, term]
  )
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="hero">
          <p className="eyebrow">YOUR NEIGHBORHOOD CAFÉ</p>
          <h1>
            Good food,
            <br />
            <em>good mood.</em>
          </h1>
          <p className="max-w-md text-stone-600 dark:text-stone-300">
            A seasonal menu made with care. Settle in, take a breath, and enjoy.
          </p>
        </section>
        <section className="campaign">
          <span>✦ TODAY'S TREAT</span>
          <strong>Free pastry with any two coffees before 11am</strong>
          <small>Available while supplies last</small>
        </section>
        <label className="search">
          <Search size={19} />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search the menu"
          />
        </label>
        <div className="tabs">
          <button
            className={active === 'all' ? 'active' : ''}
            onClick={() => setActive('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={active === c.id ? 'active' : ''}
              onClick={() => setActive(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((p) => (
            <Link className="product-card" key={p.id} to={`/product/${p.id}`}>
              <ProductImage product={p} />
              <span className="min-w-0 flex-1">
                <b>{p.name}</b>
                <small>{p.description}</small>
              </span>
              <strong>{money(p.price)}</strong>
            </Link>
          ))}
        </div>
        {!list.length && (
          <p className="py-14 text-center text-stone-500">
            No menu items match your search.
          </p>
        )}
      </main>
    </>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Detail({ products }: { products: Product[] }) {
  const { id } = useParams()
  const p = products.find((x) => x.id === id)
  if (!p) return <Navigate to="/" replace />
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-5">
        <Link to="/" className="back">
          <ArrowLeft size={17} /> Menu
        </Link>
        <article className="detail">
          <ProductImage product={p} large />
          <div className="p-6">
            <p className="eyebrow">MADE TO ORDER</p>
            <div className="flex justify-between gap-5">
              <h1 className="font-display text-4xl">{p.name}</h1>
              <strong className="text-xl text-terracotta">
                {money(p.price)}
              </strong>
            </div>
            <p className="mt-5 leading-7 text-stone-600 dark:text-stone-300">
              {p.description}
            </p>
            {p.allergens?.length ? (
              <div className="mt-6">
                <b className="text-sm">Allergens</b>
                <p className="mt-2">
                  {p.allergens.map((a) => (
                    <span className="tag" key={a}>
                      {a}
                    </span>
                  ))}
                </p>
              </div>
            ) : null}
          </div>
        </article>
      </main>
    </>
  )
}
function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!auth)
      return setError('Add Firebase credentials to enable admin sign-in.')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onDone()
    } catch {
      setError('Unable to sign in. Check your credentials.')
    }
  }
  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <Link
        to="/"
        className="font-display text-3xl text-forest dark:text-emerald-300"
      >
        nislen.
      </Link>
      <h1 className="mt-10 font-display text-4xl">Admin sign in</h1>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="primary w-full">
          <LogIn size={18} /> Sign in
        </button>
      </form>
    </main>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Admin({
  categories,
  products
}: {
  categories: Category[]
  products: Product[]
}) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [section, setSection] = useState<'products' | 'categories' | 'qr'>(
    'products'
  )
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  useEffect(() => (auth ? onAuthStateChanged(auth, setUser) : undefined), [])
  if (firebaseEnabled && !user) return <Login onDone={() => undefined} />
  return (
    <>
      <Header admin />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">DASHBOARD</p>
            <h1 className="font-display text-4xl">Manage menu</h1>
          </div>
          <div className="flex gap-2">
            {(['products', 'categories', 'qr'] as const).map((x) => (
              <button
                key={x}
                onClick={() => setSection(x)}
                className={section === x ? 'primary' : 'secondary'}
              >
                {x === 'qr' ? <QrCode size={16} /> : null}
                {x}
              </button>
            ))}
            {user && (
              <button
                className="icon-button"
                aria-label="Sign out"
                onClick={() => signOut(auth!).then(() => navigate('/'))}
              >
                <LogOut size={17} />
              </button>
            )}
          </div>
        </div>
        {!firebaseEnabled && (
          <p className="notice">
            Demo mode — configure Firebase in <code>.env</code> to save changes
            and protect this dashboard.
          </p>
        )}
        {section === 'products' && (
          <section className="admin-section">
            <button
              className="primary"
              onClick={() =>
                setEditingProduct({
                  id: '',
                  name: '',
                  description: '',
                  price: 0,
                  categoryId: categories[0]?.id || '',
                  available: true
                })
              }
            >
              <Plus size={17} /> Add product
            </button>
            <div className="admin-list">
              {products.map((p) => (
                <div key={p.id}>
                  <ProductImage product={p} />
                  <span>
                    <b>{p.name}</b>
                    <small>
                      {money(p.price)} ·{' '}
                      {categories.find((c) => c.id === p.categoryId)?.name}
                    </small>
                  </span>
                  <button
                    className="secondary"
                    onClick={() => setEditingProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Delete ${p.name}`}
                    onClick={() =>
                      confirm(`Delete ${p.name}?`) && removeProduct(p.id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {section === 'categories' && (
          <section className="admin-section">
            <button
              className="primary"
              onClick={() =>
                setEditingCategory({
                  id: '',
                  name: '',
                  description: '',
                  order: categories.length + 1
                })
              }
            >
              <Plus size={17} /> Add category
            </button>
            <div className="admin-list">
              {categories.map((c) => (
                <div key={c.id}>
                  <span className="category-dot">☕</span>
                  <span>
                    <b>{c.name}</b>
                    <small>{c.description}</small>
                  </span>
                  <button
                    className="secondary"
                    onClick={() => setEditingCategory(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Delete ${c.name}`}
                    onClick={() =>
                      confirm(`Delete ${c.name}?`) && removeCategory(c.id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {section === 'qr' && (
          <section className="qr-panel">
            <QRCodeSVG
              value={window.location.origin}
              size={220}
              includeMargin
            />
            <h2 className="font-display text-2xl">Your menu QR code</h2>
            <p>Print or share this code. It opens the public menu directly.</p>
            <a
              className="primary"
              href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin)}`}
              download="nislen-menu-qr.png"
            >
              Download PNG
            </a>
          </section>
        )}
      </main>
      {editingProduct && (
        <ProductEditor
          product={editingProduct}
          categories={categories}
          close={() => setEditingProduct(null)}
        />
      )}{' '}
      {editingCategory && (
        <CategoryEditor
          category={editingCategory}
          close={() => setEditingCategory(null)}
        />
      )}
    </>
  )
}
function Modal({
  children,
  close
}: {
  children: React.ReactNode
  close: () => void
}) {
  return (
    <div className="modal">
      <div className="modal-card">
        <button
          className="icon-button absolute right-4 top-4"
          onClick={close}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
function ProductEditor({
  product,
  categories,
  close
}: {
  product: Product
  categories: Category[]
  close: () => void
}) {
  const [value, setValue] = useState(product)
  const [busy, setBusy] = useState(false)
  async function file(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setBusy(true)
    try {
      const image = await uploadImage(f)
      setValue((v) => ({ ...v, image }))
    } finally {
      setBusy(false)
    }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    await saveProduct(value)
    close()
  }
  return (
    <Modal close={close}>
      <h2 className="font-display text-3xl">
        {product.id ? 'Edit' : 'New'} product
      </h2>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          required
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          placeholder="Name"
        />
        <textarea
          required
          value={value.description}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
          placeholder="Description"
        />
        <input
          required
          min="0"
          step="0.01"
          type="number"
          value={value.price}
          onChange={(e) => setValue({ ...value, price: +e.target.value })}
          placeholder="Price"
        />
        <select
          value={value.categoryId}
          onChange={(e) => setValue({ ...value, categoryId: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="upload">
          <ImageUp size={17} /> {busy ? 'Uploading…' : 'Upload image'}
          <input type="file" accept="image/*" onChange={file} />
        </label>
        <button disabled={busy} className="primary w-full">
          Save product
        </button>
      </form>
    </Modal>
  )
}
function CategoryEditor({
  category,
  close
}: {
  category: Category
  close: () => void
}) {
  const [value, setValue] = useState(category)
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    await saveCategory(value)
    close()
  }
  return (
    <Modal close={close}>
      <h2 className="font-display text-3xl">
        {category.id ? 'Edit' : 'New'} category
      </h2>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          required
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          placeholder="Name"
        />
        <textarea
          value={value.description || ''}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
          placeholder="Description"
        />
        <input
          required
          type="number"
          value={value.order}
          onChange={(e) => setValue({ ...value, order: +e.target.value })}
          placeholder="Display order"
        />
        <button className="primary w-full">Save category</button>
      </form>
    </Modal>
  )
}
export default function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string>()
  useEffect(() => subscribeMenu(setCategories, setProducts, setError), [])
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomerMenu
            categories={categories}
            products={products}
            loading={!products.length && !error}
            error={error}
          />
        }
      />
      <Route
        path="/product/:id"
        element={
          <CustomerDetail
            products={products}
            loading={!products.length && !error}
          />
        }
      />
      <Route
        path="/admin"
        element={<AdvancedAdmin categories={categories} products={products} />}
      />
      <Route path="/tables" element={<TablePage />} />
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/operations" element={<OperationsPage />} />
      <Route path="/restaurant-admin" element={<RestaurantAdminPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
