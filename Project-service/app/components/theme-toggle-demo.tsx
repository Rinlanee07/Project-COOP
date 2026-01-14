"use client";

import React from 'react';
import { ThemeToggle, IconThemeToggle, ButtonThemeToggle, SwitchThemeToggle, DropdownThemeToggle } from './ui/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function ThemeToggleDemo() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Theme Toggle Components</h1>
        <p className="text-muted-foreground">
          Demonstration of different theme toggle variants with accessibility features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Icon Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Icon Toggle</CardTitle>
            <CardDescription>
              Simple icon-based theme toggle with different sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Small:</span>
              <IconThemeToggle size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Medium:</span>
              <IconThemeToggle size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Large:</span>
              <IconThemeToggle size="lg" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">With Label:</span>
              <IconThemeToggle showLabel />
            </div>
          </CardContent>
        </Card>

        {/* Button Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Button Toggle</CardTitle>
            <CardDescription>
              Button-style theme toggle with text labels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Default:</span>
              <ButtonThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Small:</span>
              <ButtonThemeToggle size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Large:</span>
              <ButtonThemeToggle size="lg" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">No Label:</span>
              <ButtonThemeToggle showLabel={false} />
            </div>
          </CardContent>
        </Card>

        {/* Switch Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Switch Toggle</CardTitle>
            <CardDescription>
              Switch-style toggle for light/dark mode only
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Default:</span>
              <SwitchThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">No Label:</span>
              <SwitchThemeToggle showLabel={false} />
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Variant */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Toggle</CardTitle>
            <CardDescription>
              Dropdown menu with all theme options (light, dark, system)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Default:</span>
              <DropdownThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">With Label:</span>
              <DropdownThemeToggle showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">Small:</span>
              <DropdownThemeToggle size="sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main ThemeToggle Component */}
      <Card>
        <CardHeader>
          <CardTitle>Main ThemeToggle Component</CardTitle>
          <CardDescription>
            The main component that renders different variants based on props
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20">Icon (default):</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20">Button:</span>
            <ThemeToggle variant="button" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20">Switch:</span>
            <ThemeToggle variant="switch" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-20">Dropdown:</span>
            <ThemeToggle variant="dropdown" />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Information */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>
            All components include proper accessibility support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Keyboard Navigation:</strong> All components are focusable and keyboard accessible</li>
            <li>• <strong>ARIA Labels:</strong> Proper aria-label attributes for screen readers</li>
            <li>• <strong>Visual Feedback:</strong> Clear visual indication of current theme state</li>
            <li>• <strong>Loading States:</strong> Disabled state and loading spinner during theme changes</li>
            <li>• <strong>Focus Management:</strong> Proper focus ring and focus-visible styles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}