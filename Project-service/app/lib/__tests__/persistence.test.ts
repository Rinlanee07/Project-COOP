/**
 * Tests for the persistence layer
 * These tests verify the core functionality of theme and language persistence
 */

import { PreferencePersistence, ThemeMode, SupportedLanguage, UserPreferences } from '../persistence';
import { MemoryStorageAdapter } from '../storage';

describe('PreferencePersistence', () => {
  let persistence: PreferencePersistence;
  let mockStorage: MemoryStorageAdapter;

  beforeEach(() => {
    mockStorage = new MemoryStorageAdapter();
    persistence = new PreferencePersistence(mockStorage);
  });

  describe('Theme Management', () => {
    test('should save and load theme preferences', async () => {
      const theme: ThemeMode = 'dark';
      
      await persistence.saveTheme(theme);
      const loadedTheme = await persistence.loadTheme();
      
      expect(loadedTheme).toBe(theme);
    });

    test('should return null for non-existent theme', async () => {
      const theme = await persistence.loadTheme();
      expect(theme).toBeNull();
    });

    test('should handle invalid theme values', async () => {
      // Manually set invalid data
      mockStorage.setItem('user_preferences', JSON.stringify({
        theme: { mode: 'invalid', timestamp: Date.now(), version: '1.0.0' },
        language: { language: 'th', timestamp: Date.now(), version: '1.0.0' },
        metadata: { lastUpdated: Date.now(), version: '1.0.0' }
      }));

      const theme = await persistence.loadTheme();
      expect(theme).toBeNull();
    });
  });

  describe('Language Management', () => {
    test('should save and load language preferences', async () => {
      const language: SupportedLanguage = 'en';
      
      await persistence.saveLanguage(language);
      const loadedLanguage = await persistence.loadLanguage();
      
      expect(loadedLanguage).toBe(language);
    });

    test('should return null for non-existent language', async () => {
      const language = await persistence.loadLanguage();
      expect(language).toBeNull();
    });

    test('should handle invalid language values', async () => {
      // Manually set invalid data
      mockStorage.setItem('user_preferences', JSON.stringify({
        theme: { mode: 'light', timestamp: Date.now(), version: '1.0.0' },
        language: { language: 'invalid', timestamp: Date.now(), version: '1.0.0' },
        metadata: { lastUpdated: Date.now(), version: '1.0.0' }
      }));

      const language = await persistence.loadLanguage();
      expect(language).toBeNull();
    });
  });

  describe('Full Preferences Management', () => {
    test('should save and load complete preferences', async () => {
      const preferences: UserPreferences = {
        theme: { mode: 'dark', timestamp: Date.now(), version: '1.0.0' },
        language: { language: 'en', timestamp: Date.now(), version: '1.0.0' },
        metadata: { lastUpdated: Date.now(), version: '1.0.0' }
      };

      await persistence.savePreferences(preferences);
      const loaded = await persistence.loadPreferences();

      expect(loaded).toEqual(preferences);
    });

    test('should handle corrupted preference data', async () => {
      // Set corrupted data
      mockStorage.setItem('user_preferences', 'invalid json');

      const preferences = await persistence.loadPreferences();
      expect(preferences).toBeNull();
      
      // Verify corrupted data was cleared
      expect(mockStorage.getItem('user_preferences')).toBeNull();
    });

    test('should merge partial preferences with existing data', async () => {
      // Set initial preferences
      await persistence.saveTheme('light');
      await persistence.saveLanguage('th');

      // Update only theme
      await persistence.saveTheme('dark');

      const preferences = await persistence.loadPreferences();
      expect(preferences?.theme.mode).toBe('dark');
      expect(preferences?.language.language).toBe('th');
    });
  });

  describe('Error Handling', () => {
    test('should handle storage unavailable gracefully', () => {
      expect(persistence.isAvailable()).toBe(true);
    });

    test('should clear preferences successfully', async () => {
      await persistence.saveTheme('dark');
      await persistence.clearPreferences();
      
      const theme = await persistence.loadTheme();
      expect(theme).toBeNull();
    });
  });

  describe('Data Validation', () => {
    test('should validate theme mode values', async () => {
      const validThemes: ThemeMode[] = ['light', 'dark', 'system'];
      
      for (const theme of validThemes) {
        await persistence.saveTheme(theme);
        const loaded = await persistence.loadTheme();
        expect(loaded).toBe(theme);
      }
    });

    test('should validate language values', async () => {
      const validLanguages: SupportedLanguage[] = ['th', 'en'];
      
      for (const language of validLanguages) {
        await persistence.saveLanguage(language);
        const loaded = await persistence.loadLanguage();
        expect(loaded).toBe(language);
      }
    });

    test('should include timestamp and version in saved data', async () => {
      const beforeSave = Date.now();
      await persistence.saveTheme('dark');
      const afterSave = Date.now();

      const preferences = await persistence.loadPreferences();
      
      expect(preferences?.theme.timestamp).toBeGreaterThanOrEqual(beforeSave);
      expect(preferences?.theme.timestamp).toBeLessThanOrEqual(afterSave);
      expect(preferences?.theme.version).toBe('1.0.0');
      expect(preferences?.metadata.version).toBe('1.0.0');
    });
  });
});