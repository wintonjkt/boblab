// Ultra-fast i18n for walkthrough page
// This is a specialized version of i18n-optimized.js tuned for performance

class FastI18n {
  constructor() {
    this.currentLanguage = window.__detectedLanguage || 'en';
    this.translations = {};
    this.cache = window.__translationCache || new Map();
    this.observedElements = new Set();
    this.translationObserver = null;
  }

  // Fast initialization - use preloaded translations
  async init() {
    // Use pre-detected language
    this.currentLanguage = window.__detectedLanguage || 
                       localStorage.getItem('language') || 
                       this.detectBrowserLanguage();
    
    // Use preloaded translations if available
    if (this.cache.has(this.currentLanguage)) {
      this.translations = this.cache.get(this.currentLanguage);
    } else {
      await this.loadLanguage(this.currentLanguage);
    }
    
    // Apply translations immediately
    this.translate();
    
    // Preload other languages in background after initial render
    setTimeout(() => this.preloadOtherLanguages(), 100);
    
    // Setup language selector
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLanguage;
      selector.addEventListener('change', (e) => this.setLanguage(e.target.value));
    }
  }

  // Load language with aggressive caching
  async loadLanguage(lang) {
    if (this.cache.has(lang)) {
      this.translations = this.cache.get(lang);
      return;
    }

    try {
      const response = await fetch(`translations/${lang}.json`);
      const translations = await response.json();
      this.translations = translations;
      this.cache.set(lang, translations);
      
      // Cache individual translations for faster lookups
      for (const [key, value] of Object.entries(flattenObject(translations))) {
        this.cache.set(`${lang}.${key}`, value);
      }
    } catch (error) {
      console.warn(`Failed to load ${lang}:`, error);
      if (lang !== 'en') await this.loadLanguage('en');
    }
  }

  // Preload other languages in background
  async preloadOtherLanguages() {
    const otherLangs = ['ko', 'zh-CN', 'zh-TW', 'hi', 'ms', 'vi', 'th', 'id'].filter(l => l !== this.currentLanguage);
    const promises = otherLangs.map(lang => this.loadLanguage(lang).catch(() => {}));
    await Promise.allSettled(promises);
  }

  // Set language with instant switching
  async setLanguage(lang) {
    if (lang === this.currentLanguage) return;
    
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    await this.loadLanguage(lang);
    this.translate();
    document.documentElement.lang = lang;
  }

  // Ultra-fast translation using cached values
  translate() {
    // Use requestIdleCallback for non-critical updates
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => this.performTranslation());
    } else {
      setTimeout(() => this.performTranslation(), 0);
    }
  }

  // Perform the actual translation
  performTranslation() {
    // Get all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Process in batches to avoid blocking
    const batchSize = 50;
    for (let i = 0; i < elements.length; i += batchSize) {
      const batch = Array.from(elements).slice(i, i + batchSize);
      
      batch.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.getTranslationCached(key);
        
        if (translation) {
          this.updateElement(element, translation);
        }
      });
      
      // Allow browser to breathe between batches
      if (i + batchSize < elements.length) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }

  // Update element with translation
  updateElement(element, translation) {
    if (element.tagName === 'INPUT' && element.placeholder) {
      element.placeholder = translation;
    } else if (element.tagName === 'TITLE') {
      element.textContent = translation;
    } else if (element.tagName === 'META' && element.name === 'description') {
      element.content = translation;
    } else {
      element.textContent = translation;
    }
    
    // Mark as translated to prevent FOUT
    element.setAttribute('data-i18n-translated', 'true');
  }

  // Get translation from cache (fastest possible)
  getTranslationCached(key) {
    // Try flattened cache first for maximum speed
    const flattenedKey = `${this.currentLanguage}.flattened`;
    if (this.cache.has(flattenedKey)) {
      const flattened = this.cache.get(flattenedKey);
      return flattened[key] || null;
    }
    
    // Fallback to regular cache
    const cacheKey = `${this.currentLanguage}.${key}`;
    return this.cache.get(cacheKey) || this.getTranslation(key);
  }

  // Fallback translation lookup
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return null;
    }

    return value;
  }

  // Translate new content immediately (no delays)
  translateNewContent(container = document) {
    const elements = container.querySelectorAll('[data-i18n]');
    
    // Process immediately with microtasks
    Promise.resolve().then(() => {
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.getTranslationCached(key);
        
        if (translation) {
          this.updateElement(element, translation);
        }
      });
    });
  }

  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    const langMap = {
      'ko': 'ko', 'ko-KR': 'ko',
      'zh': 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'zh-HK': 'zh-TW',
      'hi': 'hi', 'hi-IN': 'hi',
      'ms': 'ms', 'ms-MY': 'ms',
      'vi': 'vi', 'vi-VN': 'vi',
      'th': 'th', 'th-TH': 'th',
      'id': 'id', 'id-ID': 'id'
    };
    
    return langMap[browserLang] || 'en';
  }

  getLanguage() {
    return this.currentLanguage;
  }
}

// Helper function to flatten nested objects
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

// Create singleton instance
window.i18n = new FastI18n();

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.i18n.init());
} else {
  window.i18n.init();
}