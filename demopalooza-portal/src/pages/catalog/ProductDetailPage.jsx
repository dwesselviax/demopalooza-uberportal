import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { getProductById, getResourcesByProduct } from '../../mocks';
import { useCart } from '../../contexts/CartContext';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(productId);
  const resources = getResourcesByProduct(productId);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <p style={{ color: '#6B7280' }}>Product not found</p>
        <Link to="/catalog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  const price = product.pricing?.customerPrice || product.pricing?.listPrice;
  const hasContractPrice = product.pricing?.contractPrice && product.pricing.contractPrice < price;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumb */}
      <Link to="/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', textDecoration: 'none' }}>
        <ArrowLeft size={18} />
        Back to Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '0.75rem' }}
          />
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{product.brand}</p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.25rem' }}>{product.name}</h1>
            <p style={{ color: '#6B7280', marginTop: '0.25rem' }}>SKU: {product.sku}</p>
          </div>

          {/* Pricing */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{formatCurrency(price)}</span>
              {product.pricing?.listPrice > price && (
                <span style={{ fontSize: '1.125rem', color: '#6B7280', textDecoration: 'line-through' }}>
                  {formatCurrency(product.pricing.listPrice)}
                </span>
              )}
            </div>
            {hasContractPrice && (
              <p style={{ color: '#90E9B8', marginTop: '0.25rem' }}>
                Your contract price: {formatCurrency(product.pricing.contractPrice)}
              </p>
            )}
            {product.pricing?.priceBreaks && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Volume Pricing</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {product.pricing.priceBreaks.map((pb, i) => (
                    <p key={i} style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      {pb.minQty}+ units: {formatCurrency(pb.price)} each
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {product.availability?.inStock ? (
              <>
                <Check size={18} style={{ color: '#90E9B8' }} />
                <span style={{ color: '#90E9B8', fontWeight: 500 }}>
                  In Stock ({product.availability.quantity} available)
                </span>
              </>
            ) : (
              <>
                <AlertTriangle size={18} style={{ color: '#F97316' }} />
                <span style={{ color: '#F97316', fontWeight: 500 }}>
                  Lead Time: {product.availability?.leadTime || 'Contact us'}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '4rem', textAlign: 'center', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', borderTop: 'none', borderBottom: 'none', padding: '0.5rem' }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => addItem(product, quantity)}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
              <Heart size={18} />
            </button>
            <button className="btn btn-outline" style={{ padding: '0.75rem' }}>
              <Share2 size={18} />
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ color: '#6B7280' }}>{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h3 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Specifications</h3>
              <div style={{ backgroundColor: '#F3F4F6', borderRadius: '0.5rem', overflow: 'hidden' }}>
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div
                    key={key}
                    style={{ display: 'flex', backgroundColor: i % 2 === 0 ? 'white' : 'transparent' }}
                  >
                    <span style={{ width: '33%', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500 }}>{key}</span>
                    <span style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#6B7280' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Resources */}
          {resources.length > 0 && (
            <div>
              <h3 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Related Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {resources.slice(0, 3).map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    style={{ display: 'block', padding: '0.75rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit' }}
                  >
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{res.title}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{res.type.toUpperCase()} • {res.fileSize || ''}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
