import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Building2,
  Palette,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const hasAdminPermission = true; // For demo purposes, everyone can access theme editor

export default function Header() {
  const { user, currentOrg, userOrgs, switchOrganization, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ backgroundColor: '#1E1E1E', color: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#90E9B8', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#1E1E1E', fontWeight: 'bold', fontSize: '1.25rem' }}>D</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>DemoPalooza</span>
        </Link>

        {/* Organization Switcher */}
        {userOrgs.length > 1 && (
          <div style={{ position: 'relative', marginLeft: '1rem' }}>
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <Building2 size={16} />
              <span style={{ fontSize: '0.875rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentOrg?.name}
              </span>
              <ChevronDown size={14} />
            </button>

            {showOrgDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.25rem', width: '16rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #E5E7EB', padding: '0.25rem 0', zIndex: 50 }}>
                {userOrgs.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      switchOrganization(org.id);
                      setShowOrgDropdown(false);
                    }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', color: org.id === currentOrg?.id ? '#90E9B8' : '#1E1E1E', fontWeight: org.id === currentOrg?.id ? 500 : 400 }}
                  >
                    {org.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '24rem', margin: '0 2rem' }}>
          <div style={{ backgroundColor: '#2A2A2A', borderRadius: '0.75rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={20} style={{ color: '#9CA3AF', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search products, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', backgroundColor: 'transparent', fontSize: '0.875rem', color: 'white', border: 'none', outline: 'none' }}
            />
          </div>
        </form>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart */}
          <Link
            to="/cart"
            style={{ position: 'relative', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', textDecoration: 'none' }}
          >
            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {itemCount > 0 && (
              <span style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', width: '1.25rem', height: '1.25rem', backgroundColor: '#90E9B8', color: '#1E1E1E', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem', borderRadius: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#90E9B8', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#1E1E1E', fontWeight: 600, fontSize: '0.875rem' }}>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
            </button>

            {showUserDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.25rem', width: '14rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #E5E7EB', padding: '0.25rem 0', zIndex: 50 }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1E1E1E', margin: 0 }}>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
                </div>
                <Link
                  to="/account"
                  onClick={() => setShowUserDropdown(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#1E1E1E', textDecoration: 'none' }}
                >
                  <User size={16} />
                  My Account
                </Link>
                <Link
                  to="/account/settings"
                  onClick={() => setShowUserDropdown(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#1E1E1E', textDecoration: 'none' }}
                >
                  <Settings size={16} />
                  Settings
                </Link>
                {hasAdminPermission && (
                  <Link
                    to="/admin/theme"
                    onClick={() => setShowUserDropdown(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#1E1E1E', textDecoration: 'none' }}
                  >
                    <Palette size={16} />
                    Theme Editor
                  </Link>
                )}
                <hr style={{ margin: '0.25rem 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
                <button
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#F97316', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showOrgDropdown || showUserDropdown) && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => {
            setShowOrgDropdown(false);
            setShowUserDropdown(false);
          }}
        />
      )}
    </header>
  );
}
