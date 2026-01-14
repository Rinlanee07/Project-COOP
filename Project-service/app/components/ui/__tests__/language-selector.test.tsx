import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageSelector, FlagIcon, getLanguageInfo } from '../language-selector';
import { LanguageProvider } from '@/providers/LanguageProvider';

// Mock the language manager
jest.mock('@/lib/language-manager', () => ({
  getLanguageManager: () => ({
    currentLanguage: 'th',
    setLanguage: jest.fn(),
    t: (key: string) => key,
    isLoading: false,
    error: null,
    hasKey: () => true,
    initialize: jest.fn(),
    subscribe: () => () => {},
    getState: () => ({ current: 'th', isLoading: false, error: null }),
    toggleLanguage: jest.fn(),
    resetToDefault: jest.fn(),
    clearError: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageSelector', () => {
  it('renders dropdown variant correctly', () => {
    render(
      <TestWrapper>
        <LanguageSelector variant="dropdown" />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('renders toggle variant correctly', () => {
    render(
      <TestWrapper>
        <LanguageSelector variant="toggle" showLabel />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('renders menu variant correctly', () => {
    render(
      <TestWrapper>
        <LanguageSelector variant="menu" />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('shows loading state correctly', () => {
    // Mock loading state
    const mockLanguageManager = {
      currentLanguage: 'th',
      setLanguage: jest.fn(),
      t: (key: string) => key === 'loading' ? 'Loading...' : key,
      isLoading: true,
      error: null,
      hasKey: () => true,
      initialize: jest.fn(),
      subscribe: () => () => {},
      getState: () => ({ current: 'th', isLoading: true, error: null }),
      toggleLanguage: jest.fn(),
      resetToDefault: jest.fn(),
      clearError: jest.fn(),
      refresh: jest.fn(),
    };

    jest.doMock('@/lib/language-manager', () => ({
      getLanguageManager: () => mockLanguageManager,
    }));

    render(
      <TestWrapper>
        <LanguageSelector variant="dropdown" showLabel />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

describe('FlagIcon', () => {
  it('renders Thai flag correctly', () => {
    render(<FlagIcon language="th" />);
    
    const flag = screen.getByRole('img');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('aria-label', 'Thai flag');
  });

  it('renders English flag correctly', () => {
    render(<FlagIcon language="en" />);
    
    const flag = screen.getByRole('img');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('aria-label', 'US flag');
  });
});

describe('getLanguageInfo', () => {
  it('returns correct info for Thai', () => {
    const info = getLanguageInfo('th');
    expect(info.label).toBe('ไทย');
    expect(info.englishLabel).toBe('Thai');
  });

  it('returns correct info for English', () => {
    const info = getLanguageInfo('en');
    expect(info.label).toBe('English');
    expect(info.englishLabel).toBe('English');
  });
});