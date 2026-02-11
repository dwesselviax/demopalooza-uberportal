// Mock Authentication Data
// This mirrors the expected viax GraphQL response shapes

export const mockOrganizations = [
  {
    id: 'org-001',
    name: 'Acme Industries',
    type: 'enterprise',
    accountNumber: 'ACM-10001',
    creditLimit: 500000,
    availableCredit: 425000,
    paymentTerms: 'NET30',
    address: {
      street: '123 Industrial Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA',
    },
    contacts: {
      primary: { name: 'John Smith', email: 'jsmith@acme.com', phone: '312-555-0100' },
      billing: { name: 'Jane Doe', email: 'billing@acme.com', phone: '312-555-0101' },
    },
  },
  {
    id: 'org-002',
    name: 'TechStart Solutions',
    type: 'standard',
    accountNumber: 'TSS-20042',
    creditLimit: 100000,
    availableCredit: 87500,
    paymentTerms: 'NET15',
    address: {
      street: '456 Innovation Way',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA',
    },
    contacts: {
      primary: { name: 'Mike Johnson', email: 'mike@techstart.io', phone: '512-555-0200' },
    },
  },
  {
    id: 'org-003',
    name: 'Global Manufacturing Corp',
    type: 'enterprise',
    accountNumber: 'GMC-30078',
    creditLimit: 1000000,
    availableCredit: 750000,
    paymentTerms: 'NET60',
    address: {
      street: '789 Factory Lane',
      city: 'Detroit',
      state: 'MI',
      zip: '48201',
      country: 'USA',
    },
    contacts: {
      primary: { name: 'Sarah Williams', email: 'swilliams@globalmc.com', phone: '313-555-0300' },
    },
  },
];

export const mockUsers = [
  {
    id: 'user-001',
    email: 'demo@demopalooza.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    phone: '312-555-1000',
    avatar: null,
    organizationIds: ['org-001', 'org-002'],
    memberships: [
      {
        orgId: 'org-001',
        role: 'super_admin',
        department: 'Executive',
        budgetLimit: null,
        permissions: ['view', 'order', 'approve', 'admin', 'finance'],
      },
      {
        orgId: 'org-002',
        role: 'buyer',
        department: 'Operations',
        budgetLimit: 10000,
        permissions: ['view', 'order'],
      },
    ],
  },
  {
    id: 'user-002',
    email: 'buyer@acme.com',
    password: 'buyer123',
    firstName: 'Alex',
    lastName: 'Buyer',
    phone: '312-555-1001',
    avatar: null,
    organizationIds: ['org-001'],
    memberships: [
      {
        orgId: 'org-001',
        role: 'buyer',
        department: 'Purchasing',
        budgetLimit: 5000,
        permissions: ['view', 'order'],
      },
    ],
  },
  {
    id: 'user-003',
    email: 'approver@acme.com',
    password: 'approver123',
    firstName: 'Morgan',
    lastName: 'Approver',
    phone: '312-555-1002',
    avatar: null,
    organizationIds: ['org-001'],
    memberships: [
      {
        orgId: 'org-001',
        role: 'approver',
        department: 'Management',
        budgetLimit: 25000,
        permissions: ['view', 'order', 'approve'],
      },
    ],
  },
  {
    id: 'user-004',
    email: 'finance@acme.com',
    password: 'finance123',
    firstName: 'Taylor',
    lastName: 'Finance',
    phone: '312-555-1003',
    avatar: null,
    organizationIds: ['org-001'],
    memberships: [
      {
        orgId: 'org-001',
        role: 'finance',
        department: 'Finance',
        budgetLimit: null,
        permissions: ['view', 'finance'],
      },
    ],
  },
];

export const mockRoles = [
  {
    id: 'role-viewer',
    name: 'Viewer',
    description: 'Can browse catalog and view orders (read-only)',
    permissions: ['view'],
  },
  {
    id: 'role-buyer',
    name: 'Buyer',
    description: 'Can place orders and manage cart',
    permissions: ['view', 'order'],
  },
  {
    id: 'role-approver',
    name: 'Approver',
    description: 'Can approve or reject orders within threshold',
    permissions: ['view', 'order', 'approve'],
  },
  {
    id: 'role-finance',
    name: 'Finance',
    description: 'Can manage invoices and payments',
    permissions: ['view', 'finance'],
  },
  {
    id: 'role-account-admin',
    name: 'Account Admin',
    description: 'Can manage contacts and view all account activity',
    permissions: ['view', 'order', 'admin'],
  },
  {
    id: 'role-super-admin',
    name: 'Super Admin',
    description: 'Full access to all features',
    permissions: ['view', 'order', 'approve', 'admin', 'finance'],
  },
];
