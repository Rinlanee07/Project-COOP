/**
 * Language Loader Component
 * Handles loading states during language initialization and switching
 */

import React from 'react';
import { useLanguage } from '../providers/LanguageProvider';

interface LanguageLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showError?: boolean;
}

/**
 * Language Loader Component
 * Shows loading state while language system initializes
 */
export function LanguageLoader({ 
  children, 
  fallback,
  showError = true 
}: LanguageLoaderProps) {
  const { isLoading, error } = useLanguage();

  // Show custom fallback or default loading
  if (isLoading) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Loading language preferences...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show error if enabled and error exists
  if (showError && error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Language System Error
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Inline Language Loader
 * For smaller loading states within components
 */
export function InlineLanguageLoader({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}) {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return (
      <>
        {fallback || (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}

/**
 * Language Error Boundary
 * Catches and displays language-related errors
 */
interface LanguageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class LanguageErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  LanguageErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): LanguageErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Language system error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Language System Error
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  The language system encountered an error. Using fallback language.
                </p>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}