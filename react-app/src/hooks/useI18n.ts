import { useI18nContext } from '@/contexts/I18nContext';

/**
 * Custom hook to access internationalization context
 *
 * Provides access to:
 * - t: Translation function
 * - language: Current language code
 * - changeLanguage: Function to change the language
 * - isLoading: Loading state during language changes
 * - error: Error state if language loading fails
 *
 * Features:
 * - Supports 9 languages: en, ko, zh-CN, zh-TW, hi, ms, vi, th, id
 * - Browser language detection with fallback to English
 * - localStorage persistence (key: 'language')
 * - Loads translations from /translations/{lng}.json
 * - Graceful error handling for missing translations
 *
 * @throws Error if used outside I18nProvider
 *
 * @example
 * ```tsx
 * const { t, language, changeLanguage, isLoading } = useI18n();
 *
 * // Translate a key
 * <h1>{t('welcome.title')}</h1>
 *
 * // Change language
 * <button onClick={() => changeLanguage('ko')}>한국어</button>
 *
 * // Show loading state
 * {isLoading && <Spinner />}
 * ```
 */
export const useI18n = () => {
  return useI18nContext();
};

// Made with Bob
