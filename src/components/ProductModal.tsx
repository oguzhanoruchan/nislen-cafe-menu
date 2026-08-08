import type { Product } from '../data/menu'

type ProductModalProps = {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) {
    return null
  }

  return (
    <div className="product-modal" role="dialog" aria-modal="true">
      <div className="product-modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          Kapat
        </button>
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-modal-image" />
        ) : null}
        <h2>{product.name}</h2>
        {product.description ? <p>{product.description}</p> : null}
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </div>
  )
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(value)
}
