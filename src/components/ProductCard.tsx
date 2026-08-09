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
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <div className="product-image-fallback" aria-hidden="true" />
        )}
      </div>
      <div className="product-copy">
        <h3>{product.name}</h3>
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
