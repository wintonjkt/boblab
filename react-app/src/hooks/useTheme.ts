import { useThemeContext } from '@/contexts/ThemeContext';

/**
 * Custom hook to access theme context
 *
 * Provides access to:
 * - theme: Current resolved theme ('light' | 'dark')
 * - themeMode: User's theme preference ('light' | 'dark' | 'system')
 * - toggleTheme: Function to toggle between light and dark
 * - setTheme: Function to set a specific theme mode
 *
 * Features:
 * - System preference detection using prefers-color-scheme
 * - localStorage persistence (key: 'theme-preference')
 * - Automatic theme application via CSS class on document.body
 *
 * @throws Error if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme, setTheme } = useTheme();
 *
 * // Toggle between light and dark
 * <button onClick={toggleTheme}>Toggle Theme</button>
 *
 * // Set specific theme mode
 * <button onClick={() => setTheme('system')}>Use System Theme</button>
 * ```
 */
export const useTheme = () => {
  return useThemeContext();
};

// Made with Bob
