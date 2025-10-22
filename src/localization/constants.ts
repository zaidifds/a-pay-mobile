import { SupportedLanguage } from './types';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'ar', 'hr'];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
  hr: 'Hrvatski',
};

export const RTL_LANGUAGES: SupportedLanguage[] = ['ar'];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  ar: '🇸🇦',
  hr: '🇭🇷',
};
