/**
 * Formats currency values for the public menu and admin UI.
 * Uses a locale-aware formatter while keeping the app’s USD-based content consistent.
 */
export function formatCurrency(value: number, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale.startsWith('tr') ? 'TRY' : 'USD'
  }).format(value)
}
