import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  Truck,
  CreditCard,
  RotateCcw,
  Wrench,
  Clock,
  AlertCircle,
  Settings,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  mockDashboardMetrics,
  mockRecentActivity,
  mockActionItems,
  mockSpendByCategory,
} from '../../mocks';

const iconMap = {
  'clipboard-list': ClipboardList,
  'truck': Truck,
  'wrench': Wrench,
  'rotate-ccw': RotateCcw,
  'credit-card': CreditCard,
  'clock': Clock,
  'alert-circle': AlertCircle,
  'settings': Settings,
  'package': Package,
};

function MetricCard({ title, value, subtitle, isOverdue, link }) {
  const content = (
    <div className="card">
      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>{title}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{value}</p>
      {subtitle && (
        <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: isOverdue ? '#F97316' : '#9CA3AF' }}>
          {subtitle}
        </p>
      )}
    </div>
  );

  if (link) {
    return <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</Link>;
  }
  return content;
}

function ActionItem({ item }) {
  const priorityStyles = {
    critical: { borderLeftColor: '#F97316', backgroundColor: '#FFF7ED' },
    high: { borderLeftColor: '#FED7AA', backgroundColor: 'rgba(255, 247, 237, 0.5)' },
    medium: { borderLeftColor: '#DDD6FE', backgroundColor: 'rgba(250, 245, 255, 0.5)' },
    low: { borderLeftColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
  };

  const style = priorityStyles[item.priority] || priorityStyles.low;

  return (
    <Link
      to={item.link}
      style={{
        display: 'block',
        padding: '1rem',
        borderRadius: '1rem',
        borderLeft: '4px solid',
        borderLeftColor: style.borderLeftColor,
        backgroundColor: style.backgroundColor,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.2s',
      }}
    >
      <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.title}</p>
      <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.125rem' }}>{item.description}</p>
    </Link>
  );
}

function ActivityItem({ item }) {
  const Icon = iconMap[item.icon] || Package;
  const timeAgo = getTimeAgo(item.timestamp);

  return (
    <Link
      to={item.link}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        borderRadius: '1rem',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: 'rgba(144, 233, 184, 0.2)',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} style={{ color: '#1E1E1E' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.title}</p>
        <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.description}</p>
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{timeAgo}</span>
    </Link>
  );
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now - then) / 1000 / 60);

  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  const { user, currentOrg } = useAuth();
  const metrics = mockDashboardMetrics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            Welcome back, {user?.firstName}
          </h1>
          <p style={{ color: '#6B7280' }}>{currentOrg?.name}</p>
        </div>
        <Link to="/catalog" className="btn btn-primary">
          <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          Shop Now
        </Link>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <MetricCard
          title="Month-to-Date Spend"
          value={formatCurrency(metrics.spendMTD)}
          subtitle={`YTD: ${formatCurrency(metrics.spendYTD)}`}
        />
        <MetricCard
          title="Open Orders"
          value={metrics.ordersPending}
          subtitle={`${metrics.ordersDelivered} delivered this month`}
          link="/orders"
        />
        <MetricCard
          title="Invoices Due"
          value={formatCurrency(metrics.invoicesDue)}
          subtitle={metrics.overdueAmount > 0 ? `${formatCurrency(metrics.overdueAmount)} overdue` : 'All current'}
          isOverdue={metrics.overdueAmount > 0}
          link="/invoices"
        />
        <MetricCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          subtitle="Requires your action"
          link="/orders?status=pending_approval"
        />
      </div>

      {/* Action Items & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Action Items */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Action Required</h2>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: '#FED7AA',
              color: '#1E1E1E'
            }}>
              {mockActionItems.length}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockActionItems.map((item) => (
              <ActionItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockRecentActivity.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Spend by Category */}
      <div className="card">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Spend by Category (MTD)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockSpendByCategory.map((cat) => (
            <div key={cat.category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>{cat.category}</span>
                <span style={{ color: '#6B7280' }}>{formatCurrency(cat.amount)}</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#90E9B8',
                    borderRadius: '9999px',
                    width: `${cat.percentage}%`,
                    transition: 'width 0.5s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
