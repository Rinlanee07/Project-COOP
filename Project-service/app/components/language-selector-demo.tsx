"use client";

import React from 'react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

/**
 * Demo component showcasing different language selector variants
 */
export function LanguageSelectorDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Language Selector Demo</h1>
        <p className="text-muted-foreground">
          Showcasing different variants of the language selector component
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dropdown Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Variant</CardTitle>
            <CardDescription>
              Icon-based dropdown with language options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Default:</span>
              <LanguageSelector variant="dropdown" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">With Label:</span>
              <LanguageSelector variant="dropdown" showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">No Flag:</span>
              <LanguageSelector variant="dropdown" showFlag={false} showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Small Size:</span>
              <LanguageSelector variant="dropdown" size="sm" showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Large Size:</span>
              <LanguageSelector variant="dropdown" size="lg" showLabel />
            </div>
          </CardContent>
        </Card>

        {/* Toggle Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle Variant</CardTitle>
            <CardDescription>
              Simple toggle between two languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Default:</span>
              <LanguageSelector variant="toggle" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">With Label:</span>
              <LanguageSelector variant="toggle" showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">No Flag:</span>
              <LanguageSelector variant="toggle" showFlag={false} showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Small Size:</span>
              <LanguageSelector variant="toggle" size="sm" showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Large Size:</span>
              <LanguageSelector variant="toggle" size="lg" showLabel />
            </div>
          </CardContent>
        </Card>

        {/* Menu Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Variant</CardTitle>
            <CardDescription>
              Button-style dropdown with current language displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Default:</span>
              <LanguageSelector variant="menu" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">No Label:</span>
              <LanguageSelector variant="menu" showLabel={false} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">No Flag:</span>
              <LanguageSelector variant="menu" showFlag={false} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Small Size:</span>
              <LanguageSelector variant="menu" size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Large Size:</span>
              <LanguageSelector variant="menu" size="lg" />
            </div>
          </CardContent>
        </Card>

        {/* Select Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Select Variant</CardTitle>
            <CardDescription>
              Traditional select dropdown for forms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Default:</span>
              <LanguageSelector variant="select" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">No Label:</span>
              <LanguageSelector variant="select" showLabel={false} />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">No Flag:</span>
              <LanguageSelector variant="select" showFlag={false} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="space-y-2">
            <h3 className="font-medium">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tab to focus the selector</li>
              <li>• Enter/Space to open dropdown</li>
              <li>• Arrow keys to navigate options</li>
              <li>• Enter to select option</li>
              <li>• Escape to close dropdown</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Screen Reader Support</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Proper ARIA labels</li>
              <li>• Role attributes for flags</li>
              <li>• Loading state announcements</li>
              <li>• Current selection feedback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="space-y-2">
            <h3 className="font-medium">Visual Feedback</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Flag icons for languages</li>
              <li>• Loading spinners</li>
              <li>• Current selection indicators</li>
              <li>• Smooth transitions</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Responsive Design</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Multiple size variants</li>
              <li>• Mobile-friendly touch targets</li>
              <li>• Flexible layout options</li>
              <li>• Consistent spacing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Error Handling</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Graceful loading states</li>
              <li>• Error recovery</li>
              <li>• Fallback mechanisms</li>
              <li>• User feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelectorDemo;