// Component Loader System
class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
  }

  // Register a component
  register(name, url) {
    this.components.set(name, url);
  }

  // Load a component
  async load(name) {
    if (this.loadedComponents.has(name)) {
      return;
    }

    const url = this.components.get(name);
    if (!url) {
      throw new Error(`Component ${name} not found`);
    }

    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Find elements with data-component attribute
      const elements = document.querySelectorAll(`[data-component="${name}"]`);
      
      elements.forEach(element => {
        // Clone the component content
        const componentContent = tempDiv.firstElementChild.cloneNode(true);
        
        // Clear the target element
        element.innerHTML = '';
        
        // Append the component content
        element.appendChild(componentContent);
      });

      this.loadedComponents.add(name);
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
    }
  }

  // Load all components
  async loadAll() {
    const loadPromises = Array.from(this.components.keys()).map(name => 
      this.load(name)
    );
    await Promise.all(loadPromises);
  }

  // Initialize the component system
  async init() {
    // Register default components
    this.register('navbar', 'components/navbar.html');
    this.register('hero', 'components/hero.html');
    this.register('intro', 'components/intro.html');
    this.register('engagement', 'components/engagement.html');
    this.register('footer', 'components/footer.html');

    // Load all components
    await this.loadAll();

    // Re-initialize i18n for new content
    if (window.i18n) {
      window.i18n.translate();
    }

    // Re-initialize event handlers
    this.reinitializeEventHandlers();

    // Initialize walkthrough components if on walkthrough page
    if (document.querySelector('.walkthrough-container')) {
      this.initializeWalkthroughComponents();
    }
  }

  // Initialize walkthrough components
  initializeWalkthroughComponents() {
    // Load walkthrough component loader script
    const script = document.createElement('script');
    script.src = 'components/walkthrough/walkthrough-loader.js';
    document.head.appendChild(script);
  }

  // Re-initialize event handlers for dynamically loaded content
  reinitializeEventHandlers() {
    // Re-initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.onclick = () => {
        navMenu.classList.toggle('mobile-open');
      };
    }

    // Re-initialize mobile menu link handlers
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.onclick = () => {
        navMenu?.classList.remove('mobile-open');
      };
    });
  }
}

// Create global instance
window.componentLoader = new ComponentLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader.init();
  });
} else {
  window.componentLoader.init();
}