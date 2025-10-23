import { createMMKV } from 'react-native-mmkv';

// Create MMKV instance for user preferences
const userPreferencesStorage = createMMKV({
  id: 'user-preferences',
  encryptionKey: 'user-prefs-key',
});

export const UserPreferences = {
  // Theme preferences
  setTheme: (theme: 'light' | 'dark' | 'system') => {
    userPreferencesStorage.set('theme', theme);
  },
  getTheme: (): 'light' | 'dark' | 'system' => {
    return (
      (userPreferencesStorage.getString('theme') as
        | 'light'
        | 'dark'
        | 'system') || 'system'
    );
  },

  // Language preferences
  setLanguage: (language: 'en' | 'ar' | 'hr' | 'ur') => {
    userPreferencesStorage.set('language', language);
  },
  getLanguage: (): 'en' | 'ar' | 'hr' | 'ur' => {
    return (
      (userPreferencesStorage.getString('language') as 'en' | 'ar' | 'hr' | 'ur') ||
      'en'
    );
  },

  // Notification preferences
  setNotifications: (notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  }) => {
    userPreferencesStorage.set('notifications', JSON.stringify(notifications));
  },
  getNotifications: () => {
    const stored = userPreferencesStorage.getString('notifications');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      push: true,
      email: true,
      sms: false,
    };
  },

  // Privacy preferences
  setPrivacy: (privacy: { biometric: boolean; autoLock: boolean }) => {
    userPreferencesStorage.set('privacy', JSON.stringify(privacy));
  },
  getPrivacy: () => {
    const stored = userPreferencesStorage.getString('privacy');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      biometric: false,
      autoLock: true,
    };
  },

  // Clear all preferences
  clearAll: () => {
    userPreferencesStorage.clearAll();
  },
};
