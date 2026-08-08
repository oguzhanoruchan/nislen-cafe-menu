import type { Product } from '../data/menu'

type ProductCardProps = {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button className="product-card" onClick={() => onSelect(product)}>
      <div className="product-image-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image product-image-placeholder" aria-hidden="true">
            <svg className="product-placeholder-icon" viewBox="0 0 24 24" role="presentation">
              <path d="M7 10h9a2.8 2.8 0 0 1 0 5.6H7z" />
              <path d="M16 11h1.4a2 2 0 0 1 0 4H16" />
              <path d="M9 9V7.4" />
              <path d="M12 9V6.8" />
              <path d="M15 9V7.6" />
              <path d="M8 17h10" />
            </svg>
          </div>
        )}
      </div>
      <div className="product-copy">
        <h3>{product.name}</h3>
        {product.description ? <p>{product.description}</p> : null}
      </div>
      <strong>{formatPrice(product.price)}</strong>
    </button>
  )
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(value)
}
