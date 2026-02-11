// Mock Service Orders Data
// This mirrors the expected viax GraphQL response shapes

export const mockServiceStatuses = [
  { id: 'submitted', label: 'Submitted', color: 'info' },
  { id: 'acknowledged', label: 'Acknowledged', color: 'info' },
  { id: 'scheduled', label: 'Scheduled', color: 'warning' },
  { id: 'in_progress', label: 'In Progress', color: 'warning' },
  { id: 'parts_ordered', label: 'Parts Ordered', color: 'info' },
  { id: 'completed', label: 'Completed', color: 'success' },
  { id: 'closed', label: 'Closed', color: 'neutral' },
];

export const mockServiceTypes = [
  { id: 'repair', label: 'Repair', icon: 'wrench' },
  { id: 'maintenance', label: 'Preventive Maintenance', icon: 'settings' },
  { id: 'installation', label: 'Installation', icon: 'package' },
  { id: 'inspection', label: 'Inspection', icon: 'search' },
  { id: 'calibration', label: 'Calibration', icon: 'gauge' },
];

export const mockServiceOrders = [
  {
    id: 'svc-ord-001',
    serviceNumber: 'SVC-2026-00034',
    organizationId: 'org-001',
    assetId: 'asset-001',
    assetName: 'CNC Milling Machine Model X500',
    type: 'maintenance',
    priority: 'medium',
    status: 'scheduled',
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-01-28T14:30:00Z',
    createdBy: { id: 'user-001', name: 'Demo User' },
    description: 'Quarterly preventive maintenance - overdue from January 15th',
    scheduledDate: '2026-02-03T09:00:00Z',
    estimatedDuration: 4, // hours
    technician: {
      id: 'tech-001',
      name: 'Mike Thompson',
      phone: '312-555-8001',
      company: 'Internal',
    },
    sla: {
      responseTime: 24, // hours
      resolutionTime: 72, // hours
      respondedAt: '2026-01-20T11:30:00Z',
      withinSla: true,
    },
    parts: [],
    laborCost: 600.00,
    partsCost: 0,
    totalCost: 600.00,
    notes: [
      { id: 'note-001', date: '2026-01-20T11:30:00Z', user: 'System', text: 'Service request acknowledged' },
      { id: 'note-002', date: '2026-01-28T14:30:00Z', user: 'Mike Thompson', text: 'Scheduled for Feb 3rd - customer confirmed availability' },
    ],
  },
  {
    id: 'svc-ord-002',
    serviceNumber: 'SVC-2026-00028',
    organizationId: 'org-001',
    assetId: 'asset-002',
    assetName: 'Forklift - Electric 5000lb',
    type: 'repair',
    priority: 'high',
    status: 'completed',
    createdAt: '2026-01-10T14:00:00Z',
    updatedAt: '2026-01-12T16:00:00Z',
    completedAt: '2026-01-12T16:00:00Z',
    createdBy: { id: 'user-002', name: 'Alex Buyer' },
    description: 'Forklift making unusual noise when lifting. Possible hydraulic issue.',
    technician: {
      id: 'tech-002',
      name: 'LiftCorp Service Team',
      phone: '800-555-LIFT',
      company: 'LiftCorp',
    },
    sla: {
      responseTime: 4, // hours
      resolutionTime: 24, // hours
      respondedAt: '2026-01-10T16:30:00Z',
      resolvedAt: '2026-01-12T16:00:00Z',
      withinSla: true,
    },
    parts: [
      { id: 'part-001', sku: 'HYD-SEAL-KIT', name: 'Hydraulic Seal Kit', quantity: 1, unitPrice: 185.00 },
      { id: 'part-002', sku: 'HYD-FLUID-5G', name: 'Hydraulic Fluid 5 Gallon', quantity: 1, unitPrice: 95.00 },
    ],
    laborCost: 450.00,
    partsCost: 280.00,
    totalCost: 730.00,
    resolution: 'Replaced worn hydraulic seals and topped off fluid. Tested lift operation - all normal.',
    notes: [
      { id: 'note-003', date: '2026-01-10T16:30:00Z', user: 'LiftCorp Service', text: 'Technician dispatched - ETA 2 hours' },
      { id: 'note-004', date: '2026-01-11T09:00:00Z', user: 'LiftCorp Service', text: 'Parts ordered - expected delivery tomorrow AM' },
      { id: 'note-005', date: '2026-01-12T16:00:00Z', user: 'LiftCorp Service', text: 'Repair completed. Forklift operational.' },
    ],
  },
  {
    id: 'svc-ord-003',
    serviceNumber: 'SVC-2026-00041',
    organizationId: 'org-001',
    assetId: 'asset-003',
    assetName: 'Laser Cutting System LC-3000',
    type: 'repair',
    priority: 'critical',
    status: 'in_progress',
    createdAt: '2026-01-28T08:00:00Z',
    updatedAt: '2026-01-30T10:00:00Z',
    createdBy: { id: 'user-001', name: 'Demo User' },
    description: 'Laser output degraded significantly. Cutting quality affected. Production impacted.',
    technician: {
      id: 'tech-003',
      name: 'LaserTech Field Service',
      phone: '800-555-LASR',
      company: 'LaserTech Industries',
    },
    sla: {
      responseTime: 2, // hours
      resolutionTime: 8, // hours
      respondedAt: '2026-01-28T09:30:00Z',
      withinSla: false, // resolution SLA breached
    },
    parts: [
      { id: 'part-003', sku: 'LT-LENS-4KW', name: 'Focus Lens Assembly 4kW', quantity: 1, unitPrice: 1850.00, status: 'installed' },
      { id: 'part-004', sku: 'LT-MIRROR-SET', name: 'Beam Delivery Mirror Set', quantity: 1, unitPrice: 950.00, status: 'on_order' },
    ],
    laborCost: 1200.00,
    partsCost: 2800.00,
    totalCost: 4000.00,
    notes: [
      { id: 'note-006', date: '2026-01-28T09:30:00Z', user: 'LaserTech Service', text: 'Emergency response initiated - technician en route' },
      { id: 'note-007', date: '2026-01-28T14:00:00Z', user: 'LaserTech Service', text: 'Diagnosis complete - focus lens contaminated, beam mirrors showing wear' },
      { id: 'note-008', date: '2026-01-29T10:00:00Z', user: 'LaserTech Service', text: 'Lens replaced. Mirrors on order - expected delivery Feb 1st' },
      { id: 'note-009', date: '2026-01-30T10:00:00Z', user: 'LaserTech Service', text: 'System running at 70% capacity. Full restoration pending mirror delivery.' },
    ],
    pendingActions: [
      {
        type: 'parts_pending',
        message: 'Awaiting beam delivery mirror set - ETA Feb 1st',
      },
    ],
  },
  {
    id: 'svc-ord-004',
    serviceNumber: 'SVC-2026-00015',
    organizationId: 'org-001',
    assetId: 'asset-004',
    assetName: 'Air Compressor 50HP',
    type: 'inspection',
    priority: 'low',
    status: 'closed',
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-08T14:00:00Z',
    completedAt: '2026-01-08T12:00:00Z',
    closedAt: '2026-01-08T14:00:00Z',
    createdBy: { id: 'user-001', name: 'Demo User' },
    description: 'Annual safety inspection required for insurance compliance',
    technician: {
      id: 'tech-004',
      name: 'Certified Inspections Inc.',
      phone: '312-555-CERT',
      company: 'Third Party',
    },
    laborCost: 350.00,
    partsCost: 0,
    totalCost: 350.00,
    resolution: 'Inspection passed. Certificate issued - valid through Jan 2027.',
    documents: [
      { id: 'doc-003', name: 'Inspection Certificate', type: 'pdf', url: '/docs/inspection-cert-2026.pdf' },
    ],
  },
];

// Maintenance Contracts
export const mockMaintenanceContracts = [
  {
    id: 'maint-001',
    organizationId: 'org-001',
    name: 'Forklift Fleet Maintenance Agreement',
    provider: 'LiftCorp',
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2028-05-31T00:00:00Z',
    monthlyFee: 500.00,
    coverage: ['Preventive Maintenance', 'Emergency Repairs', 'Parts (50% discount)'],
    assets: ['asset-002'],
    slaTerms: {
      responseTime: '4 hours',
      resolutionTime: '24 hours',
    },
    renewalNotice: 90, // days before expiration
  },
  {
    id: 'maint-002',
    organizationId: 'org-001',
    name: 'Laser System Premium Support',
    provider: 'LaserTech Industries',
    startDate: '2025-01-15T00:00:00Z',
    endDate: '2026-01-14T00:00:00Z',
    monthlyFee: 1200.00,
    coverage: ['24/7 Support', 'Emergency Response', 'Consumables', 'Software Updates'],
    assets: ['asset-003'],
    slaTerms: {
      responseTime: '2 hours',
      resolutionTime: '8 hours',
    },
    renewalNotice: 60,
    expiringsSoon: true,
    daysUntilExpiry: -17, // expired
  },
];

// Helper functions
export const getServiceOrderById = (id) => mockServiceOrders.find((s) => s.id === id);
export const getServiceOrdersByOrg = (orgId) => mockServiceOrders.filter((s) => s.organizationId === orgId);
export const getServiceOrdersByAsset = (assetId) => mockServiceOrders.filter((s) => s.assetId === assetId);
export const getOpenServiceOrders = () => mockServiceOrders.filter((s) => !['completed', 'closed'].includes(s.status));
export const getMaintenanceContractsByOrg = (orgId) => mockMaintenanceContracts.filter((m) => m.organizationId === orgId);
