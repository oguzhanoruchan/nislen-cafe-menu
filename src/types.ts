export type Category = {
  id: string
  name: string
  description?: string
  order: number
}
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
}
