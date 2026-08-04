import { describe, expect, it } from 'vitest'
import {
  buildTableQrUrl,
  calculateWaiterAlertCount,
  createInitialTables,
  createReservationSummary,
  getTableStatusLabel
} from './restaurant'

describe('restaurant helpers', () => {
  it('creates a default table set with readable labels and unique ids', () => {
    const tables = createInitialTables()

    expect(tables).toHaveLength(8)
    expect(tables[0].label).toBe('Table 1')
    expect(new Set(tables.map((table) => table.id)).size).toBe(tables.length)
  })

  it('builds a table-specific QR link for guest access', () => {
    expect(buildTableQrUrl('https://nislen.example', 'table-2')).toBe(
      'https://nislen.example/table/table-2'
    )
  })

  it('returns friendly labels for table states', () => {
    expect(getTableStatusLabel('occupied')).toBe('Occupied')
    expect(getTableStatusLabel('reserved')).toBe('Reserved')
  })

  it('counts active waiter alerts and formats reservation summaries', () => {
    const calls = [
      { id: '1', tableId: 'table-1', createdAt: '2024-01-02T19:00:00Z', resolved: false },
      { id: '2', tableId: 'table-2', createdAt: '2024-01-02T19:15:00Z', resolved: true }
    ]

    expect(calculateWaiterAlertCount(calls)).toBe(1)
    expect(createReservationSummary({ name: 'Ada', partySize: 4, time: '19:30' })).toBe(
      'Ada · 4 guests · 19:30'
    )
  })
})
