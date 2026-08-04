import type { Category, Product } from './types'
export const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Expertly brewed, always fresh',
    order: 1
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'A bright start to your day',
    order: 2
  },
  { id: 'sweets', name: 'Sweets', description: 'Made in our kitchen', order: 3 }
]
export const products: Product[] = [
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Double ristretto with velvety steamed milk.',
    price: 4.5,
    categoryId: 'coffee',
    featured: true,
    allergens: ['Milk']
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours; smooth and chocolatey.',
    price: 5,
    categoryId: 'coffee',
    featured: true
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avocado, herbs, chilli and lemon.',
    price: 9.5,
    categoryId: 'breakfast',
    featured: true,
    allergens: ['Gluten']
  },
  {
    id: 'granola-bowl',
    name: 'Granola Bowl',
    description: 'House granola, seasonal fruit and coconut yoghurt.',
    price: 8,
    categoryId: 'breakfast'
  },
  {
    id: 'lemon-cake',
    name: 'Lemon Olive Oil Cake',
    description: 'Tender citrus cake with a bright lemon glaze.',
    price: 5.5,
    categoryId: 'sweets',
    allergens: ['Gluten', 'Eggs']
  }
]
