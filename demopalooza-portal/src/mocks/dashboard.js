// Mock Dashboard Data
// Aggregated data for dashboard widgets

export const mockDashboardMetrics = {
  organizationId: 'org-001',
  period: 'mtd', // month to date

  // Key Metrics
  spendMTD: 15891.30,
  spendLastMonth: 28450.00,
  spendYTD: 44341.30,

  ordersPlaced: 5,
  ordersDelivered: 2,
  ordersPending: 3,

  openInvoices: 3,
  invoicesDue: 14426.30,
  overdueAmount: 5766.00,

  // Action Items
  pendingApprovals: 1,
  shipmentsInTransit: 1,
  maintenanceOverdue: 1,
  lowConsignmentStock: 2,
  expiringContracts: 1,
};

export const mockRecentActivity = [
  {
    id: 'act-001',
    type: 'order_created',
    icon: 'clipboard-list',
    title: 'Order Submitted',
    description: 'PO-2026-00163 submitted for approval',
    amount: 9889.00,
    timestamp: '2026-01-30T14:05:00Z',
    link: '/orders/ord-003',
    status: 'pending_approval',
  },
  {
    id: 'act-002',
    type: 'shipment',
    icon: 'truck',
    title: 'Order Shipped',
    description: 'PO-2026-00147 shipped via FedEx',
    timestamp: '2026-01-28T09:30:00Z',
    link: '/orders/ord-004',
    trackingNumber: '9400111899223334445566',
  },
  {
    id: 'act-003',
    type: 'service',
    icon: 'wrench',
    title: 'Service Order Updated',
    description: 'Laser system repair in progress',
    timestamp: '2026-01-30T10:00:00Z',
    link: '/services/svc-ord-003',
    status: 'in_progress',
  },
  {
    id: 'act-004',
    type: 'return',
    icon: 'rotate-ccw',
    title: 'RMA Shipped',
    description: 'RMA-2026-00022 return shipped',
    timestamp: '2026-01-27T16:00:00Z',
    link: '/returns/rma-002',
  },
  {
    id: 'act-005',
    type: 'payment',
    icon: 'credit-card',
    title: 'Payment Received',
    description: 'INV-2026-00089 paid via ACH',
    amount: 2721.00,
    timestamp: '2026-01-25T10:30:00Z',
    link: '/invoices/inv-001',
  },
];

export const mockActionItems = [
  {
    id: 'action-001',
    type: 'approval',
    priority: 'high',
    icon: 'clock',
    title: 'Order Pending Approval',
    description: 'PO-2026-00163 requires your approval ($9,889.00)',
    link: '/orders/ord-003',
    action: 'Review & Approve',
    dueDate: null,
  },
  {
    id: 'action-002',
    type: 'invoice',
    priority: 'critical',
    icon: 'alert-circle',
    title: 'Overdue Invoice',
    description: 'INV-2025-00845 is 17 days overdue ($5,766.00)',
    link: '/invoices/inv-003',
    action: 'Pay Now',
    dueDate: '2026-01-14T00:00:00Z',
  },
  {
    id: 'action-003',
    type: 'maintenance',
    priority: 'medium',
    icon: 'settings',
    title: 'Maintenance Overdue',
    description: 'CNC Machine quarterly maintenance overdue since Jan 15',
    link: '/assets/asset-001',
    action: 'Schedule Service',
  },
  {
    id: 'action-004',
    type: 'consignment',
    priority: 'low',
    icon: 'package',
    title: 'Low Consignment Stock',
    description: 'Hard hats at reorder point (12 remaining)',
    link: '/assets?tab=consignment',
    action: 'Request Replenishment',
  },
  {
    id: 'action-005',
    type: 'return',
    priority: 'medium',
    icon: 'rotate-ccw',
    title: 'RMA Approval Needed',
    description: 'RMA-2026-00025 requires approval',
    link: '/returns/rma-003',
    action: 'Review',
  },
];

export const mockSpendByCategory = [
  { category: 'Industrial Equipment', amount: 9215.00, percentage: 58 },
  { category: 'Safety Equipment', amount: 2850.00, percentage: 18 },
  { category: 'Tools & Hardware', amount: 1890.00, percentage: 12 },
  { category: 'Electrical Supplies', amount: 1120.00, percentage: 7 },
  { category: 'Maintenance & Repair', amount: 816.30, percentage: 5 },
];

export const mockOrderTrend = [
  { month: 'Aug', orders: 12, spend: 34500 },
  { month: 'Sep', orders: 15, spend: 42000 },
  { month: 'Oct', orders: 11, spend: 31200 },
  { month: 'Nov', orders: 18, spend: 52800 },
  { month: 'Dec', orders: 14, spend: 38600 },
  { month: 'Jan', orders: 5, spend: 15891 },
];

export const mockDeliveryCalendar = [
  {
    id: 'del-001',
    date: '2026-02-01',
    orderNumber: 'PO-2026-00147',
    items: ['Cordless Drill 18V Kit (4)', 'THHN Wire 12 AWG (3)'],
    carrier: 'FedEx',
    trackingNumber: '9400111899223334445566',
  },
  {
    id: 'del-002',
    date: '2026-02-03',
    orderNumber: 'SVC-2026-00034',
    items: ['Scheduled Maintenance - CNC Machine'],
    type: 'service',
  },
];

export const mockQuickStats = {
  totalAssets: 4,
  activeServiceOrders: 2,
  openReturns: 2,
  savedLists: 3,
};
