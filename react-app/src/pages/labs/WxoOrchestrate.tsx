import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const WxoOrchestrate: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="lab-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('labs.wxoOrchestrate.title')}</h1>
          <p className="page-subtitle">{t('labs.wxoOrchestrate.subtitle')}</p>
          <p className="page-description">{t('labs.wxoOrchestrate.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.wxoOrchestrate.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.wxoOrchestrate.nav.overview')}</a>
            <a href="#prerequisites" className="capability-link">{t('labs.wxoOrchestrate.nav.prerequisites')}</a>
            <a href="#custom-mode" className="capability-link">{t('labs.wxoOrchestrate.nav.customMode')}</a>
            <a href="#docs-mcp" className="capability-link">{t('labs.wxoOrchestrate.nav.docsMCP')}</a>
            <a href="#cli-mcp" className="capability-link">{t('labs.wxoOrchestrate.nav.cliMCP')}</a>
            <a href="#workflow" className="capability-link">{t('labs.wxoOrchestrate.nav.workflow')}</a>
            <a href="#weather-agent" className="capability-link">{t('labs.wxoOrchestrate.nav.weatherAgent')}</a>
            <a href="#best-practices" className="capability-link">{t('labs.wxoOrchestrate.nav.bestPractices')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.wxoOrchestrate.overview.title')}</h2>
                  <p>{t('labs.wxoOrchestrate.overview.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.wxoOrchestrate.overview.capabilities.wxoOrchestrate.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.overview.capabilities.wxoOrchestrate.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.wxoOrchestrate.overview.capabilities.ibmBob.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.overview.capabilities.ibmBob.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.wxoOrchestrate.overview.capabilities.mcpServers.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.overview.capabilities.mcpServers.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.wxoOrchestrate.overview.whatYouBuild')}</strong> {t('labs.wxoOrchestrate.overview.whatYouBuildValue')}</p>
                  <p><strong>{t('labs.wxoOrchestrate.overview.estimatedTime')}</strong> {t('labs.wxoOrchestrate.overview.timeValue')}</p>
                </div>

                <div className="business-value">
                  <h3>{t('labs.wxoOrchestrate.overview.whyThisMatters.title')}</h3>
                  <div className="value-comparison">
                    <div className="value-traditional">
                      <strong>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.title')}</strong>
                      <ul>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.item1')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.item2')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.item3')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.item4')}</li>
                      </ul>
                      <p><strong>{t('labs.wxoOrchestrate.overview.whyThisMatters.traditional.time')}</strong></p>
                    </div>
                    <div className="value-bob">
                      <strong>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.title')}</strong>
                      <ul>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.item1')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.item2')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.item3')}</li>
                        <li>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.item4')}</li>
                      </ul>
                      <p><strong>{t('labs.wxoOrchestrate.overview.whyThisMatters.withBob.time')}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section id="prerequisites" className="section section-alt">
              <div className="container">
                <h2>{t('labs.wxoOrchestrate.prerequisites.title')}</h2>
                
                <div className="best-practices-grid">
                  <div className="practice-card">
                    <h3>{t('labs.wxoOrchestrate.prerequisites.required.title')}</h3>
                    <ul>
                      <li>{t('labs.wxoOrchestrate.prerequisites.required.item1')}</li>
                      <li>{t('labs.wxoOrchestrate.prerequisites.required.item2')}</li>
                      <li>{t('labs.wxoOrchestrate.prerequisites.required.item3')}</li>
                      <li>{t('labs.wxoOrchestrate.prerequisites.required.item4')}</li>
                    </ul>
                  </div>
                  
                  <div className="practice-card">
                    <h3>{t('labs.wxoOrchestrate.prerequisites.helpful.title')}</h3>
                    <ul>
                      <li>{t('labs.wxoOrchestrate.prerequisites.helpful.item1')}</li>
                      <li>{t('labs.wxoOrchestrate.prerequisites.helpful.item2')}</li>
                      <li>{t('labs.wxoOrchestrate.prerequisites.helpful.item3')}</li>
                    </ul>
                    <p>{t('labs.wxoOrchestrate.prerequisites.helpful.note')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom Mode Setup */}
            <section id="custom-mode" className="section">
              <div className="container">
                <div className="step-card">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <h2>{t('labs.wxoOrchestrate.customMode.title')}</h2>
                  </div>

                  <div className="objective-box">
                    <h3>{t('labs.wxoOrchestrate.customMode.objective.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.customMode.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.wxoOrchestrate.customMode.stepsTitle')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.wxoOrchestrate.customMode.step1.title')}</h4>
                        <p>{t('labs.wxoOrchestrate.customMode.step1.desc')}</p>
                        <ul>
                          <li><strong>{t('labs.wxoOrchestrate.customMode.step1.path')}</strong></li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.wxoOrchestrate.customMode.step2.title')}</h4>
                        <p>{t('labs.wxoOrchestrate.customMode.step2.desc')}</p>
                        <CodeBlock
                          code={`Name: wxo-agent-architect
Display Name: 🤖 WXO Agent Architect
Description: Specialized mode for developing watsonx Orchestrate agents`}
                          language="text"
                          title={t('labs.wxoOrchestrate.customMode.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.wxoOrchestrate.customMode.step3.title')}</h4>
                        <p>{t('labs.wxoOrchestrate.customMode.step3.desc')}</p>
                        <CodeBlock
                          code={`You are an expert watsonx Orchestrate agent developer. You specialize in:
- Building agents using the watsonx Orchestrate Agent Development Kit (ADK)
- Implementing agentic workflows and patterns
- Integrating tools and APIs into agents
- Following watsonx Orchestrate best practices
- Using Python for agent development

When developing agents:
1. Always search documentation using the SearchIbmWatsonxOrchestrateAdk tool first
2. Use the watsonx Orchestrate CLI tools for agent operations
3. Follow the patterns and examples from the documentation
4. Ensure proper error handling and logging
5. Write clean, maintainable code`}
                          language="text"
                          title={t('labs.wxoOrchestrate.customMode.step3.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.wxoOrchestrate.customMode.step4.title')}</h4>
                        <p>{t('labs.wxoOrchestrate.customMode.step4.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li><strong>read</strong> - {t('labs.wxoOrchestrate.customMode.step4.read')}</li>
                            <li><strong>edit</strong> - {t('labs.wxoOrchestrate.customMode.step4.edit')}</li>
                            <li><strong>browser</strong> - {t('labs.wxoOrchestrate.customMode.step4.browser')}</li>
                            <li><strong>mcp</strong> - {t('labs.wxoOrchestrate.customMode.step4.mcp')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation MCP */}
            <section id="docs-mcp" className="section section-alt">
              <div className="container">
                <div className="step-card">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <h2>{t('labs.wxoOrchestrate.docsMCP.title')}</h2>
                  </div>

                  <div className="objective-box">
                    <h3>{t('labs.wxoOrchestrate.docsMCP.objective.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.docsMCP.objective.desc')}</p>
                  </div>

                  <p>{t('labs.wxoOrchestrate.docsMCP.desc')}</p>

                  <CodeBlock
                    code={`{
  "mcpServers": {
    "ibm-watsonx-orchestrate-adk-docs": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "https://ibm.github.io/watsonx-ai-platform-sdk-python/watsonx_ai_platform_sdk_python.html"
      ]
    }
  }
}`}
                    language="json"
                    title={t('labs.wxoOrchestrate.docsMCP.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* CLI MCP */}
            <section id="cli-mcp" className="section">
              <div className="container">
                <div className="step-card">
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <h2>{t('labs.wxoOrchestrate.cliMCP.title')}</h2>
                  </div>

                  <div className="objective-box">
                    <h3>{t('labs.wxoOrchestrate.cliMCP.objective.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.cliMCP.objective.desc')}</p>
                  </div>

                  <p>{t('labs.wxoOrchestrate.cliMCP.desc')}</p>

                  <CodeBlock
                    code={`{
  "mcpServers": {
    "wxo-cli": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"],
      "alwaysAllow": ["execute_command"]
    }
  }
}`}
                    language="json"
                    title={t('labs.wxoOrchestrate.cliMCP.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Development Workflow */}
            <section id="workflow" className="section section-alt">
              <div className="container">
                <h2>{t('labs.wxoOrchestrate.workflow.title')}</h2>
                <p>{t('labs.wxoOrchestrate.workflow.desc')}</p>

                <div className="demo-flow">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>{t('labs.wxoOrchestrate.workflow.step1.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.workflow.step1.desc')}</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>{t('labs.wxoOrchestrate.workflow.step2.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.workflow.step2.desc')}</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>{t('labs.wxoOrchestrate.workflow.step3.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.workflow.step3.desc')}</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>{t('labs.wxoOrchestrate.workflow.step4.title')}</h4>
                      <p>{t('labs.wxoOrchestrate.workflow.step4.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Weather Agent Example */}
            <section id="weather-agent" className="section">
              <div className="container">
                <h2>{t('labs.wxoOrchestrate.weatherAgent.title')}</h2>
                <p>{t('labs.wxoOrchestrate.weatherAgent.desc')}</p>

                <CodeBlock
                  code={t('labs.wxoOrchestrate.weatherAgent.prompt')}
                  language="text"
                  title={t('labs.wxoOrchestrate.weatherAgent.promptTitle')}
                />

                <div className="info-card">
                  <h3>{t('labs.wxoOrchestrate.weatherAgent.result.title')}</h3>
                  <p>{t('labs.wxoOrchestrate.weatherAgent.result.desc')}</p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="section section-alt">
              <div className="container">
                <h2>{t('labs.wxoOrchestrate.bestPractices.title')}</h2>
                
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h3>{t('labs.wxoOrchestrate.bestPractices.searchFirst.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.bestPractices.searchFirst.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.wxoOrchestrate.bestPractices.iterativeDevelopment.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.bestPractices.iterativeDevelopment.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.wxoOrchestrate.bestPractices.testEarly.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.bestPractices.testEarly.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.wxoOrchestrate.bestPractices.leverageMCP.title')}</h3>
                    <p>{t('labs.wxoOrchestrate.bestPractices.leverageMCP.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section id="summary" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.wxoOrchestrate.summary.title')}</h2>
                  <p>{t('labs.wxoOrchestrate.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.wxoOrchestrate.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.wxoOrchestrate.summary.nextSteps.step1')}</li>
                      <li>{t('labs.wxoOrchestrate.summary.nextSteps.step2')}</li>
                      <li>{t('labs.wxoOrchestrate.summary.nextSteps.step3')}</li>
                      <li>{t('labs.wxoOrchestrate.summary.nextSteps.step4')}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WxoOrchestrate;

// Made with Bob
