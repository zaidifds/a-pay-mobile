import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { I18nManager } from 'react-native';
import {
  initializeLocalization,
  setLanguage,
} from '../redux/slices/localizationSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserPreferences } from '../utils/userPreferences';
import ar from './translations/ar';
import en from './translations/en';
import hr from './translations/hr';
import ur from './translations/ur';
import {
  SupportedLanguage,
  TranslationContextType,
  TranslationKeys,
} from './types';

const translations = {
  en,
  ar,
  hr,
  ur,
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { language, isRTL, isInitialized } = useAppSelector(
    state => state.localization,
  );

  // Initialize localization on app start
  useEffect(() => {
    if (!isInitialized) {
      const savedLanguage = UserPreferences.getLanguage() as any;
      dispatch(initializeLocalization(savedLanguage || 'en'));
    }
  }, [dispatch, isInitialized]);

  // Handle RTL layout changes
  useEffect(() => {
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      // Note: forceRTL may require app restart for some components,
      // but we also use isRTL state for conditional styling
    }
  }, [isRTL]);

  const t = useMemo(() => {
    return (key: keyof TranslationKeys): string => {
      const translation = translations[language as keyof typeof translations];
      if (!translation) {
        console.warn(`Translation not found for language: ${language}`);
        return translations.en[key] || key;
      }
      return translation[key] || translations.en[key] || key;
    };
  }, [language]);

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    dispatch(setLanguage(newLanguage));
    UserPreferences.setLanguage(newLanguage);
  };

  const contextValue: TranslationContextType = {
    t,
    language,
    isRTL,
    changeLanguage,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationProvider;
