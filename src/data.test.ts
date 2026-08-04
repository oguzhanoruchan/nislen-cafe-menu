import { describe, expect, it } from 'vitest'
import { categories, products } from './data'

describe('demo menu', () => {
  it('assigns each product to a category', () => {
    const ids = new Set(categories.map((category) => category.id))
    expect(products.every((product) => ids.has(product.categoryId))).toBe(true)
  })
})
