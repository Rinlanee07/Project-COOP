/**
 * Theme Utilities
 * Additional helper functions for theme management
 */

import { ThemeMode } from './persistence';

/**
 * Theme detection utilities
 */
export const themeDetection = {
  /**
   * Detect system theme preference
   */
  getSystemTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to detect system theme:', error);
      return 'light';
    }
  },

  /**
   * Listen for system theme changes
   */
  onSystemThemeChange(callback: (theme: ThemeMode) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handler = (e: MediaQueryListEvent) => {
        callback(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      
      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    } catch (error) {
      console.error('Failed to listen for system theme changes:', error);
      return () => {};
    }
  }
};

/**
 * Theme validation utilities
 */
export const themeValidation = {
  /**
   * Check if a theme value is valid
   */
  isValidTheme(theme: unknown): theme is ThemeMode {
    return typeof theme === 'string' && ['light', 'dark', 'system'].includes(theme);
  },

  /**
   * Sanitize theme value with fallback
   */
  sanitizeTheme(theme: unknown, fallback: ThemeMode = 'light'): ThemeMode {
    return this.isValidTheme(theme) ? theme : fallback;
  },

  /**
   * Get the opposite theme (for toggle functionality)
   */
  getOppositeTheme(theme: ThemeMode): ThemeMode {
    switch (theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'light';
      case 'system':
        // For system theme, toggle to the opposite of current system preference
        return themeDetection.getSystemTheme() === 'light' ? 'dark' : 'light';
      default:
        return 'light';
    }
  }
};

/**
 * CSS class utilities for theme-aware styling
 */
export const themeClasses = {
  /**
   * Get CSS classes for current theme
   */
  getThemeClasses(theme: ThemeMode, resolvedTheme?: string): string[] {
    const classes: string[] = [];
    
    classes.push(`theme-${theme}`);
    
    if (resolvedTheme && resolvedTheme !== theme) {
      classes.push(`resolved-${resolvedTheme}`);
    }
    
    return classes;
  },

  /**
   * Generate conditional classes based on theme
   */
  conditional(theme: ThemeMode, lightClass: string, darkClass: string, systemClass?: string): string {
    switch (theme) {
      case 'light':
        return lightClass;
      case 'dark':
        return darkClass;
      case 'system':
        return systemClass || (themeDetection.getSystemTheme() === 'light' ? lightClass : darkClass);
      default:
        return lightClass;
    }
  }
};

/**
 * Theme transition utilities
 */
export const themeTransitions = {
  /**
   * Apply smooth transition for theme changes
   */
  enableTransitions(): void {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
      }
    `;
    style.id = 'theme-transitions';
    
    document.head.appendChild(style);
    
    // Remove transitions after a short delay to prevent interference
    setTimeout(() => {
      const existingStyle = document.getElementById('theme-transitions');
      if (existingStyle) {
        existingStyle.remove();
      }
    }, 300);
  },

  /**
   * Disable transitions temporarily
   */
  disableTransitions(): void {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        transition: none !important;
      }
    `;
    style.id = 'disable-transitions';
    
    document.head.appendChild(style);
    
    // Re-enable after next frame
    requestAnimationFrame(() => {
      const existingStyle = document.getElementById('disable-transitions');
      if (existingStyle) {
        existingStyle.remove();
      }
    });
  }
};

/**
 * Theme accessibility utilities
 */
export const themeAccessibility = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mediaQuery.matches;
    } catch (error) {
      console.error('Failed to check reduced motion preference:', error);
      return false;
    }
  },

  /**
   * Get appropriate ARIA attributes for theme controls
   */
  getThemeControlAttributes(currentTheme: ThemeMode) {
    return {
      'aria-label': `Switch to ${themeValidation.getOppositeTheme(currentTheme)} theme`,
      'aria-pressed': currentTheme === 'dark' ? 'true' : 'false',
      'role': 'switch'
    };
  },

  /**
   * Announce theme changes to screen readers
   */
  announceThemeChange(newTheme: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${newTheme} mode`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }
};

/**
 * Performance optimization utilities
 */
export const themePerformance = {
  /**
   * Debounced theme setter to prevent rapid changes
   */
  createDebouncedThemeSetter(
    setter: (theme: ThemeMode) => void,
    delay: number = 100
  ): (theme: ThemeMode) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (theme: ThemeMode) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setter(theme), delay);
    };
  },

  /**
   * Throttled theme change handler
   */
  createThrottledThemeHandler(
    handler: (theme: ThemeMode) => void,
    limit: number = 100
  ): (theme: ThemeMode) => void {
    let inThrottle = false;
    
    return (theme: ThemeMode) => {
      if (!inThrottle) {
        handler(theme);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

/**
 * Theme storage utilities
 */
export const themeStorage = {
  /**
   * Get theme from URL parameters (for sharing themed links)
   */
  getThemeFromURL(): ThemeMode | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const params = new URLSearchParams(window.location.search);
      const theme = params.get('theme');
      return themeValidation.isValidTheme(theme) ? theme : null;
    } catch (error) {
      console.error('Failed to get theme from URL:', error);
      return null;
    }
  },

  /**
   * Set theme in URL parameters
   */
  setThemeInURL(theme: ThemeMode): void {
    if (typeof window === 'undefined') return;
    
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', theme);
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      console.error('Failed to set theme in URL:', error);
    }
  },

  /**
   * Remove theme from URL parameters
   */
  removeThemeFromURL(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('theme');
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      console.error('Failed to remove theme from URL:', error);
    }
  }
};