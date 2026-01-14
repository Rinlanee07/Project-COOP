/**
 * Lazy Loading Translation Dictionary Manager
 * Implements lazy loading for translation dictionaries to improve initial load performance
 */

import { SupportedLanguage, TranslationParams, TranslationDictionary } from './translations';
import { performanceUtils, errorHandlers } from './preference-utils';

interface LazyTranslationChunk {
  [key: string]: string;
}

interface TranslationChunkMap {
  [language: string]: {
    [chunkName: string]: LazyTranslationChunk;
  };
}

/**
 * Translation chunks organized by feature/module for lazy loading
 */
const translationChunks: TranslationChunkMap = {
  en: {
    // Core UI - loaded immediately
    core: {
      "dashboard": "Dashboard",
      "tickets": "Tickets",
      "repair": "Repair",
      "borrow": "Borrow & Return",
      "settings": "Settings",
      "logout": "Logout",
      "profile": "Profile",
      "save": "Save",
      "cancel": "Cancel",
      "edit": "Edit",
      "delete": "Delete",
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "theme": "Theme",
      "language": "Language"
    },
    
    // Forms - loaded when needed
    forms: {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "address": "Address",
      "description": "Description",
      "status": "Status",
      "priority": "Priority",
      "date": "Date",
      "time": "Time",
      "created_at": "Created At",
      "updated_at": "Updated At",
      "created_by": "Created By",
      "assigned_to": "Assigned To",
      "required_field": "This field is required",
      "invalid_email": "Invalid email format",
      "invalid_phone": "Invalid phone number"
    },
    
    // Tickets - loaded when accessing ticket features
    tickets: {
      "ticket_id": "Ticket ID",
      "customer_name": "Customer Name",
      "device_type": "Device Type",
      "device_model": "Device Model",
      "issue_description": "Issue Description",
      "repair_status": "Repair Status",
      "technician": "Technician",
      "estimated_cost": "Estimated Cost",
      "actual_cost": "Actual Cost",
      "completion_date": "Completion Date",
      "new_ticket": "New Ticket"
    },
    
    // Status values - loaded when needed
    status: {
      "pending": "Pending",
      "in_progress": "In Progress",
      "completed": "Completed",
      "cancelled": "Cancelled",
      "on_hold": "On Hold",
      "waiting_parts": "Waiting for Parts",
      "ready_pickup": "Ready for Pickup",
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      "urgent": "Urgent"
    },
    
    // Messages - loaded when needed
    messages: {
      "error_loading_data": "Error loading data",
      "error_saving_data": "Error saving data",
      "error_network": "Network error occurred",
      "success_saved": "Successfully saved",
      "success_updated": "Successfully updated",
      "success_deleted": "Successfully deleted",
      "confirm_delete": "Are you sure you want to delete this item?",
      "confirm_cancel": "Are you sure you want to cancel?",
      "unsaved_changes": "You have unsaved changes. Do you want to continue?"
    }
  },
  
  th: {
    // Core UI - loaded immediately
    core: {
      "dashboard": "แดชบอร์ด",
      "tickets": "แจ้งซ่อม",
      "repair": "งานซ่อม",
      "borrow": "ยืม-คืน",
      "settings": "ตั้งค่า",
      "logout": "ออกจากระบบ",
      "profile": "โปรไฟล์",
      "save": "บันทึก",
      "cancel": "ยกเลิก",
      "edit": "แก้ไข",
      "delete": "ลบ",
      "loading": "กำลังโหลด...",
      "error": "ข้อผิดพลาด",
      "success": "สำเร็จ",
      "theme": "ธีม",
      "language": "ภาษา"
    },
    
    // Forms - loaded when needed
    forms: {
      "name": "ชื่อ",
      "email": "อีเมล",
      "phone": "เบอร์โทรศัพท์",
      "address": "ที่อยู่",
      "description": "รายละเอียด",
      "status": "สถานะ",
      "priority": "ความสำคัญ",
      "date": "วันที่",
      "time": "เวลา",
      "created_at": "สร้างเมื่อ",
      "updated_at": "อัปเดตเมื่อ",
      "created_by": "สร้างโดย",
      "assigned_to": "มอบหมายให้",
      "required_field": "ฟิลด์นี้จำเป็นต้องกรอก",
      "invalid_email": "รูปแบบอีเมลไม่ถูกต้อง",
      "invalid_phone": "หมายเลขโทรศัพท์ไม่ถูกต้อง"
    },
    
    // Tickets - loaded when accessing ticket features
    tickets: {
      "ticket_id": "รหัสใบงาน",
      "customer_name": "ชื่อลูกค้า",
      "device_type": "ประเภทอุปกรณ์",
      "device_model": "รุ่นอุปกรณ์",
      "issue_description": "รายละเอียดปัญหา",
      "repair_status": "สถานะการซ่อม",
      "technician": "ช่างเทคนิค",
      "estimated_cost": "ค่าใช้จ่ายประมาณ",
      "actual_cost": "ค่าใช้จ่ายจริง",
      "completion_date": "วันที่เสร็จสิ้น",
      "new_ticket": "เปิดใบงานใหม่"
    },
    
    // Status values - loaded when needed
    status: {
      "pending": "รอดำเนินการ",
      "in_progress": "กำลังดำเนินการ",
      "completed": "เสร็จสิ้น",
      "cancelled": "ยกเลิก",
      "on_hold": "พักการดำเนินการ",
      "waiting_parts": "รออะไหล่",
      "ready_pickup": "พร้อมรับ",
      "low": "ต่ำ",
      "medium": "ปานกลาง",
      "high": "สูง",
      "urgent": "เร่งด่วน"
    },
    
    // Messages - loaded when needed
    messages: {
      "error_loading_data": "เกิดข้อผิดพลาดในการโหลดข้อมูล",
      "error_saving_data": "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      "error_network": "เกิดข้อผิดพลาดเครือข่าย",
      "success_saved": "บันทึกสำเร็จ",
      "success_updated": "อัปเดตสำเร็จ",
      "success_deleted": "ลบสำเร็จ",
      "confirm_delete": "คุณแน่ใจหรือไม่ที่จะลบรายการนี้?",
      "confirm_cancel": "คุณแน่ใจหรือไม่ที่จะยกเลิก?",
      "unsaved_changes": "คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการดำเนินการต่อหรือไม่?"
    }
  }
};

/**
 * Lazy Translation Loader Class
 */
export class LazyTranslationLoader {
  private static instance: LazyTranslationLoader;
  private loadedChunks: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<void>> = new Map();
  private translations: TranslationDictionary = { en: {}, th: {} };
  
  static getInstance(): LazyTranslationLoader {
    if (!LazyTranslationLoader.instance) {
      LazyTranslationLoader.instance = new LazyTranslationLoader();
    }
    return LazyTranslationLoader.instance;
  }

  constructor() {
    // Always load core translations immediately
    this.loadChunkSync('core');
  }

  /**
   * Load a translation chunk synchronously (for core translations)
   */
  private loadChunkSync(chunkName: string): void {
    const chunkKey = chunkName;
    
    if (this.loadedChunks.has(chunkKey)) {
      return;
    }

    performanceUtils.measureSync(() => {
      // Load for both languages
      for (const language of ['en', 'th'] as SupportedLanguage[]) {
        const chunk = translationChunks[language]?.[chunkName];
        if (chunk) {
          Object.assign(this.translations[language], chunk);
        }
      }
      
      this.loadedChunks.add(chunkKey);
    }, `load-chunk-sync-${chunkName}`);
  }

  /**
   * Load a translation chunk asynchronously
   */
  async loadChunk(chunkName: string): Promise<void> {
    const chunkKey = chunkName;
    
    if (this.loadedChunks.has(chunkKey)) {
      return;
    }

    // Check if already loading
    if (this.loadingPromises.has(chunkKey)) {
      return this.loadingPromises.get(chunkKey);
    }

    const loadingPromise = performanceUtils.measureOperation(async () => {
      // Simulate async loading (in real app, this might be a network request)
      await new Promise(resolve => setTimeout(resolve, 1));
      
      // Load for both languages
      for (const language of ['en', 'th'] as SupportedLanguage[]) {
        const chunk = translationChunks[language]?.[chunkName];
        if (chunk) {
          Object.assign(this.translations[language], chunk);
        }
      }
      
      this.loadedChunks.add(chunkKey);
      this.loadingPromises.delete(chunkKey);
    }, `load-chunk-${chunkName}`);

    this.loadingPromises.set(chunkKey, loadingPromise);
    return loadingPromise;
  }

  /**
   * Load multiple chunks at once
   */
  async loadChunks(chunkNames: string[]): Promise<void> {
    const loadPromises = chunkNames.map(chunkName => this.loadChunk(chunkName));
    await Promise.all(loadPromises);
  }

  /**
   * Get translation with automatic chunk loading and enhanced fallback
   */
  async getTranslation(
    language: SupportedLanguage,
    key: string,
    params?: TranslationParams
  ): Promise<string> {
    try {
      // Check if translation exists in loaded chunks
      let translation = this.translations[language]?.[key];
      
      if (!translation) {
        // Try to determine which chunk might contain this key and load it
        const chunkName = this.guessChunkForKey(key);
        if (chunkName && !this.loadedChunks.has(chunkName)) {
          try {
            await this.loadChunk(chunkName);
            translation = this.translations[language]?.[key];
          } catch (chunkError) {
            console.warn(`Failed to load chunk ${chunkName} for key ${key}:`, chunkError);
          }
        }
      }
      
      // If still no translation, try fallback language
      if (!translation && language !== 'en') {
        console.warn(`Translation missing for key: ${key} in language: ${language}, trying English fallback`);
        translation = this.translations['en']?.[key];
        
        // If English translation is also missing, try to load the chunk for English
        if (!translation) {
          const chunkName = this.guessChunkForKey(key);
          if (chunkName && !this.loadedChunks.has(chunkName)) {
            try {
              await this.loadChunk(chunkName);
              translation = this.translations['en']?.[key];
            } catch (chunkError) {
              console.warn(`Failed to load English fallback chunk ${chunkName} for key ${key}:`, chunkError);
            }
          }
        }
      }
      
      // If still no translation, try to create a human-readable fallback
      if (!translation) {
        translation = this.createFallbackTranslation(key);
        console.warn(`Using fallback translation for key: ${key} in language: ${language}`);
        
        // Report missing translation for development
        this.reportMissingTranslation(key, language);
      }
      
      // Handle parameterized translations
      if (params && Object.keys(params).length > 0) {
        return this.interpolateParams(translation, params);
      }
      
      return translation;
    } catch (error) {
      console.error(`Error getting translation for key ${key}:`, error);
      return this.createFallbackTranslation(key);
    }
  }

  /**
   * Get translation synchronously with enhanced fallback (only works for loaded chunks)
   */
  getTranslationSync(
    language: SupportedLanguage,
    key: string,
    params?: TranslationParams
  ): string {
    try {
      let translation = this.translations[language]?.[key];
      
      // If no translation in requested language, try English fallback
      if (!translation && language !== 'en') {
        translation = this.translations['en']?.[key];
        if (translation) {
          console.warn(`Using English fallback for key: ${key} (requested: ${language})`);
        }
      }
      
      // If still no translation, create a fallback
      if (!translation) {
        translation = this.createFallbackTranslation(key);
        console.warn(`Using fallback translation for key: ${key} in language: ${language} (sync)`);
        
        // Report missing translation for development
        this.reportMissingTranslation(key, language);
      }
      
      // Handle parameterized translations
      if (params && Object.keys(params).length > 0) {
        return this.interpolateParams(translation, params);
      }
      
      return translation;
    } catch (error) {
      console.error(`Error getting sync translation for key ${key}:`, error);
      return this.createFallbackTranslation(key);
    }
  }

  /**
   * Create a human-readable fallback translation from the key
   */
  private createFallbackTranslation(key: string): string {
    // Convert snake_case or camelCase to human readable
    return key
      .replace(/[_-]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Interpolate parameters in translation strings with error handling
   */
  private interpolateParams(translation: string, params: TranslationParams): string {
    try {
      return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
        const value = params[paramKey];
        if (value !== undefined) {
          return String(value);
        } else {
          console.warn(`Missing parameter ${paramKey} for translation: ${translation}`);
          return match; // Keep the placeholder if parameter is missing
        }
      });
    } catch (error) {
      console.error('Error interpolating translation parameters:', error);
      return translation; // Return original translation if interpolation fails
    }
  }

  /**
   * Report missing translations for development and monitoring
   */
  private reportMissingTranslation(key: string, language: SupportedLanguage): void {
    // In development, collect missing translations
    if (typeof window !== 'undefined' && (window as any).__DEV__) {
      if (!this.missingTranslations.has(language)) {
        this.missingTranslations.set(language, new Set());
      }
      this.missingTranslations.get(language)!.add(key);
    }
    
    // Report to error handling system if available
        setTimeout(() => {
          try {
            if (errorHandlers && typeof errorHandlers.handleTranslationError === 'function') {
              errorHandlers.handleTranslationError(key, language, 'translation-loader');
            }
          } catch (error) {
            // Ignore if error handlers not available or fail
            console.warn('Failed to report translation error:', error);
          }
        }, 0);
  }

  // Track missing translations for development
  private missingTranslations: Map<SupportedLanguage, Set<string>> = new Map();

  /**
   * Get missing translations for development debugging
   */
  getMissingTranslations(): Record<SupportedLanguage, string[]> {
    const result: Record<SupportedLanguage, string[]> = { en: [], th: [] };
    
    for (const [language, keys] of this.missingTranslations) {
      result[language] = Array.from(keys);
    }
    
    return result;
  }

  /**
   * Load a translation chunk asynchronously with enhanced error handling
   */
  async loadChunk(chunkName: string): Promise<void> {
    const chunkKey = chunkName;
    
    if (this.loadedChunks.has(chunkKey)) {
      return;
    }

    // Check if already loading
    if (this.loadingPromises.has(chunkKey)) {
      return this.loadingPromises.get(chunkKey);
    }

    const loadingPromise = performanceUtils.measureOperation(async () => {
      try {
        // Simulate async loading with retry logic
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
          try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, Math.min(10, attempts * 5)));
            
            // Load for both languages
            for (const language of ['en', 'th'] as SupportedLanguage[]) {
              const chunk = translationChunks[language]?.[chunkName];
              if (chunk) {
                Object.assign(this.translations[language], chunk);
              } else {
                console.warn(`Chunk ${chunkName} not found for language ${language}`);
              }
            }
            
            this.loadedChunks.add(chunkKey);
            this.loadingPromises.delete(chunkKey);
            return;
            
          } catch (error) {
            attempts++;
            if (attempts >= maxAttempts) {
              throw error;
            }
            console.warn(`Attempt ${attempts} to load chunk ${chunkName} failed, retrying...`);
          }
        }
      } catch (error) {
        console.error(`Failed to load translation chunk ${chunkName}:`, error);
        this.loadingPromises.delete(chunkKey);
        
        // Mark as loaded even if failed to prevent infinite retry
        this.loadedChunks.add(chunkKey);
        
        // Report error
        setTimeout(() => {
          try {
            if (errorHandlers && typeof errorHandlers.handleNetworkError === 'function') {
              errorHandlers.handleNetworkError(error, `translation-chunk-${chunkName}`);
            }
          } catch (reportError) {
            // Ignore if error handlers not available or fail
            console.warn('Failed to report network error:', reportError);
          }
        }, 0);
        
        throw error;
      }
    }, `load-chunk-${chunkName}`);

    this.loadingPromises.set(chunkKey, loadingPromise);
    return loadingPromise;
  }

  /**
   * Check if a translation key exists in loaded chunks
   */
  hasTranslation(language: SupportedLanguage, key: string): boolean {
    return Boolean(this.translations[language]?.[key]);
  }

  /**
   * Preload chunks that are likely to be needed
   */
  async preloadChunks(chunkNames: string[]): Promise<void> {
    // Load chunks in background without blocking
    const loadPromises = chunkNames.map(chunkName => 
      this.loadChunk(chunkName).catch(error => {
        console.warn(`Failed to preload chunk ${chunkName}:`, error);
      })
    );
    
    // Don't await - let them load in background
    Promise.all(loadPromises);
  }

  /**
   * Get all loaded translations for a language
   */
  getLoadedTranslations(language: SupportedLanguage): Record<string, string> {
    return { ...this.translations[language] };
  }

  /**
   * Get loading status
   */
  getLoadingStatus(): {
    loadedChunks: string[];
    loadingChunks: string[];
    totalChunks: number;
  } {
    const allChunks = Object.keys(translationChunks.en || {});
    return {
      loadedChunks: Array.from(this.loadedChunks),
      loadingChunks: Array.from(this.loadingPromises.keys()),
      totalChunks: allChunks.length
    };
  }

  /**
   * Guess which chunk might contain a translation key
   */
  private guessChunkForKey(key: string): string | null {
    // Simple heuristics to guess chunk based on key patterns
    if (key.includes('ticket') || key.includes('repair') || key.includes('device')) {
      return 'tickets';
    }
    
    if (key.includes('error') || key.includes('success') || key.includes('confirm')) {
      return 'messages';
    }
    
    if (key.includes('status') || key.includes('priority') || key.includes('pending') || 
        key.includes('progress') || key.includes('completed')) {
      return 'status';
    }
    
    if (key.includes('name') || key.includes('email') || key.includes('phone') || 
        key.includes('address') || key.includes('required') || key.includes('invalid')) {
      return 'forms';
    }
    
    // Default to core if no pattern matches
    return 'core';
  }

  /**
   * Clear all loaded translations (useful for testing)
   */
  clear(): void {
    this.loadedChunks.clear();
    this.loadingPromises.clear();
    this.translations = { en: {}, th: {} };
    // Reload core translations
    this.loadChunkSync('core');
  }
}

/**
 * Convenience functions for lazy translation loading
 */
export const lazyTranslations = {
  async t(language: SupportedLanguage, key: string, params?: TranslationParams): Promise<string> {
    const loader = LazyTranslationLoader.getInstance();
    return loader.getTranslation(language, key, params);
  },

  tSync(language: SupportedLanguage, key: string, params?: TranslationParams): string {
    const loader = LazyTranslationLoader.getInstance();
    return loader.getTranslationSync(language, key, params);
  },

  async preload(chunks: string[]): Promise<void> {
    const loader = LazyTranslationLoader.getInstance();
    return loader.preloadChunks(chunks);
  },

  hasKey(language: SupportedLanguage, key: string): boolean {
    const loader = LazyTranslationLoader.getInstance();
    return loader.hasTranslation(language, key);
  },

  getStatus() {
    const loader = LazyTranslationLoader.getInstance();
    return loader.getLoadingStatus();
  }
};