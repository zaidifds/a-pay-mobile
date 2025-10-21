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
  // Primary colors (matching web design system)
  PRIMARY: '#3B82F6', // --primary
  SECONDARY: '#F1F5F9', // --secondary
  SUCCESS: '#22C55E',
  WARNING: '#F59E0B',
  ERROR: '#EF4444', // --destructive
  BACKGROUND: '#FFFFFF', // --background
  SURFACE: '#FFFFFF', // --card
  TEXT: '#0F172A', // --foreground
  TEXT_SECONDARY: '#64748B', // --muted-foreground
} as const;
