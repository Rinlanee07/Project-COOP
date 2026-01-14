"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, memo } from 'react';
import { ThemeMode, SupportedLanguage, getPersistence } from '../lib/persistence';
import { getLanguageManager, LanguageState } from '../lib/language-manager';
import { useTheme as useNextTheme } from 'next-themes';
import { performanceUtils } from '../lib/preference-utils';

// Type definitions for global state
export interface ThemeState {
  current: ThemeMode;
  resolved: string | undefined;
  isLoading: boolean;
}

export interface GlobalLanguageState {
  current: SupportedLanguage;
  isLoading: boolean;
}

export interface GlobalStateContextType {
  theme: ThemeState;
  language: GlobalLanguageState;
  updateTheme(theme: ThemeMode): Promise<void>;
  updateLanguage(language: SupportedLanguage): Promise<void>;
  isInitialized: boolean;
  error: string | null;
  clearError(): void;
  refresh(): Promise<void>;
}

// Create the context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Provider props
interface GlobalStateProviderProps {
  children: ReactNode;
}

// Debounced operations for global state
const debouncedGlobalOperations = new Map<string, (...args: any[]) => void>();

function getDebouncedGlobalOperation(key: string, operation: (...args: any[]) => Promise<void>) {
  if (!debouncedGlobalOperations.has(key)) {
    debouncedGlobalOperations.set(key, 
      performanceUtils.advancedDebounce(operation, 100, true) // 100ms debounce with immediate execution
    );
  }
  return debouncedGlobalOperations.get(key)!;
}

/**
 * Global State Provider
 * Manages application-wide theme and language state with persistence
 */
export const GlobalStateProvider = memo(function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  // State management
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Theme state
  const [themeState, setThemeState] = useState<ThemeState>({
    current: 'light',
    resolved: undefined,
    isLoading: true
  });

  // Language state
  const [languageState, setLanguageState] = useState<GlobalLanguageState>({
    current: 'th',
    isLoading: true
  });

  // Get managers and persistence (memoized to prevent recreation)
  const { theme, setTheme: setNextTheme, resolvedTheme } = useNextTheme();
  const languageManager = useMemo(() => getLanguageManager(), []);
  const persistence = useMemo(() => getPersistence(), []);

  /**
   * Initialize global state by loading preferences (memoized)
   */
  const initializeState = useCallback(async () => {
    try {
      setError(null);
      
      // Load preferences with performance measurement and enhanced error handling
      const [savedTheme, savedLanguage] = await performanceUtils.measureOperation(
        async () => {
          // Use retry logic for loading preferences
          const { retryUtils } = await import('../lib/preference-utils');
          
          return await retryUtils.withFallback(
            async () => {
              const [theme, language] = await Promise.all([
                persistence.loadTheme(),
                persistence.loadLanguage()
              ]);
              return [theme, language];
            },
            async () => {
              console.warn('Using fallback values for theme and language initialization');
              return ['light' as ThemeMode, 'th' as SupportedLanguage];
            },
            'global-state-init'
          );
        },
        'global-state-init'
      );

      // Initialize theme state
      const currentTheme = (savedTheme || theme || 'light') as ThemeMode;
      setThemeState({
        current: currentTheme,
        resolved: resolvedTheme,
        isLoading: false
      });

      // Apply theme if different from current
      if (savedTheme && savedTheme !== theme) {
        setNextTheme(savedTheme);
      }

      // Initialize language state
      const currentLanguage = savedLanguage || 'th';
      setLanguageState({
        current: currentLanguage,
        isLoading: false
      });

      // Initialize language manager with error handling
      try {
        await languageManager.initialize();
      } catch (langError) {
        console.error('Language manager initialization failed:', langError);
        // Continue with default language
      }

      setIsInitialized(true);
    } catch (initError) {
      console.error('Failed to initialize global state:', initError);
      
      // Import error handlers and show user notification
      try {
        const { errorHandlers } = await import('../lib/preference-utils');
        errorHandlers.handleCriticalError(initError, 'global-state-init');
      } catch (handlerError) {
        console.error('Failed to handle initialization error:', handlerError);
      }
      
      setError('Failed to initialize application state');
      
      // Set fallback state
      setThemeState({
        current: 'light',
        resolved: resolvedTheme,
        isLoading: false
      });
      
      setLanguageState({
        current: 'th',
        isLoading: false
      });
      
      setIsInitialized(true);
    }
  }, [theme, resolvedTheme, setNextTheme, languageManager, persistence]);

  /**
   * Update theme with persistence and state management (debounced)
   */
  const updateTheme = useCallback(async (newTheme: ThemeMode) => {
    if (newTheme === themeState.current) return; // Skip if same theme
    
    try {
      setError(null);
      setThemeState(prev => ({ ...prev, isLoading: true }));

      // Use debounced operation to prevent rapid changes
      const debouncedThemeUpdate = getDebouncedGlobalOperation('theme', async (theme: ThemeMode) => {
        // Import retry utilities for enhanced error handling
        const { retryUtils } = await import('../lib/preference-utils');
        
        await retryUtils.withFallback(
          async () => {
            await performanceUtils.measureOperation(async () => {
              await persistence.saveTheme(theme);
              setNextTheme(theme);
            }, 'global-theme-update');
          },
          async () => {
            console.warn('Theme persistence failed, applying UI change only');
            setNextTheme(theme);
          },
          'theme-update'
        );

        // Update local state
        setThemeState({
          current: theme,
          resolved: resolvedTheme,
          isLoading: false
        });
      });

      debouncedThemeUpdate(newTheme);

    } catch (updateError) {
      console.error('Failed to update theme:', updateError);
      
      // Import error handlers and show user notification
      try {
        const { errorHandlers } = await import('../lib/preference-utils');
        errorHandlers.handleStorageError(updateError, 'theme-update');
      } catch (handlerError) {
        console.error('Failed to handle theme update error:', handlerError);
      }
      
      setError('Failed to update theme');
      
      // Still update UI even if persistence fails
      setNextTheme(newTheme);
      setThemeState({
        current: newTheme,
        resolved: resolvedTheme,
        isLoading: false
      });
    }
  }, [themeState.current, persistence, setNextTheme, resolvedTheme]);

  /**
   * Update language with persistence and state management (debounced)
   */
  const updateLanguage = useCallback(async (newLanguage: SupportedLanguage) => {
    if (newLanguage === languageState.current) return; // Skip if same language
    
    try {
      setError(null);
      setLanguageState(prev => ({ ...prev, isLoading: true }));

      // Use debounced operation to prevent rapid changes
      const debouncedLanguageUpdate = getDebouncedGlobalOperation('language', async (language: SupportedLanguage) => {
        // Use language manager to handle the update
        await languageManager.setLanguage(language);

        // Update local state
        setLanguageState({
          current: language,
          isLoading: false
        });
      });

      debouncedLanguageUpdate(newLanguage);

    } catch (updateError) {
      console.error('Failed to update language:', updateError);
      setError('Failed to update language');
      
      setLanguageState(prev => ({ ...prev, isLoading: false }));
      throw updateError;
    }
  }, [languageState.current, languageManager]);

  /**
   * Clear any errors (memoized)
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh state from persistence (memoized)
   */
  const refresh = useCallback(async () => {
    setIsInitialized(false);
    await initializeState();
  }, [initializeState]);

  // Initialize on mount
  useEffect(() => {
    initializeState();
  }, [initializeState]);

  // Subscribe to language manager changes (memoized)
  useEffect(() => {
    const unsubscribe = languageManager.subscribe((langState: LanguageState) => {
      setLanguageState(prevState => {
        // Only update if state actually changed
        if (prevState.current !== langState.current || prevState.isLoading !== langState.isLoading) {
          return {
            current: langState.current,
            isLoading: langState.isLoading
          };
        }
        return prevState;
      });
      
      if (langState.error) {
        setError(langState.error);
      }
    });

    return unsubscribe;
  }, [languageManager]);

  // Update theme state when next-themes changes (memoized)
  useEffect(() => {
    if (theme && isInitialized) {
      setThemeState(prev => {
        const newState = {
          current: theme as ThemeMode,
          resolved: resolvedTheme,
          isLoading: prev.isLoading
        };
        
        // Only update if state actually changed
        if (prev.current !== newState.current || prev.resolved !== newState.resolved) {
          return newState;
        }
        return prev;
      });
    }
  }, [theme, resolvedTheme, isInitialized]);

  // Context value (memoized to prevent unnecessary re-renders)
  const contextValue: GlobalStateContextType = useMemo(() => ({
    theme: themeState,
    language: languageState,
    updateTheme,
    updateLanguage,
    isInitialized,
    error,
    clearError,
    refresh
  }), [themeState, languageState, updateTheme, updateLanguage, isInitialized, error, clearError, refresh]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
});

/**
 * Hook to use global state context
 */
export function useGlobalState(): GlobalStateContextType {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  }
  return context;
}

/**
 * Hook for theme-specific operations (memoized)
 */
export function useGlobalTheme() {
  const { theme, updateTheme, isInitialized, error } = useGlobalState();
  
  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = theme.current === 'light' ? 'dark' : 'light';
    return updateTheme(newTheme);
  }, [theme.current, updateTheme]);

  return useMemo(() => ({
    theme: theme.current,
    resolvedTheme: theme.resolved,
    isLoading: theme.isLoading,
    isInitialized,
    error,
    setTheme: updateTheme,
    toggleTheme
  }), [theme.current, theme.resolved, theme.isLoading, isInitialized, error, updateTheme, toggleTheme]);
}

/**
 * Hook for language-specific operations (memoized)
 */
export function useGlobalLanguage() {
  const { language, updateLanguage, isInitialized, error } = useGlobalState();
  const languageManager = useMemo(() => getLanguageManager(), []);
  
  const toggleLanguage = useCallback(() => {
    const newLanguage: SupportedLanguage = language.current === 'th' ? 'en' : 'th';
    return updateLanguage(newLanguage);
  }, [language.current, updateLanguage]);

  const t = useCallback((key: string, params?: Record<string, string>) => {
    return languageManager.t(key, params);
  }, [languageManager]);

  const hasKey = useCallback((key: string) => {
    return languageManager.hasKey(key);
  }, [languageManager]);

  return useMemo(() => ({
    language: language.current,
    isLoading: language.isLoading,
    isInitialized,
    error,
    setLanguage: updateLanguage,
    toggleLanguage,
    t,
    hasKey
  }), [language.current, language.isLoading, isInitialized, error, updateLanguage, toggleLanguage, t, hasKey]);
}

/**
 * Hook for navigation consistency - ensures state persists across pages (memoized)
 */
export function useNavigationState() {
  const { theme, language, isInitialized } = useGlobalState();
  
  return useMemo(() => ({
    theme: theme.current,
    language: language.current,
    isReady: isInitialized && !theme.isLoading && !language.isLoading
  }), [theme.current, language.current, isInitialized, theme.isLoading, language.isLoading]);
}

/**
 * Hook for error handling across the global state (memoized)
 */
export function useGlobalStateError() {
  const { error, clearError } = useGlobalState();
  
  return useMemo(() => ({
    error,
    clearError,
    hasError: error !== null
  }), [error, clearError]);
}