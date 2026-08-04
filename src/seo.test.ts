import { describe, expect, it } from 'vitest'
import { buildStructuredData, siteMetadata } from './seo'

describe('SEO helpers', () => {
  it('exposes site metadata and restaurant schema', () => {
    expect(siteMetadata.title).toContain('Nislen')
    const schema = buildStructuredData()
    expect(schema['@type']).toBe('Restaurant')
    expect(schema.name).toBe('Nislen Café')
  })
})
