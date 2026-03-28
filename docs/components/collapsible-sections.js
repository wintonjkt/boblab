// Collapsible Sections functionality
class CollapsibleSections {
  constructor() {
    this.sections = [];
    this.isInitialized = false;
  }

  // Initialize collapsible sections
  init() {
    if (this.isInitialized) return;

    // Find all sections that should be collapsible
    this.findCollapsibleSections();
    
    // Add expand/collapse controls
    this.addExpandCollapseControls();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize state based on saved preferences
    this.loadSectionStates();
    
    this.isInitialized = true;
  }

  // Find sections that should be collapsible
  findCollapsibleSections() {
    // Look for sections with substantial content
    const sections = document.querySelectorAll('.walkthrough-main section[id]');
    
    sections.forEach(section => {
      const title = section.querySelector('h2, h3');
      const content = section.querySelector('.container > div:not(.info-card)');
      
      if (title && content && content.offsetHeight > 300) {
        this.makeSectionCollapsible(section, title);
      }
    });
  }

  // Make a section collapsible
  makeSectionCollapsible(section, title) {
    const sectionId = section.id;
    const titleText = title.textContent;
    
    // Wrap the section in a collapsible container
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsible-section';
    wrapper.dataset.sectionId = sectionId;
    
    // Create collapsible header
    const header = document.createElement('div');
    header.className = 'collapsible-header';
    header.innerHTML = `
      <h2 class="collapsible-title">
        <span>${titleText}</span>
        ${this.createProgressIndicator(section)}
      </h2>
      <button class="collapsible-toggle" aria-label="Toggle section">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>
    `;
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'collapsible-content';
    
    // Move section content into the collapsible container
    while (section.firstChild) {
      content.appendChild(section.firstChild);
    }
    
    // Assemble the collapsible section
    wrapper.appendChild(header);
    wrapper.appendChild(content);
    
    // Replace the original section
    section.parentNode.replaceChild(wrapper, section);
    
    // Store reference
    this.sections.push({
      id: sectionId,
      element: wrapper,
      header,
      content,
      isCollapsed: false
    });
  }

  // Create progress indicator for section
  createProgressIndicator(section) {
    const progressItems = section.querySelectorAll('.progress-item-checkbox input');
    const totalItems = progressItems.length;
    const completedItems = Array.from(progressItems).filter(item => item.checked).length;
    
    if (totalItems > 0) {
      const percentage = Math.round((completedItems / totalItems) * 100);
      return `<span class="collapsible-progress">${completedItems}/${totalItems}</span>`;
    }
    
    return '';
  }

  // Add expand/collapse all controls
  addExpandCollapseControls() {
    if (this.sections.length === 0) return;
    
    const controls = document.createElement('div');
    controls.className = 'expand-collapse-controls';
    controls.innerHTML = `
      <button class="expand-collapse-button" id="expand-all">Expand All</button>
      <button class="expand-collapse-button" id="collapse-all">Collapse All</button>
    `;
    
    // Insert after the first section or before the first section
    const firstSection = this.sections[0].element;
    firstSection.parentNode.insertBefore(controls, firstSection);
  }

  // Setup event listeners
  setupEventListeners() {
    // Toggle individual sections
    document.addEventListener('click', (e) => {
      if (e.target.closest('.collapsible-header')) {
        const header = e.target.closest('.collapsible-header');
        const section = header.closest('.collapsible-section');
        this.toggleSection(section);
      }
    });

    // Expand/Collapse all buttons
    document.getElementById('expand-all')?.addEventListener('click', () => {
      this.expandAll();
    });

    document.getElementById('collapse-all')?.addEventListener('click', () => {
      this.collapseAll();
    });

    // Update progress indicators when checkboxes change
    document.addEventListener('change', (e) => {
      if (e.target.closest('.progress-item-checkbox')) {
        setTimeout(() => {
          this.updateProgressIndicators();
        }, 100);
      }
    });
  }

  // Toggle a section
  toggleSection(sectionElement) {
    const isCollapsed = sectionElement.classList.contains('collapsed');
    
    if (isCollapsed) {
      this.expandSection(sectionElement);
    } else {
      this.collapseSection(sectionElement);
    }
    
    // Save state
    this.saveSectionState(sectionElement.dataset.sectionId, !isCollapsed);
  }

  // Expand a section
  expandSection(sectionElement) {
    sectionElement.classList.remove('collapsed');
  }

  // Collapse a section
  collapseSection(sectionElement) {
    sectionElement.classList.add('collapsed');
  }

  // Expand all sections
  expandAll() {
    this.sections.forEach(section => {
      this.expandSection(section.element);
      this.saveSectionState(section.id, true);
    });
  }

  // Collapse all sections
  collapseAll() {
    this.sections.forEach(section => {
      this.collapseSection(section.element);
      this.saveSectionState(section.id, false);
    });
  }

  // Update progress indicators
  updateProgressIndicators() {
    this.sections.forEach(section => {
      const titleElement = section.header.querySelector('.collapsible-title');
      const originalSection = document.getElementById(section.id);
      
      if (titleElement && originalSection) {
        // Remove existing progress indicator
        const existingIndicator = titleElement.querySelector('.collapsible-progress');
        if (existingIndicator) {
          existingIndicator.remove();
        }
        
        // Add updated progress indicator
        const progressIndicator = this.createProgressIndicator(originalSection);
        if (progressIndicator) {
          const titleSpan = titleElement.querySelector('span');
          if (titleSpan) {
            titleSpan.insertAdjacentHTML('afterend', progressIndicator);
          }
        }
      }
    });
  }

  // Save section states to localStorage
  saveSectionState(sectionId, isExpanded) {
    const states = JSON.parse(localStorage.getItem('collapsible-sections') || '{}');
    states[sectionId] = isExpanded;
    localStorage.setItem('collapsible-sections', JSON.stringify(states));
  }

  // Load section states from localStorage
  loadSectionStates() {
    const states = JSON.parse(localStorage.getItem('collapsible-sections') || '{}');
    
    this.sections.forEach(section => {
      const isExpanded = states[section.id] !== false; // Default to expanded
      if (!isExpanded) {
        this.collapseSection(section.element);
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other components to load
  setTimeout(() => {
    const collapsibleSections = new CollapsibleSections();
    collapsibleSections.init();
  }, 300);
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.CollapsibleSections = CollapsibleSections;
}