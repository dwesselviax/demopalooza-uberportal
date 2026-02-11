import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/orders', label: 'Orders' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/assets', label: 'Assets' },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'Resources' },
  { to: '/returns', label: 'Returns' },
];

export default function Navigation() {
  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0' }}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.75rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(144, 233, 184, 0.2)' : 'transparent',
                color: isActive ? '#1E1E1E' : '#6B7280',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
