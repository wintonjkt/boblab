import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const MCP: React.FC = () => {
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
          <h1>{t('labs.mcp.title')}</h1>
          <p className="page-subtitle">{t('labs.mcp.subtitle')}</p>
          <p className="page-description">{t('labs.mcp.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.mcp.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#introduction" className="capability-link">{t('labs.mcp.nav.introduction')}</a>
            <a href="#configuration-levels" className="capability-link">{t('labs.mcp.nav.configurationLevels')}</a>
            <a href="#editing-config" className="capability-link">{t('labs.mcp.nav.editingConfig')}</a>
            <a href="#transport-types" className="capability-link">{t('labs.mcp.nav.transportTypes')}</a>
            <a href="#enabling-disabling" className="capability-link">{t('labs.mcp.nav.enablingDisabling')}</a>
            <a href="#creating-servers" className="capability-link">{t('labs.mcp.nav.creatingServers')}</a>
            <a href="#managing-servers" className="capability-link">{t('labs.mcp.nav.managingServers')}</a>
            <a href="#auto-approve" className="capability-link">{t('labs.mcp.nav.autoApprove')}</a>
            <a href="#finding-servers" className="capability-link">{t('labs.mcp.nav.findingServers')}</a>
            <a href="#using-tools" className="capability-link">{t('labs.mcp.nav.usingTools')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Introduction */}
            <section id="introduction" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.mcp.introduction.title')}</h2>
                  <p>{t('labs.mcp.introduction.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.mcp.introduction.capabilities.externalIntegrations.title')}</h4>
                      <p>{t('labs.mcp.introduction.capabilities.externalIntegrations.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.mcp.introduction.capabilities.flexibleConfiguration.title')}</h4>
                      <p>{t('labs.mcp.introduction.capabilities.flexibleConfiguration.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.mcp.introduction.capabilities.securityControl.title')}</h4>
                      <p>{t('labs.mcp.introduction.capabilities.securityControl.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.mcp.introduction.capabilities.easyServerCreation.title')}</h4>
                      <p>{t('labs.mcp.introduction.capabilities.easyServerCreation.desc')}</p>
                    </div>
                  </div>

                  <div className="info-card">
                    <p><strong>{t('labs.mcp.introduction.note.title')}</strong> {t('labs.mcp.introduction.note.desc')}</p>
                  </div>

                  <p><strong>{t('labs.mcp.introduction.estimatedTime')}</strong> {t('labs.mcp.introduction.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* Configuration Levels */}
            <section id="configuration-levels" className="section section-alt">
              <div className="container">
                <div className="step-card">
                  <h2>{t('labs.mcp.configurationLevels.title')}</h2>
                  <p>{t('labs.mcp.configurationLevels.desc')}</p>
                  
                  <div className="best-practices-grid">
                    <div className="practice-card">
                      <h3>{t('labs.mcp.configurationLevels.global.title')}</h3>
                      <ul>
                        <li><strong>{t('labs.mcp.configurationLevels.global.location.title')}</strong> {t('labs.mcp.configurationLevels.global.location.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.global.scope.title')}</strong> {t('labs.mcp.configurationLevels.global.scope.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.global.useCase.title')}</strong> {t('labs.mcp.configurationLevels.global.useCase.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.global.example.title')}</strong> {t('labs.mcp.configurationLevels.global.example.value')}</li>
                      </ul>
                    </div>
                    
                    <div className="practice-card">
                      <h3>{t('labs.mcp.configurationLevels.workspace.title')}</h3>
                      <ul>
                        <li><strong>{t('labs.mcp.configurationLevels.workspace.location.title')}</strong> {t('labs.mcp.configurationLevels.workspace.location.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.workspace.scope.title')}</strong> {t('labs.mcp.configurationLevels.workspace.scope.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.workspace.useCase.title')}</strong> {t('labs.mcp.configurationLevels.workspace.useCase.value')}</li>
                        <li><strong>{t('labs.mcp.configurationLevels.workspace.example.title')}</strong> {t('labs.mcp.configurationLevels.workspace.example.value')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Transport Types */}
            <section id="transport-types" className="section">
              <div className="container">
                <div className="step-card">
                  <h2>{t('labs.mcp.transportTypes.title')}</h2>
                  <p>{t('labs.mcp.transportTypes.desc')}</p>
                  
                  <h3>{t('labs.mcp.transportTypes.stdio.title')}</h3>
                  <p>{t('labs.mcp.transportTypes.stdio.desc')}</p>

                  <div className="best-practices-grid">
                    <div className="practice-card">
                      <h4>{t('labs.mcp.transportTypes.stdio.benefits.title')}</h4>
                      <ul>
                        <li>{t('labs.mcp.transportTypes.stdio.benefits.item1')}</li>
                        <li>{t('labs.mcp.transportTypes.stdio.benefits.item2')}</li>
                        <li>{t('labs.mcp.transportTypes.stdio.benefits.item3')}</li>
                        <li>{t('labs.mcp.transportTypes.stdio.benefits.item4')}</li>
                      </ul>
                    </div>
                    
                    <div className="practice-card">
                      <h4>{t('labs.mcp.transportTypes.stdio.configParams.title')}</h4>
                      <ul>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.command')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.args')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.cwd')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.env')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.alwaysAllow')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.stdio.configParams.disabled')}</strong></li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock
                    code={`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"],
      "env": {
        "NODE_ENV": "production"
      },
      "alwaysAllow": ["read_file", "list_directory"],
      "disabled": false
    },
    "database": {
      "command": "python",
      "args": ["-m", "mcp_server_postgres"],
      "cwd": "/path/to/server",
      "env": {
        "DB_CONNECTION_STRING": "postgresql://localhost/mydb"
      }
    }
  }
}`}
                    language="json"
                    title={t('labs.mcp.transportTypes.stdio.exampleTitle')}
                  />

                  <h3>{t('labs.mcp.transportTypes.sse.title')}</h3>
                  <p>{t('labs.mcp.transportTypes.sse.desc')}</p>

                  <div className="best-practices-grid">
                    <div className="practice-card">
                      <h4>{t('labs.mcp.transportTypes.sse.benefits.title')}</h4>
                      <ul>
                        <li>{t('labs.mcp.transportTypes.sse.benefits.item1')}</li>
                        <li>{t('labs.mcp.transportTypes.sse.benefits.item2')}</li>
                        <li>{t('labs.mcp.transportTypes.sse.benefits.item3')}</li>
                        <li>{t('labs.mcp.transportTypes.sse.benefits.item4')}</li>
                      </ul>
                    </div>
                    
                    <div className="practice-card">
                      <h4>{t('labs.mcp.transportTypes.sse.configParams.title')}</h4>
                      <ul>
                        <li><strong>{t('labs.mcp.transportTypes.sse.configParams.url')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.sse.configParams.headers')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.sse.configParams.alwaysAllow')}</strong></li>
                        <li><strong>{t('labs.mcp.transportTypes.sse.configParams.disabled')}</strong></li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock
                    code={`{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN",
        "X-API-Key": "your-api-key"
      },
      "alwaysAllow": ["search", "query"],
      "disabled": false
    }
  }
}`}
                    language="json"
                    title={t('labs.mcp.transportTypes.sse.exampleTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Creating Servers */}
            <section id="creating-servers" className="section section-alt">
              <div className="container">
                <h2>{t('labs.mcp.creatingServers.title')}</h2>
                <p>{t('labs.mcp.creatingServers.desc')}</p>

                <div className="demo-flow">
                  <h3>{t('labs.mcp.creatingServers.stepsTitle')}</h3>
                  
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>{t('labs.mcp.creatingServers.step1.title')}</h4>
                      <p>{t('labs.mcp.creatingServers.step1.desc')}</p>
                      <CodeBlock
                        code={t('labs.mcp.creatingServers.step1.code')}
                        language="text"
                        title={t('labs.mcp.creatingServers.step1.codeTitle')}
                      />
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>{t('labs.mcp.creatingServers.step2.title')}</h4>
                      <p>{t('labs.mcp.creatingServers.step2.desc')}</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>{t('labs.mcp.creatingServers.step3.title')}</h4>
                      <p>{t('labs.mcp.creatingServers.step3.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Auto-approve Tools */}
            <section id="auto-approve" className="section">
              <div className="container">
                <h2>{t('labs.mcp.autoApprove.title')}</h2>
                <p>{t('labs.mcp.autoApprove.desc')}</p>

                <CodeBlock
                  code={`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/safe/path"],
      "alwaysAllow": ["read_file", "list_directory"]
    }
  }
}`}
                  language="json"
                  title={t('labs.mcp.autoApprove.exampleTitle')}
                />

                <div className="info-card">
                  <h3>{t('labs.mcp.autoApprove.warning.title')}</h3>
                  <p>{t('labs.mcp.autoApprove.warning.desc')}</p>
                </div>
              </div>
            </section>

            {/* Finding Servers */}
            <section id="finding-servers" className="section section-alt">
              <div className="container">
                <h2>{t('labs.mcp.findingServers.title')}</h2>
                <p>{t('labs.mcp.findingServers.desc')}</p>

                <div className="best-practices-grid">
                  <div className="practice-card">
                    <h3>{t('labs.mcp.findingServers.officialRepo.title')}</h3>
                    <p>{t('labs.mcp.findingServers.officialRepo.desc')}</p>
                    <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      {t('labs.mcp.findingServers.officialRepo.link')}
                    </a>
                  </div>
                  
                  <div className="practice-card">
                    <h3>{t('labs.mcp.findingServers.community.title')}</h3>
                    <p>{t('labs.mcp.findingServers.community.desc')}</p>
                  </div>
                  
                  <div className="practice-card">
                    <h3>{t('labs.mcp.findingServers.buildYourOwn.title')}</h3>
                    <p>{t('labs.mcp.findingServers.buildYourOwn.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section id="summary" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.mcp.summary.title')}</h2>
                  <p>{t('labs.mcp.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.mcp.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.mcp.summary.nextSteps.step1')}</li>
                      <li>{t('labs.mcp.summary.nextSteps.step2')}</li>
                      <li>{t('labs.mcp.summary.nextSteps.step3')}</li>
                      <li>{t('labs.mcp.summary.nextSteps.step4')}</li>
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

export default MCP;

// Made with Bob
