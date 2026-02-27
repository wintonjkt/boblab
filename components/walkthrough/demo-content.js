// Demo content for walkthrough capabilities
const demoContent = {
  requirements: `
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4 data-i18n="walkthrough.upload_document">Upload a Requirements Document</h4>
        <p data-i18n="walkthrough.upload_document_desc">In Bob, upload a PDF, Word doc, or text file containing business requirements.</p>
        <div class="prompt-box">
          <div class="prompt-content">
            <p data-i18n="walkthrough.example_upload">Example: "UseCase1_SSO_MFA_Integration.pdf" - a 20-page SOC 2 compliance spec</p>
          </div>
        </div>
      </div>
    </div>

    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4 data-i18n="walkthrough.ask_bob">Ask Bob to Analyze</h4>
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
      </div>
    </div>

    <div class="step-item">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4 data-i18n="walkthrough.review_analysis">Review Bob's Analysis</h4>
        <p data-i18n="walkthrough.review_analysis_desc">Bob returns a comprehensive breakdown including:</p>
        <div class="result-box">
          <ul>
            <li><strong>3 Repositories Identified:</strong> user-service (Java), auth-service (Node.js), frontend (React)</li>
            <li><strong>5 SOC 2 Audit Findings:</strong> CC6.1 (No MFA), CC6.6 (Session timeout), CC7.2 (Auth logging), CC8.1 (Secrets in code)</li>
            <li><strong>Technical Risks:</strong> 10-year-old legacy system, no CORS, zero-downtime requirement</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  compliance: `
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Map Compliance Findings to Code</h4>
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-block-language">Prompt to Bob</span>
            <button class="copy-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy
            </button>
          </div>
          <pre><code>For each SOC 2 audit finding, show me:
- What the finding means
- Why we failed
- What code/config will fix it
- What evidence we'll show the auditor</code></pre>
        </div>
      </div>
    </div>

    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Review the Compliance Mapping</h4>
        <p>Bob generates a detailed table:</p>
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
      </div>
    </div>
  `

// Export for use in walkthrough loader
if (typeof module !== 'undefined' && module.exports) {
  module.exports = demoContent;
} else {
  window.demoContent = demoContent;
}