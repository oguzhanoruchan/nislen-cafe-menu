import type { Category } from '../data/menu'

type CategoryFilterProps = {
  categories: Category[]
  activeCategory: string
  onChange: (categoryId: string) => void
  allLabel: string
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
  allLabel
}: CategoryFilterProps) {
  return (
    <nav className="category-filter" aria-label="Kategoriler">
      <button
        className={activeCategory === 'all' ? 'is-active' : ''}
        onClick={() => onChange('all')}
      >
        {allLabel}
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
