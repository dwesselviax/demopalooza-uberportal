import { createContext, useContext, useState, useEffect } from 'react';

const defaultTheme = {
  name: 'viax Default',
  colors: {
    primary: '#1E1E1E',
    primaryAlt: '#2A2A2A',
    accent: '#90E9B8',
    accentHover: '#7DD4A3',
    background: '#F2F1F0',
    surface: '#F8F7F6',
    text: '#1E1E1E',
    textMuted: '#525252',
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  logo: null,
};

const presets = {
  'viax-default': {
    name: 'viax Default',
    colors: {
      primary: '#1E1E1E',
      primaryAlt: '#2A2A2A',
      accent: '#90E9B8',
      accentHover: '#7DD4A3',
      background: '#F2F1F0',
      surface: '#F8F7F6',
      text: '#1E1E1E',
      textMuted: '#525252',
    },
  },
  'light-professional': {
    name: 'Light Professional',
    colors: {
      primary: '#1E3A5F',
      primaryAlt: '#2A4A6F',
      accent: '#3B82F6',
      accentHover: '#2563EB',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1E3A5F',
      textMuted: '#6B7280',
    },
  },
  'industrial': {
    name: 'Industrial',
    colors: {
      primary: '#27272A',
      primaryAlt: '#3F3F46',
      accent: '#FACC15',
      accentHover: '#EAB308',
      background: '#F4F4F5',
      surface: '#FFFFFF',
      text: '#27272A',
      textMuted: '#71717A',
    },
  },
  'healthcare': {
    name: 'Healthcare',
    colors: {
      primary: '#0F766E',
      primaryAlt: '#115E59',
      accent: '#14B8A6',
      accentHover: '#0D9488',
      background: '#F0FDFA',
      surface: '#FFFFFF',
      text: '#134E4A',
      textMuted: '#5EEAD4',
    },
  },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('demopalooza-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('demopalooza-theme', JSON.stringify(theme));
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-primary-alt', theme.colors.primaryAlt);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-accent-hover', theme.colors.accentHover);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-muted', theme.colors.textMuted);
    root.style.setProperty('--font-heading', theme.fonts?.heading || defaultTheme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts?.body || defaultTheme.fonts.body);
  };

  const updateTheme = (updates) => {
    setTheme((prev) => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...updates.colors },
      fonts: { ...prev.fonts, ...updates.fonts },
    }));
  };

  const loadPreset = (presetKey) => {
    const preset = presets[presetKey];
    if (preset) {
      setTheme((prev) => ({
        ...prev,
        name: preset.name,
        colors: { ...prev.colors, ...preset.colors },
      }));
    }
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const exportTheme = () => {
    return JSON.stringify(theme, null, 2);
  };

  const importTheme = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      setTheme(imported);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        presets,
        updateTheme,
        loadPreset,
        resetTheme,
        exportTheme,
        importTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
