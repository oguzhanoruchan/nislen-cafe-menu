import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatters'

describe('formatCurrency', () => {
  it('formats US dollars for display', () => {
    expect(formatCurrency(4.5)).toBe('$4.50')
  })

  it('supports alternate locales', () => {
    expect(formatCurrency(12.3, 'tr-TR')).toBe('₺12,30')
  })
})
