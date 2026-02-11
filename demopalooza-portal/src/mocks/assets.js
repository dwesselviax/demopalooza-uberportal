// Mock Assets Data
// This mirrors the expected viax GraphQL response shapes

export const mockAssetTypes = [
  { id: 'purchased', label: 'Purchased', color: 'success' },
  { id: 'leased', label: 'Leased', color: 'info' },
  { id: 'consigned', label: 'Consigned', color: 'lavender' },
];

export const mockAssetStatuses = [
  { id: 'active', label: 'Active', color: 'success' },
  { id: 'maintenance', label: 'Under Maintenance', color: 'warning' },
  { id: 'decommissioned', label: 'Decommissioned', color: 'neutral' },
  { id: 'returned', label: 'Returned', color: 'info' },
  { id: 'lost_damaged', label: 'Lost/Damaged', color: 'error' },
];

export const mockAssets = [
  {
    id: 'asset-001',
    assetNumber: 'AST-2024-00145',
    organizationId: 'org-001',
    name: 'CNC Milling Machine Model X500',
    type: 'purchased',
    status: 'active',
    serialNumber: 'CNC-X500-2024-78451',
    manufacturer: 'PrecisionTech',
    model: 'X500',
    purchaseDate: '2024-03-15T00:00:00Z',
    purchasePrice: 125000.00,
    currentValue: 100000.00,
    depreciationMethod: 'straight_line',
    depreciationYears: 10,
    location: {
      site: 'Main Plant',
      building: 'Building A',
      room: 'Machine Shop',
    },
    warranty: {
      provider: 'PrecisionTech',
      expiresAt: '2027-03-15T00:00:00Z',
      type: 'Full Coverage',
    },
    maintenanceSchedule: {
      frequency: 'quarterly',
      lastService: '2025-10-15T00:00:00Z',
      nextService: '2026-01-15T00:00:00Z',
      overdue: true,
    },
    specifications: {
      'Work Envelope': '500mm x 400mm x 300mm',
      'Spindle Speed': '12,000 RPM',
      'Power': '15 kW',
      'Weight': '3,500 kg',
    },
    documents: [
      { id: 'doc-001', name: 'User Manual', type: 'pdf', url: '/docs/cnc-x500-manual.pdf' },
      { id: 'doc-002', name: 'Warranty Certificate', type: 'pdf', url: '/docs/warranty-001.pdf' },
    ],
    serviceHistory: [
      { id: 'svc-001', date: '2025-10-15T00:00:00Z', type: 'Preventive Maintenance', cost: 1500.00, technician: 'Mike Tech' },
      { id: 'svc-002', date: '2025-07-20T00:00:00Z', type: 'Spindle Replacement', cost: 8500.00, technician: 'PrecisionTech Service' },
      { id: 'svc-003', date: '2025-04-10T00:00:00Z', type: 'Preventive Maintenance', cost: 1500.00, technician: 'Mike Tech' },
    ],
  },
  {
    id: 'asset-002',
    assetNumber: 'AST-2025-00087',
    organizationId: 'org-001',
    name: 'Forklift - Electric 5000lb',
    type: 'leased',
    status: 'active',
    serialNumber: 'FLT-E5000-2025-12098',
    manufacturer: 'LiftCorp',
    model: 'E5000',
    leaseStart: '2025-06-01T00:00:00Z',
    leaseEnd: '2028-05-31T00:00:00Z',
    monthlyPayment: 1250.00,
    remainingPayments: 28,
    location: {
      site: 'Main Plant',
      building: 'Warehouse',
      room: 'Dock Area',
    },
    maintenanceSchedule: {
      frequency: 'monthly',
      lastService: '2026-01-05T00:00:00Z',
      nextService: '2026-02-05T00:00:00Z',
      overdue: false,
    },
    specifications: {
      'Capacity': '5,000 lbs',
      'Lift Height': '15 ft',
      'Battery': '48V Lead Acid',
      'Type': 'Electric Sit-Down',
    },
    serviceHistory: [
      { id: 'svc-004', date: '2026-01-05T00:00:00Z', type: 'Monthly Inspection', cost: 0, technician: 'LiftCorp Service' },
      { id: 'svc-005', date: '2025-12-05T00:00:00Z', type: 'Battery Service', cost: 450.00, technician: 'LiftCorp Service' },
    ],
  },
  {
    id: 'asset-003',
    assetNumber: 'AST-2025-00112',
    organizationId: 'org-001',
    name: 'Laser Cutting System LC-3000',
    type: 'leased',
    status: 'maintenance',
    serialNumber: 'LC-3000-2025-45678',
    manufacturer: 'LaserTech Industries',
    model: 'LC-3000',
    leaseStart: '2025-01-15T00:00:00Z',
    leaseEnd: '2030-01-14T00:00:00Z',
    monthlyPayment: 4500.00,
    remainingPayments: 48,
    location: {
      site: 'Main Plant',
      building: 'Building B',
      room: 'Fab Shop',
    },
    maintenanceSchedule: {
      frequency: 'monthly',
      lastService: '2026-01-28T00:00:00Z',
      nextService: '2026-02-28T00:00:00Z',
      overdue: false,
    },
    currentServiceOrder: 'svc-ord-003',
    specifications: {
      'Cutting Area': '3000mm x 1500mm',
      'Laser Power': '4 kW Fiber',
      'Max Thickness': '20mm Steel',
      'Speed': '30 m/min',
    },
    serviceHistory: [
      { id: 'svc-006', date: '2026-01-28T00:00:00Z', type: 'Lens Replacement', cost: 2200.00, technician: 'In Progress', status: 'in_progress' },
    ],
  },
  {
    id: 'asset-004',
    assetNumber: 'AST-2024-00098',
    organizationId: 'org-001',
    name: 'Air Compressor 50HP',
    type: 'purchased',
    status: 'active',
    serialNumber: 'AC-50HP-2024-33421',
    manufacturer: 'AirFlow Systems',
    model: 'AF-50',
    purchaseDate: '2024-08-20T00:00:00Z',
    purchasePrice: 28500.00,
    currentValue: 24225.00,
    depreciationMethod: 'straight_line',
    depreciationYears: 15,
    location: {
      site: 'Main Plant',
      building: 'Utility Building',
      room: 'Compressor Room',
    },
    warranty: {
      provider: 'AirFlow Systems',
      expiresAt: '2026-08-20T00:00:00Z',
      type: 'Parts & Labor',
    },
    maintenanceSchedule: {
      frequency: 'quarterly',
      lastService: '2025-11-20T00:00:00Z',
      nextService: '2026-02-20T00:00:00Z',
      overdue: false,
    },
    specifications: {
      'Horsepower': '50 HP',
      'CFM': '200 CFM @ 125 PSI',
      'Tank Size': '120 Gallon',
      'Type': 'Rotary Screw',
    },
  },
];

// Consignment Inventory
export const mockConsignmentItems = [
  {
    id: 'cons-001',
    productId: 'prod-007',
    sku: 'GLV-NITR-LG',
    name: 'Nitrile Gloves - Large (Box of 100)',
    organizationId: 'org-001',
    location: 'Main Plant - Safety Station A',
    currentStock: 45,
    minLevel: 20,
    maxLevel: 100,
    reorderPoint: 30,
    status: 'ok',
    lastReplenishment: '2026-01-15T00:00:00Z',
    usageRate: 8, // per week
    agreement: {
      id: 'cag-001',
      startDate: '2025-01-01T00:00:00Z',
      endDate: '2026-12-31T00:00:00Z',
      terms: 'Pay on consumption, monthly reconciliation',
    },
  },
  {
    id: 'cons-002',
    productId: 'prod-006',
    sku: 'HLM-HARD-WHT',
    name: 'Hard Hat - White',
    organizationId: 'org-001',
    location: 'Main Plant - Safety Station A',
    currentStock: 12,
    minLevel: 10,
    maxLevel: 50,
    reorderPoint: 15,
    status: 'low',
    lastReplenishment: '2025-12-20T00:00:00Z',
    usageRate: 3, // per week
    agreement: {
      id: 'cag-001',
      startDate: '2025-01-01T00:00:00Z',
      endDate: '2026-12-31T00:00:00Z',
    },
  },
  {
    id: 'cons-003',
    productId: 'prod-010',
    sku: 'LUB-MULTI-GAL',
    name: 'Multi-Purpose Lubricant - 1 Gallon',
    organizationId: 'org-001',
    location: 'Main Plant - Maintenance Crib',
    currentStock: 8,
    minLevel: 5,
    maxLevel: 24,
    reorderPoint: 8,
    status: 'reorder',
    lastReplenishment: '2026-01-10T00:00:00Z',
    usageRate: 4, // per week
    agreement: {
      id: 'cag-002',
      startDate: '2025-06-01T00:00:00Z',
      endDate: '2026-05-31T00:00:00Z',
    },
  },
];

// Helper functions
export const getAssetById = (id) => mockAssets.find((a) => a.id === id);
export const getAssetsByOrg = (orgId) => mockAssets.filter((a) => a.organizationId === orgId);
export const getAssetsByType = (type) => mockAssets.filter((a) => a.type === type);
export const getAssetsNeedingMaintenance = () => mockAssets.filter((a) => a.maintenanceSchedule?.overdue);
export const getConsignmentItemsByOrg = (orgId) => mockConsignmentItems.filter((c) => c.organizationId === orgId);
export const getLowStockConsignment = () => mockConsignmentItems.filter((c) => ['low', 'reorder'].includes(c.status));
