import { useEffect, useRef, useState, type WheelEvent } from 'react'
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
  const navRef = useRef<HTMLElement | null>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const updateStickyState = () => {
      const nav = navRef.current
      if (!nav) return

      setIsStuck(nav.getBoundingClientRect().top <= 0)
    }

    updateStickyState()
    window.addEventListener('scroll', updateStickyState, { passive: true })
    window.addEventListener('resize', updateStickyState)

    return () => {
      window.removeEventListener('scroll', updateStickyState)
      window.removeEventListener('resize', updateStickyState)
    }
  }, [])

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const target = navRef.current
    if (!target) return

    if (Math.abs(event.deltaY) > 0 || Math.abs(event.deltaX) > 0) {
      target.scrollLeft += event.deltaY + event.deltaX
      event.preventDefault()
    }
  }

  return (
    <nav
      ref={navRef}
      className={`category-filter${isStuck ? ' is-stuck' : ''}`}
      aria-label="Kategoriler"
      onWheel={handleWheel}
    >
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
