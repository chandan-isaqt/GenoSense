import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  secondaryBg: string;
  surface: string;
  elevatedSurface: string;
  border: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  warning: string;
  danger: string;
}

export const DARK_THEME_COLORS: ThemeColors = {
  background: '#06111D',
  secondaryBg: '#0B1A29',
  surface: '#102434',
  elevatedSurface: '#162F44',
  border: '#1B3852',
  primary: '#43E6D1',
  secondary: '#5CA8FF',
  text: '#F5FAFC',
  textSecondary: '#8EA2B3',
  warning: '#FFB84D',
  danger: '#FF6878',
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#F4F8F9',
  secondaryBg: '#E8F0F2',
  surface: '#FFFFFF',
  elevatedSurface: '#F8FBFC',
  border: '#D3E0E8',
  primary: '#087F7A',
  secondary: '#1769AA',
  text: '#102027',
  textSecondary: '#556877',
  warning: '#B37400',
  danger: '#D32F2F',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STORAGE_KEY = 'genosense-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Fallback
    }
    return 'dark';
  });

  const applyThemeToDOM = (activeTheme: Theme) => {
    const root = document.documentElement;
    if (activeTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable
    }
  }, [theme]);

  // Listen to system changes if user hasn't explicitly set a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (!saved) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const colors = theme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
