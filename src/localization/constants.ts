import { SupportedLanguage } from './types';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en',
  'ar',
  'hr',
  'ur',
];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
  hr: 'Hrvatski',
  ur: 'اردو',
};

export const RTL_LANGUAGES: SupportedLanguage[] = ['ar', 'ur'];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  ar: '🇸🇦',
  hr: '🇭🇷',
  ur: '🇵🇰',
};
