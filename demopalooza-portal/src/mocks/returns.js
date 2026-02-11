// Mock Returns/RMA Data
// This mirrors the expected viax GraphQL response shapes

export const mockReturnStatuses = [
  { id: 'requested', label: 'Requested', color: 'info' },
  { id: 'pending_approval', label: 'Pending Approval', color: 'warning' },
  { id: 'approved', label: 'Approved', color: 'success' },
  { id: 'rejected', label: 'Rejected', color: 'error' },
  { id: 'shipped', label: 'Return Shipped', color: 'info' },
  { id: 'received', label: 'Received', color: 'info' },
  { id: 'inspecting', label: 'Under Inspection', color: 'warning' },
  { id: 'processed', label: 'Processed', color: 'success' },
  { id: 'closed', label: 'Closed', color: 'neutral' },
];

export const mockReturnReasons = [
  { id: 'damaged_transit', label: 'Damaged in Transit' },
  { id: 'wrong_item', label: 'Wrong Item Received' },
  { id: 'defective', label: 'Defective Product' },
  { id: 'no_longer_needed', label: 'No Longer Needed' },
  { id: 'quality_issue', label: 'Quality Issue' },
  { id: 'other', label: 'Other' },
];

export const mockReturnTypes = [
  { id: 'credit', label: 'Credit Memo' },
  { id: 'replacement', label: 'Replacement' },
  { id: 'repair', label: 'Repair' },
];

export const mockReturns = [
  {
    id: 'rma-001',
    rmaNumber: 'RMA-2026-00018',
    organizationId: 'org-001',
    orderId: 'ord-005',
    orderNumber: 'PO-2026-00102',
    status: 'processed',
    type: 'credit',
    reason: 'defective',
    createdAt: '2026-01-14T10:00:00Z',
    updatedAt: '2026-01-25T14:00:00Z',
    createdBy: { id: 'user-001', name: 'Demo User' },
    description: 'Motor failed after 2 weeks of operation. Bearing seized causing overheating.',
    items: [
      {
        id: 'rma-line-001',
        productId: 'prod-001',
        sku: 'MTR-5HP-230V',
        name: '5HP Industrial Motor',
        quantity: 1,
        originalPrice: 1050.00,
        returnValue: 1050.00,
        condition: 'defective',
      },
    ],
    totalValue: 1050.00,
    restockingFee: 0,
    creditAmount: 1050.00,
    attachments: [
      { id: 'att-001', name: 'motor_damage_photo.jpg', type: 'image', url: '/uploads/rma-001/photo1.jpg' },
    ],
    returnShipment: {
      trackingNumber: '1Z999CC10111222333',
      carrier: 'UPS',
      shippedDate: '2026-01-16T00:00:00Z',
      receivedDate: '2026-01-20T00:00:00Z',
    },
    creditMemo: {
      id: 'cm-001',
      number: 'CM-2026-00012',
      amount: 1050.00,
      issuedDate: '2026-01-25T00:00:00Z',
      appliedToInvoice: 'inv-002',
    },
    workflowHistory: [
      { status: 'requested', timestamp: '2026-01-14T10:00:00Z', user: 'Demo User' },
      { status: 'approved', timestamp: '2026-01-14T14:00:00Z', user: 'System', note: 'Auto-approved - defective product within warranty' },
      { status: 'shipped', timestamp: '2026-01-16T10:00:00Z', user: 'Demo User' },
      { status: 'received', timestamp: '2026-01-20T14:00:00Z', user: 'Warehouse' },
      { status: 'inspecting', timestamp: '2026-01-21T09:00:00Z', user: 'QA Team' },
      { status: 'processed', timestamp: '2026-01-25T14:00:00Z', user: 'System', note: 'Defect confirmed. Full credit issued.' },
    ],
  },
  {
    id: 'rma-002',
    rmaNumber: 'RMA-2026-00022',
    organizationId: 'org-001',
    orderId: 'ord-001',
    orderNumber: 'PO-2026-00142',
    status: 'shipped',
    type: 'replacement',
    reason: 'wrong_item',
    createdAt: '2026-01-23T11:00:00Z',
    updatedAt: '2026-01-27T16:00:00Z',
    createdBy: { id: 'user-002', name: 'Alex Buyer' },
    description: 'Received 3" gate valve instead of 2" gate valve ordered.',
    items: [
      {
        id: 'rma-line-002',
        productId: 'prod-004',
        sku: 'VLV-GATE-3IN',
        name: 'Gate Valve 3" Flanged',
        quantity: 2,
        originalPrice: 361.25,
        returnValue: 722.50,
        condition: 'new_unopened',
        replacementSku: 'VLV-GATE-2IN',
        replacementName: 'Gate Valve 2" Flanged',
      },
    ],
    totalValue: 722.50,
    restockingFee: 0,
    returnShipment: {
      trackingNumber: '9400111899223334445599',
      carrier: 'FedEx',
      shippedDate: '2026-01-27T00:00:00Z',
      labelUrl: '/labels/rma-002-label.pdf',
    },
    replacementOrder: {
      id: 'ord-006',
      orderNumber: 'PO-2026-00165',
      status: 'processing',
    },
    workflowHistory: [
      { status: 'requested', timestamp: '2026-01-23T11:00:00Z', user: 'Alex Buyer' },
      { status: 'approved', timestamp: '2026-01-24T09:00:00Z', user: 'Customer Service', note: 'Wrong item confirmed - replacement approved' },
      { status: 'shipped', timestamp: '2026-01-27T16:00:00Z', user: 'Alex Buyer' },
    ],
  },
  {
    id: 'rma-003',
    rmaNumber: 'RMA-2026-00025',
    organizationId: 'org-001',
    status: 'pending_approval',
    type: 'credit',
    reason: 'no_longer_needed',
    createdAt: '2026-01-30T09:00:00Z',
    updatedAt: '2026-01-30T09:00:00Z',
    createdBy: { id: 'user-002', name: 'Alex Buyer' },
    description: 'Project cancelled. Equipment no longer required.',
    items: [
      {
        id: 'rma-line-003',
        productId: 'prod-008',
        sku: 'DRL-CRD-18V',
        name: 'Cordless Drill 18V Kit',
        quantity: 2,
        originalPrice: 254.15,
        returnValue: 508.30,
        condition: 'new_unopened',
      },
    ],
    totalValue: 508.30,
    restockingFee: 76.25, // 15% restocking fee
    creditAmount: 432.05,
    workflowHistory: [
      { status: 'requested', timestamp: '2026-01-30T09:00:00Z', user: 'Alex Buyer' },
      { status: 'pending_approval', timestamp: '2026-01-30T09:05:00Z', user: 'System', note: '15% restocking fee applies for non-defective returns' },
    ],
    pendingActions: [
      {
        type: 'approval_required',
        assignedTo: ['user-003'],
        message: 'RMA requires approval - restocking fee applies',
      },
    ],
  },
];

// Helper functions
export const getReturnById = (id) => mockReturns.find((r) => r.id === id);
export const getReturnsByOrg = (orgId) => mockReturns.filter((r) => r.organizationId === orgId);
export const getReturnsByStatus = (status) => mockReturns.filter((r) => r.status === status);
export const getPendingReturns = () => mockReturns.filter((r) => !['processed', 'closed', 'rejected'].includes(r.status));
