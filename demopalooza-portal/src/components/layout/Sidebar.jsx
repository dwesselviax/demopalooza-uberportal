import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  FolderOpen,
  Wrench,
  BookOpen,
  RotateCcw,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/catalog', label: 'Catalog', icon: Package },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/invoices', label: 'Invoices', icon: FileText },
  { to: '/assets', label: 'Assets', icon: FolderOpen },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/resources', label: 'Resources', icon: BookOpen },
  { to: '/returns', label: 'Returns', icon: RotateCcw },
];

const bottomNavItems = [
  { to: '/account/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarWidth = isExpanded ? '240px' : '64px';

  return (
    <aside
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        height: '100vh',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1E1E1E',
        borderRight: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease, min-width 0.2s ease',
        overflow: 'hidden',
        zIndex: 40,
      }}
    >
      {/* Hamburger Toggle - matches header height */}
      <div
        style={{
          height: '88px',
          minHeight: '88px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '14px',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#FFFFFF',
          }}
          aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav style={{ flex: 1, padding: '0.5rem', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#90E9B8' : '#FFFFFF',
                  backgroundColor: isActive ? 'rgba(144, 233, 184, 0.1)' : 'transparent',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '0.875rem',
                  transition: 'background-color 0.15s ease',
                  whiteSpace: 'nowrap',
                })}
                title={!isExpanded ? label : undefined}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation (Settings) */}
      <div style={{ padding: '0.5rem', borderTop: '1px solid #2A2A2A' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {bottomNavItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#90E9B8' : '#FFFFFF',
                  backgroundColor: isActive ? 'rgba(144, 233, 184, 0.1)' : 'transparent',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '0.875rem',
                  transition: 'background-color 0.15s ease',
                  whiteSpace: 'nowrap',
                })}
                title={!isExpanded ? label : undefined}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
