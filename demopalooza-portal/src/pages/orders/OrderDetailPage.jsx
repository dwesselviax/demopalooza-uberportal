import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, FileText, RotateCcw } from 'lucide-react';
import { getOrderById, mockOrderStatuses } from '../../mocks';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

const statusColors = {
  pending_approval: { bg: '#FED7AA', color: '#1E1E1E' },
  processing: { bg: '#DDD6FE', color: '#1E1E1E' },
  shipped: { bg: 'rgba(144, 233, 184, 0.3)', color: '#1E1E1E' },
  delivered: { bg: '#D1FAE5', color: '#1E1E1E' },
  cancelled: { bg: '#FEE2E2', color: '#DC2626' },
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <p style={{ color: '#6B7280' }}>Order not found</p>
        <Link to="/orders" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Orders</Link>
      </div>
    );
  }

  const status = mockOrderStatuses.find((s) => s.id === order.status);
  const colors = statusColors[order.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', textDecoration: 'none' }}>
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{order.orderNumber}</h1>
          <p style={{ color: '#6B7280' }}>PO: {order.poNumber}</p>
        </div>
        <span style={{
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: 600,
          backgroundColor: colors.bg,
          color: colors.color,
        }}>
          {status?.label || order.status}
        </span>
      </div>

      {order.pendingActions?.length > 0 && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(254, 215, 170, 0.2)', border: '1px solid #FED7AA', borderRadius: '0.5rem' }}>
          <p style={{ fontWeight: 500 }}>Action Required</p>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>{order.pendingActions[0].message}</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm">Approve</button>
            <button className="btn btn-outline btn-sm">Reject</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Order Items */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Order Items</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {order.items?.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Package size={20} style={{ color: '#6B7280' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>{item.name}</p>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.sku}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p>{item.quantity} × {formatCurrency(item.unitPrice)}</p>
                    <p style={{ fontWeight: 500 }}>{formatCurrency(item.lineTotal)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipments */}
          {order.shipments?.length > 0 && (
            <div className="card">
              <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Shipments</h3>
              {order.shipments.map((ship) => (
                <div key={ship.id} style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Truck size={18} />
                    <span style={{ fontWeight: 500 }}>{ship.carrier}</span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: ship.status === 'delivered' ? '#D1FAE5' : '#DDD6FE',
                      color: '#1E1E1E',
                    }}>
                      {ship.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Tracking: {ship.trackingNumber}</p>
                  {ship.deliveredDate && (
                    <p style={{ fontSize: '0.875rem', color: '#90E9B8', marginTop: '0.25rem' }}>Delivered: {formatDate(ship.deliveredDate)}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Workflow History */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Order Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {order.workflowHistory?.map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', marginTop: '0.375rem', backgroundColor: '#90E9B8', borderRadius: '9999px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>{event.status.replace('_', ' ')}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{event.user} • {formatDate(event.timestamp)}</p>
                    {event.note && <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>{event.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Shipping</span>
                <span>{formatCurrency(order.shipping)}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 600 }}>
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '1rem' }}>Payment: {order.paymentMethod}</p>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Ship To</h3>
            <p style={{ fontSize: '0.875rem' }}>{order.shippingAddress?.name}</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{order.shippingAddress?.street}</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
            </p>
          </div>

          {/* Actions */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ width: '100%' }}>
              <FileText size={18} />
              View Invoice
            </button>
            <button className="btn btn-outline" style={{ width: '100%' }}>
              <RotateCcw size={18} />
              Request Return
            </button>
            <button className="btn btn-ghost" style={{ width: '100%' }}>
              <Package size={18} />
              Reorder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
