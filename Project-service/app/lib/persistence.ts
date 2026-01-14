/**
 * Persistence Layer for Theme and Language Preferences
 * Handles saving and loading user preferences with validation and error handling
 */

import { StorageAdapter, createStorageAdapter } from './storage';

// Type definitions
export type ThemeMode = 'light' | 'dark' | 'system';
export type SupportedLanguage = 'th' | 'en';

export interface ThemeConfig {
  mode: ThemeMode;
  timestamp: number;
  version: string;
}

export interface LanguageConfig {
  language: SupportedLanguage;
  timestamp: number;
  version: string;
}

export interface UserPreferences {
  theme: ThemeConfig;
  language: LanguageConfig;
  metadata: {
    lastUpdated: number;
    version: string;
  };
}

// Constants
const STORAGE_KEY = 'user_preferences';
const CURRENT_VERSION = '1.0.0';
const DEFAULT_THEME: ThemeMode = 'light';
const DEFAULT_LANGUAGE: SupportedLanguage = 'th';

// Validation functions
function isValidThemeMode(value: any): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
}

function isValidLanguage(value: any): value is SupportedLanguage {
  return typeof value === 'string' && ['th', 'en'].includes(value);
}

function validateThemeConfig(config: any): ThemeConfig | null {
  if (!config || typeof config !== 'object') return null;
  
  if (!isValidThemeMode(config.mode)) return null;
  if (typeof config.timestamp !== 'number') return null;
  if (typeof config.version !== 'string') return null;
  
  return config as ThemeConfig;
}

function validateLanguageConfig(config: any): LanguageConfig | null {
  if (!config || typeof config !== 'object') return null;
  
  if (!isValidLanguage(config.language)) return null;
  if (typeof config.timestamp !== 'number') return null;
  if (typeof config.version !== 'string') return null;
  
  return config as LanguageConfig;
}

function validateUserPreferences(data: any): UserPreferences | null {
  if (!data || typeof data !== 'object') return null;
  
  const theme = validateThemeConfig(data.theme);
  const language = validateLanguageConfig(data.language);
  
  if (!theme || !language) return null;
  
  if (!data.metadata || typeof data.metadata !== 'object') return null;
  if (typeof data.metadata.lastUpdated !== 'number') return null;
  if (typeof data.metadata.version !== 'string') return null;
  
  return {
    theme,
    language,
    metadata: data.metadata
  };
}

/**
 * Persistence Layer Interface
 */
export interface PersistenceLayer {
  saveTheme(theme: ThemeMode): Promise<void>;
  loadTheme(): Promise<ThemeMode | null>;
  saveLanguage(language: SupportedLanguage): Promise<void>;
  loadLanguage(): Promise<SupportedLanguage | null>;
  savePreferences(preferences: Partial<UserPreferences>): Promise<void>;
  loadPreferences(): Promise<UserPreferences | null>;
  isAvailable(): boolean;
  clearPreferences(): Promise<void>;
}

/**
 * Implementation of the Persistence Layer with enhanced error handling
 */
export class PreferencePersistence implements PersistenceLayer {
  private storage: StorageAdapter;
  private errorHandlers: any;
  private retryUtils: any;
  private degradationUtils: any;

  constructor(storage?: StorageAdapter) {
    this.storage = storage || createStorageAdapter();
    
    // Import utilities dynamically to avoid circular dependencies
    this.initializeUtilities();
  }

  private async initializeUtilities(): Promise<void> {
    try {
      const utils = await import('./preference-utils');
      this.errorHandlers = utils.errorHandlers;
      this.retryUtils = utils.retryUtils;
      this.degradationUtils = utils.degradationUtils;
    } catch (error) {
      console.warn('Could not load preference utilities:', error);
    }
  }

  async saveTheme(theme: ThemeMode): Promise<void> {
    const operation = async () => {
      const currentPrefs = await this.loadPreferences();
      const themeConfig: ThemeConfig = {
        mode: theme,
        timestamp: Date.now(),
        version: CURRENT_VERSION
      };

      const updatedPrefs: UserPreferences = {
        theme: themeConfig,
        language: currentPrefs?.language || {
          language: DEFAULT_LANGUAGE,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        metadata: {
          lastUpdated: Date.now(),
          version: CURRENT_VERSION
        }
      };

      await this.savePreferences(updatedPrefs);
    };

    try {
      if (this.retryUtils) {
        await this.retryUtils.withRetry(operation, 3, 100, 'saveTheme');
      } else {
        await operation();
      }
    } catch (error) {
      console.error('Failed to save theme preference:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'saveTheme');
      }
      
      // Don't throw - allow graceful degradation
      console.warn('Theme preference not saved, but continuing with in-memory state');
    }
  }

  async loadTheme(): Promise<ThemeMode | null> {
    const operation = async (): Promise<ThemeMode | null> => {
      const preferences = await this.loadPreferences();
      return preferences?.theme?.mode || null;
    };

    try {
      if (this.degradationUtils) {
        return await this.degradationUtils.withGracefulDegradation(
          operation,
          DEFAULT_THEME,
          'loadTheme'
        );
      } else {
        return await operation();
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'loadTheme');
      }
      
      return DEFAULT_THEME; // Always return a valid fallback
    }
  }

  async saveLanguage(language: SupportedLanguage): Promise<void> {
    const operation = async () => {
      const currentPrefs = await this.loadPreferences();
      const languageConfig: LanguageConfig = {
        language,
        timestamp: Date.now(),
        version: CURRENT_VERSION
      };

      const updatedPrefs: UserPreferences = {
        theme: currentPrefs?.theme || {
          mode: DEFAULT_THEME,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        language: languageConfig,
        metadata: {
          lastUpdated: Date.now(),
          version: CURRENT_VERSION
        }
      };

      await this.savePreferences(updatedPrefs);
    };

    try {
      if (this.retryUtils) {
        await this.retryUtils.withRetry(operation, 3, 100, 'saveLanguage');
      } else {
        await operation();
      }
    } catch (error) {
      console.error('Failed to save language preference:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'saveLanguage');
      }
      
      // Don't throw - allow graceful degradation
      console.warn('Language preference not saved, but continuing with in-memory state');
    }
  }

  async loadLanguage(): Promise<SupportedLanguage | null> {
    const operation = async (): Promise<SupportedLanguage | null> => {
      const preferences = await this.loadPreferences();
      return preferences?.language?.language || null;
    };

    try {
      if (this.degradationUtils) {
        return await this.degradationUtils.withGracefulDegradation(
          operation,
          DEFAULT_LANGUAGE,
          'loadLanguage'
        );
      } else {
        return await operation();
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'loadLanguage');
      }
      
      return DEFAULT_LANGUAGE; // Always return a valid fallback
    }
  }

  async savePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const operation = async () => {
      const currentPrefs = await this.loadPreferencesInternal();
      
      const updatedPrefs: UserPreferences = {
        theme: preferences.theme || currentPrefs?.theme || {
          mode: DEFAULT_THEME,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        language: preferences.language || currentPrefs?.language || {
          language: DEFAULT_LANGUAGE,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        metadata: {
          lastUpdated: Date.now(),
          version: CURRENT_VERSION
        }
      };

      const serialized = JSON.stringify(updatedPrefs);
      this.storage.setItem(STORAGE_KEY, serialized);
    };

    try {
      if (this.retryUtils) {
        await this.retryUtils.withRetry(operation, 3, 100, 'savePreferences');
      } else {
        await operation();
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'savePreferences');
      }
      
      throw error; // Re-throw for this method as it's the core save operation
    }
  }

  async loadPreferences(): Promise<UserPreferences | null> {
    try {
      return await this.loadPreferencesInternal();
    } catch (error) {
      console.error('Failed to load preferences:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleCorruptedData(error, 'loadPreferences');
      }
      
      // Return default preferences instead of null
      return {
        theme: {
          mode: DEFAULT_THEME,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        language: {
          language: DEFAULT_LANGUAGE,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        },
        metadata: {
          lastUpdated: Date.now(),
          version: CURRENT_VERSION
        }
      };
    }
  }

  private async loadPreferencesInternal(): Promise<UserPreferences | null> {
    const operation = async (): Promise<UserPreferences | null> => {
      const stored = this.storage.getItem(STORAGE_KEY);
      if (!stored) return null;

      let parsed: any;
      try {
        parsed = JSON.parse(stored);
      } catch (parseError) {
        console.error('Failed to parse preferences JSON:', parseError);
        throw new Error('Corrupted preference data - invalid JSON');
      }

      const validated = validateUserPreferences(parsed);
      
      if (!validated) {
        console.warn('Invalid preferences found, clearing corrupted data');
        await this.clearPreferences();
        throw new Error('Corrupted preference data - validation failed');
      }

      return validated;
    };

    try {
      if (this.retryUtils) {
        return await this.retryUtils.withFallback(
          operation,
          async () => {
            console.warn('Using fallback preferences due to load failure');
            return null;
          },
          'loadPreferences'
        );
      } else {
        return await operation();
      }
    } catch (error) {
      // Clear corrupted data and return null
      try {
        await this.clearPreferences();
      } catch (clearError) {
        console.error('Failed to clear corrupted preferences:', clearError);
      }
      return null;
    }
  }

  isAvailable(): boolean {
    return this.storage.isAvailable();
  }

  async clearPreferences(): Promise<void> {
    try {
      this.storage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      
      if (this.errorHandlers) {
        this.errorHandlers.handleStorageError(error, 'clearPreferences');
      }
      
      throw error;
    }
  }

  // Additional methods for enhanced error handling

  async validateAndRepairPreferences(): Promise<boolean> {
    try {
      const preferences = await this.loadPreferencesInternal();
      
      if (!preferences) {
        // Create default preferences
        await this.savePreferences({});
        return true;
      }

      // Check if repair is needed
      let needsRepair = false;
      const repairedPrefs: Partial<UserPreferences> = {};

      if (!preferences.theme || !isValidThemeMode(preferences.theme.mode)) {
        repairedPrefs.theme = {
          mode: DEFAULT_THEME,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        };
        needsRepair = true;
      }

      if (!preferences.language || !isValidLanguage(preferences.language.language)) {
        repairedPrefs.language = {
          language: DEFAULT_LANGUAGE,
          timestamp: Date.now(),
          version: CURRENT_VERSION
        };
        needsRepair = true;
      }

      if (needsRepair) {
        console.log('Repairing corrupted preferences');
        await this.savePreferences(repairedPrefs);
        
        if (this.errorHandlers) {
          this.errorHandlers.notificationManager.addNotification({
            type: 'info',
            title: 'Settings Repaired',
            message: 'Some corrupted settings have been automatically repaired.'
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to validate and repair preferences:', error);
      return false;
    }
  }

  async getStorageHealth(): Promise<{
    available: boolean;
    canRead: boolean;
    canWrite: boolean;
    storageInfo?: any;
  }> {
    const health = {
      available: this.storage.isAvailable(),
      canRead: false,
      canWrite: false,
      storageInfo: undefined
    };

    // Test read capability
    try {
      this.storage.getItem('__health_test__');
      health.canRead = true;
    } catch (error) {
      console.warn('Storage read test failed:', error);
    }

    // Test write capability
    try {
      const testValue = Date.now().toString();
      this.storage.setItem('__health_test__', testValue);
      const retrieved = this.storage.getItem('__health_test__');
      health.canWrite = retrieved === testValue;
      this.storage.removeItem('__health_test__');
    } catch (error) {
      console.warn('Storage write test failed:', error);
    }

    // Get storage info if available
    if (this.storage instanceof LocalStorageAdapter) {
      try {
        health.storageInfo = (this.storage as any).getStorageInfo?.();
      } catch (error) {
        console.warn('Could not get storage info:', error);
      }
    }

    return health;
  }
}

// Singleton instance
let persistenceInstance: PreferencePersistence | null = null;

/**
 * Get the singleton persistence instance
 */
export function getPersistence(): PreferencePersistence {
  if (!persistenceInstance) {
    persistenceInstance = new PreferencePersistence();
  }
  return persistenceInstance;
}

/**
 * Utility functions for direct theme/language operations
 */
export const persistenceUtils = {
  async getTheme(): Promise<ThemeMode> {
    const theme = await getPersistence().loadTheme();
    return theme || DEFAULT_THEME;
  },

  async setTheme(theme: ThemeMode): Promise<void> {
    await getPersistence().saveTheme(theme);
  },

  async getLanguage(): Promise<SupportedLanguage> {
    const language = await getPersistence().loadLanguage();
    return language || DEFAULT_LANGUAGE;
  },

  async setLanguage(language: SupportedLanguage): Promise<void> {
    await getPersistence().saveLanguage(language);
  },

  async getDefaults(): Promise<{ theme: ThemeMode; language: SupportedLanguage }> {
    return {
      theme: DEFAULT_THEME,
      language: DEFAULT_LANGUAGE
    };
  }
};