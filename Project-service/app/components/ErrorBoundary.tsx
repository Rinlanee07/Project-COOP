"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-4">
              An error occurred while loading the application. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Theme-specific error boundary
 */
export class ThemeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ThemeErrorBoundary caught an error:', error, errorInfo);
    
    // Try to reset theme to default
    try {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } catch (resetError) {
      console.error('Failed to reset theme:', resetError);
    }
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">
              Theme System Error
            </h2>
            <p className="text-gray-600 mb-4">
              There was an error with the theme system. The theme has been reset to default.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Language-specific error boundary
 */
export class LanguageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LanguageErrorBoundary caught an error:', error, errorInfo);
    
    // Only reset language if the error is related to language/translation system
    const isLanguageError = 
      error.message?.includes('language') ||
      error.message?.includes('translation') ||
      error.message?.includes('Language') ||
      error.stack?.includes('language-manager') ||
      error.stack?.includes('translation-loader') ||
      error.stack?.includes('LanguageProvider');
    
    if (isLanguageError) {
      // Try to reset language to default
      try {
        localStorage.removeItem('language');
        console.log('Language reset to default due to error');
      } catch (resetError) {
        console.error('Failed to reset language:', resetError);
      }
    }
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Language System Error
            </h2>
            <p className="text-muted-foreground mb-4">
              There was an error with the language system. The language has been reset to default.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}