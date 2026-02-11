import { useState } from 'react';
import { Search, FileText, CreditCard, AlertCircle } from 'lucide-react';
import { mockInvoices, mockInvoiceStatuses, mockAccountSummary } from '../../mocks';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const statusColors = {
  paid: { bg: '#D1FAE5', color: '#1E1E1E' },
  due: { bg: '#DDD6FE', color: '#1E1E1E' },
  overdue: { bg: 'rgba(249, 115, 22, 0.2)', color: '#F97316' },
  partial: { bg: '#FED7AA', color: '#1E1E1E' },
  processing: { bg: '#E5E7EB', color: '#6B7280' },
};

function InvoiceRow({ invoice }) {
  const status = mockInvoiceStatuses.find((s) => s.id === invoice.status);
  const colors = statusColors[invoice.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: invoice.status === 'overdue' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(144, 233, 184, 0.2)',
          }}>
            <FileText size={18} style={{ color: invoice.status === 'overdue' ? '#F97316' : '#1E1E1E' }} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{invoice.invoiceNumber}</p>
            {invoice.orderNumber && <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Order: {invoice.orderNumber}</p>}
          </div>
        </div>
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: colors.bg,
          color: colors.color,
        }}>
          {status?.label || invoice.status}
        </span>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
        <div>
          <span style={{ color: '#6B7280' }}>Issue Date</span>
          <p>{formatDate(invoice.issueDate)}</p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Due Date</span>
          <p style={{ color: invoice.status === 'overdue' ? '#F97316' : 'inherit', fontWeight: invoice.status === 'overdue' ? 500 : 400 }}>
            {formatDate(invoice.dueDate)}
          </p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Total</span>
          <p style={{ fontWeight: 500 }}>{formatCurrency(invoice.total)}</p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Amount Due</span>
          <p style={{ fontWeight: 500, color: invoice.amountDue > 0 ? 'inherit' : '#90E9B8' }}>
            {formatCurrency(invoice.amountDue)}
          </p>
        </div>
      </div>

      {invoice.amountDue > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button className="btn btn-outline btn-sm">
            <FileText size={14} />
            Download PDF
          </button>
          <button className="btn btn-primary btn-sm">
            <CreditCard size={14} />
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const summary = mockAccountSummary;

  const filteredInvoices = mockInvoices.filter((inv) => {
    if (selectedStatus && inv.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return inv.invoiceNumber.toLowerCase().includes(q) || inv.orderNumber?.toLowerCase().includes(q);
    }
    return true;
  });

  const unpaidInvoices = mockInvoices.filter((i) => ['due', 'overdue', 'partial'].includes(i.status));
  const totalDue = unpaidInvoices.reduce((sum, i) => sum + i.amountDue, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Invoices</h1>
        {unpaidInvoices.length > 0 && (
          <button className="btn btn-primary">
            <CreditCard size={18} />
            Pay All ({formatCurrency(totalDue)})
          </button>
        )}
      </div>

      {/* Account Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Credit Limit</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatCurrency(summary.creditLimit)}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Available Credit</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#90E9B8' }}>{formatCurrency(summary.availableCredit)}</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Current Balance</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatCurrency(summary.aging.total)}</p>
        </div>
        <div className="card" style={{ borderColor: summary.overdueInvoices > 0 ? '#F97316' : undefined, backgroundColor: summary.overdueInvoices > 0 ? 'rgba(249, 115, 22, 0.05)' : undefined }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Overdue</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: summary.overdueInvoices > 0 ? '#F97316' : 'inherit' }}>
            {formatCurrency(summary.aging.days60 + summary.aging.days90)}
          </p>
        </div>
      </div>

      {summary.overdueInvoices > 0 && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid #F97316', borderRadius: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertCircle size={20} style={{ color: '#F97316', flexShrink: 0, marginTop: '0.125rem' }} />
          <div>
            <p style={{ fontWeight: 500 }}>You have {summary.overdueInvoices} overdue invoice(s)</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Please pay to avoid service interruption or late fees.</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search invoices..."
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
          {mockInvoiceStatuses.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Invoice List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredInvoices.map((invoice) => (
          <InvoiceRow key={invoice.id} invoice={invoice} />
        ))}
        {filteredInvoices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <FileText size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
            <p style={{ color: '#6B7280' }}>No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
}
