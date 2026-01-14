/**
 * Theme Management System
 * Comprehensive theme management with persistence, performance, and accessibility
 */

import { useState, useEffect } from 'react';
import { useTheme, useThemeToggle } from '../theme-manager';
import { themeClasses, themeDetection } from '../theme-utils';
import { ThemeMode } from '../persistence';

// Core theme manager
export {
  useTheme,
  useThemeToggle,
  useThemeCSS,
  useHydratedTheme,
  ThemeCSSManager,
  type ThemeManager,
  type ThemeContextType
} from '../theme-manager';

// Theme utilities
export {
  themeDetection,
  themeValidation,
  themeClasses,
  themeTransitions,
  themeAccessibility,
  themePerformance,
  themeStorage
} from '../theme-utils';

// Persistence layer
export {
  getPersistence,
  persistenceUtils,
  type ThemeMode,
  type ThemeConfig,
  type PersistenceLayer
} from '../persistence';

// Enhanced theme provider
export { ThemeProvider } from '../../providers/ThemeProvider';

/**
 * Convenience exports for common use cases
 */

// Quick theme toggle hook
export const useQuickThemeToggle = () => {
  const { toggle, theme, isLoading } = useThemeToggle();
  return { toggle, theme, isLoading };
};

// Theme-aware className helper
export const useThemeClasses = () => {
  const { currentTheme, resolvedTheme } = useTheme();
  return themeClasses.getThemeClasses(currentTheme, resolvedTheme);
};

// System theme detection hook
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<ThemeMode>('light');
  
  useEffect(() => {
    setSystemTheme(themeDetection.getSystemTheme());
    
    const cleanup = themeDetection.onSystemThemeChange(setSystemTheme);
    return cleanup;
  }, []);
  
  return systemTheme;
};