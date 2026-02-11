import { useState } from 'react';
import { Search, Wrench, Plus, Clock, AlertTriangle } from 'lucide-react';
import { mockServiceOrders, mockServiceStatuses, mockServiceTypes } from '../../mocks';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const statusColors = {
  open: { bg: '#DDD6FE', color: '#1E1E1E' },
  scheduled: { bg: '#FED7AA', color: '#1E1E1E' },
  in_progress: { bg: 'rgba(144, 233, 184, 0.3)', color: '#1E1E1E' },
  completed: { bg: '#D1FAE5', color: '#1E1E1E' },
  closed: { bg: '#E5E7EB', color: '#6B7280' },
};

function ServiceCard({ service }) {
  const status = mockServiceStatuses.find((s) => s.id === service.status);
  const type = mockServiceTypes.find((t) => t.id === service.type);
  const isCritical = service.priority === 'critical';
  const slaBreach = service.sla && !service.sla.withinSla;
  const colors = statusColors[service.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <div className="card" style={{ borderLeft: isCritical ? '4px solid #F97316' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isCritical ? 'rgba(249, 115, 22, 0.2)' : 'rgba(144, 233, 184, 0.2)',
          }}>
            <Wrench size={18} style={{ color: isCritical ? '#F97316' : '#1E1E1E' }} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{service.serviceNumber}</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{type?.label || service.type}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {service.priority === 'critical' && (
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316' }}>Critical</span>
          )}
          {service.priority === 'high' && (
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#FED7AA', color: '#1E1E1E' }}>High</span>
          )}
          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: colors.bg, color: colors.color }}>
            {status?.label || service.status}
          </span>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>{service.description}</p>
      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Asset: {service.assetName}</p>

      {slaBreach && (
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={14} style={{ color: '#F97316' }} />
          <span style={{ fontSize: '0.75rem', color: '#F97316', fontWeight: 500 }}>SLA Breach</span>
        </div>
      )}

      {service.scheduledDate && (
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
          <Clock size={14} />
          Scheduled: {formatDate(service.scheduledDate)}
        </div>
      )}

      {service.technician && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #E5E7EB' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Technician: <span style={{ color: '#1E1E1E' }}>{service.technician.name}</span></p>
        </div>
      )}

      {service.totalCost > 0 && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <span style={{ color: '#6B7280' }}>Estimated Cost</span>
          <span style={{ fontWeight: 500 }}>{formatCurrency(service.totalCost)}</span>
        </div>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Details</button>
        {service.pendingActions?.length > 0 && (
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Take Action</button>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredServices = mockServiceOrders.filter((svc) => {
    if (selectedStatus && svc.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return svc.serviceNumber.toLowerCase().includes(q) || svc.assetName?.toLowerCase().includes(q);
    }
    return true;
  });

  const openServices = mockServiceOrders.filter((s) => !['completed', 'closed'].includes(s.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Service Orders</h1>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Service Request
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Open Requests</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{openServices.length}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>In Progress</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {mockServiceOrders.filter((s) => s.status === 'in_progress').length}
          </p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Scheduled</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {mockServiceOrders.filter((s) => s.status === 'scheduled').length}
          </p>
        </div>
        <div className="card" style={{ borderColor: '#F97316' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>SLA Breaches</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F97316' }}>
            {mockServiceOrders.filter((s) => s.sla && !s.sla.withinSla).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search service orders..."
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
          {mockServiceStatuses.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Service Orders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        {filteredServices.length === 0 && (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem 0' }}>
            <Wrench size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
            <p style={{ color: '#6B7280' }}>No service orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
