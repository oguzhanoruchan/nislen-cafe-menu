import { useRef, type PointerEvent, type WheelEvent } from 'react'
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
  const dragState = useRef({
    isPointerDown: false,
    startX: 0,
    startScrollLeft: 0
  })

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const target = navRef.current
    if (!target) return

    if (Math.abs(event.deltaY) > 0 || Math.abs(event.deltaX) > 0) {
      target.scrollLeft += event.deltaY + event.deltaX
      event.preventDefault()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    const target = navRef.current
    if (!target) return

    dragState.current = {
      isPointerDown: true,
      startX: event.clientX,
      startScrollLeft: target.scrollLeft
    }

    target.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const target = navRef.current
    if (!target || !dragState.current.isPointerDown) return

    const delta = event.clientX - dragState.current.startX
    target.scrollLeft = dragState.current.startScrollLeft - delta
  }

  const stopPointerDrag = (event: PointerEvent<HTMLElement>) => {
    const target = navRef.current
    if (!target) return

    dragState.current.isPointerDown = false
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <nav
      ref={navRef}
      className="category-filter"
      aria-label="Kategoriler"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopPointerDrag}
      onPointerCancel={stopPointerDrag}
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
