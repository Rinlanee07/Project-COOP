/**
 * Enhanced Language Manager
 * Provides language management with persistence, loading states, and fallback mechanisms
 */

import { SupportedLanguage, TranslationParams, getTranslation, hasTranslation } from './translations';
import { LazyTranslationLoader, lazyTranslations } from './translation-loader';
import { getPersistence } from './persistence';
import { performanceUtils, retryUtils } from './preference-utils';
import { useMemo, useCallback } from 'react';

export interface LanguageState {
  current: SupportedLanguage;
  isLoading: boolean;
  error: string | null;
}

export interface LanguageManager {
  currentLanguage: SupportedLanguage;
  setLanguage(language: SupportedLanguage): Promise<void>;
  t(key: string, params?: TranslationParams): string;
  tAsync(key: string, params?: TranslationParams): Promise<string>;
  isLoading: boolean;
  error: string | null;
  hasKey(key: string): boolean;
  initialize(): Promise<void>;
  preloadChunks(chunks: string[]): Promise<void>;
}

// Debounced language operations to prevent rapid changes
const debouncedLanguageOperations = new Map<string, (...args: any[]) => void>();

function getDebouncedLanguageSetter(key: string, operation: (language: SupportedLanguage) => Promise<void>) {
  if (!debouncedLanguageOperations.has(key)) {
    debouncedLanguageOperations.set(key, 
      performanceUtils.advancedDebounce(operation, 200, true) // 200ms debounce with immediate execution
    );
  }
  return debouncedLanguageOperations.get(key)!;
}

/**
 * Language Manager Implementation
 */
export class LanguageManagerImpl implements LanguageManager {
  private state: LanguageState = {
    current: 'th', // Default to Thai
    isLoading: false,
    error: null
  };

  private listeners: Set<(state: LanguageState) => void> = new Set();
  private persistence = getPersistence();
  private lazyLoader = LazyTranslationLoader.getInstance();
  private initialized = false;

  constructor() {
    // Initialization is triggered explicitly by consumers (useLanguageEnhanced/LanguageProvider)
    // to avoid server/client hydration mismatches from reading persisted language
    // before the client mounts.
  }

  get currentLanguage(): SupportedLanguage {
    return this.state.current;
  }

  get isLoading(): boolean {
    return this.state.isLoading;
  }

  get error(): string | null {
    return this.state.error;
  }

  /**
   * Initialize the language manager by loading saved preferences
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.setState({ isLoading: true, error: null });

    try {
      const savedLanguage = await performanceUtils.measureOperation(
        () => this.persistence.loadLanguage(),
        'loadLanguage'
      );

      if (savedLanguage) {
        this.setState({ 
          current: savedLanguage, 
          isLoading: false 
        });
      } else {
        // No saved preference, use default
        this.setState({ 
          current: 'th', 
          isLoading: false 
        });
      }

      // Preload commonly used translation chunks
      await this.preloadChunks(['core', 'forms']);

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize language manager:', error);
      this.setState({ 
        current: 'th', // Fallback to default
        isLoading: false, 
        error: 'Failed to load language preferences' 
      });
      this.initialized = true;
    }
  }

  /**
   * Set the current language with persistence and debouncing
   */
  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (language === this.state.current) return;

    this.setState({ isLoading: true, error: null });

    try {
      // Use debounced operation to prevent rapid changes
      const debouncedSetter = getDebouncedLanguageSetter('main', async (lang: SupportedLanguage) => {
        // Save to persistence with retry logic
        await retryUtils.withRetry(
          () => performanceUtils.measureOperation(
            () => this.persistence.saveLanguage(lang),
            'saveLanguage'
          ),
          3,
          100
        );

        this.setState({ 
          current: lang, 
          isLoading: false 
        });

        // Preload translation chunks for the new language
        await this.preloadChunks(['core', 'forms', 'messages']);

        // Trigger page reload for immediate effect across all components
        if (typeof window !== 'undefined') {
          // Use a small delay to ensure state is updated before reload
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      });

      debouncedSetter(language);
    } catch (error) {
      console.error('Failed to save language preference:', error);
      this.setState({ 
        isLoading: false, 
        error: 'Failed to save language preference' 
      });
      throw error;
    }
  }

  /**
   * Translate a key with optional parameters (synchronous - uses loaded chunks only)
   */
  t(key: string, params?: TranslationParams): string {
    try {
      return performanceUtils.measureSync(() => {
        // Try lazy loader first (for loaded chunks)
        if (this.lazyLoader.hasTranslation(this.state.current, key)) {
          return this.lazyLoader.getTranslationSync(this.state.current, key, params);
        }
        
        // Fallback to full translation dictionary
        return getTranslation(this.state.current, key, params);
      }, 'translation-sync');
    } catch (error) {
      console.error('Translation error:', error);
      return key; // Fallback to key itself
    }
  }

  /**
   * Translate a key with automatic chunk loading (asynchronous)
   */
  async tAsync(key: string, params?: TranslationParams): Promise<string> {
    try {
      return await performanceUtils.measureOperation(async () => {
        // Try lazy loader with automatic chunk loading
        return await this.lazyLoader.getTranslation(this.state.current, key, params);
      }, 'translation-async');
    } catch (error) {
      console.error('Async translation error:', error);
      return key; // Fallback to key itself
    }
  }

  /**
   * Check if a translation key exists
   */
  hasKey(key: string): boolean {
    // Check both lazy loader and full dictionary
    return this.lazyLoader.hasTranslation(this.state.current, key) || 
           hasTranslation(this.state.current, key);
  }

  /**
   * Preload translation chunks for better performance
   */
  async preloadChunks(chunks: string[]): Promise<void> {
    try {
      await performanceUtils.measureOperation(
        () => this.lazyLoader.preloadChunks(chunks),
        'preload-chunks'
      );
    } catch (error) {
      console.warn('Failed to preload translation chunks:', error);
    }
  }

  /**
   * Subscribe to language state changes
   */
  subscribe(listener: (state: LanguageState) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current state
   */
  getState(): LanguageState {
    return { ...this.state };
  }

  /**
   * Update state and notify listeners
   */
  private setState(updates: Partial<LanguageState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  /**
   * Notify all listeners of state changes (throttled to prevent excessive updates)
   */
  private notifyListeners = performanceUtils.throttle((): void => {
    const currentState = this.getState();
    this.listeners.forEach(listener => {
      try {
        listener(currentState);
      } catch (error) {
        console.error('Error in language state listener:', error);
      }
    });
  }, 16); // ~60fps

  /**
   * Reset to default language
   */
  async resetToDefault(): Promise<void> {
    await this.setLanguage('th');
  }

  /**
   * Toggle between Thai and English
   */
  async toggleLanguage(): Promise<void> {
    const newLanguage: SupportedLanguage = this.state.current === 'th' ? 'en' : 'th';
    await this.setLanguage(newLanguage);
  }

  /**
   * Clear any errors
   */
  clearError(): void {
    this.setState({ error: null });
  }

  /**
   * Force refresh language state from persistence
   */
  async refresh(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }

  /**
   * Get loading status from lazy loader
   */
  getLoadingStatus() {
    return this.lazyLoader.getLoadingStatus();
  }
}

// Singleton instance
let languageManagerInstance: LanguageManagerImpl | null = null;

/**
 * Get the singleton language manager instance
 */
export function getLanguageManager(): LanguageManagerImpl {
  if (!languageManagerInstance) {
    languageManagerInstance = new LanguageManagerImpl();
  }
  return languageManagerInstance;
}

/**
 * Optimized hook for language manager with memoization
 */
export function useLanguageManager() {
  const manager = useMemo(() => getLanguageManager(), []);
  
  // Memoized translation function
  const t = useCallback((key: string, params?: TranslationParams) => {
    return manager.t(key, params);
  }, [manager]);

  // Memoized async translation function
  const tAsync = useCallback((key: string, params?: TranslationParams) => {
    return manager.tAsync(key, params);
  }, [manager]);

  // Memoized language setter
  const setLanguage = useCallback((language: SupportedLanguage) => {
    return manager.setLanguage(language);
  }, [manager]);

  // Memoized preload function
  const preloadChunks = useCallback((chunks: string[]) => {
    return manager.preloadChunks(chunks);
  }, [manager]);

  return useMemo(() => ({
    currentLanguage: manager.currentLanguage,
    isLoading: manager.isLoading,
    error: manager.error,
    t,
    tAsync,
    setLanguage,
    preloadChunks,
    hasKey: manager.hasKey.bind(manager),
    toggleLanguage: manager.toggleLanguage.bind(manager),
    clearError: manager.clearError.bind(manager),
    getLoadingStatus: manager.getLoadingStatus.bind(manager)
  }), [manager, t, tAsync, setLanguage, preloadChunks]);
}

/**
 * Utility functions for direct language operations
 */
export const languageUtils = {
  async getCurrentLanguage(): Promise<SupportedLanguage> {
    const manager = getLanguageManager();
    await manager.initialize();
    return manager.currentLanguage;
  },

  async setLanguage(language: SupportedLanguage): Promise<void> {
    const manager = getLanguageManager();
    await manager.setLanguage(language);
  },

  translate(key: string, params?: TranslationParams): string {
    const manager = getLanguageManager();
    return manager.t(key, params);
  },

  async translateAsync(key: string, params?: TranslationParams): Promise<string> {
    const manager = getLanguageManager();
    return manager.tAsync(key, params);
  },

  hasTranslation(key: string): boolean {
    const manager = getLanguageManager();
    return manager.hasKey(key);
  },

  async preloadTranslations(chunks: string[]): Promise<void> {
    const manager = getLanguageManager();
    await manager.preloadChunks(chunks);
  }
};