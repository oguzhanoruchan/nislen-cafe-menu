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
    bestSeller: true,
    badge: 'popular',
    allergens: ['Milk'],
    ingredients: ['Double ristretto', 'Whole milk'],
    image:
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
    ],
    nameTranslations: { tr: 'Flat White', ru: 'Флэт уайт' },
    descriptionTranslations: {
      tr: 'Kadifemsi sütle çift ristretto.',
      ru: 'Двойной ристретто с бархатистым молоком.'
    }
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours; smooth and chocolatey.',
    price: 5,
    categoryId: 'coffee',
    featured: true,
    badge: 'new',
    ingredients: ['Single-origin coffee', 'Filtered water'],
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    nameTranslations: { tr: 'Cold Brew', ru: 'Колд брю' },
    descriptionTranslations: {
      tr: '18 saat demlenmiş, pürüzsüz ve çikolata notalı.',
      ru: '18 часов холодного заваривания, мягкий шоколадный вкус.'
    }
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avocado, herbs, chilli and lemon.',
    price: 9.5,
    categoryId: 'breakfast',
    featured: true,
    bestSeller: true,
    badge: 'popular',
    allergens: ['Gluten'],
    ingredients: ['Sourdough', 'Avocado', 'Lemon', 'Chilli'],
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80'
    ],
    nameTranslations: { tr: 'Avokadolu Tost', ru: 'Тост с авокадо' },
    descriptionTranslations: {
      tr: 'Ekşi mayalı ekmek, avokado, otlar, biber ve limon.',
      ru: 'Заквасочный хлеб, авокадо, зелень, чили и лимон.'
    }
  },
  {
    id: 'granola-bowl',
    name: 'Granola Bowl',
    description: 'House granola, seasonal fruit and coconut yoghurt.',
    price: 8,
    categoryId: 'breakfast',
    badge: 'discount',
    discountPercent: 15,
    allergens: ['Nuts'],
    ingredients: ['Oats', 'Almonds', 'Seasonal fruit', 'Coconut yoghurt'],
    image:
      'https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&w=900&q=80',
    nameTranslations: { tr: 'Granola Kasesi', ru: 'Гранола-боул' },
    descriptionTranslations: {
      tr: 'Ev yapımı granola, mevsim meyveleri ve hindistan cevizi yoğurdu.',
      ru: 'Домашняя гранола, сезонные фрукты и кокосовый йогурт.'
    }
  },
  {
    id: 'lemon-cake',
    name: 'Lemon Olive Oil Cake',
    description: 'Tender citrus cake with a bright lemon glaze.',
    price: 5.5,
    categoryId: 'sweets',
    allergens: ['Gluten', 'Eggs'],
    ingredients: ['Olive oil', 'Lemon', 'Flour', 'Eggs'],
    image:
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=80',
    nameTranslations: {
      tr: 'Limonlu Zeytinyağlı Kek',
      ru: 'Лимонный кекс с оливковым маслом'
    },
    descriptionTranslations: {
      tr: 'Parlak limon soslu yumuşak narenciye keki.',
      ru: 'Нежный цитрусовый кекс с яркой лимонной глазурью.'
    }
  }
]
