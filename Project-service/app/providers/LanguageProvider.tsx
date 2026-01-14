"use client"
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SupportedLanguage, TranslationParams } from '../lib/translations';
import { getLanguageManager, LanguageState } from '../lib/language-manager';

interface LanguageContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => Promise<void>;
    t: (key: string, params?: TranslationParams) => string;
    isLoading: boolean;
    error: string | null;
    hasKey: (key: string) => boolean;
    toggleLanguage: () => Promise<void>;
    clearError: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
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
        let mounted = true;
        
        languageManager.initialize().catch(error => {
            if (mounted) {
                console.error('Failed to initialize language manager:', error);
                // Set error state but don't crash the app
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Failed to initialize language system. Using default language.'
                }));
            }
        });
        
        return () => {
            mounted = false;
        };
    }, [languageManager]);

    const setLanguage = useCallback(async (lang: SupportedLanguage) => {
        try {
            await languageManager.setLanguage(lang);
        } catch (error) {
            console.error('Failed to set language:', error);
            // Error is already handled in the language manager
        }
    }, [languageManager]);

    const t = useCallback((key: string, params?: TranslationParams) => {
        return languageManager.t(key, params);
    }, [languageManager]);

    const hasKey = useCallback((key: string) => {
        return languageManager.hasKey(key);
    }, [languageManager]);

    const toggleLanguage = useCallback(async () => {
        try {
            await languageManager.toggleLanguage();
        } catch (error) {
            console.error('Failed to toggle language:', error);
        }
    }, [languageManager]);

    const clearError = useCallback(() => {
        languageManager.clearError();
    }, [languageManager]);

    const contextValue: LanguageContextType = {
        language: state.current,
        setLanguage,
        t,
        isLoading: state.isLoading,
        error: state.error,
        hasKey,
        toggleLanguage,
        clearError
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};

// Backward compatibility hook with the old interface
export const useLanguageCompat = () => {
    const { language, setLanguage, t } = useLanguage();
    
    return {
        language,
        setLanguage: (lang: SupportedLanguage) => {
            setLanguage(lang).catch(error => {
                console.error('Failed to set language:', error);
            });
        },
        t: (key: string) => t(key) // Simple version without params
    };
};
