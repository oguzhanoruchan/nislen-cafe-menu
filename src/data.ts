import type { Category, Product } from './types'

export const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    description: '',
    order: 1
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: '',
    order: 2
  },
  {
    id: 'sweets',
    name: 'Sweets',
    description: '',
    order: 3
  }
]

export const products: Product[] = [
  {
    id: 'flat-white',
    name: 'Flat White',
    description: '',
    price: 4.5,
    categoryId: 'coffee',
    image: '',
    featured: false,
    available: true
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: '',
    price: 5,
    categoryId: 'coffee',
    image: '',
    featured: false,
    available: true
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: '',
    price: 9.5,
    categoryId: 'breakfast',
    image: '',
    featured: false,
    available: true
  },
  {
    id: 'granola-bowl',
    name: 'Granola Bowl',
    description: '',
    price: 8,
    categoryId: 'breakfast',
    image: '',
    featured: false,
    available: true
  },
  {
    id: 'lemon-cake',
    name: 'Lemon Olive Oil Cake',
    description: '',
    price: 5.5,
    categoryId: 'sweets',
    image: '',
    featured: false,
    available: true
  }
]
