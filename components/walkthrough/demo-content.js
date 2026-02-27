// Demo content for walkthrough capabilities
const demoContent = {
  requirements: {
    steps: [
      {
        number: 1,
        title: "walkthrough.upload_document",
        description: "walkthrough.upload_document_desc",
        content: `
          <div class="prompt-box">
            <div class="prompt-content">
              <p data-i18n="walkthrough.example_upload">Example: "UseCase1_SSO_MFA_Integration.pdf" - a 20-page SOC 2 compliance spec</p>
            </div>
          </div>
        `
      },
      {
        number: 2,
        title: "walkthrough.ask_bob",
        description: null,
        content: `
          <div class="code-block-wrapper">
            <div class="code-block-header">
              <span class="code-block-language" data-i18n="walkthrough.prompt_to_bob">Prompt to Bob</span>
              <button class="copy-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span data-i18n="walkthrough.copy">Copy</span>
              </button>
            </div>
            <pre><code>Read this business requirements document and analyze:
- What systems are involved?
- What are the technical challenges?
- What compliance requirements must we meet?
- What technology stacks are we working with?</code></pre>
          </div>
        `
      },
      {
        number: 3,
        title: "walkthrough.review_analysis",
        description: "walkthrough.review_analysis_desc",
        content: `
          <div class="result-box">
            <ul>
              <li><strong>3 Repositories Identified:</strong> user-service (Java), auth-service (Node.js), frontend (React)</li>
              <li><strong>5 SOC 2 Audit Findings:</strong> CC6.1 (No MFA), CC6.6 (Session timeout), CC7.2 (Auth logging), CC8.1 (Secrets in code)</li>
              <li><strong>Technical Risks:</strong> 10-year-old legacy system, no CORS, zero-downtime requirement</li>
            </ul>
          </div>
        `
      }
    ]
  },
  compliance: {
    steps: [
      {
        number: 1,
        title: "walkthrough.map_compliance",
        description: null,
        content: `
          <div class="code-block-wrapper">
            <div class="code-block-header">
              <span class="code-block-language" data-i18n="walkthrough.prompt_to_bob">Prompt to Bob</span>
              <button class="copy-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span data-i18n="walkthrough.copy">Copy</span>
              </button>
            </div>
            <pre><code>For each SOC 2 audit finding, show me:
- What the finding means
- Why we failed
- What code/config will fix it
- What evidence we'll show the auditor</code></pre>
          </div>
        `
      },
      {
        number: 2,
        title: "walkthrough.review_mapping",
        description: "Bob generates a detailed table:",
        content: `
          <div class="table-responsive">
            <table class="compliance-table">
              <thead>
                <tr>
                  <th>Finding</th>
                  <th>Meaning</th>
                  <th>Code Fix</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CC6.1-2026-01</td>
                  <td>MFA required for remote access</td>
                  <td>mfaController.js</td>
                  <td>Unit tests + config</td>
                </tr>
                <tr>
                  <td>CC6.6-2026-03</td>
                  <td>Session timeout not enforced</td>
                  <td>sessionTimeout.js (15min)</td>
                  <td>Middleware logs</td>
                </tr>
                <tr>
                  <td>CC7.2-2026-04</td>
                  <td>Missing authentication logs</td>
                  <td>auditLogger.js</td>
                  <td>Log samples</td>
                </tr>
                <tr>
                  <td>CC8.1-2026-05</td>
                  <td>Secrets hardcoded in source</td>
                  <td>.env files</td>
                  <td>Config review</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  }
};

// Export for use in walkthrough loader
if (typeof module !== 'undefined' && module.exports) {
  module.exports = demoContent;
} else {
  window.demoContent = demoContent;
}