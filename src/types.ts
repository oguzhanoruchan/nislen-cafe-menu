export type Category = {
  id: string
  name: string
  description?: string
  order: number
}
export type LocalizedText = Partial<Record<'en' | 'tr' | 'ru', string>>
export type Product = {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  image?: string
  featured?: boolean
  available?: boolean
  allergens?: string[]
  ingredients?: string[]
  gallery?: string[]
  badge?: 'new' | 'popular' | 'discount'
  discountPercent?: number
  bestSeller?: boolean
  nameTranslations?: LocalizedText
  descriptionTranslations?: LocalizedText
}
