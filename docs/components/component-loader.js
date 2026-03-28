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
      
      // Detect if we're in a subdirectory for link adjustment
      const currentPath = window.location.pathname;
      
      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Find the first actual element (not a comment)
      let componentContent = null;
      for (let node of tempDiv.childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          componentContent = node.cloneNode(true);
          break;
        }
      }
      
      // Find elements with data-component attribute
      const elements = document.querySelectorAll(`[data-component="${name}"]`);
      
      elements.forEach(element => {
        // Clone the component content
        if (componentContent) {
          // Adjust relative links if we're in a subdirectory
          if (currentPath && currentPath.includes('/labs/')) {
            const links = componentContent.querySelectorAll('a[href^="labs/"], a[href^="index.html"], a[href^="narrative.html"], a[href^="../index.html"]');
            links.forEach(link => {
              const href = link.getAttribute('href');
              if (href.startsWith('labs/')) {
                // Already has labs/ prefix, remove it since we're already in labs
                link.setAttribute('href', href.replace('labs/', ''));
              } else if (href === 'index.html' || href === 'narrative.html') {
                // Need to go up one level
                link.setAttribute('href', '../' + href);
              }
            });
          }
          
          // Clear the target element
          element.innerHTML = '';
          
          // Append the component content
          element.appendChild(componentContent);
        } else {
          console.error(`No valid element found in component ${name}`);
        }
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
    // Detect if we're in a subdirectory and adjust paths accordingly
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/labs/');
    const basePath = isInSubdirectory ? '../' : '';
    
    // Register default components
    this.register('navbar', `${basePath}components/navbar.html`);
    this.register('breadcrumb', `${basePath}components/breadcrumb.html`);
    this.register('theme-toggle', `${basePath}components/theme-toggle.html`);
    this.register('enhanced-progress', `${basePath}components/enhanced-progress.html`);
    this.register('table-of-contents', `${basePath}components/table-of-contents.html`);
    this.register('footer', `${basePath}components/footer.html`);

    // Load all components
    await this.loadAll();

    // Re-initialize i18n for new content
    if (window.i18n) {
      window.i18n.translate();
    }

    // Re-initialize event handlers
    this.reinitializeEventHandlers();
    
    // Initialize search functionality
    this.initializeSearch();
  }

  // Re-initialize event handlers for dynamically loaded content
  reinitializeEventHandlers() {
    this.initializeMobileNavigation();
  }

  // Initialize mobile navigation with slide-out menu
  initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    let overlay = document.querySelector('.nav-overlay');
    
    if (!hamburger || !navMenu) return;
    
    // Create overlay if it doesn't exist
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      
      if (isOpen) {
        this.closeMobileMenu(navMenu, overlay, hamburger);
      } else {
        this.openMobileMenu(navMenu, overlay, hamburger);
      }
    });

    // Ensure mobile navigation is always accessible
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = navMenu.classList.contains('mobile-open');
        
        if (isOpen) {
          this.closeMobileMenu(navMenu, overlay, hamburger);
        } else {
          this.openMobileMenu(navMenu, overlay, hamburger);
        }
      }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
      this.closeMobileMenu(navMenu, overlay, hamburger);
    });

    // Close menu when clicking close button
    const closeButton = navMenu.querySelector('::after');
    if (closeButton) {
      navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu && window.getComputedStyle(navMenu, '::after').content !== 'none') {
          this.closeMobileMenu(navMenu, overlay, hamburger);
        }
      });
    }

    // Close menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu(navMenu, overlay, hamburger);
      });
    });

    // Initialize dropdown toggles for mobile
    this.initializeDropdownToggles();
  }

  // Open mobile menu
  openMobileMenu(navMenu, overlay, hamburger) {
    navMenu.classList.add('mobile-open');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  // Close mobile menu
  closeMobileMenu(navMenu, overlay, hamburger) {
    navMenu.classList.remove('mobile-open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  // Initialize dropdown toggles
  initializeDropdownToggles() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      // Remove existing listeners to avoid duplicates
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      
      // Add click handler for mobile
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
          e.preventDefault();
          const navDropdown = toggle.closest('.nav-dropdown');
          const dropdownMenu = navDropdown.querySelector('.dropdown-menu');
          
          if (dropdownMenu) {
            // Close other dropdowns
            document.querySelectorAll('.nav-dropdown.active').forEach(otherDropdown => {
              if (otherDropdown !== navDropdown) {
                otherDropdown.classList.remove('active');
                const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                if (otherMenu) {
                  otherMenu.style.display = 'none';
                }
              }
            });
            
            // Toggle current dropdown
            const isActive = navDropdown.classList.contains('active');
            navDropdown.classList.toggle('active');
            dropdownMenu.style.display = isActive ? 'none' : 'block';
          }
        }
      });
    });
  }

  // Initialize additional scripts
  initializeSearch() {
    // Load search script
    const isInSubdirectory = window.location.pathname.includes('/labs/');
    const searchScript = document.createElement('script');
    searchScript.src = `${isInSubdirectory ? '../' : ''}components/search.js`;
    searchScript.async = true;
    document.head.appendChild(searchScript);
    
    // Load collapsible sections script for lab pages
    if (window.location.pathname.includes('/labs/')) {
      const collapsibleScript = document.createElement('script');
      collapsibleScript.src = `${isInSubdirectory ? '../' : ''}components/collapsible-sections.js`;
      collapsibleScript.async = true;
      document.head.appendChild(collapsibleScript);
    }
    
    // Load theme manager script if theme toggle is present
    if (document.querySelector('[data-component="theme-toggle"]')) {
      const themeScript = document.createElement('script');
      themeScript.src = `${isInSubdirectory ? '../' : ''}components/theme-manager.js`;
      themeScript.async = true;
      document.head.appendChild(themeScript);
    }
    
    // Load Mermaid.js for diagram rendering
    this.initializeMermaid();
  }

  // Initialize Mermaid.js for diagram rendering
  initializeMermaid() {
    // Load Mermaid from CDN
    const mermaidScript = document.createElement('script');
    mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    mermaidScript.async = true;
    
    mermaidScript.onload = () => {
      // Initialize Mermaid with configuration
      if (window.mermaid) {
        const isDark = document.body.classList.contains('dark-theme');
        window.mermaid.initialize({
          startOnLoad: false,  // Changed to false for manual control
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
        });
        
        // Manually render all Mermaid diagrams
        this.renderMermaidDiagrams();
        
        // Re-render Mermaid diagrams when theme changes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const isDark = document.body.classList.contains('dark-theme');
              window.mermaid.initialize({
                startOnLoad: false,
                theme: isDark ? 'dark' : 'default',
                securityLevel: 'loose',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
              });
              // Re-render all Mermaid diagrams
              this.renderMermaidDiagrams();
            }
          });
        });
        
        observer.observe(document.body, { attributes: true });
      }
    };
    
    document.head.appendChild(mermaidScript);
  }
  
  // Render all Mermaid diagrams
  renderMermaidDiagrams() {
    const mermaidElements = document.querySelectorAll('.mermaid');
    mermaidElements.forEach((element) => {
      // Store original content if not already stored
      if (!element.hasAttribute('data-original-content')) {
        element.setAttribute('data-original-content', element.textContent.trim());
      }
      
      // Reset element for re-rendering
      const originalContent = element.getAttribute('data-original-content');
      element.removeAttribute('data-processed');
      element.innerHTML = originalContent;
    });
    
    // Run Mermaid rendering
    if (window.mermaid && mermaidElements.length > 0) {
      window.mermaid.run({
        querySelector: '.mermaid'
      });
    }
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