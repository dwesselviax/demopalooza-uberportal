import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CatalogPage from './pages/catalog/CatalogPage';
import ProductDetailPage from './pages/catalog/ProductDetailPage';
import CartPage from './pages/orders/CartPage';
import OrdersPage from './pages/orders/OrdersPage';
import OrderDetailPage from './pages/orders/OrderDetailPage';
import InvoicesPage from './pages/invoices/InvoicesPage';
import AssetsPage from './pages/assets/AssetsPage';
import ServicesPage from './pages/services/ServicesPage';
import ResourcesPage from './pages/resources/ResourcesPage';
import ReturnsPage from './pages/returns/ReturnsPage';
import AccountPage from './pages/account/AccountPage';
import ThemeEditorPage from './pages/admin/ThemeEditorPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="animate-pulse text-gray">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:orderId" element={<OrderDetailPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="returns" element={<ReturnsPage />} />
        <Route path="account/*" element={<AccountPage />} />
        <Route path="admin/theme" element={<ThemeEditorPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter basename="/demopalooza-uberportal">
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
