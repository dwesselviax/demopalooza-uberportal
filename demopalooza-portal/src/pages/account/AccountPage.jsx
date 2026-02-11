import { User, MapPin, CreditCard, Users, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AccountPage() {
  const { user, currentOrg } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Account</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '4rem', height: '4rem', backgroundColor: '#90E9B8', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#1E1E1E', fontWeight: 600, fontSize: '1.25rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {user?.firstName} {user?.lastName}
              </h2>
              <p style={{ color: '#6B7280' }}>{user?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Phone</span>
              <span>{user?.phone || 'Not set'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Role</span>
              <span style={{ textTransform: 'capitalize' }}>
                {user?.memberships?.find(m => m.orgId === currentOrg?.id)?.role?.replace('_', ' ')}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Department</span>
              <span>
                {user?.memberships?.find(m => m.orgId === currentOrg?.id)?.department}
              </span>
            </div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem' }}>Edit Profile</button>
        </div>

        {/* Organization Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(221, 214, 254, 0.3)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} />
            </div>
            <h3 style={{ fontWeight: 600 }}>Organization</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Name</span>
              <span>{currentOrg?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Account #</span>
              <span>{currentOrg?.accountNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Type</span>
              <span style={{ textTransform: 'capitalize' }}>{currentOrg?.type}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Payment Terms</span>
              <span>{currentOrg?.paymentTerms}</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <LinkCard icon={MapPin} title="Addresses" description="Manage shipping & billing" />
          <LinkCard icon={Users} title="Contacts" description="Manage team members" />
          <LinkCard icon={CreditCard} title="Payment Methods" description="Cards & bank accounts" />
          <LinkCard icon={FileText} title="Contracts" description="View agreements & pricing" />
          <LinkCard icon={Settings} title="Settings" description="Preferences & notifications" />
        </div>
      </div>
    </div>
  );
}

function LinkCard({ icon: Icon, title, description }) {
  return (
    <button className="card" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', border: 'none' }}>
      <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'rgba(144, 233, 184, 0.2)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} />
      </div>
      <div>
        <p style={{ fontWeight: 500 }}>{title}</p>
        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{description}</p>
      </div>
    </button>
  );
}
