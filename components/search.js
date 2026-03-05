// Search functionality for bob-lab
class SearchManager {
  constructor() {
    this.searchInput = null;
    this.searchResults = null;
    this.searchData = null;
    this.isInitialized = false;
  }

  // Initialize search functionality
  async init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Get search elements
    this.searchInput = document.getElementById('search-input');
    if (!this.searchInput) {
      console.warn('Search input not found');
      return;
    }

    // Load search data
    await this.loadSearchData();
    
    // Create search results container
    this.createSearchResultsContainer();
    
    // Setup event listeners
    this.setupEventListeners();
    
    this.isInitialized = true;
  }

  // Load searchable content from all pages
  async loadSearchData() {
    // Define all searchable pages
    const pages = [
      {
        url: 'index.html',
        title: 'Home',
        description: 'Welcome to bob-lab - Learn AI-powered development with IBM Bob',
        keywords: ['bob', 'ai', 'development', 'enterprise', 'getting started']
      },
      {
        url: 'labs/getting-started.html',
        title: 'Getting Started',
        description: 'Master the fundamentals of AI-powered development with Bob',
        keywords: ['tutorial', 'basics', 'installation', 'setup', 'prompt engineering']
      },
      {
        url: 'labs/bobshell.html',
        title: 'BobShell CLI',
        description: 'Command-line interface for Bob with powerful shell integration',
        keywords: ['cli', 'shell', 'command line', 'terminal', 'automation']
      },
      {
        url: 'labs/custom-modes.html',
        title: 'Custom Modes',
        description: 'Create and customize Bob modes for specific development workflows',
        keywords: ['modes', 'customization', 'workflow', 'configuration', 'templates']
      },
      {
        url: 'labs/mcp.html',
        title: 'MCP Development',
        description: 'Model Context Protocol development with Bob',
        keywords: ['mcp', 'protocol', 'context', 'model', 'integration']
      },
      {
        url: 'labs/walkthrough.html',
        title: 'DevSecOps Walkthrough',
        description: 'Security-first development practices with Bob',
        keywords: ['devsecops', 'security', 'cicd', 'automation', 'best practices']
      },
      {
        url: 'labs/appmod.html',
        title: 'Application Modernization',
        description: 'Modernize legacy applications using Bob\'s AI capabilities',
        keywords: ['modernization', 'legacy', 'refactoring', 'migration', 'transformation']
      },
      {
        url: 'labs/sdlc.html',
        title: 'Software Development Lifecycle',
        description: 'Complete SDLC integration with Bob AI assistance',
        keywords: ['sdlc', 'lifecycle', 'development', 'process', 'methodology']
      },
      {
        url: 'labs/carbon-react.html',
        title: 'Carbon React',
        description: 'Build React applications with IBM Carbon Design System and Bob',
        keywords: ['react', 'carbon', 'ui', 'components', 'design system']
      },
      {
        url: 'labs/ibmi.html',
        title: 'IBM i Platform',
        description: 'IBM i development and modernization with Bob',
        keywords: ['ibm i', 'as400', 'iseries', 'enterprise', 'modernization']
      },
      {
        url: 'labs/cobol2java.md',
        title: 'COBOL to Java',
        description: 'Convert COBOL applications to Java using AI-powered transformation',
        keywords: ['cobol', 'java', 'conversion', 'transformation', 'legacy']
      }
    ];

    this.searchData = pages;
  }

  // Create search results container
  createSearchResultsContainer() {
    this.searchResults = document.createElement('div');
    this.searchResults.className = 'search-results hidden';
    this.searchInput.parentElement.appendChild(this.searchResults);
  }

  // Setup event listeners
  setupEventListeners() {
    // Search input events
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.trim()) {
        this.handleSearch(this.searchInput.value);
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.searchInput.parentElement.contains(e.target)) {
        this.hideResults();
      }
    });

    // Keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });
  }

  // Handle search query
  handleSearch(query) {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      this.hideResults();
      return;
    }

    const results = this.search(trimmedQuery);
    this.displayResults(results, trimmedQuery);
  }

  // Perform search
  search(query) {
    const normalizedQuery = query.toLowerCase();
    
    return this.searchData
      .map(page => {
        let score = 0;
        let matchedContent = [];

        // Check title match
        if (page.title.toLowerCase().includes(normalizedQuery)) {
          score += 10;
          matchedContent.push({ type: 'title', text: page.title });
        }

        // Check description match
        if (page.description.toLowerCase().includes(normalizedQuery)) {
          score += 5;
          matchedContent.push({ type: 'description', text: page.description });
        }

        // Check keywords match
        page.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(normalizedQuery)) {
            score += 3;
            matchedContent.push({ type: 'keyword', text: keyword });
          }
        });

        return {
          ...page,
          score,
          matchedContent
        };
      })
      .filter(page => page.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Limit to 5 results
  }

  // Display search results
  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-no-results">
          No results found for "${query}"
        </div>
      `;
    } else {
      this.searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" tabindex="0" data-url="${result.url}">
          <div class="search-result-title">${this.highlightText(result.title, query)}</div>
          <div class="search-result-description">${this.highlightText(result.description, query)}</div>
        </div>
      `).join('');

      // Add click handlers
      this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const url = item.dataset.url;
          this.navigateToPage(url);
        });
      });
    }

    this.searchResults.classList.remove('hidden');
  }

  // Highlight search query in text
  highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-result-highlight">$1</span>');
  }

  // Hide search results
  hideResults() {
    this.searchResults.classList.add('hidden');
  }

  // Navigate to a page
  navigateToPage(url) {
    // Determine if we need to adjust the path based on current location
    const currentPath = window.location.pathname;
    const isInLab = currentPath.includes('/labs/');
    
    if (isInLab && !url.startsWith('../')) {
      // We're in a lab page and URL is relative, adjust it
      if (url.startsWith('labs/')) {
        url = '../' + url;
      } else {
        url = '../' + url;
      }
    }
    
    window.location.href = url;
  }

  // Handle keyboard navigation
  handleKeyNavigation(e) {
    const items = this.searchResults.querySelectorAll('.search-result-item');
    let currentIndex = -1;
    
    // Find current focused item
    items.forEach((item, index) => {
      if (item === document.activeElement) {
        currentIndex = index;
      }
    });

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          items[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (currentIndex >= 0 && items[currentIndex]) {
          const url = items[currentIndex].dataset.url;
          this.navigateToPage(url);
        }
        break;
      case 'Escape':
        this.hideResults();
        this.searchInput.blur();
        break;
    }
  }
}

// Create and initialize search manager
const searchManager = new SearchManager();

// Auto-initialize when component loader is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for component loader to finish
  setTimeout(() => {
    searchManager.init();
  }, 200);
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.searchManager = searchManager;
}