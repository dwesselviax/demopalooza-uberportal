import { useState } from 'react';
import { Palette, Type, Image, RotateCcw, Download, Upload } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

function ColorInput({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '0.875rem' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', border: '2px solid #E5E7EB', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '6rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem', fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
}

export default function ThemeEditorPage() {
  const { theme, presets, updateTheme, loadPreset, resetTheme, exportTheme, importTheme } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState('');

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    if (presetKey) {
      loadPreset(presetKey);
    }
  };

  const handleExport = () => {
    const data = exportTheme();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.replace(/\s+/g, '-').toLowerCase()}-theme.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        importTheme(event.target?.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Theme Editor</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={resetTheme} className="btn btn-outline">
            <RotateCcw size={18} />
            Reset
          </button>
          <button onClick={handleExport} className="btn btn-outline">
            <Download size={18} />
            Export
          </button>
          <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
            <Upload size={18} />
            Import
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Editor Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Presets */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Palette size={20} />
              <h3 style={{ fontWeight: 600 }}>Presets</h3>
            </div>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="input"
            >
              <option value="">Select a preset...</option>
              {Object.entries(presets).map(([key, preset]) => (
                <option key={key} value={key}>{preset.name}</option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Palette size={20} />
              <h3 style={{ fontWeight: 600 }}>Colors</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ColorInput
                label="Primary"
                value={theme.colors.primary}
                onChange={(v) => updateTheme({ colors: { primary: v } })}
              />
              <ColorInput
                label="Primary Alt"
                value={theme.colors.primaryAlt}
                onChange={(v) => updateTheme({ colors: { primaryAlt: v } })}
              />
              <ColorInput
                label="Accent"
                value={theme.colors.accent}
                onChange={(v) => updateTheme({ colors: { accent: v } })}
              />
              <ColorInput
                label="Accent Hover"
                value={theme.colors.accentHover}
                onChange={(v) => updateTheme({ colors: { accentHover: v } })}
              />
              <ColorInput
                label="Background"
                value={theme.colors.background}
                onChange={(v) => updateTheme({ colors: { background: v } })}
              />
              <ColorInput
                label="Surface"
                value={theme.colors.surface}
                onChange={(v) => updateTheme({ colors: { surface: v } })}
              />
              <ColorInput
                label="Text"
                value={theme.colors.text}
                onChange={(v) => updateTheme({ colors: { text: v } })}
              />
              <ColorInput
                label="Muted Text"
                value={theme.colors.textMuted}
                onChange={(v) => updateTheme({ colors: { textMuted: v } })}
              />
            </div>
          </div>

          {/* Typography */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Type size={20} />
              <h3 style={{ fontWeight: 600 }}>Typography</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Heading Font</label>
                <select
                  value={theme.fonts?.heading || "'Inter', sans-serif"}
                  onChange={(e) => updateTheme({ fonts: { heading: e.target.value } })}
                  className="input"
                >
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="system-ui, sans-serif">System UI</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Body Font</label>
                <select
                  value={theme.fonts?.body || "'Inter', sans-serif"}
                  onChange={(e) => updateTheme({ fonts: { body: e.target.value } })}
                  className="input"
                >
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="system-ui, sans-serif">System UI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Image size={20} />
              <h3 style={{ fontWeight: 600 }}>Brand Assets</h3>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Logo URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={theme.logo || ''}
                onChange={(e) => updateTheme({ logo: e.target.value })}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Live Preview</h3>

          {/* Sample Header */}
          <div
            style={{ borderRadius: '1rem', padding: '1rem', marginBottom: '1rem', backgroundColor: theme.colors.primary }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.accent }}
              >
                <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>D</span>
              </div>
              <span style={{ color: theme.colors.surface, fontWeight: 500 }}>
                DemoPalooza
              </span>
            </div>
          </div>

          {/* Sample Card */}
          <div
            style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem', backgroundColor: theme.colors.surface, border: '1px solid #EBEBEA' }}
          >
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: theme.colors.text }}>
              Sample Card
            </h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: theme.colors.textMuted }}>
              This is how content will appear with your selected theme.
            </p>
            <button
              style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: theme.colors.accent, color: theme.colors.primary }}
            >
              Primary Button
            </button>
          </div>

          {/* Sample Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span
              style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, backgroundColor: theme.colors.accent, color: theme.colors.primary }}
            >
              Success
            </span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, backgroundColor: '#FED7AA', color: '#1E1E1E' }}>
              Warning
            </span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, backgroundColor: '#DDD6FE', color: '#1E1E1E' }}>
              Info
            </span>
          </div>

          {/* Sample Input */}
          <div
            style={{
              borderRadius: '0.75rem',
              border: '1px solid #EBEBEA',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              backgroundColor: theme.colors.surface,
              color: theme.colors.textMuted,
            }}
          >
            Sample input field...
          </div>

          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '1.5rem' }}>
            Current theme: <strong>{theme.name}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
