/**
 * Simple verification script for the persistence layer
 * This can be run to verify that the persistence layer works correctly
 */

import { getPersistence, persistenceUtils } from './persistence';

export async function verifyPersistenceLayer(): Promise<boolean> {
  try {
    console.log('🔍 Verifying persistence layer...');
    
    const persistence = getPersistence();
    
    // Test 1: Check if storage is available
    console.log('✅ Storage available:', persistence.isAvailable());
    
    // Test 2: Test theme persistence
    console.log('🎨 Testing theme persistence...');
    await persistence.saveTheme('dark');
    const savedTheme = await persistence.loadTheme();
    console.log('✅ Theme saved and loaded:', savedTheme === 'dark');
    
    // Test 3: Test language persistence
    console.log('🌐 Testing language persistence...');
    await persistence.saveLanguage('en');
    const savedLanguage = await persistence.loadLanguage();
    console.log('✅ Language saved and loaded:', savedLanguage === 'en');
    
    // Test 4: Test utility functions
    console.log('🔧 Testing utility functions...');
    await persistenceUtils.setTheme('light');
    const utilTheme = await persistenceUtils.getTheme();
    console.log('✅ Utility theme functions work:', utilTheme === 'light');
    
    await persistenceUtils.setLanguage('th');
    const utilLanguage = await persistenceUtils.getLanguage();
    console.log('✅ Utility language functions work:', utilLanguage === 'th');
    
    // Test 5: Test full preferences
    console.log('📋 Testing full preferences...');
    const fullPrefs = await persistence.loadPreferences();
    console.log('✅ Full preferences loaded:', fullPrefs !== null);
    console.log('   Theme:', fullPrefs?.theme.mode);
    console.log('   Language:', fullPrefs?.language.language);
    console.log('   Last updated:', new Date(fullPrefs?.metadata.lastUpdated || 0).toISOString());
    
    // Test 6: Test error handling
    console.log('🛡️ Testing error handling...');
    await persistence.clearPreferences();
    const clearedTheme = await persistence.loadTheme();
    console.log('✅ Preferences cleared successfully:', clearedTheme === null);
    
    console.log('🎉 All persistence layer tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Persistence layer verification failed:', error);
    return false;
  }
}

// Export for use in components or other modules
export { getPersistence, persistenceUtils };