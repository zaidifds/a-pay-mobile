// Application constants

export const APP_NAME = 'A-Pay Mobile';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = __DEV__
  ? 'https://api-dev.apay.com'
  : 'https://api.apay.com';

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const SCREEN_NAMES = {
  HOME: 'Home',
  // Add more screen names as needed
} as const;

export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  BACKGROUND: '#F2F2F7',
  SURFACE: '#FFFFFF',
  TEXT: '#000000',
  TEXT_SECONDARY: '#8E8E93',
} as const;
