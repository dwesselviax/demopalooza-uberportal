// Mock Resources/Documents Data
// This mirrors the expected viax GraphQL response shapes

export const mockResourceCategories = [
  { id: 'manuals', name: 'Product Manuals', icon: 'book-open' },
  { id: 'installation', name: 'Installation Guides', icon: 'wrench' },
  { id: 'safety', name: 'Safety Data Sheets', icon: 'shield' },
  { id: 'videos', name: 'Training Videos', icon: 'video' },
  { id: 'best-practices', name: 'Best Practices', icon: 'lightbulb' },
  { id: 'faq', name: 'FAQs', icon: 'help-circle' },
];

export const mockResources = [
  {
    id: 'res-001',
    title: '5HP Industrial Motor - Installation & Operation Manual',
    description: 'Complete installation, operation, and maintenance guide for the MTR-5HP-230V industrial motor.',
    category: 'manuals',
    type: 'pdf',
    fileSize: '4.2 MB',
    url: '/docs/MTR-5HP-230V-Manual.pdf',
    productIds: ['prod-001'],
    tags: ['motor', 'installation', 'maintenance', 'electrical'],
    version: '2.1',
    updatedAt: '2025-06-15T00:00:00Z',
    downloadCount: 342,
  },
  {
    id: 'res-002',
    title: 'Variable Frequency Drive Programming Guide',
    description: 'Step-by-step guide for programming and configuring VFD-10HP-480V drives including Modbus setup.',
    category: 'manuals',
    type: 'pdf',
    fileSize: '8.7 MB',
    url: '/docs/VFD-10HP-Programming.pdf',
    productIds: ['prod-002'],
    tags: ['vfd', 'programming', 'modbus', 'configuration'],
    version: '3.0',
    updatedAt: '2025-09-20T00:00:00Z',
    downloadCount: 528,
  },
  {
    id: 'res-003',
    title: 'Centrifugal Pump Installation Video',
    description: '15-minute video demonstrating proper installation techniques for 2" centrifugal pumps.',
    category: 'videos',
    type: 'video',
    duration: '15:24',
    url: 'https://video.demopalooza.com/pump-installation',
    thumbnail: 'https://placehold.co/320x180/1E1E1E/90E9B8?text=Pump+Video',
    productIds: ['prod-003'],
    tags: ['pump', 'installation', 'plumbing'],
    updatedAt: '2025-04-10T00:00:00Z',
    viewCount: 1247,
  },
  {
    id: 'res-004',
    title: 'Safety Data Sheet - Multi-Purpose Lubricant',
    description: 'SDS document for LubeTech Multi-Purpose Industrial Lubricant.',
    category: 'safety',
    type: 'pdf',
    fileSize: '256 KB',
    url: '/docs/LUB-MULTI-SDS.pdf',
    productIds: ['prod-010'],
    tags: ['sds', 'safety', 'lubricant', 'chemical'],
    version: '1.2',
    updatedAt: '2025-01-05T00:00:00Z',
    downloadCount: 89,
    required: true,
  },
  {
    id: 'res-005',
    title: 'PPE Selection Guide',
    description: 'Comprehensive guide for selecting appropriate personal protective equipment for various industrial applications.',
    category: 'best-practices',
    type: 'pdf',
    fileSize: '2.1 MB',
    url: '/docs/PPE-Selection-Guide.pdf',
    productIds: ['prod-006', 'prod-007'],
    tags: ['ppe', 'safety', 'selection', 'guide'],
    version: '4.0',
    updatedAt: '2025-11-01T00:00:00Z',
    downloadCount: 756,
    featured: true,
  },
  {
    id: 'res-006',
    title: 'Conveyor Belt Tensioning Best Practices',
    description: 'Technical bulletin on proper belt tensioning and tracking for optimal conveyor performance.',
    category: 'best-practices',
    type: 'pdf',
    fileSize: '1.8 MB',
    url: '/docs/Conveyor-Tensioning.pdf',
    productIds: ['prod-005'],
    tags: ['conveyor', 'maintenance', 'tensioning', 'tracking'],
    version: '2.0',
    updatedAt: '2025-08-22T00:00:00Z',
    downloadCount: 234,
  },
  {
    id: 'res-007',
    title: 'Gate Valve Installation Guide',
    description: 'Step-by-step flanged gate valve installation instructions with torque specifications.',
    category: 'installation',
    type: 'pdf',
    fileSize: '1.5 MB',
    url: '/docs/Gate-Valve-Installation.pdf',
    productIds: ['prod-004'],
    tags: ['valve', 'installation', 'flanged', 'torque'],
    version: '1.1',
    updatedAt: '2025-03-15T00:00:00Z',
    downloadCount: 412,
  },
  {
    id: 'res-008',
    title: 'Cordless Tool Battery Care',
    description: 'Video tutorial on proper charging, storage, and maintenance of lithium-ion tool batteries.',
    category: 'videos',
    type: 'video',
    duration: '8:45',
    url: 'https://video.demopalooza.com/battery-care',
    thumbnail: 'https://placehold.co/320x180/1E1E1E/90E9B8?text=Battery+Care',
    productIds: ['prod-008'],
    tags: ['battery', 'maintenance', 'cordless', 'tools'],
    updatedAt: '2025-07-18T00:00:00Z',
    viewCount: 892,
  },
  {
    id: 'res-009',
    title: 'Electrical Wiring Color Codes',
    description: 'Quick reference guide for standard electrical wiring color codes in industrial applications.',
    category: 'best-practices',
    type: 'pdf',
    fileSize: '420 KB',
    url: '/docs/Wiring-Color-Codes.pdf',
    productIds: ['prod-009'],
    tags: ['electrical', 'wiring', 'color codes', 'reference'],
    version: '1.0',
    updatedAt: '2024-12-01T00:00:00Z',
    downloadCount: 1893,
    featured: true,
  },
  {
    id: 'res-010',
    title: 'Frequently Asked Questions - Industrial Motors',
    description: 'Common questions and answers about motor selection, installation, and troubleshooting.',
    category: 'faq',
    type: 'html',
    url: '/faq/motors',
    productIds: ['prod-001', 'prod-011'],
    tags: ['motor', 'faq', 'troubleshooting', 'selection'],
    updatedAt: '2025-10-30T00:00:00Z',
  },
];

// Helper functions
export const getResourceById = (id) => mockResources.find((r) => r.id === id);
export const getResourcesByCategory = (category) => mockResources.filter((r) => r.category === category);
export const getResourcesByProduct = (productId) => mockResources.filter((r) => r.productIds?.includes(productId));
export const getFeaturedResources = () => mockResources.filter((r) => r.featured);
export const searchResources = (query) => {
  const q = query.toLowerCase();
  return mockResources.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags?.some((t) => t.toLowerCase().includes(q))
  );
};
