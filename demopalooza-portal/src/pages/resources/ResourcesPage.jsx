import { useState } from 'react';
import { Search, Download, Play, FileText, BookOpen, Shield, Video, Lightbulb, HelpCircle } from 'lucide-react';
import { mockResources, mockResourceCategories } from '../../mocks';

const iconMap = {
  'book-open': BookOpen,
  'wrench': FileText,
  'shield': Shield,
  'video': Video,
  'lightbulb': Lightbulb,
  'help-circle': HelpCircle,
};

function ResourceCard({ resource }) {
  const isVideo = resource.type === 'video';

  return (
    <div className="card">
      {isVideo && resource.thumbnail && (
        <div style={{ position: 'relative', marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <img src={resource.thumbnail} alt={resource.title} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(30, 30, 30, 0.4)' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#90E9B8', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={20} style={{ color: '#1E1E1E', marginLeft: '0.25rem' }} />
            </div>
          </div>
          {resource.duration && (
            <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(30, 30, 30, 0.8)', color: 'white', fontSize: '0.75rem', borderRadius: '0.25rem' }}>
              {resource.duration}
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {!isVideo && (
          <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'rgba(144, 233, 184, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={18} style={{ color: '#1E1E1E' }} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontWeight: 500 }}>{resource.title}</h3>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>{resource.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.75rem', color: '#6B7280' }}>
            <span style={{ textTransform: 'uppercase' }}>{resource.type}</span>
            {resource.fileSize && <span>{resource.fileSize}</span>}
            {resource.version && <span>v{resource.version}</span>}
          </div>
        </div>
      </div>

      {resource.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.75rem' }}>
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ padding: '0.125rem 0.5rem', backgroundColor: '#E5E7EB', fontSize: '0.75rem', color: '#6B7280', borderRadius: '0.25rem' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
          {resource.downloadCount ? `${resource.downloadCount} downloads` : ''}
          {resource.viewCount ? `${resource.viewCount} views` : ''}
        </span>
        <a
          href={resource.url}
          className="btn btn-primary btn-sm"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          {isVideo ? (
            <>
              <Play size={14} />
              Watch
            </>
          ) : (
            <>
              <Download size={14} />
              Download
            </>
          )}
        </a>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredResources = mockResources.filter((res) => {
    if (selectedCategory && res.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.description?.toLowerCase().includes(q) ||
        res.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredResources = mockResources.filter((r) => r.featured);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Resources & Training</h1>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search resources by name, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {/* Categories Sidebar */}
        <div style={{ width: '16rem', flexShrink: 0 }}>
          <div className="card">
            <h3 style={{ fontWeight: 500, marginBottom: '0.75rem' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button
                onClick={() => setSelectedCategory('')}
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
                  gap: '0.5rem',
                  backgroundColor: !selectedCategory ? 'rgba(144, 233, 184, 0.2)' : 'transparent',
                  color: !selectedCategory ? '#1E1E1E' : '#6B7280',
                  fontWeight: !selectedCategory ? 500 : 400,
                }}
              >
                <BookOpen size={16} />
                All Resources
              </button>
              {mockResourceCategories.map((cat) => {
                const Icon = iconMap[cat.icon] || FileText;
                const count = mockResources.filter((r) => r.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
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
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={16} />
                      {cat.name}
                    </span>
                    <span style={{ fontSize: '0.75rem' }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{ flex: 1 }}>
          {!selectedCategory && !searchQuery && featuredResources.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Featured Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {featuredResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {selectedCategory
                  ? mockResourceCategories.find((c) => c.id === selectedCategory)?.name
                  : 'All Resources'}
              </h2>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>{filteredResources.length} resources</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {filteredResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
            {filteredResources.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <BookOpen size={48} style={{ margin: '0 auto', color: '#6B7280', marginBottom: '1rem' }} />
                <p style={{ color: '#6B7280' }}>No resources found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
