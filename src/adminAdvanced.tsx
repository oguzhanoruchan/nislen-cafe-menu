import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import * as XLSX from 'xlsx'
import {
  Activity,
  ArrowUpFromLine,
  BarChart3,
  Check,
  ChevronDown,
  Download,
  ImagePlus,
  LayoutDashboard,
  Megaphone,
  Package,
  Palette,
  Plus,
  QrCode,
  Settings2,
  ShieldCheck,
  Tags,
  Trash2,
  Upload,
  Users,
  X
} from 'lucide-react'
import type { Category, Product } from './types'
import {
  removeCategory,
  removeProduct,
  saveCategory,
  saveProduct,
  uploadImage
} from './menuService'

type Tab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'campaigns'
  | 'appearance'
  | 'qr'
  | 'settings'
  | 'users'
  | 'activity'
type Campaign = {
  id: string
  title: string
  subtitle: string
  active: boolean
  tone: string
}
type Toast = { message: string; kind: 'success' | 'error' }
const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'qr', label: 'QR & sharing', icon: QrCode },
  { id: 'settings', label: 'Business settings', icon: Settings2 },
  { id: 'users', label: 'Team access', icon: Users },
  { id: 'activity', label: 'Activity log', icon: Activity }
]
const getStore = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T
  } catch {
    return fallback
  }
}
function money(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(n)
}
function Dialog({
  children,
  close
}: {
  children: React.ReactNode
  close: () => void
}) {
  return (
    <div className="admin-dialog">
      <div className="admin-dialog-card">
        <button className="admin-close" onClick={close} aria-label="Close">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
function ProductForm({
  product,
  categories,
  close,
  notify
}: {
  product?: Product
  categories: Category[]
  close: () => void
  notify: (m: string, k?: Toast['kind']) => void
}) {
  const [value, setValue] = useState<Product>(
    product || {
      id: '',
      name: '',
      description: '',
      price: 0,
      categoryId: categories[0]?.id || '',
      available: true
    }
  )
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (
      value.name.trim().length < 2 ||
      value.description.trim().length < 8 ||
      value.price <= 0 ||
      !value.categoryId
    )
      return setError(
        'Add a name, an 8-character description, a price, and a category.'
      )
    await saveProduct(value)
    notify(`${value.name} saved`)
    close()
  }
  async function image(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const image = await uploadImage(file)
      setValue((v) => ({ ...v, image }))
      notify('Image uploaded')
    } catch {
      notify('Image upload needs Firebase Storage configuration.', 'error')
    } finally {
      setBusy(false)
    }
  }
  return (
    <Dialog close={close}>
      <h2>{product ? 'Edit product' : 'Create product'}</h2>
      <p className="form-lead">
        Keep each menu item clear, useful, and ready to sell.
      </p>
      <form className="admin-form" onSubmit={save}>
        <label>
          Name
          <input
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            placeholder="e.g. Iced latte"
          />
        </label>
        <label>
          Description
          <textarea
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
            placeholder="Tell guests what makes it special"
          />
        </label>
        <div className="form-grid">
          <label>
            Price
            <input
              type="number"
              step="0.01"
              min="0"
              value={value.price || ''}
              onChange={(e) => setValue({ ...value, price: +e.target.value })}
            />
          </label>
          <label>
            Category
            <select
              value={value.categoryId}
              onChange={(e) =>
                setValue({ ...value, categoryId: e.target.value })
              }
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-grid">
          <label>
            Badge
            <select
              value={value.badge || ''}
              onChange={(e) =>
                setValue({
                  ...value,
                  badge: (e.target.value || undefined) as Product['badge']
                })
              }
            >
              <option value="">None</option>
              <option value="new">New</option>
              <option value="popular">Popular</option>
              <option value="discount">Discount</option>
            </select>
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={value.available !== false}
              onChange={(e) =>
                setValue({ ...value, available: e.target.checked })
              }
            />{' '}
            Available today
          </label>
        </div>
        <label className="upload-drop">
          <ImagePlus size={18} />
          {busy
            ? 'Uploading…'
            : value.image
              ? 'Replace product image'
              : 'Upload product image'}
          <input type="file" accept="image/*" onChange={image} />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="admin-primary" disabled={busy}>
          <Check size={17} />
          Save product
        </button>
      </form>
    </Dialog>
  )
}
export default function AdvancedAdmin({
  categories,
  products
}: {
  categories: Category[]
  products: Product[]
}) {
  const [tab, setTab] = useState<Tab>('overview')
  const [editing, setEditing] = useState<Product>()
  const [toast, setToast] = useState<Toast>()
  const [campaigns, setCampaigns] = useState<Campaign[]>(() =>
    getStore('nislen-campaigns', [
      {
        id: 'morning',
        title: 'Morning ritual',
        subtitle: 'Coffee & pastry before 11',
        active: true,
        tone: 'amber'
      }
    ])
  )
  const [brand, setBrand] = useState(() =>
    getStore('nislen-brand', { name: 'Nislen', accent: '#d96d49', logo: '' })
  )
  const [business, setBusiness] = useState(() =>
    getStore('nislen-business', {
      name: 'Nislen Café',
      phone: '+90 212 555 01 01',
      address: 'Beyoğlu, İstanbul',
      hours: 'Mon–Sun · 08:00–22:00'
    })
  )
  const [logs, setLogs] = useState<string[]>(() =>
    getStore('nislen-log', ['Menu dashboard opened'])
  )
  const notify = (message: string, kind: Toast['kind'] = 'success') => {
    setToast({ message, kind })
    setTimeout(() => setToast(undefined), 3000)
  }
  const log = (message: string) => {
    const next = [
      `${new Date().toLocaleTimeString()} — ${message}`,
      ...logs
    ].slice(0, 20)
    setLogs(next)
    localStorage.setItem('nislen-log', JSON.stringify(next))
  }
  const persistCampaigns = (v: Campaign[]) => {
    setCampaigns(v)
    localStorage.setItem('nislen-campaigns', JSON.stringify(v))
  }
  const saveBusiness = () => {
    localStorage.setItem('nislen-business', JSON.stringify(business))
    notify('Business settings saved')
    log('Updated business settings')
  }
  const stats = useMemo(
    () => ({
      active: products.filter((p) => p.available !== false).length,
      featured: products.filter((p) => p.featured).length,
      categories: categories.length,
      avg: products.length
        ? products.reduce((x, p) => x + p.price, 0) / products.length
        : 0
    }),
    [products, categories]
  )
  async function deleteProduct(p: Product) {
    if (confirm(`Remove ${p.name}?`)) {
      await removeProduct(p.id)
      notify(`${p.name} removed`)
      log(`Removed ${p.name}`)
    }
  }
  async function sortCategory(source: string, target: string) {
    const list = [...categories]
    const from = list.findIndex((x) => x.id === source),
      to = list.findIndex((x) => x.id === target)
    if (from < 0 || to < 0 || from === to) return
    const [item] = list.splice(from, 1)
    list.splice(to, 0, item)
    await Promise.all(list.map((c, i) => saveCategory({ ...c, order: i + 1 })))
    notify('Category order updated')
    log('Reordered categories')
  }
  async function bulkImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    try {
      await Promise.all(
        files.map(async (file) => {
          const image = await uploadImage(file)
          const match = products.find((p) =>
            file.name.toLowerCase().startsWith(p.id)
          )
          if (match) await saveProduct({ ...match, image })
        })
      )
      notify(`${files.length} images processed`)
      log(`Bulk uploaded ${files.length} images`)
    } catch {
      notify('Bulk upload needs Firebase Storage configuration.', 'error')
    }
  }
  function exportMenu() {
    const rows = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
      available: p.available !== false,
      badge: p.badge || ''
    }))
    const sheet = XLSX.utils.json_to_sheet(rows)
    const book = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(book, sheet, 'Products')
    XLSX.writeFile(book, 'nislen-menu.xlsx')
    notify('Excel export downloaded')
  }
  async function importMenu(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await file.arrayBuffer()
      const sheet =
        XLSX.read(data).Sheets.Products ||
        XLSX.read(data).Sheets[XLSX.read(data).SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
      let imported = 0
      for (const row of rows) {
        const name = String(row.name || '').trim()
        const categoryId = String(row.categoryId || categories[0]?.id || '')
        const price = Number(row.price)
        if (name && categoryId && price > 0) {
          await saveProduct({
            id: String(row.id || ''),
            name,
            description: String(row.description || 'No description supplied.'),
            price,
            categoryId,
            available: row.available !== false,
            badge: (row.badge as Product['badge']) || undefined
          })
          imported++
        }
      }
      notify(`${imported} products imported`)
      log(`Imported ${imported} products`)
    } catch {
      notify('Could not read this CSV/Excel file.', 'error')
    }
  }
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-logo">
          {brand.logo ? <img src={brand.logo} alt="" /> : null}
          {brand.name}
          <span>.</span>
        </Link>
        <nav>
          {nav.map((n) => {
            const Icon = n.icon
            return (
              <button
                className={tab === n.id ? 'active' : ''}
                key={n.id}
                onClick={() => setTab(n.id)}
              >
                <Icon size={18} />
                {n.label}
              </button>
            )
          })}
        </nav>
        <Link to="/" className="admin-view-menu">
          View public menu ↗
        </Link>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>OPERATIONS CONSOLE</p>
            <h1>{nav.find((n) => n.id === tab)?.label}</h1>
          </div>
          <button
            className="admin-primary"
            onClick={() =>
              setEditing({
                id: '',
                name: '',
                description: '',
                price: 0,
                categoryId: categories[0]?.id || '',
                available: true
              })
            }
          >
            <Plus size={17} />
            New product
          </button>
        </header>
        {tab === 'overview' && (
          <Overview stats={stats} products={products} campaigns={campaigns} />
        )}{' '}
        {tab === 'products' && (
          <section>
            <div className="admin-section-bar">
              <div>
                <h2>Product catalogue</h2>
                <span>{products.length} items</span>
              </div>
              <div className="admin-actions">
                <button onClick={exportMenu}>
                  <Download size={16} />
                  Export Excel
                </button>
                <label>
                  <ArrowUpFromLine size={16} />
                  Import CSV / Excel
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={importMenu}
                  />
                </label>
                <label>
                  <ImagePlus size={16} />
                  Bulk images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={bulkImages}
                  />
                </label>
              </div>
            </div>
            <div className="admin-table">
              {products.map((p) => (
                <div key={p.id}>
                  <img
                    src={
                      p.image ||
                      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&q=70'
                    }
                    alt=""
                  />
                  <span>
                    <b>{p.name}</b>
                    <small>
                      {categories.find((c) => c.id === p.categoryId)?.name ||
                        'Uncategorized'}
                    </small>
                  </span>
                  <i
                    className={
                      p.available !== false ? 'status-on' : 'status-off'
                    }
                  >
                    {p.available !== false ? 'Live' : 'Hidden'}
                  </i>
                  <strong>{money(p.price)}</strong>
                  <button onClick={() => setEditing(p)}>Edit</button>
                  <button className="delete" onClick={() => deleteProduct(p)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {tab === 'categories' && (
          <section>
            <div className="admin-section-bar">
              <div>
                <h2>Category management</h2>
                <span>Drag categories to set display order</span>
              </div>
              <button
                className="admin-primary"
                onClick={() => {
                  const name = prompt('Category name')
                  if (name)
                    saveCategory({
                      id: '',
                      name,
                      order: categories.length + 1
                    }).then(() => notify('Category created'))
                }}
              >
                <Plus size={16} />
                Add category
              </button>
            </div>
            <div className="category-manager">
              {categories.map((c) => (
                <div
                  draggable
                  key={c.id}
                  onDragStart={(e) => e.dataTransfer.setData('category', c.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) =>
                    sortCategory(e.dataTransfer.getData('category'), c.id)
                  }
                >
                  <span className="drag-handle">⠿</span>
                  <div>
                    <b>{c.name}</b>
                    <small>{c.description || 'No description'}</small>
                  </div>
                  <button
                    className="delete"
                    onClick={() =>
                      removeCategory(c.id).then(() =>
                        notify(`${c.name} removed`)
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {tab === 'campaigns' && (
          <section>
            <div className="admin-section-bar">
              <div>
                <h2>Campaign manager</h2>
                <span>Control the promotions shown on the public menu</span>
              </div>
              <button
                className="admin-primary"
                onClick={() =>
                  persistCampaigns([
                    ...campaigns,
                    {
                      id: crypto.randomUUID(),
                      title: 'New campaign',
                      subtitle: 'Add campaign detail',
                      active: true,
                      tone: 'forest'
                    }
                  ])
                }
              >
                <Plus size={16} />
                Add campaign
              </button>
            </div>
            <div className="campaign-manager">
              {campaigns.map((c) => (
                <div key={c.id} className={`campaign-edit tone-${c.tone}`}>
                  <input
                    value={c.title}
                    onChange={(e) =>
                      persistCampaigns(
                        campaigns.map((x) =>
                          x.id === c.id ? { ...x, title: e.target.value } : x
                        )
                      )
                    }
                  />
                  <input
                    value={c.subtitle}
                    onChange={(e) =>
                      persistCampaigns(
                        campaigns.map((x) =>
                          x.id === c.id ? { ...x, subtitle: e.target.value } : x
                        )
                      )
                    }
                  />
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={c.active}
                      onChange={(e) =>
                        persistCampaigns(
                          campaigns.map((x) =>
                            x.id === c.id
                              ? { ...x, active: e.target.checked }
                              : x
                          )
                        )
                      }
                    />
                    <span />
                    Live
                  </label>
                  <button
                    className="delete"
                    onClick={() =>
                      persistCampaigns(campaigns.filter((x) => x.id !== c.id))
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        {tab === 'appearance' && (
          <section className="settings-card">
            <h2>Brand & theme</h2>
            <p>Customize the look guests see across the menu.</p>
            <label>
              Brand name
              <input
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              />
            </label>
            <label>
              Accent colour
              <input
                type="color"
                value={brand.accent}
                onChange={(e) => setBrand({ ...brand, accent: e.target.value })}
              />
            </label>
            <label className="upload-drop">
              <Upload size={18} />
              {brand.logo ? 'Replace logo' : 'Upload logo'}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) {
                    const r = new FileReader()
                    r.onload = () =>
                      setBrand({ ...brand, logo: String(r.result) })
                    r.readAsDataURL(f)
                  }
                }}
              />
            </label>
            <button
              className="admin-primary"
              onClick={() => {
                localStorage.setItem('nislen-brand', JSON.stringify(brand))
                document.documentElement.style.setProperty(
                  '--brand-accent',
                  brand.accent
                )
                notify('Brand theme saved')
                log('Updated brand theme')
              }}
            >
              Save appearance
            </button>
          </section>
        )}
        {tab === 'qr' && (
          <section className="qr-admin">
            <QRCodeSVG
              value={window.location.origin}
              size={200}
              includeMargin
            />
            <div>
              <h2>Menu QR management</h2>
              <p>
                Your guest-ready QR code always opens the current public menu.
              </p>
              <div className="admin-actions">
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(window.location.origin)
                      .then(() => notify('Menu link copied'))
                  }
                >
                  Copy menu link
                </button>
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin)}`}
                  download="nislen-menu-qr.png"
                >
                  <Download size={16} />
                  Download QR
                </a>
              </div>
            </div>
          </section>
        )}
        {tab === 'settings' && (
          <section className="settings-card">
            <h2>Business settings</h2>
            <p>
              These details help guests understand when and where to find you.
            </p>
            <label>
              Café name
              <input
                value={business.name}
                onChange={(e) =>
                  setBusiness({ ...business, name: e.target.value })
                }
              />
            </label>
            <label>
              Phone
              <input
                value={business.phone}
                onChange={(e) =>
                  setBusiness({ ...business, phone: e.target.value })
                }
              />
            </label>
            <label>
              Address
              <input
                value={business.address}
                onChange={(e) =>
                  setBusiness({ ...business, address: e.target.value })
                }
              />
            </label>
            <label>
              Hours
              <input
                value={business.hours}
                onChange={(e) =>
                  setBusiness({ ...business, hours: e.target.value })
                }
              />
            </label>
            <button className="admin-primary" onClick={saveBusiness}>
              Save business settings
            </button>
          </section>
        )}
        {tab === 'users' && (
          <section>
            <div className="admin-section-bar">
              <div>
                <h2>Team access</h2>
                <span>Manage people who can maintain your menu</span>
              </div>
              <button
                className="admin-primary"
                onClick={() =>
                  notify(
                    'Invite link copied. Connect Firebase Auth to send an email invite.'
                  )
                }
              >
                Invite user
              </button>
            </div>
            <div className="users-list">
              {[
                ['OA', 'Owner', 'Full access'],
                ['MS', 'Menu staff', 'Products & categories'],
                ['MK', 'Marketing', 'Campaigns only']
              ].map((u) => (
                <div key={u[1]}>
                  <span>{u[0]}</span>
                  <b>{u[1]}</b>
                  <small>{u[2]}</small>
                  <ShieldCheck size={18} />
                </div>
              ))}
            </div>
          </section>
        )}
        {tab === 'activity' && (
          <section>
            <div className="admin-section-bar">
              <div>
                <h2>Activity log</h2>
                <span>Recent changes in this browser session</span>
              </div>
              <button
                onClick={() => {
                  setLogs([])
                  localStorage.removeItem('nislen-log')
                  notify('Activity log cleared')
                }}
              >
                Clear log
              </button>
            </div>
            <div className="activity-list">
              {logs.map((l) => (
                <p key={l}>
                  <Activity size={15} />
                  {l}
                </p>
              ))}
              {!logs.length && <p>No activity recorded yet.</p>}
            </div>
          </section>
        )}
      </main>
      {editing && (
        <ProductForm
          product={editing.id ? editing : undefined}
          categories={categories}
          close={() => setEditing(undefined)}
          notify={notify}
        />
      )}{' '}
      {toast && (
        <div className={`toast ${toast.kind}`}>
          <Check size={17} />
          {toast.message}
        </div>
      )}
    </div>
  )
}
function Overview({
  stats,
  products,
  campaigns
}: {
  stats: { active: number; featured: number; categories: number; avg: number }
  products: Product[]
  campaigns: Campaign[]
}) {
  return (
    <>
      <section className="stat-grid">
        <div>
          <Package />
          <span>Live products</span>
          <strong>{stats.active}</strong>
          <small>of {products.length} total items</small>
        </div>
        <div>
          <BarChart3 />
          <span>Featured picks</span>
          <strong>{stats.featured}</strong>
          <small>showing on your menu</small>
        </div>
        <div>
          <Tags />
          <span>Categories</span>
          <strong>{stats.categories}</strong>
          <small>available to guests</small>
        </div>
        <div>
          <Megaphone />
          <span>Active campaigns</span>
          <strong>{campaigns.filter((c) => c.active).length}</strong>
          <small>{money(stats.avg)} average price</small>
        </div>
      </section>
      <section className="insight-card">
        <div>
          <p>MENU HEALTH</p>
          <h2>Your café menu looks polished.</h2>
          <span>
            Keep momentum: add a campaign or refresh a featured item this week.
          </span>
        </div>
        <div className="health-ring">
          82<small>/100</small>
        </div>
      </section>
      <section className="quick-start">
        <h2>Today’s checklist</h2>
        <div>
          <p>
            <Check /> Review sold-out items
          </p>
          <p>
            <Check /> Check campaign status
          </p>
          <p>
            <ChevronDown /> Upload fresh product photography
          </p>
        </div>
      </section>
    </>
  )
}
