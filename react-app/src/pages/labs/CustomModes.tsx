import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const CustomModes: React.FC = () => {
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
          <h1>{t('labs.customModes.title')}</h1>
          <p className="page-subtitle">{t('labs.customModes.subtitle')}</p>
          <p className="page-description">{t('labs.customModes.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.customModes.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.customModes.nav.overview')}</a>
            <a href="#what-are-modes" className="capability-link">{t('labs.customModes.nav.whatAreModes')}</a>
            <a href="#built-in-modes" className="capability-link">{t('labs.customModes.nav.builtInModes')}</a>
            <a href="#creating-modes" className="capability-link">{t('labs.customModes.nav.creatingModes')}</a>
            <a href="#mode-configuration" className="capability-link">{t('labs.customModes.nav.modeConfiguration')}</a>
            <a href="#examples" className="capability-link">{t('labs.customModes.nav.examples')}</a>
            <a href="#best-practices" className="capability-link">{t('labs.customModes.nav.bestPractices')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.customModes.overview.title')}</h2>
                  <p>{t('labs.customModes.overview.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.customModes.overview.capabilities.taskSpecialization.title')}</h4>
                      <p>{t('labs.customModes.overview.capabilities.taskSpecialization.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.customModes.overview.capabilities.consistentWorkflows.title')}</h4>
                      <p>{t('labs.customModes.overview.capabilities.consistentWorkflows.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.customModes.overview.capabilities.teamAlignment.title')}</h4>
                      <p>{t('labs.customModes.overview.capabilities.teamAlignment.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.customModes.overview.capabilities.quickContextSwitch.title')}</h4>
                      <p>{t('labs.customModes.overview.capabilities.quickContextSwitch.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.customModes.overview.estimatedTime')}</strong> {t('labs.customModes.overview.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* What Are Custom Modes */}
            <section id="what-are-modes" className="section section-alt">
              <div className="container">
                <div className="step-card">
                  <h2>{t('labs.customModes.whatAreModes.title')}</h2>
                  <p>{t('labs.customModes.whatAreModes.desc')}</p>
                  
                  <CodeBlock
                    code={`Available Modes:
├── Default (General Purpose)
├── Code Review
├── Documentation
├── Debugging
└── Your Custom Modes...`}
                    language="bash"
                    title={t('labs.customModes.whatAreModes.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Built-in Modes */}
            <section id="built-in-modes" className="section">
              <div className="container">
                <h2>{t('labs.customModes.builtInModes.title')}</h2>
                
                {/* Code Mode */}
                <div className="mode-detail-card">
                  <div className="mode-header">
                    <h3>{t('labs.customModes.builtInModes.code.title')}</h3>
                    <span className="mode-badge">{t('labs.customModes.builtInModes.code.badge')}</span>
                  </div>
                  <div className="mode-content">
                    <p><strong>{t('labs.customModes.builtInModes.code.role')}</strong> {t('labs.customModes.builtInModes.code.roleDesc')}</p>
                    <p><strong>{t('labs.customModes.builtInModes.code.description')}</strong> {t('labs.customModes.builtInModes.code.descriptionText')}</p>
                    
                    <div className="mode-details-grid">
                      <div className="detail-item">
                        <h4>{t('labs.customModes.builtInModes.code.toolAccess.title')}</h4>
                        <ul>
                          <li>{t('labs.customModes.builtInModes.code.toolAccess.item1')}</li>
                          <li>{t('labs.customModes.builtInModes.code.toolAccess.item2')}</li>
                          <li>{t('labs.customModes.builtInModes.code.toolAccess.item3')}</li>
                          <li>{t('labs.customModes.builtInModes.code.toolAccess.item4')}</li>
                        </ul>
                      </div>
                      <div className="detail-item">
                        <h4>{t('labs.customModes.builtInModes.code.bestFor.title')}</h4>
                        <ul>
                          <li>{t('labs.customModes.builtInModes.code.bestFor.item1')}</li>
                          <li>{t('labs.customModes.builtInModes.code.bestFor.item2')}</li>
                          <li>{t('labs.customModes.builtInModes.code.bestFor.item3')}</li>
                          <li>{t('labs.customModes.builtInModes.code.bestFor.item4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ask Mode */}
                <div className="mode-detail-card">
                  <div className="mode-header">
                    <h3>{t('labs.customModes.builtInModes.ask.title')}</h3>
                    <span className="mode-badge">{t('labs.customModes.builtInModes.ask.badge')}</span>
                  </div>
                  <div className="mode-content">
                    <p><strong>{t('labs.customModes.builtInModes.ask.role')}</strong> {t('labs.customModes.builtInModes.ask.roleDesc')}</p>
                    <p><strong>{t('labs.customModes.builtInModes.ask.description')}</strong> {t('labs.customModes.builtInModes.ask.descriptionText')}</p>
                    
                    <div className="mode-details-grid">
                      <div className="detail-item">
                        <h4>{t('labs.customModes.builtInModes.ask.toolAccess.title')}</h4>
                        <ul>
                          <li>{t('labs.customModes.builtInModes.ask.toolAccess.item1')}</li>
                          <li>{t('labs.customModes.builtInModes.ask.toolAccess.item2')}</li>
                          <li>{t('labs.customModes.builtInModes.ask.toolAccess.item3')}</li>
                          <li><em>{t('labs.customModes.builtInModes.ask.toolAccess.item4')}</em></li>
                        </ul>
                      </div>
                      <div className="detail-item">
                        <h4>{t('labs.customModes.builtInModes.ask.bestFor.title')}</h4>
                        <ul>
                          <li>{t('labs.customModes.builtInModes.ask.bestFor.item1')}</li>
                          <li>{t('labs.customModes.builtInModes.ask.bestFor.item2')}</li>
                          <li>{t('labs.customModes.builtInModes.ask.bestFor.item3')}</li>
                          <li>{t('labs.customModes.builtInModes.ask.bestFor.item4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Mode */}
                <div className="mode-detail-card">
                  <div className="mode-header">
                    <h3>{t('labs.customModes.builtInModes.plan.title')}</h3>
                    <span className="mode-badge">{t('labs.customModes.builtInModes.plan.badge')}</span>
                  </div>
                  <div className="mode-content">
                    <p><strong>{t('labs.customModes.builtInModes.plan.role')}</strong> {t('labs.customModes.builtInModes.plan.roleDesc')}</p>
                    <p><strong>{t('labs.customModes.builtInModes.plan.description')}</strong> {t('labs.customModes.builtInModes.plan.descriptionText')}</p>
                  </div>
                </div>

                {/* Architect Mode */}
                <div className="mode-detail-card">
                  <div className="mode-header">
                    <h3>{t('labs.customModes.builtInModes.architect.title')}</h3>
                    <span className="mode-badge">{t('labs.customModes.builtInModes.architect.badge')}</span>
                  </div>
                  <div className="mode-content">
                    <p><strong>{t('labs.customModes.builtInModes.architect.role')}</strong> {t('labs.customModes.builtInModes.architect.roleDesc')}</p>
                    <p><strong>{t('labs.customModes.builtInModes.architect.description')}</strong> {t('labs.customModes.builtInModes.architect.descriptionText')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Creating Custom Modes */}
            <section id="creating-modes" className="section section-alt">
              <div className="container">
                <h2>{t('labs.customModes.creatingModes.title')}</h2>
                <p>{t('labs.customModes.creatingModes.desc')}</p>

                <div className="demo-flow">
                  <h3>{t('labs.customModes.creatingModes.stepsTitle')}</h3>
                  
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>{t('labs.customModes.creatingModes.step1.title')}</h4>
                      <p>{t('labs.customModes.creatingModes.step1.desc')}</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>{t('labs.customModes.creatingModes.step2.title')}</h4>
                      <p>{t('labs.customModes.creatingModes.step2.desc')}</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>{t('labs.customModes.creatingModes.step3.title')}</h4>
                      <p>{t('labs.customModes.creatingModes.step3.desc')}</p>
                    </div>
                  </div>
                  
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>{t('labs.customModes.creatingModes.step4.title')}</h4>
                      <p>{t('labs.customModes.creatingModes.step4.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="section">
              <div className="container">
                <h2>{t('labs.customModes.bestPractices.title')}</h2>
                
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h3>{t('labs.customModes.bestPractices.clearPurpose.title')}</h3>
                    <p>{t('labs.customModes.bestPractices.clearPurpose.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.customModes.bestPractices.specificInstructions.title')}</h3>
                    <p>{t('labs.customModes.bestPractices.specificInstructions.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.customModes.bestPractices.appropriateTools.title')}</h3>
                    <p>{t('labs.customModes.bestPractices.appropriateTools.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.customModes.bestPractices.testAndIterate.title')}</h3>
                    <p>{t('labs.customModes.bestPractices.testAndIterate.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section id="summary" className="section section-alt">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.customModes.summary.title')}</h2>
                  <p>{t('labs.customModes.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.customModes.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.customModes.summary.nextSteps.step1')}</li>
                      <li>{t('labs.customModes.summary.nextSteps.step2')}</li>
                      <li>{t('labs.customModes.summary.nextSteps.step3')}</li>
                      <li>{t('labs.customModes.summary.nextSteps.step4')}</li>
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

export default CustomModes;

// Made with Bob
