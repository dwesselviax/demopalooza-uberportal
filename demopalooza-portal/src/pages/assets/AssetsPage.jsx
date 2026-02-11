import { useState } from 'react';
import { Search, Settings, AlertTriangle, Package, Calendar, Wrench } from 'lucide-react';
import { mockAssets, mockAssetStatuses, mockAssetTypes, mockConsignmentItems } from '../../mocks';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const typeColors = {
  equipment: { bg: '#DDD6FE', color: '#1E1E1E' },
  vehicle: { bg: 'rgba(144, 233, 184, 0.3)', color: '#1E1E1E' },
  tool: { bg: '#FED7AA', color: '#1E1E1E' },
};

const statusColors = {
  active: { bg: '#D1FAE5', color: '#1E1E1E' },
  maintenance: { bg: '#FED7AA', color: '#1E1E1E' },
  inactive: { bg: '#E5E7EB', color: '#6B7280' },
};

function AssetCard({ asset }) {
  const type = mockAssetTypes.find((t) => t.id === asset.type);
  const status = mockAssetStatuses.find((s) => s.id === asset.status);
  const needsMaintenance = asset.maintenanceSchedule?.overdue;
  const tColors = typeColors[asset.type] || { bg: '#E5E7EB', color: '#6B7280' };
  const sColors = statusColors[asset.status] || { bg: '#E5E7EB', color: '#6B7280' };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: needsMaintenance ? 'rgba(249, 115, 22, 0.2)' : 'rgba(144, 233, 184, 0.2)',
          }}>
            <Settings size={18} style={{ color: needsMaintenance ? '#F97316' : '#1E1E1E' }} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{asset.name}</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{asset.assetNumber}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: tColors.bg, color: tColors.color }}>
            {type?.label}
          </span>
          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: sColors.bg, color: sColors.color }}>
            {status?.label}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
        <div>
          <span style={{ color: '#6B7280' }}>Manufacturer</span>
          <p>{asset.manufacturer}</p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Model</span>
          <p>{asset.model}</p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Location</span>
          <p>{asset.location?.site}</p>
        </div>
        <div>
          <span style={{ color: '#6B7280' }}>Serial #</span>
          <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.serialNumber}</p>
        </div>
      </div>

      {needsMaintenance && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={16} style={{ color: '#F97316' }} />
          <span style={{ fontSize: '0.875rem' }}>Maintenance overdue since {formatDate(asset.maintenanceSchedule.nextService)}</span>
        </div>
      )}

      {asset.warranty?.expiresAt && new Date(asset.warranty.expiresAt) > new Date() && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Calendar size={14} style={{ color: '#6B7280' }} />
          <span style={{ color: '#6B7280' }}>Warranty expires: {formatDate(asset.warranty.expiresAt)}</span>
        </div>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Details</button>
        <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          <Wrench size={14} />
          Service
        </button>
      </div>
    </div>
  );
}

function ConsignmentRow({ item }) {
  const stockLevel = item.currentStock <= item.reorderPoint ? 'low' : 'ok';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: stockLevel === 'low' ? 'rgba(254, 215, 170, 0.2)' : 'rgba(144, 233, 184, 0.2)',
        }}>
          <Package size={18} style={{ color: '#1E1E1E' }} />
        </div>
        <div>
          <p style={{ fontWeight: 500 }}>{item.name}</p>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.sku} • {item.location}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: 500, color: stockLevel === 'low' ? '#F97316' : 'inherit' }}>
            {item.currentStock} / {item.maxLevel}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Min: {item.minLevel}</p>
        </div>
        <div style={{ width: '8rem', height: '0.5rem', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: stockLevel === 'low' ? '#F97316' : '#90E9B8',
              width: `${(item.currentStock / item.maxLevel) * 100}%`,
            }}
          />
        </div>
        {stockLevel === 'low' && (
          <button className="btn btn-primary btn-sm">Replenish</button>
        )}
      </div>
    </div>
  );
}

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('assets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredAssets = mockAssets.filter((asset) => {
    if (selectedType && asset.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return asset.name.toLowerCase().includes(q) || asset.assetNumber.toLowerCase().includes(q);
    }
    return true;
  });

  const overdueAssets = mockAssets.filter((a) => a.maintenanceSchedule?.overdue);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Assets</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #E5E7EB' }}>
        <button
          onClick={() => setActiveTab('assets')}
          style={{
            paddingBottom: '0.75rem',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderBottom: activeTab === 'assets' ? '2px solid #90E9B8' : '2px solid transparent',
            marginBottom: '-1px',
            background: 'none',
            border: 'none',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: activeTab === 'assets' ? '#90E9B8' : 'transparent',
            color: activeTab === 'assets' ? '#1E1E1E' : '#6B7280',
            cursor: 'pointer',
          }}
        >
          Registered Assets ({mockAssets.length})
        </button>
        <button
          onClick={() => setActiveTab('consignment')}
          style={{
            paddingBottom: '0.75rem',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '-1px',
            background: 'none',
            border: 'none',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: activeTab === 'consignment' ? '#90E9B8' : 'transparent',
            color: activeTab === 'consignment' ? '#1E1E1E' : '#6B7280',
            cursor: 'pointer',
          }}
        >
          Consignment Inventory ({mockConsignmentItems.length})
        </button>
      </div>

      {activeTab === 'assets' && (
        <>
          {overdueAssets.length > 0 && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid #F97316', borderRadius: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <AlertTriangle size={20} style={{ color: '#F97316', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 500 }}>{overdueAssets.length} asset(s) need maintenance</p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Schedule service to avoid equipment issues.</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input"
              style={{ width: '12rem' }}
            >
              <option value="">All Types</option>
              {mockAssetTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'consignment' && (
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Consignment Stock Levels</h3>
          {mockConsignmentItems.map((item) => (
            <ConsignmentRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
