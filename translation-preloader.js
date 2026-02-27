// Translation Preloader - Runs in parallel with page load
// Loads translations before main scripts execute
(function() {
  'use strict';
  
  // Create global translation cache
  window.__translationCache = window.__translationCache || new Map();
  
  // Detect language early
  const savedLang = localStorage.getItem('language');
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
  
  const currentLang = savedLang || langMap[browserLang] || 'en';
  
  // Store current language for i18n to use
  window.__detectedLanguage = currentLang;
  
  // Preload current language immediately
  const preloadTranslation = async (lang) => {
    if (window.__translationCache.has(lang)) return;
    
    try {
      const response = await fetch(`translations/${lang}.json`);
      if (!response.ok) return;
      
      const translations = await response.json();
      window.__translationCache.set(lang, translations);
      
      // Flatten for faster lookups
      const flattened = {};
      const flatten = (obj, prefix = '') => {
        for (const key in obj) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flatten(obj[key], fullKey);
          } else {
            flattened[fullKey] = obj[key];
          }
        }
      };
      flatten(translations);
      
      // Store flattened version
      window.__translationCache.set(`${lang}.flattened`, flattened);
    } catch (error) {
      console.warn(`Failed to preload ${lang}:`, error);
    }
  };
  
  // Start preloading immediately
  preloadTranslation(currentLang);
  
  // Preload other languages with lower priority
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      const otherLangs = ['en', 'ko', 'zh-CN', 'zh-TW', 'hi', 'ms', 'vi', 'th', 'id']
        .filter(l => l !== currentLang);
      
      // Preload in background with delay to not block critical resources
      setTimeout(() => {
        otherLangs.forEach(lang => {
          setTimeout(() => preloadTranslation(lang), Math.random() * 2000);
        });
      }, 500);
    });
  }
})();