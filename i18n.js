// i18n Configuration and Functions
const i18n = {
  currentLanguage: 'en',
  translations: {},

  // Initialize i18n
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

    // Load translations
    await this.loadTranslations(this.currentLanguage);

    // Apply translations
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

  // Load translations for a specific language
  async loadTranslations(lang) {
    try {
      const response = await fetch(`translations/${lang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to English
      if (lang !== 'en') {
        await this.loadTranslations('en');
      }
    }
  },

  // Set language and update page
  async setLanguage(lang) {
    if (lang === this.currentLanguage) return;

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);

    await this.loadTranslations(lang);
    this.translate();

    // Update page lang attribute
    document.documentElement.lang = lang;
  },

  // Translate all elements with data-i18n attribute
  translate() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);

      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' && element.placeholder) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update language selector text
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLanguage;
    }
  },

  // Get translation for a key (supports nested keys like "nav.home")
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value[k];
      if (value === undefined) return null;
    }

    return value;
  },

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  }
};

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
