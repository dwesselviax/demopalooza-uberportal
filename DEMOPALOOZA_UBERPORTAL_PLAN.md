# DemoPalooza uberPortal — Comprehensive Functional Plan

## Executive Summary

The DemoPalooza uberPortal is a comprehensive B2B commerce portal built with React, Tailwind CSS, and HTML that interfaces with the viax Palooza backend system via GraphQL API. This document outlines the complete functional specification, design system, and implementation roadmap.

---

## Architecture Principle: viax-Controlled Backend

### Core Philosophy

**The frontend is a presentation layer only.** All business logic, data management, workflows, pricing, permissions, and functionality are controlled by the viax backend. The React portal simply:

1. **Fetches data** from viax via GraphQL
2. **Displays state** returned by viax
3. **Submits user actions** to viax for processing
4. **Reflects results** back to the user

### What viax Controls

| Domain | viax Responsibility |
|--------|---------------------|
| **Products** | Catalog rules, customer-specific availability, pricing engine |
| **Pricing** | Contract pricing, volume breaks, customer tiers |
| **Orders** | Validation, workflow routing, status management |
| **Workflows** | Approval logic, state transitions, notifications |
| **Permissions** | Role definitions, access rules, feature flags |
| **Inventory** | Stock levels, ATP, location availability |
| **Invoicing** | Invoice generation, terms, aging |
| **Assets** | Lifecycle management, maintenance schedules |
| **Services** | SLA enforcement, scheduling, technician assignment |

### What the Frontend Does

- Renders UI based on viax data
- Provides intuitive navigation and user experience
- Submits forms and actions to viax endpoints
- Displays workflow states and required actions clearly
- Handles client-side validation (duplicated server-side by viax)
- Manages theme/branding presentation

---

## Progressive Integration Strategy

### Phase Approach: Mock → Real

We build with mock data first, then systematically replace each mock with real viax GraphQL integration.

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [1] Build UI Component                                         │
│           ↓                                                     │
│  [2] Define Mock Data Shape (matches expected viax response)    │
│           ↓                                                     │
│  [3] Build with Mock Data Service                               │
│           ↓                                                     │
│  [4] Test UI Functionality                                      │
│           ↓                                                     │
│  [5] Document Required viax Configuration                       │
│           ↓                                                     │
│  [6] Configure viax Backend                                     │
│           ↓                                                     │
│  [7] Replace Mock with Real GraphQL Query/Mutation              │
│           ↓                                                     │
│  [8] Integration Testing                                        │
│           ↓                                                     │
│  [9] ✓ Complete                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mock Data Service Architecture

```typescript
// services/dataService.ts
interface DataService {
  // Toggle between mock and real
  useMock: boolean;

  // Each method checks useMock flag
  getProducts(): Promise<Product[]>;
  getOrders(): Promise<Order[]>;
  // ... etc
}

// Easy swap: flip useMock or replace individual methods
```

### Integration Tracking

Each module will track integration status:

| Module | Mock Status | viax Config | GraphQL Integration |
|--------|-------------|-------------|---------------------|
| Auth | 🟡 Pending | 🔴 Not Started | 🔴 Not Started |
| Products | 🔴 Not Started | 🔴 Not Started | 🔴 Not Started |
| Orders | 🔴 Not Started | 🔴 Not Started | 🔴 Not Started |
| ... | ... | ... | ... |

*This table will be updated as we progress through implementation.*

---

## Design System

### Color Palette

**Primary Brand Colors (from viax):**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-dark` | `#1E1E1E` | Primary backgrounds, headers |
| `--color-dark-alt` | `#2A2A2A` | Secondary backgrounds, cards |
| `--color-gray` | `#525252` | Borders, disabled states |
| `--color-light-gray` | `#EBEBEA` | Dividers, subtle backgrounds |
| `--color-off-white` | `#F2F1F0` | Page backgrounds |
| `--color-white` | `#F8F7F6` | Content areas, inputs |

**Accent Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#90E9B8` | Primary CTAs, highlights, buttons |
| `--color-mint` | `#B6FFF6` | Success states, positive indicators |
| `--color-orange` | `#F26F42` | Alerts, urgent actions |
| `--color-peach` | `#FCD0A1` | Warnings, attention needed |
| `--color-lavender` | `#C3BEF7` | Info states, secondary actions |
| `--color-lime` | `#E6FFD1` | New items, badges |

### Typography

- **Primary Font:** Inter (system sans-serif fallback)
- **Headings:** Inter Semi-Bold/Bold
- **Body:** Inter Regular
- **Data/Numbers:** Inter Tabular (monospace for alignment)

### Component Patterns

- Dark navigation header with orange accent highlights
- Light content areas with subtle shadows
- Card-based layouts for data presentation
- Clear status indicators using accent colors
- Prominent action buttons in green accent (#90E9B8)

---

## Theme Management System (Demo Configurator)

### Purpose

Enable rapid customization of portal appearance for customer demos without code changes. This allows sales and demo teams to quickly rebrand the portal for prospective customers.

### Features

**Visual Theme Editor:**
- Color palette editor with live preview
- Primary, secondary, and accent color pickers
- Automatic contrast checking for accessibility
- Dark/light mode base selection

**Typography Configuration:**
- Font family selection (from approved web fonts)
- Heading and body font pairing
- Font size scaling

**Brand Assets:**
- Logo upload (primary and icon versions)
- Favicon upload
- Background images (optional)

**Preset Management:**
- Save theme as preset with name
- Load existing presets
- Default viax theme reset
- Export/import theme JSON

### Technical Implementation

**CSS Custom Properties:**
All theme values use CSS variables, enabling runtime theming:

```css
:root {
  --theme-primary: #1E1E1E;
  --theme-accent: #90E9B8;
  --theme-background: #F2F1F0;
  --theme-text: #1E1E1E;
  --theme-font-heading: 'Inter', sans-serif;
  --theme-font-body: 'Inter', sans-serif;
  --theme-logo-url: url('/assets/logo.svg');
}
```

**Theme Context Provider:**
React context wraps the application, providing theme state and update functions.

**Local Storage Persistence:**
Theme settings persist in localStorage for demo continuity.

**Theme Presets (Built-in Examples):**
| Preset Name | Description |
|-------------|-------------|
| viax Default | Standard viax dark/green branding |
| Light Professional | White background, navy accents |
| Industrial | Dark grays, safety yellow accents |
| Healthcare | White/blue, soft greens |
| Custom | User-defined |

### Theme Editor UI

Accessible via admin menu or `/demo/theme-editor` route:

```
┌─────────────────────────────────────────────────────────────────┐
│ Theme Editor                                    [Reset] [Save]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Presets: [viax Default ▾] [Load] [Save As...]                  │
│                                                                 │
│ ─── Colors ───────────────────────────────────────────────────  │
│ Primary:     [██████] #1E1E1E                                  │
│ Accent:      [██████] #90E9B8                                  │
│ Background:  [██████] #F2F1F0                                  │
│ Text:        [██████] #1E1E1E                                  │
│                                                                 │
│ ─── Typography ───────────────────────────────────────────────  │
│ Heading Font: [Inter          ▾]                               │
│ Body Font:    [Inter          ▾]                               │
│                                                                 │
│ ─── Brand Assets ─────────────────────────────────────────────  │
│ Logo:    [Upload...] [preview]                                 │
│ Favicon: [Upload...] [preview]                                 │
│                                                                 │
│ ─── Live Preview ─────────────────────────────────────────────  │
│ ┌─────────────────────────────────────────────────────────┐    │
│ │ [Logo] Sample Header                        [Button]    │    │
│ │ Sample card with text and accent elements               │    │
│ └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Functional Modules

### 1. Authentication & Session Management

**Features:**
- SSO integration support
- Multi-organization account switching
- Role-based access control (RBAC)
- Session timeout with graceful re-authentication
- Remember me functionality

**User Roles (Complex Enterprise):**
| Role | Permissions |
|------|-------------|
| Viewer | Browse catalog, view orders (read-only) |
| Buyer | Place orders, manage cart, view own orders |
| Approver | Approve/reject orders within threshold |
| Account Admin | Manage contacts, view all account activity |
| Finance | Invoice management, payment processing |
| Super Admin | Full access, role management, settings |

**Mock Data Required:**
- Sample users with different roles
- Organization hierarchy
- Role permission matrix

---

### 2. Dashboard & Analytics

**Features:**
- Personalized welcome with action items requiring attention
- Key metrics overview (MTD spend, open orders, pending actions)
- Recent activity feed
- Quick action shortcuts
- Spend analytics with trend visualization
- Order volume charts
- Top purchased items
- Budget vs. actual tracking
- Custom date range filtering
- Export to CSV/Excel

**Widgets:**
- Orders Requiring Attention (workflow states)
- Pending Approvals (for approvers)
- Recent Orders
- Spend by Category
- Delivery Calendar
- Invoice Summary
- Asset Alerts (maintenance due, expiring leases)

**Mock Data Required:**
- Historical order data (12 months)
- Spend by category breakdown
- Pending workflow items

---

### 3. Product Catalog & Browsing

**Features:**
- Category navigation (hierarchical)
- Search with autocomplete
- Faceted filtering (category, brand, attributes)
- Product detail pages with specifications
- Configurable product options
- Customer-specific pricing display
- Contract price indicators
- Real-time inventory availability
- Unit of measure selection
- Quantity price breaks display
- Add to cart / Add to quick order
- Product comparison
- Recently viewed
- Favorites / Saved lists

**Configurable Products:**
- Option selection wizard
- Compatibility validation
- Configuration summary
- Price calculation based on selections

**Mock Data Required:**
- Product hierarchy (categories/subcategories)
- Sample products with images and specs
- Price tiers and contract prices
- Inventory levels by location

---

### 4. Quick Order Entry

**Features:**
- SKU/Part number direct entry
- Copy/paste from spreadsheet
- CSV/Excel upload for bulk orders
- Barcode scanner support (camera API)
- Order template management (saved lists)
- Reorder from history
- Line-by-line validation
- Real-time pricing lookup
- Inventory check on entry

**Mock Data Required:**
- SKU lookup table
- Order templates
- Historical order items

---

### 5. Shopping Cart & Checkout

**Features:**
- Persistent cart across sessions
- Multi-ship-to addresses
- Split shipments
- Delivery date selection (where applicable)
- Special instructions per line
- PO number entry
- Cost center / GL code assignment
- Order notes
- Save cart as quote request

**Checkout Flow:**
1. Cart Review
2. Shipping Selection
3. Payment Method Selection
4. Order Review
5. Submission / Approval Routing

**Workflow Integration:**
- Orders route through viax workflow engine
- UI displays current workflow state prominently
- Clear CTAs when user action required
- Approval history visible

**Mock Data Required:**
- Shipping addresses
- Shipping methods with rates
- Payment methods on file

---

### 6. Order Management & History

**Features:**
- Order list with filtering and search
- Status-based filtering
- Date range filtering
- Order detail view
- Line item tracking
- Document access (confirmation, packing slip, invoice)
- Reorder functionality
- Order modification (where allowed by workflow)
- Cancel request submission

**Order Statuses (mapped from viax workflow):**
- Draft
- Pending Approval
- Approved
- Processing
- Partially Shipped
- Shipped
- Delivered
- Completed
- Cancelled
- On Hold

**Mock Data Required:**
- Orders in various statuses
- Order documents
- Tracking information

---

### 7. Account Management

**Features:**
- Company profile view/edit
- Billing address management
- Default shipping addresses
- Tax exemption certificates
- Communication preferences
- Notification settings
- Security settings (password, 2FA)

**Multi-Organization:**
- Organization switcher in header
- Clear indication of current context
- Seamless switching without logout

**Mock Data Required:**
- Company profiles
- Address book
- User preferences

---

### 8. Contact Management

**Features:**
- View organization contacts
- Add/edit contacts (with permission)
- Role assignment
- Department assignment
- Activate/deactivate users
- Invitation management
- Permission level configuration
- Budget limit assignment per user

**Mock Data Required:**
- Contact list with roles
- Department structure
- Budget assignments

---

### 9. Contract & Pricing Management

**Features:**
- View active contracts
- Contract terms display
- Contract-specific pricing visibility
- Volume commitment tracking
- Contract renewal notifications
- Price list access
- Historical price lookup
- Quote request submission

**Mock Data Required:**
- Sample contracts
- Pricing tiers
- Volume commitments

---

### 10. Delivery Tracking

**Features:**
- Shipment list with status
- Real-time tracking integration
- Delivery calendar view
- Proof of delivery access
- Delivery notification preferences
- Exception alerts
- Delivery history

**Mock Data Required:**
- Shipments with tracking numbers
- Carrier information
- Delivery events timeline

---

### 11. Invoice Management

**Features:**
- Invoice list with filtering
- Invoice detail view
- PDF download
- Payment status tracking
- NET terms display (30/60/90)
- Due date highlighting
- Aging report
- Statement generation
- Dispute submission

**Mock Data Required:**
- Invoices in various states
- Payment terms
- Aging data

---

### 12. Payment Processing

**Features:**
- Pay single invoice
- Pay multiple invoices
- Partial payment support
- Payment method management

**Payment Methods:**
| Method | Features |
|--------|----------|
| Credit Card | Saved cards, new card entry, card management |
| ACH | Bank account linking, verification, payment scheduling |
| Purchase Order | PO number entry, PO validation |
| NET Terms | On-account payment, credit limit display |

**Mock Data Required:**
- Saved payment methods
- Payment history
- Credit limit information

---

### 13. Asset Tracking

**Features:**
- Asset registry (all assets associated with account)
- Asset detail view
- Asset type filtering (Purchased, Leased, Consigned)
- Location tracking
- Maintenance schedule
- Service history
- Warranty status
- Depreciation tracking (for purchased)
- Lease/rental terms (for leased)
- Consignment inventory levels
- Asset documentation
- QR code / asset tag lookup

**Lifecycle States:**
- Active
- Under Maintenance
- Decommissioned
- Returned
- Lost/Damaged

**Mock Data Required:**
- Asset inventory
- Maintenance schedules
- Service records
- Lease agreements

---

### 14. Consignment Management

**Features:**
- Consignment inventory dashboard
- Stock level monitoring
- Consumption reporting
- Replenishment requests
- Min/max threshold alerts
- Consignment agreement terms
- Usage history

**Mock Data Required:**
- Consignment inventory items
- Consumption history
- Threshold configurations

---

### 15. Inventory Availability

**Features:**
- Real-time stock check
- Multi-location availability
- ATP (Available to Promise) display
- Backorder visibility
- Expected restock dates
- Alternative product suggestions
- Low stock alerts for favorites

**Mock Data Required:**
- Inventory by location
- ATP data
- Restock schedules

---

### 16. Service Order Management

**Features:**
- Service request submission
- Service type selection (repair, maintenance, installation)
- Asset selection for service
- Issue description with attachments
- Priority selection
- Scheduling preferences
- Technician assignment visibility
- Service status tracking
- SLA tracking and alerts
- Parts associated with service
- Service history per asset
- Maintenance contract display
- Recurring service scheduling

**Service Statuses:**
- Submitted
- Acknowledged
- Scheduled
- In Progress
- Parts Ordered
- Completed
- Closed

**Mock Data Required:**
- Service requests
- Technician assignments
- SLA configurations
- Service history

---

### 17. Training & Resources

**Document Library Features:**
- Category-based organization
- Search functionality
- Document type filtering (PDF, Video, Manual)
- Product-linked documentation
- Version tracking
- Download tracking
- Favorites / bookmarks
- Recently accessed

**Content Types:**
- Product manuals
- Installation guides
- Safety data sheets (SDS)
- Training videos
- How-to guides
- FAQs
- Best practices

**Mock Data Required:**
- Document metadata
- Category structure
- Sample PDFs and video links

---

### 18. Returns & RMA Management

**Features:**
- Return request initiation
- Reason code selection
- Return type (credit, replacement, repair)
- Photo upload for damaged items
- RMA number generation
- Return label generation/access
- Return shipment tracking
- Credit memo tracking
- Restocking fee display
- Approval workflow integration
- Return history

**Return Reasons:**
- Damaged in transit
- Wrong item received
- Defective product
- No longer needed
- Quality issue
- Other (with description)

**Mock Data Required:**
- RMA requests in various states
- Return reasons configuration
- Credit memos

---

### 19. Notifications & Communication

**In-App Notifications:**
- Notification center (bell icon)
- Unread count badge
- Notification categories
- Mark as read/unread
- Quick actions from notification
- Link to related content

**Email Notifications (configurable per event):**
- Order confirmation
- Order status changes
- Shipment notifications
- Delivery confirmation
- Invoice available
- Payment confirmation
- Approval required
- Asset maintenance due
- Contract renewal reminder
- Low consignment stock

**Mock Data Required:**
- Notification feed
- Email preferences

---

### 20. Support & Help

**Features:**
- Contextual help tooltips
- Help center / FAQ
- Contact support form
- Live chat integration (placeholder)
- Account manager contact info
- Support ticket history
- System status page

**Mock Data Required:**
- FAQ content
- Support contact info
- Sample tickets

---

## Page Structure & Navigation

### Primary Navigation (Header)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo] DemoPalooza    [Org Switcher ▾]    [Search...............]      │
│                                                                          │
│ Dashboard | Catalog | Orders | Invoices | Assets | Services | Resources │
│                                                     [Cart(3)] [Bell] [👤]│
└─────────────────────────────────────────────────────────────────────────┘
```

### Secondary Navigation (per section)

Each main section has contextual sub-navigation as tabs or sidebar.

### Page Inventory

| Section | Pages |
|---------|-------|
| Auth | Login, Forgot Password, Org Select |
| Dashboard | Main Dashboard, Analytics |
| Catalog | Browse, Search Results, Product Detail, Compare |
| Quick Order | Quick Entry, Upload, Templates |
| Cart | Cart, Checkout (multi-step) |
| Orders | Order List, Order Detail |
| Invoices | Invoice List, Invoice Detail, Pay Invoices |
| Assets | Asset List, Asset Detail, Consignment |
| Services | Service List, New Request, Service Detail |
| Resources | Document Library, Document Viewer |
| Returns | RMA List, New Return, RMA Detail |
| Account | Profile, Addresses, Contacts, Contracts, Payments, Settings |
| Admin/Demo | Theme Editor, Demo Presets |

---

## Implementation Phases

### Phase 0: Theme System & Demo Tooling
**Timeline: Sprint 0 (Pre-work)**

1. CSS custom properties architecture
2. Theme context provider
3. Theme editor UI
4. Preset save/load functionality
5. Logo/asset upload handling

*This phase runs parallel to Phase 1 to enable demo readiness from day one.*

### Phase 1: Foundation & Core Commerce
**Timeline: Sprint 1-2**

1. Design system implementation (colors, typography, components) — *using theme variables*
2. Authentication & session management
3. Navigation shell
4. Dashboard (basic)
5. Product catalog & browsing
6. Quick order entry
7. Shopping cart & checkout
8. Order history

### Phase 2: Financial & Tracking
**Timeline: Sprint 3-4**

1. Invoice management
2. Payment processing (all methods)
3. Delivery tracking
4. Analytics dashboard
5. Notification system

### Phase 3: Asset & Service Management
**Timeline: Sprint 5-6**

1. Asset tracking
2. Consignment management
3. Inventory availability
4. Service order management
5. SLA tracking

### Phase 4: Account & Support Features
**Timeline: Sprint 7-8**

1. Account management
2. Contact management
3. Contract & pricing
4. Returns/RMA
5. Training & resources
6. Support integration

---

## viax Configuration Requirements

For each module, the following viax components will need configuration:

| Module | viax Components |
|--------|-----------------|
| Products | Product Catalog, Pricing Engine, Inventory |
| Orders | Order Management, Workflow Engine |
| Invoices | AR Module, Payment Gateway Integration |
| Assets | Asset Management, Maintenance Scheduling |
| Services | Service Management, SLA Engine |
| Contacts | CRM, User Management |
| Documents | Document Management |

*Detailed viax configuration will be documented per module during implementation.*

---

## GraphQL API Integration Strategy

### Approach

1. **Schema-First:** Define expected queries/mutations matching viax GraphQL schema
2. **Mock-First:** Build UI with mock data that mirrors viax response shapes exactly
3. **Progressive Integration:** Replace mocks with real viax API calls one module at a time
4. **Error Handling:** Consistent error handling patterns (viax returns structured errors)
5. **Caching:** Apollo Client with appropriate cache policies
6. **Context Passing:** Customer context, org context passed to viax for rules evaluation

### viax GraphQL Patterns

All queries/mutations go through viax's GraphQL gateway. The frontend never contains business logic — it simply:
- Sends the query with context (customer ID, org ID, user permissions)
- viax applies all rules (pricing, availability, permissions)
- Frontend renders what viax returns

### Sample Query Structure

```graphql
# Example: Get products for current customer context
query GetProducts($categoryId: ID, $search: String, $first: Int, $after: String) {
  products(categoryId: $categoryId, search: $search, first: $first, after: $after) {
    edges {
      node {
        id
        sku
        name
        description
        pricing {
          listPrice
          customerPrice
          contractPrice
        }
        availability {
          inStock
          quantity
          leadTime
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Key GraphQL Operations by Module

| Module | Queries | Mutations |
|--------|---------|-----------|
| Auth | `me`, `organizations` | `login`, `switchOrg` |
| Products | `products`, `product`, `categories` | - |
| Cart | `cart` | `addToCart`, `updateCart`, `removeFromCart` |
| Orders | `orders`, `order` | `submitOrder`, `cancelOrder` |
| Invoices | `invoices`, `invoice` | `payInvoice` |
| Assets | `assets`, `asset` | `reportIssue` |
| Services | `serviceOrders`, `serviceOrder` | `createServiceOrder` |

---

## Mock Data Structure

All mock data will be created as JSON files organized by module:

```
/mocks
  /auth
    users.json
    organizations.json
    roles.json
  /products
    categories.json
    products.json
    inventory.json
  /orders
    orders.json
    statuses.json
  /invoices
    invoices.json
    payments.json
  /assets
    assets.json
    maintenance.json
  /services
    serviceOrders.json
    technicians.json
  /documents
    resources.json
  /returns
    rmas.json
```

---

## Success Metrics

- Page load time < 2 seconds
- First meaningful paint < 1 second
- 100% mobile responsive
- WCAG 2.1 AA accessibility compliance
- Intuitive workflow state visibility
- Seamless viax API integration

---

## Next Steps

1. ✅ Requirements gathering (complete)
2. ⏳ Review and approve this plan
3. 🔲 Build design system & component library
4. 🔲 Implement authentication shell
5. 🔲 Build Phase 1 modules with mock data
6. 🔲 Document viax configuration requirements
7. 🔲 Begin GraphQL integration

---

*Document Version: 1.0*
*Created: January 2026*
*Status: Draft - Pending Review*
