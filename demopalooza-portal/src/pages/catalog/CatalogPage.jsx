import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ShoppingCart, ChevronRight } from 'lucide-react';
import { mockProducts, mockCategories } from '../../mocks';
import { useCart } from '../../contexts/CartContext';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function ProductCard({ product, viewMode }) {
  const { addItem } = useCart();
  const price = product.pricing?.customerPrice || product.pricing?.listPrice;
  const hasContractPrice = product.pricing?.contractPrice && product.pricing.contractPrice < price;

  if (viewMode === 'list') {
    return (
      <div className="card" style={{ display: 'flex', gap: '1rem' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '6rem', height: '6rem', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link to={`/catalog/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h3>
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{product.sku}</p>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>{product.shortDescription}</p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{formatCurrency(price)}</p>
            {hasContractPrice && (
              <p style={{ fontSize: '0.875rem', color: '#90E9B8' }}>
                Contract: {formatCurrency(product.pricing.contractPrice)}
              </p>
            )}
          </div>
          <button onClick={() => addItem(product)} className="btn btn-primary btn-sm">
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
      />
      <Link to={`/catalog/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h3>
      </Link>
      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{product.sku}</p>
      <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{formatCurrency(price)}</p>
          {hasContractPrice && (
            <p style={{ fontSize: '0.75rem', color: '#90E9B8' }}>
              Contract: {formatCurrency(product.pricing.contractPrice)}
            </p>
          )}
        </div>
        <button onClick={() => addItem(product)} className="btn btn-primary btn-sm">
          <ShoppingCart size={14} />
        </button>
      </div>
      {!product.availability?.inStock && (
        <p style={{ fontSize: '0.75rem', color: '#F97316', marginTop: '0.5rem' }}>
          Lead time: {product.availability?.leadTime || 'Contact us'}
        </p>
      )}
    </div>
  );
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const rootCategories = mockCategories.filter((c) => !c.parentId);

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    if (selectedCategory) {
      const category = mockCategories.find((c) => c.id === selectedCategory);
      const childIds = category?.children || [];
      products = products.filter(
        (p) => p.categoryId === selectedCategory || childIds.includes(p.categoryId)
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return products;
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Product Catalog</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: viewMode === 'grid' ? '#90E9B8' : 'transparent',
              color: viewMode === 'grid' ? '#1E1E1E' : '#6B7280',
            }}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: viewMode === 'list' ? '#90E9B8' : 'transparent',
              color: viewMode === 'list' ? '#1E1E1E' : '#6B7280',
            }}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search products by name, SKU, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <button className="btn btn-outline">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {/* Categories Sidebar */}
        <div style={{ width: '16rem', flexShrink: 0 }}>
          <div className="card">
            <h3 style={{ fontWeight: 500, marginBottom: '0.75rem' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: !selectedCategory ? 'rgba(144, 233, 184, 0.2)' : 'transparent',
                  color: !selectedCategory ? '#1E1E1E' : '#6B7280',
                  fontWeight: !selectedCategory ? 500 : 400,
                }}
              >
                All Products
              </button>
              {rootCategories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: selectedCategory === cat.id ? 'rgba(144, 233, 184, 0.2)' : 'transparent',
                      color: selectedCategory === cat.id ? '#1E1E1E' : '#6B7280',
                      fontWeight: selectedCategory === cat.id ? 500 : 400,
                    }}
                  >
                    {cat.name}
                    {cat.children?.length > 0 && <ChevronRight size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>{filteredProducts.length} products</p>
          <div
            style={
              viewMode === 'grid'
                ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }
                : { display: 'flex', flexDirection: 'column', gap: '1rem' }
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6B7280' }}>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
