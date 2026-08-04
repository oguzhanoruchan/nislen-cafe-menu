export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

export interface RestaurantTable {
  id: string
  label: string
  status: TableStatus
  seats: number
  qrCode: string
}

export interface WaiterCall {
  id: string
  tableId: string
  createdAt: string
  resolved: boolean
}

export interface Reservation {
  id: string
  name: string
  partySize: number
  time: string
  notes?: string
}

export interface RestaurantContactInfo {
  address: string
  phone: string
  email: string
  mapsUrl: string
  whatsappUrl: string
  instagramUrl: string
}

export interface RestaurantHours {
  day: string
  hours: string
}

export interface FeedbackEntry {
  id: string
  name: string
  note: string
  rating: number
  createdAt: string
}

export function createInitialTables(): RestaurantTable[] {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `table-${index + 1}`,
    label: `Table ${index + 1}`,
    status: index % 3 === 0 ? 'available' : index % 3 === 1 ? 'occupied' : 'reserved',
    seats: index % 2 === 0 ? 2 : 4,
    qrCode: `table-${index + 1}`
  }))
}

export function buildTableQrUrl(baseUrl: string, tableId: string): string {
  return `${baseUrl.replace(/\/$/, '')}/table/${tableId}`
}

export function getTableStatusLabel(status: TableStatus): string {
  return {
    available: 'Available',
    occupied: 'Occupied',
    reserved: 'Reserved',
    cleaning: 'Cleaning'
  }[status]
}

export function calculateWaiterAlertCount(calls: WaiterCall[]): number {
  return calls.filter((call) => !call.resolved).length
}

export function createReservationSummary(reservation: Pick<Reservation, 'name' | 'partySize' | 'time'>): string {
  return `${reservation.name} · ${reservation.partySize} guests · ${reservation.time}`
}

export function getDefaultContactInfo(): RestaurantContactInfo {
  return {
    address: 'Beyoğlu, İstanbul',
    phone: '+90 212 555 01 01',
    email: 'hello@nislen.cafe',
    mapsUrl: 'https://maps.google.com/?q=Nislen+Caf%C3%A9+Istanbul',
    whatsappUrl: 'https://wa.me/902125550101',
    instagramUrl: 'https://www.instagram.com/nislen.cafe/'
  }
}

export function getDefaultHours(): RestaurantHours[] {
  return [
    { day: 'Monday', hours: '08:00 – 22:00' },
    { day: 'Tuesday', hours: '08:00 – 22:00' },
    { day: 'Wednesday', hours: '08:00 – 22:00' },
    { day: 'Thursday', hours: '08:00 – 22:00' },
    { day: 'Friday', hours: '08:00 – 23:00' },
    { day: 'Saturday', hours: '09:00 – 23:00' },
    { day: 'Sunday', hours: '09:00 – 21:00' }
  ]
}

export function createFeedbackEntry(input: Omit<FeedbackEntry, 'id' | 'createdAt'>): FeedbackEntry {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input
  }
}
