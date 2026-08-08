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
          <div className="product-image product-image-placeholder">Nislen</div>
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
