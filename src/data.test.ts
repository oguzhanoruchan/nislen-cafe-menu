import { describe, expect, it } from 'vitest'
import { categories, products } from './data'
import { normalizeStoredArray } from './menuService'

describe('demo menu', () => {
  it('assigns each product to a category', () => {
    const ids = new Set(categories.map((category) => category.id))
    expect(products.every((product) => ids.has(product.categoryId))).toBe(true)
  })

  it('includes the full Turkish breakfast menu structure', () => {
    const categoryIds = categories.map((category) => category.id)
    expect(categoryIds).toEqual(expect.arrayContaining(['kahvalti', 'tostlar', 'gozlemeler']))
    expect(categoryIds).toEqual(expect.arrayContaining(['limonatalar', 'milkshake', 'frozen', 'mojito', 'kutu-icecekler', 'nargile']))

    const kahvaltiProducts = products.filter((product) => product.categoryId === 'kahvalti')
    expect(kahvaltiProducts.length).toBeGreaterThan(0)
    expect(kahvaltiProducts.every((product) => product.description === '')).toBe(true)
    expect(kahvaltiProducts.every((product) => product.image === '')).toBe(true)
    expect(kahvaltiProducts.every((product) => product.available === true)).toBe(true)
    expect(kahvaltiProducts.every((product) => product.featured === false)).toBe(true)
  })

  it('falls back to the demo menu when stored data is malformed', () => {
    expect(normalizeStoredArray({} as never)).toEqual([])
  })
})
