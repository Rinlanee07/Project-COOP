/**
 * Enhanced Language Hook
 * Provides advanced language management features with loading states and error handling
 */

import { useCallback, useEffect, useState } from 'react';
import { SupportedLanguage, TranslationParams } from '../lib/translations';
import { getLanguageManager, LanguageState } from '../lib/language-manager';

export interface UseLanguageEnhancedReturn {
  // Current state
  language: SupportedLanguage;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
  resetToDefault: () => Promise<void>;
  clearError: () => void;
  refresh: () => Promise<void>;
  
  // Translation functions
  t: (key: string, params?: TranslationParams) => string;
  hasKey: (key: string) => boolean;
  
  // Utility functions
  isCurrentLanguage: (language: SupportedLanguage) => boolean;
  getAvailableLanguages: () => SupportedLanguage[];
  getLanguageLabel: (language: SupportedLanguage) => string;
}

/**
 * Enhanced language hook with full feature set
 */
export function useLanguageEnhanced(): UseLanguageEnhancedReturn {
  const [state, setState] = useState<LanguageState>({
    current: 'th',
    isLoading: true,
    error: null
  });

  const languageManager = getLanguageManager();

  // Subscribe to language manager state changes
  useEffect(() => {
    const unsubscribe = languageManager.subscribe((newState) => {
      setState(newState);
    });

    // Initialize with current state
    setState(languageManager.getState());

    return unsubscribe;
  }, [languageManager]);

  // Ensure language manager is initialized
  useEffect(() => {
    languageManager.initialize().catch(error => {
      console.error('Failed to initialize language manager:', error);
    });
  }, [languageManager]);

  const setLanguage = useCallback(async (language: SupportedLanguage) => {
    try {
      await languageManager.setLanguage(language);
    } catch (error) {
      console.error('Failed to set language:', error);
      throw error;
    }
  }, [languageManager]);

  const toggleLanguage = useCallback(async () => {
    try {
      await languageManager.toggleLanguage();
    } catch (error) {
      console.error('Failed to toggle language:', error);
      throw error;
    }
  }, [languageManager]);

  const resetToDefault = useCallback(async () => {
    try {
      await languageManager.resetToDefault();
    } catch (error) {
      console.error('Failed to reset language:', error);
      throw error;
    }
  }, [languageManager]);

  const clearError = useCallback(() => {
    languageManager.clearError();
  }, [languageManager]);

  const refresh = useCallback(async () => {
    try {
      await languageManager.refresh();
    } catch (error) {
      console.error('Failed to refresh language:', error);
      throw error;
    }
  }, [languageManager]);

  const t = useCallback((key: string, params?: TranslationParams) => {
    return languageManager.t(key, params);
  }, [languageManager]);

  const hasKey = useCallback((key: string) => {
    return languageManager.hasKey(key);
  }, [languageManager]);

  const isCurrentLanguage = useCallback((language: SupportedLanguage) => {
    return state.current === language;
  }, [state.current]);

  const getAvailableLanguages = useCallback((): SupportedLanguage[] => {
    return ['th', 'en'];
  }, []);

  const getLanguageLabel = useCallback((language: SupportedLanguage) => {
    const labels: Record<SupportedLanguage, string> = {
      th: 'ไทย',
      en: 'English'
    };
    return labels[language];
  }, []);

  return {
    // Current state
    language: state.current,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    setLanguage,
    toggleLanguage,
    resetToDefault,
    clearError,
    refresh,
    
    // Translation functions
    t,
    hasKey,
    
    // Utility functions
    isCurrentLanguage,
    getAvailableLanguages,
    getLanguageLabel
  };
}

/**
 * Simplified language hook for basic usage
 */
export function useLanguageSimple() {
  const { language, setLanguage, t, isLoading } = useLanguageEnhanced();
  
  return {
    language,
    setLanguage: (lang: SupportedLanguage) => {
      setLanguage(lang).catch(error => {
        console.error('Failed to set language:', error);
      });
    },
    t: (key: string) => t(key),
    isLoading
  };
}

/**
 * Hook for translation only (no state management)
 */
export function useTranslation() {
  const { t, hasKey, language } = useLanguageEnhanced();
  
  return {
    t,
    hasKey,
    language
  };
}

/**
 * Hook for language switching only
 */
export function useLanguageSwitcher() {
  const { 
    language, 
    setLanguage, 
    toggleLanguage, 
    isLoading, 
    error,
    getAvailableLanguages,
    getLanguageLabel,
    isCurrentLanguage
  } = useLanguageEnhanced();
  
  return {
    currentLanguage: language,
    setLanguage,
    toggleLanguage,
    isLoading,
    error,
    availableLanguages: getAvailableLanguages(),
    getLanguageLabel,
    isCurrentLanguage
  };
}