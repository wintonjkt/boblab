import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { Language, I18nContextType } from '@/types';

const LANGUAGE_STORAGE_KEY = 'language';

// Supported languages
const SUPPORTED_LANGUAGES: Language[] = [
  'en', 'ko', 'zh-CN', 'zh-TW', 'hi', 'ms', 'vi', 'th', 'id'
];

/**
 * Detect browser language with fallback
 */
const detectBrowserLanguage = (): Language => {
  try {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    // Check for exact match
    if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
      return browserLang as Language;
    }
    
    // Check for language code match (e.g., 'zh' matches 'zh-CN')
    const langCode = browserLang.split('-')[0];
    const match = SUPPORTED_LANGUAGES.find(lang => lang.startsWith(langCode));
    if (match) {
      return match;
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }
  
  return 'en'; // Fallback to English
};

/**
 * Get stored language preference from localStorage
 */
const getStoredLanguage = (): Language | null => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return null;
};

/**
 * Initialize i18next
 */
const initializeI18n = async () => {
  const storedLang = getStoredLanguage();
  const initialLang = storedLang || detectBrowserLanguage();

  await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: initialLang,
      fallbackLng: 'en',
      supportedLngs: SUPPORTED_LANGUAGES,
      
      // Load translations from public/translations/
      backend: {
        loadPath: '/translations/{{lng}}.json',
      },
      
      interpolation: {
        escapeValue: false, // React already escapes
      },
      
      react: {
        useSuspense: false, // Disable suspense to handle loading manually
      },
    });
};

// Initialize i18next immediately
initializeI18n().catch(error => {
  console.error('Failed to initialize i18n:', error);
});

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Persist language changes to localStorage
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
      } catch (error) {
        console.warn('Failed to save language to localStorage:', error);
      }
    };

    i18nInstance.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChange);
    };
  }, [i18nInstance]);

  const changeLanguage = async (lang: Language) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      const err = new Error(`Unsupported language: ${lang}`);
      setError(err);
      throw err;
    }

    setIsLoading(true);
    setError(null);

    try {
      await i18nInstance.changeLanguage(lang);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to change language');
      setError(error);
      console.error('Language change error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <I18nContext.Provider
      value={{
        language: i18nInstance.language as Language,
        changeLanguage,
        t,
        isLoading,
        error,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
};

// Made with Bob
