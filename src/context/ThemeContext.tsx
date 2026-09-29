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
  background: '#05080D',
  secondaryBg: '#080D14',
  surface: '#0B111A',
  elevatedSurface: '#0F1722',
  border: '#182532',
  primary: '#35D6C7',
  secondary: '#4DA3FF',
  text: '#F4F7FA',
  textSecondary: '#8B9AAA',
  warning: '#F5B942',
  danger: '#FF6678',
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#F4F8FA',
  secondaryBg: '#EAF1F4',
  surface: '#FFFFFF',
  elevatedSurface: '#F8FBFC',
  border: '#D7E2E7',
  primary: '#087F7A',
  secondary: '#1769AA',
  text: '#102027',
  textSecondary: '#52656D',
  warning: '#A56A00',
  danger: '#C63D4F',
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
