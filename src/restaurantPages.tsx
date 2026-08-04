import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowRight,
  Clock3,
  Compass,
  HeartHandshake,
  Instagram,
  MapPin,
  MessageCircleMore,
  Phone,
  Plus,
  QrCode,
  Sparkles,
  Star,
  Store,
  Users,
  UtensilsCrossed
} from 'lucide-react'
import {
  buildTableQrUrl,
  calculateWaiterAlertCount,
  createFeedbackEntry,
  createInitialTables,
  createReservationSummary,
  getDefaultContactInfo,
  getDefaultHours,
  getTableStatusLabel,
  type FeedbackEntry,
  type Reservation,
  type RestaurantContactInfo,
  type RestaurantHours,
  type RestaurantTable,
  type TableStatus,
  type WaiterCall
} from './restaurant'

function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return fallback
    try {
      return JSON.parse(window.localStorage.getItem(key) || 'null') ?? fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue] as const
}

function Shell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_55%)] bg-cream text-stone-900 dark:bg-zinc-950 dark:text-stone-100">
      <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-2xl font-bold text-forest dark:text-emerald-300">
            nislen<span className="text-terracotta">.</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 dark:hover:bg-white/10" to="/tables">
              Tables
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 dark:hover:bg-white/10" to="/reservations">
              Reservations
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 dark:hover:bg-white/10" to="/contact">
              Contact
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 dark:hover:bg-white/10" to="/feedback">
              Feedback
            </Link>
            <Link className="rounded-full bg-forest px-3 py-2 text-white" to="/operations">
              Operations
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section className="mb-8 rounded-[2rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-terracotta">Restaurant management</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-300">{subtitle}</p>
        </section>
        {children}
      </main>
    </div>
  )
}

export function TablePage() {
  const [tables, setTables] = usePersistentState<RestaurantTable[]>('nislen-tables', createInitialTables())
  const [calls, setCalls] = usePersistentState<WaiterCall[]>('nislen-waiter-calls', [])
  const pendingCalls = useMemo(() => calculateWaiterAlertCount(calls), [calls])

  const callWaiter = (tableId: string) => {
    setCalls((value) => [
      ...value,
      {
        id: crypto.randomUUID(),
        tableId,
        createdAt: new Date().toISOString(),
        resolved: false
      }
    ])
  }

  const changeStatus = (tableId: string, nextStatus: TableStatus) => {
    setTables((value) => value.map((table) => (table.id === tableId ? { ...table, status: nextStatus } : table)))
  }

  return (
    <Shell
      title="Table operations"
      subtitle="Every table includes a QR code, clear status, and a one-tap waiter call experience for a smoother service flow."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl">Live table map</h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Track occupancy and share each table’s QR code instantly.</p>
            </div>
            <span className="rounded-full bg-forest/10 px-3 py-1 text-sm font-semibold text-forest dark:bg-emerald-400/10 dark:text-emerald-300">
              {pendingCalls} active calls
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tables.map((table) => (
              <article key={table.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{table.label}</p>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{table.seats} seats</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${table.status === 'available' ? 'bg-emerald-100 text-emerald-700' : table.status === 'occupied' ? 'bg-amber-100 text-amber-700' : table.status === 'reserved' ? 'bg-sky-100 text-sky-700' : 'bg-stone-200 text-stone-700'}`}>
                    {getTableStatusLabel(table.status)}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <label className="flex-1 text-xs font-semibold text-stone-500">
                    Status
                    <select className="mt-1" value={table.status} onChange={(event) => changeStatus(table.id, event.target.value as TableStatus)}>
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="reserved">Reserved</option>
                      <option value="cleaning">Cleaning</option>
                    </select>
                  </label>
                  <button className="rounded-xl bg-forest px-3 py-2 text-sm font-semibold text-white" onClick={() => callWaiter(table.id)}>
                    Call waiter
                  </button>
                </div>
                <div className="mt-4 rounded-xl border border-dashed border-stone-300 p-3 text-center dark:border-white/10">
                  <QRCodeSVG value={buildTableQrUrl(typeof window !== 'undefined' ? window.location.origin : 'https://nislen.cafe', table.qrCode)} size={120} includeMargin />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">QR code for {table.label}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2 text-terracotta">
              <QrCode size={18} />
              <h2 className="font-display text-2xl">Guest QR flow</h2>
            </div>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">Every table sends guests to the right page with ordering, reservations, and service requests built in.</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-300">
              <li>• Scan to view the menu and current table.</li>
              <li>• Trigger waiter support in one tap.</li>
              <li>• Open reservation and contact options instantly.</li>
            </ul>
          </section>
          <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2 text-forest">
              <Sparkles size={18} />
              <h2 className="font-display text-2xl">Smart operations</h2>
            </div>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">The service layer is ready for future ordering and kitchen-display integrations without changing the guest experience.</p>
          </section>
        </aside>
      </div>
    </Shell>
  )
}

export function ReservationPage() {
  const [reservations, setReservations] = usePersistentState<Reservation[]>('nislen-reservations', [])
  const [form, setForm] = useState({ name: '', partySize: '2', time: '', notes: '' })

  const submitReservation = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.time) return
    setReservations((value) => [
      ...value,
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        partySize: Number(form.partySize),
        time: form.time,
        notes: form.notes.trim() || undefined
      }
    ])
    setForm({ name: '', partySize: '2', time: '', notes: '' })
  }

  return (
    <Shell
      title="Reservations"
      subtitle="Let guests book a table in advance with clear confirmation details for staff and a polished booking experience."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-2xl">Reserve a table</h2>
          <form className="mt-5 grid gap-4" onSubmit={submitReservation}>
            <label className="text-sm font-semibold">
              Guest name
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Ada Lovelace" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Party size
                <select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: event.target.value })}>
                  {[2, 4, 6, 8].map((count) => (
                    <option key={count} value={count}>{count} guests</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Preferred time
                <input required type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} />
              </label>
            </div>
            <label className="text-sm font-semibold">
              Notes
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Window seat, birthday, allergy request..." />
            </label>
            <button className="primary w-fit" type="submit">
              <Plus size={17} /> Save reservation
            </button>
          </form>
        </section>
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl">Upcoming bookings</h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Everything is stored locally and ready for team handoff.</p>
            </div>
            <span className="rounded-full bg-forest/10 px-3 py-1 text-sm font-semibold text-forest dark:bg-emerald-400/10 dark:text-emerald-300">
              {reservations.length} bookings
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {reservations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-white/10">No reservations yet. Add the first booking to see it appear here.</div>
            ) : (
              reservations.map((reservation) => (
                <div key={reservation.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{reservation.name}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{createReservationSummary(reservation)}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1 text-sm text-forest dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Users size={15} /> {reservation.partySize}
                    </div>
                  </div>
                  {reservation.notes ? <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{reservation.notes}</p> : null}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Shell>
  )
}

export function ContactPage() {
  const [contactInfo] = usePersistentState<RestaurantContactInfo>('nislen-contact', getDefaultContactInfo())
  const [hours] = usePersistentState<RestaurantHours[]>('nislen-hours', getDefaultHours())

  return (
    <Shell
      title="Contact & visit"
      subtitle="Guests can instantly reach the venue through Google Maps, WhatsApp, and Instagram while viewing opening hours."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-2xl">How to reach us</h2>
          <div className="mt-5 space-y-3">
            <a className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-700 dark:border-white/10 dark:bg-zinc-900/70 dark:text-stone-200" href={contactInfo.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} /> {contactInfo.address}
            </a>
            <a className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-700 dark:border-white/10 dark:bg-zinc-900/70 dark:text-stone-200" href={`tel:${contactInfo.phone}`}>
              <Phone size={18} /> {contactInfo.phone}
            </a>
            <a className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-700 dark:border-white/10 dark:bg-zinc-900/70 dark:text-stone-200" href={`mailto:${contactInfo.email}`}>
              <MessageCircleMore size={18} /> {contactInfo.email}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="primary" href={contactInfo.mapsUrl} target="_blank" rel="noreferrer">
              <Compass size={17} /> Open in Google Maps
            </a>
            <a className="secondary" href={contactInfo.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircleMore size={17} /> WhatsApp
            </a>
            <a className="secondary" href={contactInfo.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={17} /> Instagram
            </a>
          </div>
        </section>
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-terracotta">
            <Clock3 size={18} />
            <h2 className="font-display text-2xl">Opening hours</h2>
          </div>
          <div className="mt-5 space-y-3">
            {hours.map((entry) => (
              <div key={entry.day} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-zinc-900/70">
                <span className="font-semibold">{entry.day}</span>
                <span className="text-stone-600 dark:text-stone-300">{entry.hours}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  )
}

export function FeedbackPage() {
  const [feedback, setFeedback] = usePersistentState<FeedbackEntry[]>('nislen-feedback', [])
  const [form, setForm] = useState({ name: '', note: '', rating: '5' })

  const submitFeedback = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.note.trim()) return
    setFeedback((value) => [createFeedbackEntry({ name: form.name.trim(), note: form.note.trim(), rating: Number(form.rating) }), ...value].slice(0, 10))
    setForm({ name: '', note: '', rating: '5' })
  }

  return (
    <Shell
      title="Customer feedback"
      subtitle="Gather guest sentiment at the point of service and keep your café improving with every visit."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-2xl">Leave a review</h2>
          <form className="mt-5 grid gap-4" onSubmit={submitFeedback}>
            <label className="text-sm font-semibold">
              Your name
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="A guest" />
            </label>
            <label className="text-sm font-semibold">
              Rating
              <select value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>{rating} star{rating > 1 ? 's' : ''}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Notes
              <textarea required value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Tell us about your experience, service, or favourite item." />
            </label>
            <button className="primary w-fit" type="submit">
              <HeartHandshake size={17} /> Send feedback
            </button>
          </form>
        </section>
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl">Recent sentiment</h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">A simple lived-in feedback loop you can review at a glance.</p>
            </div>
            <span className="rounded-full bg-forest/10 px-3 py-1 text-sm font-semibold text-forest dark:bg-emerald-400/10 dark:text-emerald-300">
              {feedback.length} entries
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {feedback.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-white/10">No feedback yet. Encourage guests to share their experience after a meal.</div>
            ) : (
              feedback.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{entry.note}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: entry.rating }).map((_, index) => <Star key={`${entry.id}-${index}`} size={16} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Shell>
  )
}

export function OperationsPage() {
  return (
    <Shell
      title="Ordering & kitchen architecture"
      subtitle="A production-ready blueprint for connecting table service, ordering, and kitchen display workflows without breaking the experience."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-forest">
            <Store size={18} />
            <h2 className="font-display text-2xl">Ordering architecture</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ['1. Guest scan', 'Guests open the table QR code and browse the current menu from their phone.'],
              ['2. Order capture', 'The order is captured with table context, notes, and payment intent.'],
              ['3. Live routing', 'The order queue is sent to the kitchen and bar in real time.'],
              ['4. Fulfilment', 'The kitchen display marks progress from queued to preparing to ready.']
            ].map(([step, description]) => (
              <div key={step} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                <p className="font-semibold">{step}</p>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-terracotta">
            <UtensilsCrossed size={18} />
            <h2 className="font-display text-2xl">Kitchen display</h2>
          </div>
          <div className="mt-5 space-y-3">
            {[
              'Queue all new orders by table and priority.',
              'Show preparation timing, modifiers, and allergen notes.',
              'Emit clear ready and served states to the floor team.',
              'Use the same workflow for pickup, delivery, and dine-in.'
            ].map((detail) => (
              <div key={detail} className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600 dark:border-white/10 dark:bg-zinc-900/70 dark:text-stone-300">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-forest" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  )
}

export function RestaurantAdminPanel() {
  const [tables, setTables] = usePersistentState<RestaurantTable[]>('nislen-tables', createInitialTables())
  const [calls, setCalls] = usePersistentState<WaiterCall[]>('nislen-waiter-calls', [])
  const [reservations] = usePersistentState<Reservation[]>('nislen-reservations', [])
  const [feedback] = usePersistentState<FeedbackEntry[]>('nislen-feedback', [])
  const [contactInfo, setContactInfo] = usePersistentState<RestaurantContactInfo>('nislen-contact', getDefaultContactInfo())
  const [hours, setHours] = usePersistentState<RestaurantHours[]>('nislen-hours', getDefaultHours())

  const resolveCall = (id: string) => {
    setCalls((value) => value.map((call) => (call.id === id ? { ...call, resolved: true } : call)))
  }

  const updateTableStatus = (tableId: string, nextStatus: TableStatus) => {
    setTables((value) => value.map((table) => (table.id === tableId ? { ...table, status: nextStatus } : table)))
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl">Table management</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Keep every station aligned with live service status and QR access.</p>
          </div>
          <span className="rounded-full bg-forest/10 px-3 py-1 text-sm font-semibold text-forest dark:bg-emerald-400/10 dark:text-emerald-300">
            {tables.length} tables
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tables.map((table) => (
            <div key={table.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{table.label}</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{table.seats} seats</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${table.status === 'available' ? 'bg-emerald-100 text-emerald-700' : table.status === 'occupied' ? 'bg-amber-100 text-amber-700' : table.status === 'reserved' ? 'bg-sky-100 text-sky-700' : 'bg-stone-200 text-stone-700'}`}>
                  {getTableStatusLabel(table.status)}
                </span>
              </div>
              <select className="mt-4" value={table.status} onChange={(event) => updateTableStatus(table.id, event.target.value as TableStatus)}>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="cleaning">Cleaning</option>
              </select>
              <div className="mt-4 rounded-xl border border-dashed border-stone-300 p-3 text-center dark:border-white/10">
                <QRCodeSVG value={buildTableQrUrl(typeof window !== 'undefined' ? window.location.origin : 'https://nislen.cafe', table.qrCode)} size={100} includeMargin />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl">Waiter call system</h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Pending requests stay visible until staff clears them.</p>
            </div>
            <span className="rounded-full bg-terracotta/10 px-3 py-1 text-sm font-semibold text-terracotta">
              {calculateWaiterAlertCount(calls)} pending
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {calls.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-white/10">No waiter requests yet.</div>
            ) : (
              calls.map((call) => (
                <div key={call.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                  <div>
                    <p className="font-semibold">{tables.find((table) => table.id === call.tableId)?.label || 'Unknown table'}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{new Date(call.createdAt).toLocaleString()}</p>
                  </div>
                  {!call.resolved ? (
                    <button className="rounded-xl bg-forest px-3 py-2 text-sm font-semibold text-white" onClick={() => resolveCall(call.id)}>
                      Resolve
                    </button>
                  ) : (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Resolved</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="font-display text-2xl">Reservation overview</h2>
            <div className="mt-5 space-y-3">
              {reservations.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 p-4 text-sm text-stone-500 dark:border-white/10">No reservations captured yet.</div>
              ) : (
                reservations.map((reservation) => (
                  <div key={reservation.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                    <p className="font-semibold">{reservation.name}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{createReservationSummary(reservation)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="font-display text-2xl">Customer feedback</h2>
            <div className="mt-5 space-y-3">
              {feedback.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 p-4 text-sm text-stone-500 dark:border-white/10">Feedback will appear here as guests leave reviews.</div>
              ) : (
                feedback.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-zinc-900/70">
                    <p className="font-semibold">{entry.name}</p>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{entry.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-2xl">Contact details</h2>
          <div className="mt-5 space-y-3">
            <label className="text-sm font-semibold">
              Address
              <input value={contactInfo.address} onChange={(event) => setContactInfo({ ...contactInfo, address: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">
              Phone
              <input value={contactInfo.phone} onChange={(event) => setContactInfo({ ...contactInfo, phone: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">
              Email
              <input value={contactInfo.email} onChange={(event) => setContactInfo({ ...contactInfo, email: event.target.value })} />
            </label>
          </div>
        </div>
        <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-2xl">Opening hours</h2>
          <div className="mt-5 space-y-3">
            {hours.map((entry) => (
              <label key={entry.day} className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>{entry.day}</span>
                <input value={entry.hours} onChange={(event) => setHours((value) => value.map((item) => (item.day === entry.day ? { ...item, hours: event.target.value } : item)))} />
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
