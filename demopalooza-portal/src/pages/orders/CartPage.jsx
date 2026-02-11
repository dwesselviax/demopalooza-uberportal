import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <ShoppingCart size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Add items from the catalog to get started</p>
        <Link to="/catalog" className="btn btn-primary">
          <Package size={18} />
          Browse Catalog
        </Link>
      </div>
    );
  }

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Shopping Cart</h1>
        <button onClick={clearCart} style={{ fontSize: '0.875rem', color: '#F97316', background: 'none', border: 'none', cursor: 'pointer' }}>
          Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem' }}>
              <img
                src={item.image || 'https://placehold.co/100x100/1E1E1E/90E9B8?text=Item'}
                alt={item.name}
                style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
              <div style={{ flex: 1 }}>
                <Link to={`/catalog/${item.productId}`} style={{ fontWeight: 500, textDecoration: 'none', color: 'inherit' }}>
                  {item.name}
                </Link>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.sku}</p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>{formatCurrency(item.price)} each</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '0.25rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0.25rem 0.75rem', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '0.25rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
                <p style={{ fontWeight: 600 }}>
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '6rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Subtotal ({items.length} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Estimated Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 600 }}>
              <span>Estimated Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>
          <Link to="/catalog" style={{ display: 'block', textAlign: 'center', fontSize: '0.875rem', color: '#90E9B8', marginTop: '1rem', textDecoration: 'none' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
