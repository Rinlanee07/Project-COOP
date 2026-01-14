/**
 * Enhanced Theme Manager
 * Extends next-themes with persistence integration and custom functionality
 */

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ThemeMode, getPersistence } from './persistence';
import { performanceUtils } from './preference-utils';

export interface ThemeManager {
  currentTheme: ThemeMode;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
  isLoading: boolean;
  toggleTheme(): void;
  setTheme(theme: ThemeMode): void;
}

export interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
}

// Debounced theme setter to prevent rapid changes
const debouncedThemeOperations = new Map<string, (...args: any[]) => void>();

function getDebouncedThemeSetter(key: string, operation: (theme: ThemeMode) => Promise<void>) {
  if (!debouncedThemeOperations.has(key)) {
    debouncedThemeOperations.set(key, 
      performanceUtils.advancedDebounce(operation, 150, true) // 150ms debounce with immediate execution
    );
  }
  return debouncedThemeOperations.get(key)!;
}

/**
 * Enhanced useTheme hook that integrates with persistence layer
 */
export function useTheme(): ThemeManager {
  const { theme, setTheme: setNextTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');

  // Memoize persistence instance to prevent recreating
  const persistence = useMemo(() => getPersistence(), []);

  // Initialize theme from persistence on mount
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = await performanceUtils.measureOperation(
          () => persistence.loadTheme(),
          'theme-init'
        );
        
        if (savedTheme && savedTheme !== theme) {
          setNextTheme(savedTheme);
        }
        
        setCurrentTheme((savedTheme || theme || 'light') as ThemeMode);
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        // Fallback to current theme or light
        setCurrentTheme((theme || 'light') as ThemeMode);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [theme, setNextTheme, persistence]);

  // Optimized theme setter with debouncing
  const setTheme = useCallback(async (newTheme: ThemeMode) => {
    if (newTheme === currentTheme) return; // Skip if same theme
    
    try {
      setIsLoading(true);
      
      // Use debounced operation to prevent rapid changes
      const debouncedSetter = getDebouncedThemeSetter('main', async (theme: ThemeMode) => {
        await performanceUtils.measureOperation(async () => {
          await persistence.saveTheme(theme);
          setNextTheme(theme);
          setCurrentTheme(theme);
        }, 'theme-change');
      });
      
      debouncedSetter(newTheme);
      
    } catch (error) {
      console.error('Failed to set theme:', error);
      // Still update the UI even if persistence fails
      setNextTheme(newTheme);
      setCurrentTheme(newTheme);
    } finally {
      // Use a small delay to prevent loading flicker
      setTimeout(() => setIsLoading(false), 50);
    }
  }, [currentTheme, setNextTheme, persistence]);

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [currentTheme, setTheme]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    currentTheme,
    resolvedTheme,
    systemTheme,
    isLoading,
    toggleTheme,
    setTheme
  }), [currentTheme, resolvedTheme, systemTheme, isLoading, toggleTheme, setTheme]);
}

/**
 * Simplified hook for theme toggle functionality with memoization
 */
export function useThemeToggle() {
  const { currentTheme, isLoading, toggleTheme } = useTheme();
  
  // Memoize the return object
  return useMemo(() => ({
    theme: currentTheme,
    isLoading,
    toggle: toggleTheme
  }), [currentTheme, isLoading, toggleTheme]);
}

/**
 * CSS Variable Management for custom theme properties
 */
export class ThemeCSSManager {
  private static instance: ThemeCSSManager;
  private customProperties: Map<string, string> = new Map();
  private applyThrottled: (theme: ThemeMode) => void;

  constructor() {
    // Throttle CSS variable applications to prevent excessive DOM updates
    this.applyThrottled = performanceUtils.throttle(
      this.applyThemeVariablesInternal.bind(this), 
      16 // ~60fps
    );
  }

  static getInstance(): ThemeCSSManager {
    if (!ThemeCSSManager.instance) {
      ThemeCSSManager.instance = new ThemeCSSManager();
    }
    return ThemeCSSManager.instance;
  }

  /**
   * Set a custom CSS variable for the current theme
   */
  setCustomProperty(property: string, value: string, theme?: ThemeMode): void {
    const key = theme ? `${property}-${theme}` : property;
    
    // Skip if value hasn't changed
    if (this.customProperties.get(key) === value) return;
    
    this.customProperties.set(key, value);
    
    if (typeof document !== 'undefined') {
      performanceUtils.measureSync(() => {
        const root = document.documentElement;
        const cssProperty = property.startsWith('--') ? property : `--${property}`;
        root.style.setProperty(cssProperty, value);
      }, 'css-property-set');
    }
  }

  /**
   * Get a custom CSS variable value
   */
  getCustomProperty(property: string, theme?: ThemeMode): string | undefined {
    const key = theme ? `${property}-${theme}` : property;
    return this.customProperties.get(key);
  }

  /**
   * Remove a custom CSS variable
   */
  removeCustomProperty(property: string, theme?: ThemeMode): void {
    const key = theme ? `${property}-${theme}` : property;
    this.customProperties.delete(key);
    
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const cssProperty = property.startsWith('--') ? property : `--${property}`;
      root.style.removeProperty(cssProperty);
    }
  }

  /**
   * Apply theme-specific CSS variables (throttled)
   */
  applyThemeVariables(theme: ThemeMode): void {
    this.applyThrottled(theme);
  }

  /**
   * Internal method for applying theme variables
   */
  private applyThemeVariablesInternal(theme: ThemeMode): void {
    if (typeof document === 'undefined') return;

    performanceUtils.measureSync(() => {
      const root = document.documentElement;
      
      // Apply theme-specific variables
      this.customProperties.forEach((value, key) => {
        if (key.endsWith(`-${theme}`)) {
          const property = key.replace(`-${theme}`, '');
          const cssProperty = property.startsWith('--') ? property : `--${property}`;
          root.style.setProperty(cssProperty, value);
        }
      });
    }, 'apply-theme-variables');
  }

  /**
   * Initialize default theme variables
   */
  initializeDefaults(): void {
    // Set up default CSS variables for themes
    const defaults = {
      light: {
        'theme-background': '#ffffff',
        'theme-foreground': '#000000',
        'theme-primary': '#0070f3',
        'theme-secondary': '#666666',
        'theme-accent': '#f0f0f0',
        'theme-border': '#e1e1e1'
      },
      dark: {
        'theme-background': '#000000',
        'theme-foreground': '#ffffff',
        'theme-primary': '#0070f3',
        'theme-secondary': '#999999',
        'theme-accent': '#1a1a1a',
        'theme-border': '#333333'
      }
    };

    Object.entries(defaults).forEach(([theme, variables]) => {
      Object.entries(variables).forEach(([property, value]) => {
        this.setCustomProperty(property, value, theme as ThemeMode);
      });
    });
  }

  /**
   * Batch update multiple properties for better performance
   */
  batchUpdateProperties(updates: Array<{ property: string; value: string; theme?: ThemeMode }>): void {
    performanceUtils.measureSync(() => {
      const root = typeof document !== 'undefined' ? document.documentElement : null;
      
      updates.forEach(({ property, value, theme }) => {
        const key = theme ? `${property}-${theme}` : property;
        this.customProperties.set(key, value);
        
        if (root) {
          const cssProperty = property.startsWith('--') ? property : `--${property}`;
          root.style.setProperty(cssProperty, value);
        }
      });
    }, 'batch-css-update');
  }
}

/**
 * Hook for managing custom CSS variables with memoization
 */
export function useThemeCSS() {
  const { currentTheme } = useTheme();
  const cssManager = useMemo(() => ThemeCSSManager.getInstance(), []);

  useEffect(() => {
    cssManager.applyThemeVariables(currentTheme);
  }, [currentTheme, cssManager]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    setCustomProperty: cssManager.setCustomProperty.bind(cssManager),
    getCustomProperty: cssManager.getCustomProperty.bind(cssManager),
    removeCustomProperty: cssManager.removeCustomProperty.bind(cssManager),
    batchUpdateProperties: cssManager.batchUpdateProperties.bind(cssManager)
  }), [cssManager]);
}

/**
 * Hydration-safe theme hook that prevents flash of incorrect theme
 */
export function useHydratedTheme() {
  const [mounted, setMounted] = useState(false);
  const themeManager = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => {
    // Return loading state until hydrated
    if (!mounted) {
      return {
        ...themeManager,
        isLoading: true,
        currentTheme: 'light' as ThemeMode,
        resolvedTheme: undefined
      };
    }

    return themeManager;
  }, [mounted, themeManager]);
}