"use client";

import * as React from "react";
import { Languages, Loader2, Check, ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLanguageEnhanced } from "@/hooks/use-language-enhanced";
import { SupportedLanguage } from "@/lib/translations";

const languageSelectorVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dropdown: "rounded-md hover:bg-accent hover:text-accent-foreground",
        select: "w-full",
        toggle: "rounded-md hover:bg-accent hover:text-accent-foreground",
        menu: "rounded-md bg-background border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 text-sm",
        md: "h-9",
        lg: "h-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "dropdown",
      size: "md",
    },
  }
);

export interface LanguageSelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof languageSelectorVariants> {
  showFlag?: boolean;
  showLabel?: boolean;
  showTooltip?: boolean;
}

export interface SelectLanguageSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  showFlag?: boolean;
  showLabel?: boolean;
}

/**
 * Flag icons as React components for better performance and customization (memoized)
 */
const FlagIcon = React.memo(({ language, className }: { language: SupportedLanguage; className?: string }) => {
  const baseClasses = React.useMemo(() => cn("inline-block rounded-sm", className), [className]);
  
  if (language === 'th') {
    // Thai flag - red, white, blue stripes
    return (
      <div className={cn(baseClasses, "w-5 h-4 overflow-hidden")} role="img" aria-label="Thai flag">
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-blue-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
      </div>
    );
  } else {
    // English/US flag - simplified version
    return (
      <div className={cn(baseClasses, "w-5 h-4 overflow-hidden")} role="img" aria-label="US flag">
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-800"></div>
      </div>
    );
  }
});
FlagIcon.displayName = "FlagIcon";

/**
 * Get language display information (moved outside component to avoid hook issues)
 */
const getLanguageInfo = (language: SupportedLanguage) => {
  const info = {
    th: {
      label: 'ไทย',
      nativeLabel: 'ไทย',
      englishLabel: 'Thai',
    },
    en: {
      label: 'English',
      nativeLabel: 'English', 
      englishLabel: 'English',
    },
  };
  
  return info[language];
};

// Memoized available languages array
const availableLanguages: SupportedLanguage[] = ['th', 'en'];

/**
 * Dropdown-style language selector component (memoized for performance)
 */
const DropdownLanguageSelector = React.memo(React.forwardRef<HTMLButtonElement, LanguageSelectorProps>(
  ({ className, variant, size, showFlag = true, showLabel = false, ...props }, ref) => {
    const { language, setLanguage, isLoading, t } = useLanguageEnhanced();

    const currentLanguageInfo = React.useMemo(() => getLanguageInfo(language), [language]);

    const handleLanguageChange = React.useCallback(async (newLanguage: SupportedLanguage) => {
      if (newLanguage !== language) {
        try {
          await setLanguage(newLanguage);
        } catch (error) {
          console.error('Failed to change language:', error);
        }
      }
    }, [language, setLanguage]);

    const getButtonContent = React.useMemo(() => {
      if (isLoading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {showLabel && <span className="ml-2">{t('loading')}</span>}
          </>
        );
      }

      return (
        <>
          {showFlag && <FlagIcon language={language} className="mr-2" />}
          <Languages className="h-4 w-4" />
          {showLabel && (
            <span className="ml-2">{currentLanguageInfo.label}</span>
          )}
        </>
      );
    }, [isLoading, showFlag, showLabel, language, currentLanguageInfo, t]);

    const getAriaLabel = React.useMemo(() => {
      if (isLoading) return t('loading');
      return `${t('language_selector')} - ${t('language')}: ${currentLanguageInfo.englishLabel}`;
    }, [isLoading, t, currentLanguageInfo]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'icon';
    }, [size]);

    const menuItems = React.useMemo(() => {
      return availableLanguages.map((lang) => {
        const langInfo = getLanguageInfo(lang);
        const isSelected = lang === language;
        
        return (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            {showFlag && <FlagIcon language={lang} />}
            <span className="flex-1">{langInfo.label}</span>
            {isSelected && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        );
      });
    }, [showFlag, language, isLoading, handleLanguageChange]);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size={buttonSize}
            className={cn(languageSelectorVariants({ variant: "dropdown", size }), className)}
            disabled={isLoading}
            aria-label={getAriaLabel}
            title={getAriaLabel}
            {...props}
          >
            {getButtonContent}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
));
DropdownLanguageSelector.displayName = "DropdownLanguageSelector";

/**
 * Select-style language selector component (memoized for performance)
 */
const SelectLanguageSelector = React.memo(React.forwardRef<HTMLDivElement, SelectLanguageSelectorProps>(
  ({ className, showFlag = true, showLabel = true, ...props }, ref) => {
    const { language, setLanguage, isLoading, t } = useLanguageEnhanced();

    const handleLanguageChange = React.useCallback(async (newLanguage: string) => {
      const lang = newLanguage as SupportedLanguage;
      if (lang !== language) {
        try {
          await setLanguage(lang);
        } catch (error) {
          console.error('Failed to change language:', error);
        }
      }
    }, [language, setLanguage]);

    const getCurrentDisplayValue = React.useMemo(() => {
      if (isLoading) return t('loading');
      const langInfo = getLanguageInfo(language);
      return showFlag ? (
        <div className="flex items-center gap-2">
          <FlagIcon language={language} />
          <span>{langInfo.label}</span>
        </div>
      ) : langInfo.label;
    }, [isLoading, language, showFlag, t]);

    const selectItems = React.useMemo(() => {
      return availableLanguages.map((lang) => {
        const langInfo = getLanguageInfo(lang);
        
        return (
          <SelectItem key={lang} value={lang}>
            <div className="flex items-center gap-2">
              {showFlag && <FlagIcon language={lang} />}
              <span>{langInfo.label}</span>
            </div>
          </SelectItem>
        );
      });
    }, [showFlag]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <label className="text-sm font-medium mb-2 block">
            {t('language')}
          </label>
        )}
        <Select
          value={language}
          onValueChange={handleLanguageChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {getCurrentDisplayValue}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {selectItems}
          </SelectContent>
        </Select>
      </div>
    );
  }
));
SelectLanguageSelector.displayName = "SelectLanguageSelector";

/**
 * Toggle-style language selector component (switches between two languages) (memoized for performance)
 */
const ToggleLanguageSelector = React.memo(React.forwardRef<HTMLButtonElement, LanguageSelectorProps>(
  ({ className, variant, size, showFlag = true, showLabel = false, ...props }, ref) => {
    const { language, toggleLanguage, isLoading, t } = useLanguageEnhanced();

    const currentLanguageInfo = React.useMemo(() => getLanguageInfo(language), [language]);
    const nextLanguage: SupportedLanguage = React.useMemo(() => language === 'th' ? 'en' : 'th', [language]);
    const nextLanguageInfo = React.useMemo(() => getLanguageInfo(nextLanguage), [nextLanguage]);

    const handleToggle = React.useCallback(async () => {
      try {
        await toggleLanguage();
      } catch (error) {
        console.error('Failed to toggle language:', error);
      }
    }, [toggleLanguage]);

    const getButtonContent = React.useMemo(() => {
      if (isLoading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {showLabel && <span className="ml-2">{t('loading')}</span>}
          </>
        );
      }

      return (
        <>
          {showFlag && <FlagIcon language={language} className="mr-2" />}
          <span className="text-sm">
            {showLabel ? currentLanguageInfo.label : currentLanguageInfo.label.slice(0, 2)}
          </span>
        </>
      );
    }, [isLoading, showFlag, showLabel, language, currentLanguageInfo, t]);

    const getAriaLabel = React.useMemo(() => {
      if (isLoading) return t('loading');
      return `${t('language_selector')} - ${t('language')}: ${currentLanguageInfo.englishLabel}. Click to switch to ${nextLanguageInfo.englishLabel}`;
    }, [isLoading, t, currentLanguageInfo, nextLanguageInfo]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';
    }, [size]);

    return (
      <Button
        ref={ref}
        variant="outline"
        size={buttonSize}
        className={cn(languageSelectorVariants({ variant: "toggle", size }), className)}
        onClick={handleToggle}
        disabled={isLoading}
        aria-label={getAriaLabel}
        title={getAriaLabel}
        {...props}
      >
        {getButtonContent}
      </Button>
    );
  }
));
ToggleLanguageSelector.displayName = "ToggleLanguageSelector";

/**
 * Menu-style language selector component (button with current language) (memoized for performance)
 */
const MenuLanguageSelector = React.memo(React.forwardRef<HTMLButtonElement, LanguageSelectorProps>(
  ({ className, variant, size, showFlag = true, showLabel = true, ...props }, ref) => {
    const { language, setLanguage, isLoading, t } = useLanguageEnhanced();

    const currentLanguageInfo = React.useMemo(() => getLanguageInfo(language), [language]);

    const handleLanguageChange = React.useCallback(async (newLanguage: SupportedLanguage) => {
      if (newLanguage !== language) {
        try {
          await setLanguage(newLanguage);
        } catch (error) {
          console.error('Failed to change language:', error);
        }
      }
    }, [language, setLanguage]);

    const getButtonContent = React.useMemo(() => {
      if (isLoading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {showLabel && <span className="ml-2">{t('loading')}</span>}
          </>
        );
      }

      return (
        <>
          {showFlag && <FlagIcon language={language} className="mr-2" />}
          {showLabel && <span>{currentLanguageInfo.label}</span>}
          <ChevronDown className="h-4 w-4 ml-2" />
        </>
      );
    }, [isLoading, showFlag, showLabel, language, currentLanguageInfo, t]);

    const getAriaLabel = React.useMemo(() => {
      if (isLoading) return t('loading');
      return `${t('language_selector')} - ${t('language')}: ${currentLanguageInfo.englishLabel}`;
    }, [isLoading, t, currentLanguageInfo]);

    const buttonSize = React.useMemo(() => {
      return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';
    }, [size]);

    const menuItems = React.useMemo(() => {
      return availableLanguages.map((lang) => {
        const langInfo = getLanguageInfo(lang);
        const isSelected = lang === language;
        
        return (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            {showFlag && <FlagIcon language={lang} />}
            <span className="flex-1">{langInfo.label}</span>
            {isSelected && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        );
      });
    }, [showFlag, language, isLoading, handleLanguageChange]);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            size={buttonSize}
            className={cn(languageSelectorVariants({ variant: "menu", size }), className)}
            disabled={isLoading}
            aria-label={getAriaLabel}
            title={getAriaLabel}
            {...props}
          >
            {getButtonContent}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
));
MenuLanguageSelector.displayName = "MenuLanguageSelector";

/**
 * Main LanguageSelector component that renders different variants (memoized for performance)
 */
export const LanguageSelector = React.memo(React.forwardRef<HTMLElement, LanguageSelectorProps>(
  ({ variant = "dropdown", ...props }, ref) => {
    const selectCompatibleProps = React.useMemo(() => {
      if (variant === "select") {
        const { showFlag, showLabel, className, ...selectProps } = props;
        return {
          showFlag,
          showLabel,
          className,
          selectProps: Object.fromEntries(
            Object.entries(selectProps).filter(([key]) => 
              !['onClick', 'onMouseDown', 'onMouseUp', 'onKeyDown', 'onKeyUp', 'onFocus', 'onBlur', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'value'].includes(key)
            )
          ) as React.HTMLAttributes<HTMLDivElement>
        };
      }
      return null;
    }, [variant, props]);

    switch (variant) {
      case "select": {
        if (!selectCompatibleProps) return null;
        const { showFlag, showLabel, className, selectProps } = selectCompatibleProps;
        return <SelectLanguageSelector ref={ref as React.Ref<HTMLDivElement>} showFlag={showFlag} showLabel={showLabel} className={className} {...selectProps} />;
      }
      case "toggle":
        return <ToggleLanguageSelector ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
      case "menu":
        return <MenuLanguageSelector ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
      case "dropdown":
      default:
        return <DropdownLanguageSelector ref={ref as React.Ref<HTMLButtonElement>} variant={variant} {...props} />;
    }
  }
));
LanguageSelector.displayName = "LanguageSelector";

// Export individual components for direct use
export {
  DropdownLanguageSelector,
  SelectLanguageSelector,
  ToggleLanguageSelector,
  MenuLanguageSelector,
  FlagIcon,
  languageSelectorVariants,
  getLanguageInfo,
};

// Export component props type
export type LanguageSelectorComponentProps = LanguageSelectorProps;