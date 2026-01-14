"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-manager";
import { useLanguageEnhanced } from "@/hooks/use-language-enhanced";

const themeToggleVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        icon: "rounded-md hover:bg-accent hover:text-accent-foreground",
        button: "rounded-md bg-background border border-input hover:bg-accent hover:text-accent-foreground",
        switch: "flex items-center gap-2",
        dropdown: "rounded-md hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 w-8 text-sm",
        md: "h-9 w-9",
        lg: "h-10 w-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "icon",
      size: "md",
    },
  }
);

export interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeToggleVariants> {
  showLabel?: boolean;
  showTooltip?: boolean;
}

export interface SwitchThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
  showTooltip?: boolean;
}

/**
 * Icon-based theme toggle component (memoized for performance)
 */
const IconThemeToggle = React.memo(React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant, size, showLabel = false, ...props }, ref) => {
    const { currentTheme, isLoading, toggleTheme } = useTheme();
    const { t } = useLanguageEnhanced();

    const getIcon = React.useMemo(() => {
      if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
      }
      
      switch (currentTheme) {
        case 'light':
          return <Sun className="h-4 w-4" />;
        case 'dark':
          return <Moon className="h-4 w-4" />;
        case 'system':
          return <Monitor className="h-4 w-4" />;
        default:
          return <Sun className="h-4 w-4" />;
      }
    }, [currentTheme, isLoading]);

    const getLabel = React.useMemo(() => {
      if (isLoading) return t('loading');
      
      switch (currentTheme) {
        case 'light':
          return t('switch_to_dark_mode');
        case 'dark':
          return t('switch_to_light_mode');
        case 'system':
          return t('switch_to_light_mode');
        default:
          return t('theme_toggle');
      }
    }, [currentTheme, isLoading, t]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'icon';
    }, [size]);

    const labelText = React.useMemo(() => {
      switch (currentTheme) {
        case 'light':
          return t('light_theme');
        case 'dark':
          return t('dark_theme');
        case 'system':
          return t('system_theme');
        default:
          return t('theme');
      }
    }, [currentTheme, t]);

    return (
      <Button
        ref={ref}
        variant="ghost"
        size={buttonSize}
        className={cn(themeToggleVariants({ variant, size }), className)}
        onClick={toggleTheme}
        disabled={isLoading}
        aria-label={getLabel}
        title={getLabel}
        {...props}
      >
        {getIcon}
        {showLabel && (
          <span className="ml-2 text-sm">
            {labelText}
          </span>
        )}
      </Button>
    );
  }
));
IconThemeToggle.displayName = "IconThemeToggle";

/**
 * Button-style theme toggle component (memoized for performance)
 */
const ButtonThemeToggle = React.memo(React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant, size, showLabel = true, ...props }, ref) => {
    const { currentTheme, isLoading, toggleTheme } = useTheme();
    const { t } = useLanguageEnhanced();

    const getButtonText = React.useMemo(() => {
      if (isLoading) return t('loading');
      
      switch (currentTheme) {
        case 'light':
          return showLabel ? t('light_theme') : t('light');
        case 'dark':
          return showLabel ? t('dark_theme') : t('dark');
        case 'system':
          return showLabel ? t('system_theme') : t('system');
        default:
          return t('theme');
      }
    }, [currentTheme, isLoading, showLabel, t]);

    const getIcon = React.useMemo(() => {
      if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
      }
      
      switch (currentTheme) {
        case 'light':
          return <Sun className="h-4 w-4" />;
        case 'dark':
          return <Moon className="h-4 w-4" />;
        case 'system':
          return <Monitor className="h-4 w-4" />;
        default:
          return <Sun className="h-4 w-4" />;
      }
    }, [currentTheme, isLoading]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';
    }, [size]);

    return (
      <Button
        ref={ref}
        variant="outline"
        size={buttonSize}
        className={cn(themeToggleVariants({ variant: "button", size }), className)}
        onClick={toggleTheme}
        disabled={isLoading}
        {...props}
      >
        {getIcon}
        {showLabel && <span className="ml-2">{getButtonText}</span>}
      </Button>
    );
  }
));
ButtonThemeToggle.displayName = "ButtonThemeToggle";

/**
 * Switch-style theme toggle component (light/dark only) (memoized for performance)
 */
const SwitchThemeToggle = React.memo(React.forwardRef<HTMLDivElement, SwitchThemeToggleProps>(
  ({ className, showLabel = true, ...props }, ref) => {
    const { currentTheme, isLoading, setTheme } = useTheme();
    const { t } = useLanguageEnhanced();

    const isDark = React.useMemo(() => currentTheme === 'dark', [currentTheme]);

    const handleSwitchChange = React.useCallback((checked: boolean) => {
      setTheme(checked ? 'dark' : 'light');
    }, [setTheme]);

    const ariaLabel = React.useMemo(() => {
      return t(isDark ? 'switch_to_light_mode' : 'switch_to_dark_mode');
    }, [isDark, t]);

    const labelText = React.useMemo(() => {
      return isLoading ? t('loading') : t(isDark ? 'dark' : 'light');
    }, [isLoading, isDark, t]);

    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={isDark}
          onCheckedChange={handleSwitchChange}
          disabled={isLoading}
          aria-label={ariaLabel}
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
        {showLabel && (
          <span className="text-sm text-muted-foreground ml-2">
            {labelText}
          </span>
        )}
      </div>
    );
  }
));
SwitchThemeToggle.displayName = "SwitchThemeToggle";

/**
 * Dropdown-style theme toggle component (supports all themes including system) (memoized for performance)
 */
const DropdownThemeToggle = React.memo(React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant, size, showLabel = false, ...props }, ref) => {
    const { currentTheme, isLoading, setTheme } = useTheme();
    const { t } = useLanguageEnhanced();

    const getIcon = React.useMemo(() => {
      if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />;
      }
      
      switch (currentTheme) {
        case 'light':
          return <Sun className="h-4 w-4" />;
        case 'dark':
          return <Moon className="h-4 w-4" />;
        case 'system':
          return <Monitor className="h-4 w-4" />;
        default:
          return <Sun className="h-4 w-4" />;
      }
    }, [currentTheme, isLoading]);

    const getCurrentLabel = React.useMemo(() => {
      switch (currentTheme) {
        case 'light':
          return t('light');
        case 'dark':
          return t('dark');
        case 'system':
          return t('system');
        default:
          return t('theme');
      }
    }, [currentTheme, t]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'icon';
    }, [size]);

    const handleLightClick = React.useCallback(() => setTheme('light'), [setTheme]);
    const handleDarkClick = React.useCallback(() => setTheme('dark'), [setTheme]);
    const handleSystemClick = React.useCallback(() => setTheme('system'), [setTheme]);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size={buttonSize}
            className={cn(themeToggleVariants({ variant: "dropdown", size }), className)}
            disabled={isLoading}
            aria-label={t('theme_toggle')}
            {...props}
          >
            {getIcon}
            {showLabel && <span className="ml-2">{getCurrentLabel}</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px]">
          <DropdownMenuItem
            onClick={handleLightClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sun className="h-4 w-4" />
            <span>{t('light')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDarkClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Moon className="h-4 w-4" />
            <span>{t('dark')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSystemClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Monitor className="h-4 w-4" />
            <span>{t('system')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
));
DropdownThemeToggle.displayName = "DropdownThemeToggle";

/**
 * Main ThemeToggle component that renders different variants (memoized for performance)
 */
export const ThemeToggle = React.memo(React.forwardRef<HTMLElement, ThemeToggleProps>(
  ({ variant = "icon", ...props }, ref) => {
    switch (variant) {
      case "button":
        return <ButtonThemeToggle ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
      case "switch": {
        // For switch variant, we need to extract only the compatible props
        const { showLabel, showTooltip, className, ...switchProps } = props;
        const switchCompatibleProps = Object.fromEntries(
          Object.entries(switchProps).filter(([key]) => 
            !['onClick', 'onMouseDown', 'onMouseUp', 'onKeyDown', 'onKeyUp', 'onFocus', 'onBlur', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'value'].includes(key)
          )
        ) as React.HTMLAttributes<HTMLDivElement>;
        return <SwitchThemeToggle ref={ref as React.Ref<HTMLDivElement>} showLabel={showLabel} className={className} {...switchCompatibleProps} />;
      }
      case "dropdown":
        return <DropdownThemeToggle ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
      case "icon":
      default:
        return <IconThemeToggle ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
    }
  }
));
ThemeToggle.displayName = "ThemeToggle";

// Export individual components for direct use
export {
  IconThemeToggle,
  ButtonThemeToggle,
  SwitchThemeToggle,
  DropdownThemeToggle,
  themeToggleVariants,
};

// Export component props type
export type ThemeToggleComponentProps = ThemeToggleProps;