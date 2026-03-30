import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme as CarbonTheme } from '@carbon/react';
import { Theme, ThemeMode, ThemeContextType } from '@/types';

const THEME_STORAGE_KEY = 'theme-preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Get the system's preferred color scheme
 */
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches ? 'dark' : 'light';
};

/**
 * Get the stored theme preference from localStorage
 */
const getStoredTheme = (): ThemeMode | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored as ThemeMode;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return null;
};

/**
 * Resolve the actual theme based on the theme mode
 */
const resolveTheme = (mode: ThemeMode): Theme => {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize theme mode from localStorage or default to 'system'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return getStoredTheme() || 'system';
  });

  // Resolve the actual theme (light or dark)
  const [theme, setTheme] = useState<Theme>(() => {
    return resolveTheme(themeMode);
  });

  // Apply theme class to document.documentElement for Carbon
  useEffect(() => {
    const root = document.documentElement;
    
    // Set data-carbon-theme attribute for Carbon components
    root.setAttribute('data-carbon-theme', theme === 'dark' ? 'g100' : 'white');
    
    // Also maintain body class for backward compatibility
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode]);

  // Save theme preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [themeMode]);

  const handleSetTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    setTheme(resolveTheme(mode));
  };

  const toggleTheme = () => {
    // Toggle between light and dark (skip system)
    const newMode: ThemeMode = theme === 'light' ? 'dark' : 'light';
    handleSetTheme(newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
        setTheme: handleSetTheme
      }}
    >
      <CarbonTheme theme={theme === 'dark' ? 'g100' : 'white'}>
        {children}
      </CarbonTheme>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Made with Bob
