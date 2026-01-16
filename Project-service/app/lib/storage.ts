/**
 * Storage Adapter Interface and Implementation
 * Provides a consistent interface for localStorage operations with error handling
 */

export interface StorageAdapter {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  isAvailable(): boolean;
}

/**
 * LocalStorage implementation with enhanced error handling and fallback
 */
export class LocalStorageAdapter implements StorageAdapter {
  private available: boolean;
  private fallbackStorage: Map<string, string> = new Map();
  private usingFallback: boolean = false;

  constructor() {
    this.available = this.checkAvailability();
    
    // Register health check for storage
    if (typeof window !== 'undefined') {
      this.registerStorageHealthCheck();
    }
  }

  private checkAvailability(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn('LocalStorage is not available:', error);
      return false;
    }
  }

  private registerStorageHealthCheck(): void {
    // Import degradationUtils dynamically to avoid circular dependency
    const checkStorageHealth = async (): Promise<boolean> => {
      try {
        const testKey = '__health_check__';
        const testValue = Date.now().toString();
        window.localStorage.setItem(testKey, testValue);
        const retrieved = window.localStorage.getItem(testKey);
        window.localStorage.removeItem(testKey);
        return retrieved === testValue;
      } catch {
        return false;
      }
    };

    // Register with degradation utils if available
    setTimeout(() => {
      import('./preference-utils').then(({ degradationUtils }) => {
        degradationUtils.registerHealthCheck('localStorage', checkStorageHealth, 60000);
      }).catch((error) => {
        console.warn('Could not register storage health check:', error);
      });
    }, 1000);
  }

  setItem(key: string, value: string): void {
    // Try localStorage first
    if (this.available && !this.usingFallback) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
        
        // Handle specific error types
        if (error instanceof DOMException) {
          if (error.code === 22) { // QUOTA_EXCEEDED_ERR
            console.warn('Storage quota exceeded, attempting cleanup and fallback');
            this.handleQuotaExceeded(key, value);
            return;
          } else if (error.code === 18) { // SECURITY_ERR
            console.warn('Storage access denied, switching to fallback');
            this.switchToFallback();
          }
        }
        
        // Switch to fallback for any other error
        this.switchToFallback();
      }
    }
    
    // Use fallback storage
    this.fallbackStorage.set(key, value);
    
    if (!this.usingFallback) {
      console.warn('Using fallback storage for key:', key);
    }
  }

  getItem(key: string): string | null {
    // Try localStorage first
    if (this.available && !this.usingFallback) {
      try {
        const value = window.localStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.error('Failed to read from localStorage:', error);
        this.switchToFallback();
      }
    }
    
    // Check fallback storage
    return this.fallbackStorage.get(key) || null;
  }

  removeItem(key: string): void {
    // Try localStorage first
    if (this.available && !this.usingFallback) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error('Failed to remove from localStorage:', error);
        this.switchToFallback();
      }
    }
    
    // Remove from fallback storage
    this.fallbackStorage.delete(key);
  }

  isAvailable(): boolean {
    return this.available || this.usingFallback;
  }

  private handleQuotaExceeded(key: string, value: string): void {
    try {
      // Try to clean up old entries first
      this.cleanupOldEntries();
      
      // Retry the operation
      window.localStorage.setItem(key, value);
      console.log('Successfully saved after cleanup');
    } catch (retryError) {
      console.warn('Still failed after cleanup, switching to fallback');
      this.switchToFallback();
      this.fallbackStorage.set(key, value);
      
      // Notify user about storage issues
      this.notifyStorageIssue('quota');
    }
  }

  private switchToFallback(): void {
    if (!this.usingFallback) {
      this.usingFallback = true;
      console.warn('Switched to fallback storage due to localStorage issues');
      
      // Try to migrate existing data from localStorage to fallback
      this.migrateToFallback();
      
      // Notify user about degraded functionality
      this.notifyStorageIssue('fallback');
    }
  }

  private migrateToFallback(): void {
    if (!this.available) return;
    
    try {
      // Copy important preference keys to fallback
      const importantKeys = ['user_preferences', 'theme', 'language'];
      
      for (const key of importantKeys) {
        try {
          const value = window.localStorage.getItem(key);
          if (value) {
            this.fallbackStorage.set(key, value);
          }
        } catch (error) {
          console.warn(`Failed to migrate key ${key}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to migrate data to fallback:', error);
    }
  }

  private notifyStorageIssue(type: 'quota' | 'fallback'): void {
    // Import errorHandlers dynamically to avoid circular dependency
    setTimeout(() => {
      import('./preference-utils').then(({ errorHandlers }) => {
        if (type === 'quota') {
          errorHandlers.notificationManager.addNotification({
            type: 'warning',
            title: 'Storage Full',
            message: 'Browser storage is full. Old data has been cleared, but some preferences may not be saved.',
            actions: [{
              label: 'Clear More Data',
              action: () => this.cleanupOldEntries()
            }]
          });
        } else {
          errorHandlers.notificationManager.addNotification({
            type: 'warning',
            title: 'Storage Issues',
            message: 'Using temporary storage. Your preferences may not be saved between sessions.',
            persistent: true
          });
        }
      }).catch((error) => {
        console.warn('Could not show storage notification:', error);
      });
    }, 100);
  }

  private cleanupOldEntries(): void {
    try {
      // Remove old preference entries (older than 30 days)
      const cutoffTime = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
      for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const key = window.localStorage.key(i);
        if (key && (key.startsWith('temp_') || key.startsWith('cache_') || key.startsWith('old_'))) {
          const item = window.localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp && parsed.timestamp < cutoffTime) {
                window.localStorage.removeItem(key);
              }
            } catch {
              // Remove invalid entries
              window.localStorage.removeItem(key);
            }
          }
        }
      }
      
      // Also remove very old user preferences (older than 1 year)
      const veryOldCutoff = Date.now() - (365 * 24 * 60 * 60 * 1000);
      for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith('user_preferences_')) {
          const item = window.localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.metadata?.lastUpdated && parsed.metadata.lastUpdated < veryOldCutoff) {
                window.localStorage.removeItem(key);
              }
            } catch {
              // Remove invalid entries
              window.localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to cleanup localStorage:', error);
    }
  }

  // Get storage usage information
  getStorageInfo(): { used: number; available: number; total: number } | null {
    if (!this.available) return null;
    
    try {
      let used = 0;
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          const value = window.localStorage.getItem(key);
          if (value) {
            used += key.length + value.length;
          }
        }
      }
      
      // Estimate total storage (usually 5-10MB, but varies by browser)
      const total = 5 * 1024 * 1024; // 5MB estimate
      const available = total - used;
      
      return { used, available, total };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return null;
    }
  }

  // Force a switch back to localStorage if it becomes available
  async attemptStorageRecovery(): Promise<boolean> {
    if (this.usingFallback) {
      const isNowAvailable = this.checkAvailability();
      
      if (isNowAvailable) {
        console.log('localStorage is now available, attempting recovery');
        
        try {
          // Migrate fallback data back to localStorage
          for (const [key, value] of this.fallbackStorage) {
            window.localStorage.setItem(key, value);
          }
          
          this.usingFallback = false;
          this.available = true;
          
          console.log('Successfully recovered to localStorage');
          return true;
        } catch (error) {
          console.error('Failed to recover to localStorage:', error);
          return false;
        }
      }
    }
    
    return false;
  }
}

/**
 * In-memory storage fallback for when localStorage is unavailable
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, string> = new Map();

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  isAvailable(): boolean {
    return true; // Memory storage is always available
  }
}

/**
 * Factory function to create the appropriate storage adapter
 */
export function createStorageAdapter(): StorageAdapter {
  const localStorage = new LocalStorageAdapter();
  
  if (localStorage.isAvailable()) {
    return localStorage;
  }
  
  console.warn('LocalStorage not available, falling back to memory storage');
  return new MemoryStorageAdapter();
}