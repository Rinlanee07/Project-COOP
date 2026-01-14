import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconThemeToggle, ButtonThemeToggle } from '../theme-toggle';

// Mock the theme manager hook
jest.mock('@/lib/theme-manager', () => ({
  useTheme: () => ({
    currentTheme: 'light',
    isLoading: false,
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
    resolvedTheme: 'light',
    systemTheme: 'light'
  })
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
    systemTheme: 'light'
  })
}));

describe('ThemeToggle Components', () => {
  describe('IconThemeToggle', () => {
    it('renders with sun icon for light theme', () => {
      render(<IconThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('renders with label when showLabel is true', () => {
      render(<IconThemeToggle showLabel />);
      
      expect(screen.getByText('Light')).toBeInTheDocument();
    });
  });

  describe('ButtonThemeToggle', () => {
    it('renders as button with text', () => {
      render(<ButtonThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Light Mode')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<IconThemeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('supports keyboard navigation', () => {
      render(<IconThemeToggle />);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});