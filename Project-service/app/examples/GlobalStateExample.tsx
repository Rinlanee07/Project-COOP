"use client"

import React from 'react';
import { GlobalStateProvider, useGlobalTheme, useGlobalLanguage, useNavigationState } from '../providers/GlobalStateProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import { LanguageProvider } from '../providers/LanguageProvider';

/**
 * Example component demonstrating GlobalStateProvider usage
 */
function GlobalStateDemo() {
  const { theme, isLoading: themeLoading, toggleTheme, setTheme } = useGlobalTheme();
  const { language, isLoading: langLoading, toggleLanguage, t } = useGlobalLanguage();
  const { isReady } = useNavigationState();

  if (!isReady) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('global.state.demo', { fallback: 'Global State Demo' })}
      </h2>
      
      {/* Theme Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {t('theme.controls', { fallback: 'Theme Controls' })}
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current theme: <span className="font-mono">{theme}</span>
            {themeLoading && <span className="ml-2 text-blue-500">Loading...</span>}
          </p>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              disabled={themeLoading}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {t('theme.toggle', { fallback: 'Toggle Theme' })}
            </button>
            <button
              onClick={() => setTheme('light')}
              disabled={themeLoading}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              disabled={themeLoading}
              className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Language Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {t('language.controls', { fallback: 'Language Controls' })}
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current language: <span className="font-mono">{language}</span>
            {langLoading && <span className="ml-2 text-blue-500">Loading...</span>}
          </p>
          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              disabled={langLoading}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {t('language.toggle', { fallback: 'Toggle Language' })}
            </button>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {t('status.info', { fallback: 'Status Information' })}
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>✅ Global state initialized</li>
          <li>✅ Theme persistence active</li>
          <li>✅ Language persistence active</li>
          <li>✅ Cross-page navigation ready</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Complete example with all providers
 */
export function GlobalStateExample() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <LanguageProvider>
        <GlobalStateProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <GlobalStateDemo />
          </div>
        </GlobalStateProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * Hook usage examples for documentation
 */
export const hookExamples = {
  // Basic global state usage
  useGlobalStateExample: `
    const { theme, language, isInitialized, error } = useGlobalState();
    
    if (!isInitialized) return <Loading />;
    if (error) return <Error message={error} />;
    
    return <App theme={theme.current} language={language.current} />;
  `,

  // Theme-specific operations
  useGlobalThemeExample: `
    const { theme, toggleTheme, setTheme, isLoading } = useGlobalTheme();
    
    return (
      <button onClick={toggleTheme} disabled={isLoading}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    );
  `,

  // Language-specific operations
  useGlobalLanguageExample: `
    const { language, setLanguage, t, hasKey } = useGlobalLanguage();
    
    return (
      <div>
        <p>{t('welcome.message')}</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="th">ไทย</option>
          <option value="en">English</option>
        </select>
      </div>
    );
  `,

  // Navigation consistency
  useNavigationStateExample: `
    const { theme, language, isReady } = useNavigationState();
    
    // Use in layout components to ensure consistent state across pages
    useEffect(() => {
      if (isReady) {
        // Apply theme/language to page-specific elements
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('lang', language);
      }
    }, [theme, language, isReady]);
  `
};

export default GlobalStateExample;