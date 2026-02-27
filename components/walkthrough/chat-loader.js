// Walkthrough Component Loader with Chat-style UX
class WalkthroughChatLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
    this.capabilityData = null;
  }

  // Register a component
  register(name, url) {
    this.components.set(name, url);
  }

  // Load a component with data
  async load(name, data = {}) {
    const url = this.components.get(name);
    if (!url) {
      throw new Error(`Component ${name} not found`);
    }

    try {
      const response = await fetch(url);
      let html = await response.text();
      
      // Simple template substitution (using Mustache-like syntax)
      html = this.substituteTemplate(html, data);
      
      return html;
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
      return '';
    }
  }

  // Simple template substitution
  substituteTemplate(template, data) {
    let result = template;
    
    // Simple variable substitution {{variable}}
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value || '');
    }
    
    // Handle conditional blocks {{#condition}}...{{/condition}}
    result = result.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, condition, content) => {
      return data[condition] ? content : '';
    });
    
    // Handle HTML escaping vs raw HTML {{{variable}}}
    result = result.replace(/{{{(\w+)}}}/g, (match, key) => {
      return data[key] || '';
    });
    
    return result;
  }

  // Initialize the walkthrough with chat-style UX
  async init() {
    // Register components
    this.register('chat-section', 'components/walkthrough/chat-section.html');
    this.register('message', 'components/walkthrough/message.html');
    this.register('interactive-demo', 'components/walkthrough/interactive-demo.html');
    this.register('value-proposition', 'components/walkthrough/value-proposition.html');
    this.register('capability-showcase', 'components/walkthrough/capability-showcase.html');

    // Load capability data
    await this.loadCapabilityData();

    // Render the walkthrough
    await this.renderWalkthrough();

    // Initialize event handlers
    this.initializeEventHandlers();
  }

  // Load capability data
  async loadCapabilityData() {
    this.capabilityData = {
      overview: {
        section_id: 'overview',
        title: "What You'll Experience",
        subtitle: "Experience Bob's key capabilities through realistic enterprise scenarios",
        content: `
          <div class="capabilities-grid">
            <div class="capability-card">
              <h4>📋 Business Requirements</h4>
              <p>Bob reads 20-page specs and extracts technical requirements</p>
            </div>
            <div class="capability-card">
              <h4>✅ Compliance Automation</h4>
              <p>Maps SOC 2 findings to code and generates audit evidence</p>
            </div>
            <div class="capability-card">
              <h4>🔄 Multi-Repo Orchestration</h4>
              <p>Coordinates changes across Java, Node.js, and React</p>
            </div>
            <div class="capability-card">
              <h4>🔒 Security Inline</h4>
              <p>Catches vulnerabilities during generation, not days later</p>
            </div>
            <div class="capability-card">
              <h4>🚀 Deployment Planning</h4>
              <p>Zero-downtime strategies with rollback procedures</p>
            </div>
            <div class="capability-card">
              <h4>📊 Bobalytics</h4>
              <p>Full visibility into costs, model routing, and productivity</p>
            </div>
          </div>
          <p class="estimated-time"><strong>Estimated Time:</strong> 10-15 minutes to complete all capability demos</p>
        `
      },
      requirements: {
        number: '1',
        title: 'Business Requirements Analysis',
        badge: 'Unique to Bob',
        challenge: 'Most AI coding tools work at the code level. Developers spend days translating business requirements into technical specs. Bob reads the business requirements document directly.',
        customer_question: 'We have a 20-page SOC 2 compliance spec. How do we implement SSO + MFA across our systems?',
        bob_response: `<p>Great question. Bob can analyze that entire spec and give you a complete implementation plan.</p>
          <div class="talk-points">
            <h4>Bob's Approach:</h4>
            <ul>
              <li><strong>Reads the document directly</strong> - No manual translation needed</li>
              <li><strong>Identifies all systems involved</strong> - Maps relationships between services</li>
              <li><strong>Extracts technical requirements</strong> - Creates actionable implementation plan</li>
              <li><strong>Considers compliance needs</strong> - Builds in SOC 2 requirements from the start</li>
            </ul>
          </div>`,
        demo_code: `Read this business requirements document and analyze:
- What systems are involved?
- What are the technical challenges?
- What compliance requirements must we meet?
- What technology stacks are we working with?`,
        traditional_metric: '1 day - read spec, research systems, map requirements manually',
        bob_metric: '30 seconds - Bob reads, analyzes, and maps everything',
        value_statement: '"99% time savings" - Bob speaks both business and technical language, eliminating the translation gap that costs companies weeks.'
      },
      compliance: {
        number: '2',
        title: 'Compliance Automation',
        badge: 'Unique to Bob',
        challenge: 'Compliance is typically a quarterly fire drill. Teams spend weeks understanding controls, mapping findings to code, and gathering evidence for auditors.',
        customer_question: 'We failed our SOC 2 audit. How do we fix these findings and pass next time?',
        bob_response: `<p>Bob turns compliance from a fire drill into continuous automation. Let me show you how.</p>
          <div class="compliance-table-section">
            <h4>Automated Compliance Mapping:</h4>
            <table class="compliance-table">
              <thead>
                <tr><th>Finding</th><th>Bob's Fix</th><th>Evidence Generated</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>CC6.1 - No MFA</td>
                  <td>MFA controller with TOTP</td>
                  <td>Unit tests + config</td>
                </tr>
                <tr>
                  <td>CC6.6 - Session timeout</td>
                  <td>15-minute timeout middleware</td>
                  <td>Middleware logs</td>
                </tr>
                <tr>
                  <td>CC8.1 - Secrets in code</td>
                  <td>Environment variables</td>
                  <td>Config review</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        traditional_metric: '2 weeks - understand controls, map findings, gather evidence',
        bob_metric: '20 seconds - automatic mapping with evidence requirements',
        value_statement: '"Compliance becomes continuous and automated" - Bob generates evidence as code is written, eliminating quarterly fire drills.'
      },
      multirepo: {
        number: '3',
        title: 'Multi-Repo Orchestration',
        badge: 'Enterprise-Scale',
        challenge: 'Enterprise projects span multiple repositories with different languages, frameworks, and teams. Coordinating changes manually is complex and error-prone.',
        customer_question: 'We have changes across Java, Node.js, and React repos. How do we coordinate this without breaking things?',
        bob_response: `<p>Bob excels at multi-repo orchestration. Let me show you how it coordinates across your entire stack.</p>
          <div class="repo-plan">
            <div class="repo-phase">
              <h5>Phase 1 - auth-service (Node.js)</h5>
              <ul>
                <li>4 files to create: mfaController.js, totpService.js, qrCodeService.js, mfaRoutes.js</li>
                <li>3 files to modify: tokenController.js, package.json, .env.example</li>
                <li>New dependencies: speakeasy, qrcode</li>
              </ul>
            </div>
            <div class="repo-phase">
              <h5>Phase 2 - user-service (Java)</h5>
              <ul>
                <li>3 files to create: OAuth2Config.java, MFAController.java, SecurityConfig.java</li>
                <li>2 files to modify: pom.xml, application.properties</li>
                <li>New dependencies: spring-security-oauth2</li>
              </ul>
            </div>
            <div class="repo-phase">
              <h5>Phase 3 - frontend (React)</h5>
              <ul>
                <li>5 files to create: OAuthFlow.jsx, MFAEnrollment.jsx, MFALogin.jsx, authContext.js, authService.js</li>
                <li>2 files to modify: Login.jsx, App.jsx</li>
                <li>New dependencies: react-qr-code</li>
              </ul>
            </div>
          </div>`,
        demo_code: `Create an implementation plan for all 3 systems.
Show files to create, files to modify, dependencies to add,
and deployment order with reasoning.`,
        traditional_metric: '1 week - architects coordinate across teams, resolve dependencies manually',
        bob_metric: '45 seconds - Bob analyzes all repos and generates coordinated plan',
        value_statement: '"Multi-repo orchestration" - Bob coordinates changes across different technology stacks automatically, understanding dependencies and deployment order.'
      },
      security: {
        number: '4',
        title: 'Security Inline',
        badge: 'Shift-Left',
        challenge: 'Security reviews typically happen days after code is written. Finding vulnerabilities late means expensive rework and delayed releases.',
        customer_question: 'How do we ensure our generated code is secure? We can\'t afford a security breach.',
        bob_response: `<p>Bob has shift-left security - vulnerabilities are caught during generation, not days later.</p>
          <div class="security-examples">
            <div class="security-example">
              <h5>Hardcoded Secret Detected</h5>
              <div class="code-comparison">
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span class="code-block-language">Vulnerable Code</span>
                  </div>
                  <pre><code>const token = jwt.sign(payload, 'secret-key');</code></pre>
                </div>
                <div class="arrow">→</div>
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span class="code-block-language">Bob Fixed</span>
                  </div>
                  <pre><code>const token = jwt.sign(payload, process.env.JWT_SECRET);</code></pre>
                </div>
              </div>
              <p class="security-note"><strong>Bob's explanation:</strong> "Hardcoded secrets are a security risk. Using environment variables keeps secrets out of source code."</p>
            </div>
          </div>`,
        demo_code: `Review this authentication code for security issues:
- Look for hardcoded secrets
- Check for XSS vulnerabilities
- Validate input sanitization
- Ensure proper session management`,
        traditional_metric: 'Security review 3-5 days later → find issues → rework cycle → delays',
        bob_metric: 'Security scanning during generation → zero debt accumulation → no rework',
        value_statement: '"Shift-left security" - vulnerabilities are caught before code is written, eliminating the security-review-rework cycle.'
      },
      deployment: {
        number: '5',
        title: 'Deployment Planning',
        badge: 'Zero-Downtime',
        challenge: 'Deploying across multiple systems requires careful orchestration to avoid downtime. Rollback procedures must be planned before deployment.',
        customer_question: 'We need to deploy without downtime. Our customers are 24/7. How do we handle this?',
        bob_response: `<p>Bob generates zero-downtime deployment runbooks tailored to your infrastructure.</p>
          <div class="deployment-phases">
            <div class="runbook-section">
              <h5>Blue-Green Deployment</h5>
              <ul>
                <li>Deploy to green environment</li>
                <li>Run health checks</li>
                <li>Test with canary traffic</li>
                <li>If healthy, switch traffic gradually</li>
                <li>If unhealthy, rollback instantly</li>
              </ul>
            </div>
          </div>`,
        demo_code: `Generate a zero-downtime deployment runbook for this migration.
Include deployment order, health checks, rollback procedures,
and cutover strategy.`,
        traditional_metric: '2-3 days - write runbook manually, test rollback procedures, document steps',
        bob_metric: '45 seconds - comprehensive runbook with health checks and rollback commands',
        value_statement: '"Zero-downtime deployments" - Bob plans deployment order, health checks, and rollback procedures before any code is deployed.'
      },
      bobalytics: {
        number: '6',
        title: 'Bobalytics Transparency',
        badge: 'Unique to Bob',
        challenge: 'Most AI tools are black boxes. Teams can\'t see what they\'re spending, which models are being used, or what productivity they\'re getting.',
        customer_question: 'How do we track ROI? Our CFO needs to see exactly what we\'re spending and getting.',
        bob_response: `<p>Bobalytics provides complete transparency into costs and productivity.</p>
          <div class="metrics-dashboard">
            <div class="metric-card">
              <div class="metric-value">10:23</div>
              <div class="metric-label">Time to Complete</div>
              <div class="metric-change">-99% vs traditional (7-8 weeks)</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">$8.47</div>
              <div class="metric-label">Total Cost</div>
              <div class="metric-change">Transparent pricing</div>
            </div>
          </div>`,
        demo_code: `Show me the productivity dashboard for this project:
- Total time spent
- Cost breakdown by model
- Files generated
- Test coverage achieved`,
        traditional_metric: 'No visibility into AI tool costs and productivity',
        bob_metric: 'Full transparency with real-time dashboards and detailed metrics',
        value_statement: '"Full transparency" - Leadership sees exactly what they\'re paying for and the productivity gains achieved.'
      }
    };
  }

  // Render the walkthrough page
  async renderWalkthrough() {
    const mainContent = document.querySelector('.walkthrough-main');
    if (!mainContent) return;

    let html = '';

    // Render overview
    const overviewComponent = await this.load('chat-section', this.capabilityData.overview);
    html += overviewComponent;

    // Render capabilities
    for (const [key, capability] of Object.entries(this.capabilityData)) {
      if (key === 'overview') continue;
      
      const capabilityComponent = await this.load('capability-showcase', capability);
      html += capabilityComponent;
    }

    // Update the main content
    mainContent.innerHTML = html;

    // Re-initialize i18n
    if (window.i18n) {
      window.i18n.translate();
    }
  }

  // Initialize event handlers
  initializeEventHandlers() {
    // Copy buttons
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

    // Smooth scrolling
    this.initializeSmoothScrolling();
  }

  // Initialize smooth scrolling
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
window.walkthroughChatLoader = new WalkthroughChatLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.walkthrough-container')) {
      window.walkthroughChatLoader.init();
    }
  });
} else {
  if (document.querySelector('.walkthrough-container')) {
    window.walkthroughChatLoader.init();
  }
}