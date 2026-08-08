import type { Category } from '../data/menu'
import type { UiText } from '../App'

type CategoryFilterProps = {
  categories: Category[]
  activeCategory: string
  onChange: (categoryId: string) => void
  text: UiText
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
  text
}: CategoryFilterProps) {
  return (
    <nav className="category-filter" aria-label="Kategoriler">
      <button
        className={activeCategory === 'all' ? 'is-active' : ''}
        onClick={() => onChange('all')}
      >
        {text.allCategories}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={activeCategory === category.id ? 'is-active' : ''}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </nav>
  )
}
