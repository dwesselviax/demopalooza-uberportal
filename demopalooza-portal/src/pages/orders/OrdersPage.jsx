import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronRight, Package, Clock, Truck, Check } from 'lucide-react';
import { mockOrders, mockOrderStatuses } from '../../mocks';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const statusIcons = {
  pending_approval: Clock,
  processing: Package,
  shipped: Truck,
  delivered: Check,
};

const statusColors = {
  pending_approval: { bg: '#FED7AA', color: '#1E1E1E' },
  processing: { bg: '#DDD6FE', color: '#1E1E1E' },
  shipped: { bg: 'rgba(144, 233, 184, 0.3)', color: '#1E1E1E' },
  delivered: { bg: '#D1FAE5', color: '#1E1E1E' },
  cancelled: { bg: '#FEE2E2', color: '#DC2626' },
};

function OrderRow({ order }) {
  const status = mockOrderStatuses.find((s) => s.id === order.status);
  const StatusIcon = statusIcons[order.status] || Package;
  const colors = statusColors[order.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <Link to={`/orders/${order.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'rgba(144, 233, 184, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StatusIcon size={18} style={{ color: '#1E1E1E' }} />
            </div>
            <div>
              <p style={{ fontWeight: 500 }}>{order.orderNumber}</p>
              <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{order.poNumber}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: colors.bg,
              color: colors.color,
            }}>
              {status?.label || order.status}
            </span>
          </div>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: '#6B7280' }}>Order Date</span>
              <p>{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Items</span>
              <p>{order.items?.length || 0}</p>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Total</span>
              <p style={{ fontWeight: 500 }}>{formatCurrency(order.total)}</p>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: '#6B7280' }} />
        </div>

        {order.pendingActions?.length > 0 && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(254, 215, 170, 0.2)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem' }}>
              {order.pendingActions[0].message}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function OrdersPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');

  const filteredOrders = mockOrders.filter((order) => {
    if (selectedStatus && order.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.poNumber?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Orders</h1>
        <Link to="/catalog" className="btn btn-primary">
          New Order
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search by order or PO number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input"
          style={{ width: '12rem' }}
        >
          <option value="">All Statuses</option>
          {mockOrderStatuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <button className="btn btn-outline">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      {/* Status Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setSelectedStatus('')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: !selectedStatus ? '#1E1E1E' : 'transparent',
            color: !selectedStatus ? 'white' : '#6B7280',
          }}
        >
          All Orders
        </button>
        {mockOrderStatuses.slice(0, 6).map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStatus(s.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedStatus === s.id ? '#1E1E1E' : 'transparent',
              color: selectedStatus === s.id ? 'white' : '#6B7280',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredOrders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
        {filteredOrders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Package size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
            <p style={{ color: '#6B7280' }}>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
