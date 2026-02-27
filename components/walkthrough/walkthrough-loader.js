// Walkthrough Component Loader System

// Load demo content
const demoScript = document.createElement('script');
demoScript.src = 'components/walkthrough/demo-content.js';
document.head.appendChild(demoScript);

class WalkthroughComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
  }

  // Render demo content with proper i18n support
  renderDemoContent(content) {
    if (!content) return '';
    
    if (typeof content === 'string') {
      return content;
    }
    
    if (content.steps && Array.isArray(content.steps)) {
      let html = '';
      content.steps.forEach(step => {
        html += `
          <div class="step-item">
            <div class="step-number">${step.number}</div>
            <div class="step-content">
              <h4 data-i18n="${step.title}">${step.title}</h4>
              ${step.description ? `<p data-i18n="${step.description}">${step.description}</p>` : ''}
              ${step.content || ''}
            </div>
          </div>
        `;
      });
      return html;
    }
    
    return '';
  }

  // Register a walkthrough component
  register(name, url) {
    this.components.set(name, url);
  }

  // Load a component with template variable substitution
  async loadWithVariables(name, variables = {}, scope = null) {
    const url = this.components.get(name);
    if (!url) {
      throw new Error(`Component ${name} not found`);
    }

    try {
      const response = await fetch(url);
      let html = await response.text();
      
      // Replace template variables
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, value);
      }
      
      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Find elements with data-component attribute
      let elements;
      if (scope) {
        elements = document.querySelector(scope).querySelectorAll(`[data-component="${name}"]`);
      } else {
        elements = document.querySelectorAll(`[data-component="${name}"]`);
      }
      
      elements.forEach(element => {
        // Clone the component content
        const componentContent = tempDiv.firstElementChild.cloneNode(true);
        
        // Clear the target element
        element.innerHTML = '';
        
        // Append the component content
        element.appendChild(componentContent);
      });

      if (!scope) {
        this.loadedComponents.add(name);
      }
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
    }
  }

  // Initialize the walkthrough component system
  async init() {
    // Register walkthrough components
    this.register('walkthrough-sidebar', 'components/walkthrough/sidebar.html');
    this.register('capability-header', 'components/walkthrough/capability-header.html');
    this.register('capability-section', 'components/walkthrough/capability-section.html');
    this.register('objective-box', 'components/walkthrough/objective-box.html');
    this.register('demo-flow', 'components/walkthrough/demo-flow.html');
    this.register('step-item', 'components/walkthrough/step-item.html');
    this.register('code-block', 'components/walkthrough/code-block.html');
    this.register('business-value', 'components/walkthrough/business-value.html');
    this.register('real-world-proof', 'components/walkthrough/real-world-proof.html');
    this.register('summary-section', 'components/walkthrough/summary-section.html');

    // Load components with their data
    await this.loadComponentsWithData();

    // Re-initialize i18n for new content
    if (window.i18n) {
      // Wait for demo content to be loaded before translating
      setTimeout(() => {
        window.i18n.translate();
      }, 100);
    }

    // Initialize walkthrough-specific event handlers
    this.initializeWalkthroughHandlers();
  }

  // Load components with their specific data
  async loadComponentsWithData() {
    // Load sidebar
    await this.loadWithVariables('walkthrough-sidebar');

    // Capability data
    const capabilities = [
      {
        id: 'requirements',
        class: '',
        header: {
          number: '1',
          title: 'Business Requirements Analysis',
          badge: 'Unique to Bob'
        },
        objective: {
          challenge: 'Most AI coding tools work at the code level. Developers spend days translating business requirements into technical specs. Bob reads the business requirements document directly.'
        },
        demo: {
          title: 'Try It Yourself'
        },
        businessValue: {
          traditional: '1 day - read spec, research systems, map requirements manually',
          bob: '30 seconds - Bob reads, analyzes, and maps everything',
          highlight: '"99% time savings" - Bob speaks both business and technical language, reducing the translation gap that costs companies weeks."'
        },
        proof: '<strong>IBM Guardium</strong> reported 85% productivity gains, completing work that previously took 4 weeks in just 1 day.'
      },
      {
        id: 'compliance',
        class: '',
        header: {
          number: '2',
          title: 'Compliance Automation',
          badge: 'Unique to Bob'
        },
        objective: {
          challenge: 'Compliance is typically a quarterly fire drill. Teams spend weeks understanding controls, mapping findings to code, and gathering evidence for auditors.'
        },
        demo: {
          title: 'Try It Yourself'
        },
        businessValue: {
          traditional: '2 weeks - understand controls, map findings, plan evidence collection',
          bob: '20 seconds - automatic mapping with evidence requirements',
          highlight: '"Compliance becomes <strong>continuous and automated</strong>, not a quarterly fire drill. Bob generates compliance evidence as code is written."'
        },
        proof: '<strong>IBM Concert</strong> saved $84K per compliance project by automating SOC 2 evidence generation.'
      },
      {
        id: 'multi-repo',
        class: 'section-alt',
        header: {
          number: '3',
          title: 'Multi-Repo Orchestration',
          badge: 'Enterprise-Scale'
        },
        objective: {
          challenge: 'Enterprise projects span multiple repositories with different languages, frameworks, and teams. Coordinating changes manually is complex and error-prone.'
        },
        demo: {
          title: 'Try It Yourself'
        },
        businessValue: {
          traditional: '1 week - architects coordinate across teams, resolve dependencies manually',
          bob: '45 seconds - Bob analyzes all repos and generates coordinated plan',
          highlight: '"<strong>Multi-repo orchestration</strong> - Bob coordinates changes across different technology stacks automatically, understanding dependencies and deployment order."'
        },
        proof: null
      },
      {
        id: 'security',
        class: '',
        header: {
          number: '4',
          title: 'Security Inline',
          badge: 'Shift-Left'
        },
        objective: {
          challenge: 'Security reviews typically happen days after code is written. Finding vulnerabilities late means expensive rework and delayed releases.'
        },
        demo: {
          title: 'Watch Bob Catch Security Issues'
        },
        businessValue: {
          traditional: 'Security review 3-5 days later → find more issues → rework cycle → delays',
          bob: 'Security scanning during generation → zero debt accumulation → no rework',
          highlight: '"<strong>Shift-left security</strong> - vulnerabilities are caught before code is written, eliminating the security-review-rework cycle."'
        },
        proof: 'Bob integrates with Prisma AI Runtime Security (AIRS) for comprehensive security scanning that includes AI-specific vulnerability detection.'
      },
      {
        id: 'deployment',
        class: 'section-alt',
        header: {
          number: '5',
          title: 'Deployment Planning',
          badge: 'Zero-Downtime'
        },
        objective: {
          challenge: 'Deploying across multiple systems requires careful orchestration to avoid downtime. Rollback procedures must be planned before deployment.'
        },
        demo: {
          title: 'Generate Deployment Runbook'
        },
        businessValue: {
          traditional: '2-3 days - write runbook manually, test rollback procedures, document steps',
          bob: '45 seconds - comprehensive runbook with health checks and rollback commands',
          highlight: '"<strong>Zero-downtime deployments</strong> - Bob plans deployment order, health checks, and rollback procedures before any code is deployed."'
        },
        proof: null
      },
      {
        id: 'bobalytics',
        class: '',
        header: {
          number: '6',
          title: 'Bobalytics Transparency',
          badge: 'Unique to Bob'
        },
        objective: {
          challenge: 'Most AI tools are black boxes. Teams can\'t see what they\'re spending, which models are being used, or what productivity they\'re getting.'
        },
        demo: {
          title: 'View Your Productivity Dashboard'
        },
        businessValue: {
          traditional: '',
          bob: '',
          highlight: '"<strong>Full transparency</strong> - Leadership sees exactly what they\'re paying for and the productivity gains achieved."'
        },
        proof: 'Bob has been tested by <strong>6,000+ IBM employees</strong> with an average <strong>45% productivity improvement</strong>. Client-zero proof at enterprise scale.'
      }
    ];

    // Load capability sections with data
    for (const capability of capabilities) {
      await this.loadCapabilitySection(capability);
    }

    // Load summary section
    await this.loadWithVariables('summary-section');
  }

  // Load a capability section with its data
  async loadCapabilitySection(capability) {
    const selector = `#${capability.id}`;
    const sectionElement = document.querySelector(selector);
    
    if (!sectionElement) return;

    // Update section class
    if (capability.class) {
      sectionElement.classList.add(capability.class);
    }

    // Load header
    const headerElement = sectionElement.querySelector('[data-component="capability-header"]');
    if (headerElement) {
      await this.loadWithVariables('capability-header', capability.header, selector);
    }

    // Load objective box
    const objectiveElement = sectionElement.querySelector('[data-component="objective-box"]');
    if (objectiveElement) {
      await this.loadWithVariables('objective-box', capability.objective, selector);
    }

    // Load demo flow
    const demoElement = sectionElement.querySelector('[data-component="demo-flow"]');
    if (demoElement) {
      const demoVariables = {
        ...capability.demo,
        content: this.renderDemoContent(window.demoContent && window.demoContent[capability.id] ? window.demoContent[capability.id] : null)
      };
      await this.loadWithVariables('demo-flow', demoVariables, selector);
    }

    // Load business value
    const businessValueElement = sectionElement.querySelector('[data-component="business-value"]');
    if (businessValueElement) {
      await this.loadWithVariables('business-value', capability.businessValue, selector);
    }

    // Load real world proof if exists
    const proofElement = sectionElement.querySelector('[data-component="real-world-proof"]');
    if (proofElement && capability.proof) {
      await this.loadWithVariables('real-world-proof', { proof_content: capability.proof }, selector);
    } else if (proofElement) {
      proofElement.remove();
    }
  }

  // Initialize walkthrough-specific event handlers
  initializeWalkthroughHandlers() {
    // Initialize sidebar navigation
    this.initializeSidebarNavigation();

    // Initialize copy buttons
    this.initializeCopyButtons();

    // Initialize smooth scrolling
    this.initializeSmoothScrolling();
  }

  // Initialize sidebar navigation
  initializeSidebarNavigation() {
    const capabilityLinks = document.querySelectorAll('.capability-link');
    
    capabilityLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        capabilityLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('.section');
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });

      capabilityLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Initialize copy buttons
  initializeCopyButtons() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.copy-button')) {
        const button = e.target.closest('.copy-button');
        const codeBlock = button.closest('.code-block-wrapper').querySelector('code');
        
        if (codeBlock) {
          navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = 'Copied!';
            
            setTimeout(() => {
              button.querySelector('span').textContent = originalText;
            }, 2000);
          });
        }
      }
    });
  }

  // Initialize smooth scrolling for anchor links
  initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Create global instance
window.walkthroughComponentLoader = new WalkthroughComponentLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.walkthrough-container')) {
      window.walkthroughComponentLoader.init();
    }
  });
} else {
  if (document.querySelector('.walkthrough-container')) {
    window.walkthroughComponentLoader.init();
  }
}