"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { getPersistence } from "../lib/persistence"
import { ThemeCSSManager } from "../lib/theme-manager"

interface EnhancedThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: EnhancedThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [initialTheme, setInitialTheme] = useState<string | undefined>(undefined);

  // Initialize theme from persistence before rendering
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const persistence = getPersistence();
        const savedTheme = await persistence.loadTheme();
        
        if (savedTheme) {
          setInitialTheme(savedTheme);
        }
        
        // Initialize CSS variables
        const cssManager = ThemeCSSManager.getInstance();
        cssManager.initializeDefaults();
        
      } catch (error) {
        console.error('Failed to initialize theme from persistence:', error);
      } finally {
        setMounted(true);
      }
    };

    initializeTheme();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={initialTheme || props.defaultTheme || "system"}
      enableSystem={props.enableSystem !== false}
      disableTransitionOnChange={props.disableTransitionOnChange !== false}
    >
      {children}
    </NextThemesProvider>
  );
}
