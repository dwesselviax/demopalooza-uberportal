import { useState } from 'react';
import { Search, RotateCcw, Plus, Truck, Check } from 'lucide-react';
import { mockReturns, mockReturnStatuses } from '../../mocks';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const statusColors = {
  pending_approval: { bg: '#FED7AA', color: '#1E1E1E' },
  approved: { bg: '#DDD6FE', color: '#1E1E1E' },
  shipped: { bg: 'rgba(144, 233, 184, 0.3)', color: '#1E1E1E' },
  received: { bg: '#D1FAE5', color: '#1E1E1E' },
  processed: { bg: '#D1FAE5', color: '#1E1E1E' },
  rejected: { bg: '#FEE2E2', color: '#DC2626' },
  closed: { bg: '#E5E7EB', color: '#6B7280' },
};

function ReturnCard({ rma }) {
  const status = mockReturnStatuses.find((s) => s.id === rma.status);
  const colors = statusColors[rma.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'rgba(144, 233, 184, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RotateCcw size={18} style={{ color: '#1E1E1E' }} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{rma.rmaNumber}</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Order: {rma.orderNumber}</p>
          </div>
        </div>
        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: colors.bg, color: colors.color }}>
          {status?.label || rma.status}
        </span>
      </div>

      <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>{rma.description}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {rma.items?.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.5rem 0', borderTop: '1px solid #E5E7EB' }}>
            <div>
              <p>{item.name}</p>
              <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.sku} x {item.quantity}</p>
            </div>
            <p>{formatCurrency(item.returnValue)}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6B7280' }}>Return Type</span>
          <span style={{ textTransform: 'capitalize' }}>{rma.type}</span>
        </div>
        {rma.restockingFee > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#6B7280' }}>Restocking Fee</span>
            <span style={{ color: '#F97316' }}>-{formatCurrency(rma.restockingFee)}</span>
          </div>
        )}
        {rma.creditAmount && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 500 }}>
            <span>Credit Amount</span>
            <span style={{ color: '#90E9B8' }}>{formatCurrency(rma.creditAmount)}</span>
          </div>
        )}
      </div>

      {rma.returnShipment?.trackingNumber && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Truck size={16} style={{ color: '#6B7280' }} />
          <span style={{ fontSize: '0.875rem' }}>Tracking: {rma.returnShipment.trackingNumber}</span>
        </div>
      )}

      {rma.creditMemo && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(144, 233, 184, 0.1)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={16} style={{ color: '#90E9B8' }} />
          <span style={{ fontSize: '0.875rem' }}>Credit Memo: {rma.creditMemo.number}</span>
        </div>
      )}

      {rma.pendingActions?.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Approve</button>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Reject</button>
        </div>
      )}
    </div>
  );
}

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredReturns = mockReturns.filter((rma) => {
    if (selectedStatus && rma.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return rma.rmaNumber.toLowerCase().includes(q) || rma.orderNumber?.toLowerCase().includes(q);
    }
    return true;
  });

  const pendingReturns = mockReturns.filter((r) => !['processed', 'closed', 'rejected'].includes(r.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Returns & RMA</h1>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Return Request
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Open Returns</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{pendingReturns.length}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Awaiting Shipment</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {mockReturns.filter((r) => r.status === 'approved').length}
          </p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>In Transit</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {mockReturns.filter((r) => r.status === 'shipped').length}
          </p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Pending Approval</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {mockReturns.filter((r) => r.status === 'pending_approval').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search by RMA or order number..."
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
          {mockReturnStatuses.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Returns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {filteredReturns.map((rma) => (
          <ReturnCard key={rma.id} rma={rma} />
        ))}
        {filteredReturns.length === 0 && (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem 0' }}>
            <RotateCcw size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
            <p style={{ color: '#6B7280' }}>No returns found</p>
          </div>
        )}
      </div>
    </div>
  );
}
