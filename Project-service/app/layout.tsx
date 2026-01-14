/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'

import SessionProvider from './components/SessionProvider'
import { Toaster } from './components/ui/toaster'
import { ErrorBoundary, ThemeErrorBoundary, LanguageErrorBoundary } from './components/ErrorBoundary'
import { ErrorNotificationSystem } from './components/ErrorNotificationSystem'
import { ThemeProvider } from './providers/ThemeProvider'
import { LanguageProvider } from './providers/LanguageProvider'
import { GlobalStateProvider } from './providers/GlobalStateProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Phoenix Repair System',
  description: 'Comprehensive repair management system with theme and language support',
}

interface RootLayoutProps {
  children: ReactNode
}

/**
 * Root Layout Component
 * 
 * Provides the application-wide provider hierarchy with proper error boundaries
 * and hydration handling for theme and language systems.
 * 
 * Provider Hierarchy (outer to inner):
 * 1. ErrorBoundary - Catches any critical application errors
 * 2. SessionProvider - Handles authentication state
 * 3. ThemeErrorBoundary - Handles theme-specific errors
 * 4. ThemeProvider - Manages theme state and persistence
 * 5. LanguageErrorBoundary - Handles language-specific errors  
 * 6. LanguageProvider - Manages language state and translations
 * 7. GlobalStateProvider - Coordinates theme and language state globally
 * 
 * Requirements addressed:
 * - 1.4: Theme restoration from storage on application load
 * - 2.4: Language restoration from storage on application load
 * - 3.4: Global state restoration and consistency across pages
 */
export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)
  
  return (
    <html 
      lang="en" 
      suppressHydrationWarning={true}
      className="h-full"
    >
      <head>
        {/* Prevent flash of unstyled content during hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Apply theme immediately to prevent flash
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                
                if (resolvedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {
                // Fallback to light theme if there's any error
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full antialiased`} suppressHydrationWarning={true}>
        <ErrorBoundary>
          <SessionProvider session={session}>
            <ThemeErrorBoundary>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
                disableTransitionOnChange={false}
                storageKey="theme"
              >
                <LanguageErrorBoundary>
                  <LanguageProvider>
                    <GlobalStateProvider>
                      <div className="min-h-full bg-background text-foreground">
                        {children}
                      </div>
                      <ErrorNotificationSystem position="top-right" maxNotifications={5} />
                    </GlobalStateProvider>
                  </LanguageProvider>
                </LanguageErrorBoundary>
              </ThemeProvider>
            </ThemeErrorBoundary>
          </SessionProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}
