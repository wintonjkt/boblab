// Theme Manager for Dark/Light Mode
class ThemeManager {
  constructor() {
    this.isDarkTheme = false;
    this.themeToggle = null;
    this.isInitialized = false;
  }

  // Initialize theme manager
  init() {
    if (this.isInitialized) return;

    // Load theme preference from localStorage
    this.loadThemePreference();
    
    // Find theme toggle element
    this.themeToggle = document.getElementById('theme-toggle');
    if (!this.themeToggle) {
      console.warn('Theme toggle element not found');
      return;
    }

    // Apply initial theme
    this.applyTheme(this.isDarkTheme);
    
    // Setup event listeners
    this.setupEventListeners();
    
    this.isInitialized = true;
  }

  // Load theme preference from localStorage
  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Check system preference
      this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  // Save theme preference to localStorage
  saveThemePreference() {
    localStorage.setItem('theme-preference', this.isDarkTheme ? 'dark' : 'light');
  }

  // Apply theme to document
  applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Update meta theme-color for mobile browsers
    this.updateThemeColor(isDark);
    
    // Update syntax highlighting for code blocks
    this.updateCodeBlocks(isDark);
  }

  // Update theme color meta tag for mobile browsers
  updateThemeColor(isDark) {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    
    themeColorMeta.content = isDark ? '#161616' : '#ffffff';
  }

  // Update code blocks syntax highlighting
  updateCodeBlocks(isDark) {
    // Check if highlight.js is loaded
    if (window.hljs) {
      // Re-highlight code blocks with appropriate theme
      document.querySelectorAll('pre code.hljs').forEach(block => {
        // Remove existing classes
        block.className = block.className.replace(/hljs-theme-\w+/g, '');
        
        // Add appropriate theme class
        if (isDark) {
          block.classList.add('hljs-theme-dark');
        } else {
          block.classList.add('hljs-theme-light');
        }
      });
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Theme toggle click handler
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem('theme-preference')) {
        this.isDarkTheme = e.matches;
        this.applyTheme(e.matches);
      }
    });
  }

  // Toggle between themes
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);
    this.saveThemePreference();
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  // Get current theme state
  getCurrentTheme() {
    return this.isDarkTheme ? 'dark' : 'light';
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other components to load
  setTimeout(() => {
    const themeManager = new ThemeManager();
    themeManager.init();
  }, 200);
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
}