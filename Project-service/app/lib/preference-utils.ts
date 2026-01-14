/**
 * Utility functions for preference validation and error handling
 */

import { ThemeMode, SupportedLanguage } from './persistence';

/**
 * Error types for preference operations
 */
export class PreferenceError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'PreferenceError';
  }
}

export class StorageUnavailableError extends PreferenceError {
  constructor() {
    super('Storage is not available', 'STORAGE_UNAVAILABLE');
  }
}

export class CorruptedDataError extends PreferenceError {
  constructor() {
    super('Preference data is corrupted', 'CORRUPTED_DATA');
  }
}

export class ValidationError extends PreferenceError {
  constructor(field: string) {
    super(`Invalid value for ${field}`, 'VALIDATION_ERROR');
  }
}

/**
 * Validation utilities
 */
export const validators = {
  isValidTheme(value: unknown): value is ThemeMode {
    return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
  },

  isValidLanguage(value: unknown): value is SupportedLanguage {
    return typeof value === 'string' && ['th', 'en'].includes(value);
  },

  sanitizeTheme(value: unknown): ThemeMode {
    if (this.isValidTheme(value)) {
      return value as ThemeMode;
    }
    console.warn(`Invalid theme value: ${value}, falling back to light`);
    return 'light';
  },

  sanitizeLanguage(value: unknown): SupportedLanguage {
    if (this.isValidLanguage(value)) {
      return value as SupportedLanguage;
    }
    console.warn(`Invalid language value: ${value}, falling back to th`);
    return 'th';
  }
};

/**
 * Error notification system for user-facing errors
 */
export interface ErrorNotification {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

class ErrorNotificationManager {
  private static instance: ErrorNotificationManager;
  private notifications: Map<string, ErrorNotification> = new Map();
  private listeners: Set<(notifications: ErrorNotification[]) => void> = new Set();

  static getInstance(): ErrorNotificationManager {
    if (!ErrorNotificationManager.instance) {
      ErrorNotificationManager.instance = new ErrorNotificationManager();
    }
    return ErrorNotificationManager.instance;
  }

  addNotification(notification: Omit<ErrorNotification, 'id' | 'timestamp'>): string {
    const id = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullNotification: ErrorNotification = {
      ...notification,
      id,
      timestamp: Date.now()
    };

    this.notifications.set(id, fullNotification);
    this.notifyListeners();

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        this.removeNotification(id);
      }, 5000);
    }

    return id;
  }

  removeNotification(id: string): void {
    if (this.notifications.delete(id)) {
      this.notifyListeners();
    }
  }

  clearAll(): void {
    this.notifications.clear();
    this.notifyListeners();
  }

  getNotifications(): ErrorNotification[] {
    return Array.from(this.notifications.values()).sort((a, b) => b.timestamp - a.timestamp);
  }

  subscribe(listener: (notifications: ErrorNotification[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const notifications = this.getNotifications();
    this.listeners.forEach(listener => {
      try {
        listener(notifications);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }
}

/**
 * Enhanced error handling utilities with user notifications
 */
export const errorHandlers = {
  notificationManager: ErrorNotificationManager.getInstance(),

  handleStorageError(error: unknown, context?: string): void {
    let title = 'Storage Error';
    let message = 'Unable to save your preferences';
    let actions: ErrorNotification['actions'] = [];

    if (error instanceof DOMException) {
      switch (error.code) {
        case 22: // QUOTA_EXCEEDED_ERR
          title = 'Storage Full';
          message = 'Your browser storage is full. Some preferences may not be saved.';
          actions = [{
            label: 'Clear Old Data',
            action: () => this.clearOldStorageData()
          }];
          console.error('Storage quota exceeded in', context);
          break;
        case 18: // SECURITY_ERR
          title = 'Storage Access Denied';
          message = 'Browser security settings prevent saving preferences.';
          console.error('Storage access denied due to security policy in', context);
          break;
        default:
          message = `Storage operation failed: ${error.message}`;
          console.error('Storage operation failed in', context, ':', error.message);
      }
    } else {
      console.error('Unknown storage error in', context, ':', error);
    }

    this.notificationManager.addNotification({
      type: 'error',
      title,
      message,
      actions
    });
  },

  handleValidationError(field: string, value: unknown, context?: string): void {
    console.error(`Validation failed for ${field} in ${context}:`, value);
    
    this.notificationManager.addNotification({
      type: 'warning',
      title: 'Invalid Setting',
      message: `The ${field} setting has been reset to default due to an invalid value.`
    });
  },

  handleCorruptedData(data: unknown, context?: string): void {
    console.error('Corrupted preference data detected in', context, ':', data);
    
    this.notificationManager.addNotification({
      type: 'warning',
      title: 'Settings Reset',
      message: 'Your preferences were corrupted and have been reset to defaults.',
      actions: [{
        label: 'Refresh Page',
        action: () => window.location.reload()
      }]
    });
  },

  handleNetworkError(error: unknown, context?: string): void {
    console.error('Network error in', context, ':', error);
    
    this.notificationManager.addNotification({
      type: 'error',
      title: 'Connection Error',
      message: 'Unable to connect to the server. Some features may not work properly.',
      actions: [{
        label: 'Retry',
        action: () => window.location.reload()
      }]
    });
  },

  handleCriticalError(error: unknown, context?: string): void {
    console.error('Critical error in', context, ':', error);
    
    this.notificationManager.addNotification({
      type: 'error',
      title: 'System Error',
      message: 'A critical error occurred. Please refresh the page.',
      persistent: true,
      actions: [{
        label: 'Refresh Page',
        action: () => window.location.reload()
      }]
    });
  },

  handleTranslationError(key: string, language: string, context?: string): void {
    console.warn(`Translation missing for key: ${key} in language: ${language} (${context})`);
    
    // Only show notification for critical translation failures
    if (context === 'critical') {
      this.notificationManager.addNotification({
        type: 'warning',
        title: 'Translation Missing',
        message: 'Some text may not be displayed in your selected language.'
      });
    }
  },

  clearOldStorageData(): void {
    try {
      const cutoffTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days ago
      
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('temp_') || key.startsWith('cache_'))) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp && parsed.timestamp < cutoffTime) {
                localStorage.removeItem(key);
              }
            } catch {
              // Remove invalid entries
              localStorage.removeItem(key);
            }
          }
        }
      }
      
      this.notificationManager.addNotification({
        type: 'info',
        title: 'Storage Cleaned',
        message: 'Old data has been cleared to free up space.'
      });
    } catch (error) {
      console.error('Failed to clear old storage data:', error);
    }
  }
};

/**
 * Enhanced retry utilities for transient failures
 */
export const retryUtils = {
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 100,
    context?: string
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry certain types of errors
        if (this.isNonRetryableError(error)) {
          console.error(`Non-retryable error in ${context}:`, error);
          throw error;
        }
        
        if (attempt === maxRetries) {
          console.error(`All ${maxRetries} retry attempts failed for ${context}:`, lastError);
          break;
        }

        console.warn(`Attempt ${attempt} failed for ${context}, retrying in ${delay * attempt}ms:`, error);
        
        // Wait before retrying with linear backoff
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError!;
  },

  async withExponentialBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 100,
    context?: string
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry certain types of errors
        if (this.isNonRetryableError(error)) {
          console.error(`Non-retryable error in ${context}:`, error);
          throw error;
        }
        
        if (attempt === maxRetries) {
          console.error(`All ${maxRetries} retry attempts failed for ${context}:`, lastError);
          break;
        }

        // Exponential backoff: baseDelay * 2^(attempt-1) with jitter
        const delay = baseDelay * Math.pow(2, attempt - 1);
        const jitter = Math.random() * 0.1 * delay; // Add up to 10% jitter
        const finalDelay = delay + jitter;
        
        console.warn(`Attempt ${attempt} failed for ${context}, retrying in ${finalDelay.toFixed(0)}ms:`, error);
        
        await new Promise(resolve => setTimeout(resolve, finalDelay));
      }
    }

    throw lastError!;
  },

  async withCircuitBreaker<T>(
    operation: () => Promise<T>,
    failureThreshold: number = 5,
    resetTimeout: number = 60000,
    context?: string
  ): Promise<T> {
    const circuitKey = context || 'default';
    
    if (!this.circuitBreakers.has(circuitKey)) {
      this.circuitBreakers.set(circuitKey, {
        failures: 0,
        lastFailureTime: 0,
        state: 'closed' // closed, open, half-open
      });
    }
    
    const circuit = this.circuitBreakers.get(circuitKey)!;
    
    // Check if circuit is open
    if (circuit.state === 'open') {
      const timeSinceLastFailure = Date.now() - circuit.lastFailureTime;
      if (timeSinceLastFailure < resetTimeout) {
        throw new Error(`Circuit breaker is open for ${context}. Try again later.`);
      } else {
        // Move to half-open state
        circuit.state = 'half-open';
      }
    }
    
    try {
      const result = await operation();
      
      // Success - reset circuit
      circuit.failures = 0;
      circuit.state = 'closed';
      
      return result;
    } catch (error) {
      circuit.failures++;
      circuit.lastFailureTime = Date.now();
      
      if (circuit.failures >= failureThreshold) {
        circuit.state = 'open';
        console.error(`Circuit breaker opened for ${context} after ${circuit.failures} failures`);
      }
      
      throw error;
    }
  },

  // Circuit breaker state storage
  circuitBreakers: new Map<string, {
    failures: number;
    lastFailureTime: number;
    state: 'closed' | 'open' | 'half-open';
  }>(),

  isNonRetryableError(error: unknown): boolean {
    if (error instanceof DOMException) {
      // Don't retry security errors or certain storage errors
      return error.code === 18; // SECURITY_ERR
    }
    
    if (error instanceof Error) {
      // Don't retry validation errors or syntax errors
      return error.name === 'ValidationError' || 
             error.name === 'SyntaxError' ||
             error.message.includes('Invalid') ||
             error.message.includes('Unauthorized');
    }
    
    return false;
  },

  async withFallback<T>(
    primaryOperation: () => Promise<T>,
    fallbackOperation: () => Promise<T>,
    context?: string
  ): Promise<T> {
    try {
      return await primaryOperation();
    } catch (primaryError) {
      console.warn(`Primary operation failed for ${context}, trying fallback:`, primaryError);
      
      try {
        return await fallbackOperation();
      } catch (fallbackError) {
        console.error(`Both primary and fallback operations failed for ${context}:`, {
          primary: primaryError,
          fallback: fallbackError
        });
        throw primaryError; // Throw the original error
      }
    }
  },

  resetCircuitBreaker(context: string): void {
    if (this.circuitBreakers.has(context)) {
      const circuit = this.circuitBreakers.get(context)!;
      circuit.failures = 0;
      circuit.state = 'closed';
      console.log(`Circuit breaker reset for ${context}`);
    }
  },

  getCircuitBreakerStatus(context: string): { state: string; failures: number } | null {
    const circuit = this.circuitBreakers.get(context);
    return circuit ? { state: circuit.state, failures: circuit.failures } : null;
  }
};

/**
 * Performance monitoring utilities
 */
export const performanceUtils = {
  // Performance metrics storage
  metrics: new Map<string, number[]>(),
  
  async measureOperation<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Store metrics for analysis
      this.recordMetric(operationName, duration);
      
      if (duration > 100) {
        console.warn(`Slow preference operation: ${operationName} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`Failed preference operation: ${operationName} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  },

  measureSync<T>(
    operation: () => T,
    operationName: string
  ): T {
    const startTime = performance.now();
    
    try {
      const result = operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Store metrics for analysis
      this.recordMetric(operationName, duration);
      
      if (duration > 50) { // Lower threshold for sync operations
        console.warn(`Slow sync operation: ${operationName} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`Failed sync operation: ${operationName} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  },

  recordMetric(operationName: string, duration: number): void {
    if (!this.metrics.has(operationName)) {
      this.metrics.set(operationName, []);
    }
    
    const metrics = this.metrics.get(operationName)!;
    metrics.push(duration);
    
    // Keep only last 100 measurements to prevent memory leaks
    if (metrics.length > 100) {
      metrics.shift();
    }
  },

  getMetrics(operationName: string): { avg: number; min: number; max: number; count: number } | null {
    const metrics = this.metrics.get(operationName);
    if (!metrics || metrics.length === 0) {
      return null;
    }
    
    const sum = metrics.reduce((a, b) => a + b, 0);
    return {
      avg: sum / metrics.length,
      min: Math.min(...metrics),
      max: Math.max(...metrics),
      count: metrics.length
    };
  },

  getAllMetrics(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    for (const [operationName] of this.metrics) {
      const metrics = this.getMetrics(operationName);
      if (metrics) {
        result[operationName] = metrics;
      }
    }
    
    return result;
  },

  clearMetrics(): void {
    this.metrics.clear();
  },

  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Advanced debouncing with immediate execution option
  advancedDebounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    immediate: boolean = false
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
      const callNow = immediate && !timeoutId;
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (!immediate) func(...args);
      }, delay);
      
      if (callNow) func(...args);
    };
  }
};

/**
 * Migration utilities for handling version changes
 */
export const migrationUtils = {
  migratePreferences(data: any, fromVersion: string, toVersion: string): any {
    // Handle version migrations if needed in the future
    if (fromVersion === toVersion) {
      return data;
    }

    console.log(`Migrating preferences from ${fromVersion} to ${toVersion}`);
    
    // Add migration logic here as needed
    // For now, just return the data as-is
    return data;
  },

  isVersionCompatible(version: string): boolean {
    // For now, all versions are compatible
    // Add version compatibility logic here if needed
    return true;
  }
};

/**
 * Graceful degradation utilities for handling system failures
 */
export const degradationUtils = {
  // Fallback storage when localStorage is unavailable
  memoryStorage: new Map<string, string>(),
  
  createFallbackStorage(): Storage {
    return {
      getItem: (key: string) => this.memoryStorage.get(key) || null,
      setItem: (key: string, value: string) => { this.memoryStorage.set(key, value); },
      removeItem: (key: string) => { this.memoryStorage.delete(key); },
      clear: () => { this.memoryStorage.clear(); },
      key: (index: number) => Array.from(this.memoryStorage.keys())[index] || null,
      get length() { return this.memoryStorage.size; }
    };
  },

  async withGracefulDegradation<T>(
    primaryOperation: () => Promise<T>,
    fallbackValue: T,
    context?: string
  ): Promise<T> {
    try {
      return await primaryOperation();
    } catch (error) {
      console.warn(`Operation failed for ${context}, using fallback:`, error);
      
      // Notify user about degraded functionality
      errorHandlers.notificationManager.addNotification({
        type: 'warning',
        title: 'Limited Functionality',
        message: `Some features may not work properly. Using fallback for ${context}.`
      });
      
      return fallbackValue;
    }
  },

  createResilientOperation<T>(
    operation: () => Promise<T>,
    fallbackValue: T,
    options: {
      maxRetries?: number;
      retryDelay?: number;
      useCircuitBreaker?: boolean;
      context?: string;
    } = {}
  ): () => Promise<T> {
    const {
      maxRetries = 3,
      retryDelay = 100,
      useCircuitBreaker = false,
      context = 'unknown'
    } = options;

    return async () => {
      try {
        if (useCircuitBreaker) {
          return await retryUtils.withCircuitBreaker(operation, 5, 60000, context);
        } else {
          return await retryUtils.withRetry(operation, maxRetries, retryDelay, context);
        }
      } catch (error) {
        console.error(`Resilient operation failed for ${context}, using fallback:`, error);
        
        // Handle different types of errors appropriately
        if (error instanceof DOMException) {
          errorHandlers.handleStorageError(error, context);
        } else {
          errorHandlers.handleCriticalError(error, context);
        }
        
        return fallbackValue;
      }
    };
  },

  // Health check system for monitoring system state
  healthChecks: new Map<string, {
    check: () => Promise<boolean>;
    lastCheck: number;
    status: 'healthy' | 'degraded' | 'failed';
    consecutiveFailures: number;
  }>(),

  registerHealthCheck(
    name: string, 
    check: () => Promise<boolean>,
    checkInterval: number = 30000
  ): void {
    this.healthChecks.set(name, {
      check,
      lastCheck: 0,
      status: 'healthy',
      consecutiveFailures: 0
    });

    // Start periodic health checking
    setInterval(async () => {
      await this.runHealthCheck(name);
    }, checkInterval);
  },

  async runHealthCheck(name: string): Promise<void> {
    const healthCheck = this.healthChecks.get(name);
    if (!healthCheck) return;

    try {
      const isHealthy = await healthCheck.check();
      healthCheck.lastCheck = Date.now();

      if (isHealthy) {
        if (healthCheck.status !== 'healthy') {
          console.log(`Health check ${name} recovered`);
          errorHandlers.notificationManager.addNotification({
            type: 'info',
            title: 'System Recovered',
            message: `${name} is now working normally.`
          });
        }
        healthCheck.status = 'healthy';
        healthCheck.consecutiveFailures = 0;
      } else {
        healthCheck.consecutiveFailures++;
        
        if (healthCheck.consecutiveFailures >= 3) {
          healthCheck.status = 'failed';
          errorHandlers.notificationManager.addNotification({
            type: 'error',
            title: 'System Failure',
            message: `${name} has failed and may not work properly.`,
            persistent: true
          });
        } else {
          healthCheck.status = 'degraded';
        }
      }
    } catch (error) {
      console.error(`Health check failed for ${name}:`, error);
      healthCheck.consecutiveFailures++;
      healthCheck.status = 'failed';
    }
  },

  getSystemHealth(): Record<string, { status: string; lastCheck: number; failures: number }> {
    const health: Record<string, { status: string; lastCheck: number; failures: number }> = {};
    
    for (const [name, check] of this.healthChecks) {
      health[name] = {
        status: check.status,
        lastCheck: check.lastCheck,
        failures: check.consecutiveFailures
      };
    }
    
    return health;
  },

  isSystemHealthy(): boolean {
    for (const [, check] of this.healthChecks) {
      if (check.status === 'failed') {
        return false;
      }
    }
    return true;
  }
};