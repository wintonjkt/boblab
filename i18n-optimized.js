// Optimized i18n Configuration and Functions
const i18n = {
  currentLanguage: 'en',
  translations: {},
  translationCache: new Map(),
  preloadedLanguages: new Set(),
  
  // Initialize i18n with optimizations
  async init() {
    // Detect language from localStorage or browser
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language || navigator.userLanguage;

    // Map browser language to supported languages
    const langMap = {
      'ko': 'ko',
      'ko-KR': 'ko',
      'zh': 'zh-CN',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      'zh-HK': 'zh-TW',
      'hi': 'hi',
      'hi-IN': 'hi',
      'ms': 'ms',
      'ms-MY': 'ms',
      'vi': 'vi',
      'vi-VN': 'vi',
      'th': 'th',
      'th-TH': 'th',
      'id': 'id',
      'id-ID': 'id'
    };

    // Determine initial language
    this.currentLanguage = savedLang || langMap[browserLang] || 'en';

    // Preload all translations in parallel for faster switching
    await this.preloadAllTranslations();

    // Apply initial translations
    this.translate();

    // Set language selector value
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLanguage;
    }

    // Listen for language changes
    if (selector) {
      selector.addEventListener('change', async (e) => {
        await this.setLanguage(e.target.value);
      });
    }
  },

  // Preload all supported languages for instant switching
  async preloadAllTranslations() {
    const supportedLanguages = ['en', 'ko', 'zh-CN', 'zh-TW', 'hi', 'ms', 'vi', 'th', 'id'];
    
    const loadPromises = supportedLanguages.map(async lang => {
      if (!this.preloadedLanguages.has(lang)) {
        try {
          const response = await fetch(`translations/${lang}.json`);
          const translations = await response.json();
          this.translationCache.set(lang, translations);
          this.preloadedLanguages.add(lang);
        } catch (error) {
          console.warn(`Failed to preload ${lang}:`, error);
        }
      }
    });

    await Promise.all(loadPromises);
    
    // Set current language translations
    if (this.translationCache.has(this.currentLanguage)) {
      this.translations = this.translationCache.get(this.currentLanguage);
    }
  },

  // Load translations for a specific language (now uses cache)
  async loadTranslations(lang) {
    if (this.translationCache.has(lang)) {
      this.translations = this.translationCache.get(lang);
      return;
    }

    // Fallback to loading if not preloaded
    try {
      const response = await fetch(`translations/${lang}.json`);
      this.translations = await response.json();
      this.translationCache.set(lang, this.translations);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to English
      if (lang !== 'en') {
        await this.loadTranslations('en');
      }
    }
  },

  // Set language and update page (now much faster)
  async setLanguage(lang) {
    if (lang === this.currentLanguage) return;

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Use cached translations if available
    if (this.translationCache.has(lang)) {
      this.translations = this.translationCache.get(lang);
    } else {
      await this.loadTranslations(lang);
    }
    
    this.translate();

    // Update page lang attribute
    document.documentElement.lang = lang;
  },

  // Optimized translate function with targeted queries
  translate() {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      // Translate specific sections more efficiently
      this.translateSection('title[data-i18n]', (el, text) => el.textContent = text);
      this.translateSection('[data-i18n]', (el, text) => {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = text;
        } else if (el.tagName === 'TITLE') {
          el.textContent = text;
        } else if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
          el.content = text;
        } else {
          el.textContent = text;
        }
      });

      // Update language selector
      const selector = document.getElementById('language-selector');
      if (selector) {
        selector.value = this.currentLanguage;
      }
    });
  },

  // Translate a specific section of the page
  translateSection(selector, updateFn) {
    const elements = document.querySelectorAll(selector);
    
    // Batch process for better performance
    const fragment = document.createDocumentFragment();
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        updateFn(element, translation);
      }
    });
  },

  // Get translation for a key (supports nested keys like "nav.home")
  getTranslation(key) {
    // Check cache first
    if (this.translationCache.has(`${this.currentLanguage}.${key}`)) {
      return this.translationCache.get(`${this.currentLanguage}.${key}`);
    }

    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value[k];
      if (value === undefined) return null;
    }

    // Cache the result
    this.translationCache.set(`${this.currentLanguage}.${key}`, value);
    
    return value;
  },

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  },

  // Batch translate new content (for dynamically loaded components)
  translateNewContent(container = document) {
    if (!container) return;
    
    // Use a more targeted query within the container
    const elements = container.querySelectorAll('[data-i18n]');
    
    // Process immediately without delay
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);

      if (translation) {
        if (element.tagName === 'INPUT' && element.placeholder) {
          element.placeholder = translation;
        } else if (element.tagName === 'TITLE') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }
};

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}