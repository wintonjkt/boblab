import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const Walkthrough: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    // Smooth scroll for anchor links
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
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1>{t('labs.walkthrough.title')}</h1>
          <p className="page-subtitle">{t('labs.walkthrough.subtitle')}</p>
          <p className="page-description">{t('labs.walkthrough.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        {/* Sidebar Navigation */}
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.walkthrough.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.walkthrough.nav.overview')}</a>
            <a href="#requirements" className="capability-link">{t('labs.walkthrough.nav.requirements')}</a>
            <a href="#compliance" className="capability-link">{t('labs.walkthrough.nav.compliance')}</a>
            <a href="#multi-repo" className="capability-link">{t('labs.walkthrough.nav.multiRepo')}</a>
            <a href="#security" className="capability-link">{t('labs.walkthrough.nav.security')}</a>
            <a href="#deployment" className="capability-link">{t('labs.walkthrough.nav.deployment')}</a>
            <a href="#bobalytics" className="capability-link">{t('labs.walkthrough.nav.bobalytics')}</a>
            <a href="#seller-conversations" className="capability-link">{t('labs.walkthrough.nav.sellerConversations')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview Section */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.walkthrough.overview.title')}</h2>
                  <p>{t('labs.walkthrough.overview.intro')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.requirements.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.requirements.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.compliance.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.compliance.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.multiRepo.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.multiRepo.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.security.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.security.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.deployment.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.deployment.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.walkthrough.overview.capabilities.bobalytics.title')}</h4>
                      <p>{t('labs.walkthrough.overview.capabilities.bobalytics.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.walkthrough.overview.estimatedTime')}</strong> {t('labs.walkthrough.overview.timeValue')}</p>
                  
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #0f62fe 0%, #0353e9 100%)', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>📦 {t('labs.walkthrough.overview.downloadTitle')}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 1rem 0' }}>{t('labs.walkthrough.overview.downloadDesc')}</p>
                    <a 
                      href="https://github.ibm.com/Subramaniam-J/seller_deep_dive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'inline-block', 
                        padding: '0.75rem 2rem', 
                        background: 'white', 
                        color: '#0f62fe', 
                        textDecoration: 'none', 
                        borderRadius: '4px', 
                        fontWeight: 600 
                      }}
                    >
                      {t('labs.walkthrough.overview.downloadButton')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Requirements Section */}
            <section id="requirements" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.walkthrough.requirements.title')}</h2>
                  <span className="capability-badge">{t('labs.walkthrough.requirements.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.walkthrough.requirements.objective.title')}</h3>
                    <p>{t('labs.walkthrough.requirements.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.walkthrough.requirements.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.requirements.demo.step1.title')}</h4>
                        <p>{t('labs.walkthrough.requirements.demo.step1.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.requirements.demo.step2.title')}</h4>
                        <CodeBlock
                          code={t('labs.walkthrough.requirements.demo.step2.code')}
                          language="text"
                          title={t('labs.walkthrough.requirements.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.requirements.demo.step3.title')}</h4>
                        <p>{t('labs.walkthrough.requirements.demo.step3.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.walkthrough.requirements.demo.step3.item1')}</li>
                            <li>{t('labs.walkthrough.requirements.demo.step3.item2')}</li>
                            <li>{t('labs.walkthrough.requirements.demo.step3.item3')}</li>
                            <li>{t('labs.walkthrough.requirements.demo.step3.item4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.walkthrough.requirements.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.walkthrough.requirements.value.traditional.title')}</strong>
                        <p>{t('labs.walkthrough.requirements.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.walkthrough.requirements.value.withBob.title')}</strong>
                        <p>{t('labs.walkthrough.requirements.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.walkthrough.requirements.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance Automation Section */}
            <section id="compliance" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.walkthrough.compliance.title')}</h2>
                  <span className="capability-badge">{t('labs.walkthrough.compliance.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.walkthrough.compliance.objective.title')}</h3>
                    <p>{t('labs.walkthrough.compliance.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.walkthrough.compliance.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.compliance.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.walkthrough.compliance.demo.step1.code')}
                          language="text"
                          title={t('labs.walkthrough.compliance.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.compliance.demo.step2.title')}</h4>
                        <p>{t('labs.walkthrough.compliance.demo.step2.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.walkthrough.compliance.demo.step2.item1')}</li>
                            <li>{t('labs.walkthrough.compliance.demo.step2.item2')}</li>
                            <li>{t('labs.walkthrough.compliance.demo.step2.item3')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.walkthrough.compliance.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.walkthrough.compliance.value.traditional.title')}</strong>
                        <p>{t('labs.walkthrough.compliance.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.walkthrough.compliance.value.withBob.title')}</strong>
                        <p>{t('labs.walkthrough.compliance.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.walkthrough.compliance.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Multi-Repo Orchestration Section */}
            <section id="multi-repo" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.walkthrough.multiRepo.title')}</h2>
                  <span className="capability-badge">{t('labs.walkthrough.multiRepo.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.walkthrough.multiRepo.objective.title')}</h3>
                    <p>{t('labs.walkthrough.multiRepo.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.walkthrough.multiRepo.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.multiRepo.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.walkthrough.multiRepo.demo.step1.code')}
                          language="text"
                          title={t('labs.walkthrough.multiRepo.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.walkthrough.multiRepo.demo.step2.title')}</h4>
                        <p>{t('labs.walkthrough.multiRepo.demo.step2.desc')}</p>

                        <div className="repo-plan">
                          <div className="repo-phase">
                            <span className="phase-label">{t('labs.walkthrough.multiRepo.demo.step2.phase1.label')}</span>
                            <ul>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase1.item1')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase1.item2')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase1.item3')}</li>
                            </ul>
                          </div>

                          <div className="repo-phase">
                            <span className="phase-label">{t('labs.walkthrough.multiRepo.demo.step2.phase2.label')}</span>
                            <ul>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase2.item1')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase2.item2')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase2.item3')}</li>
                            </ul>
                          </div>

                          <div className="repo-phase">
                            <span className="phase-label">{t('labs.walkthrough.multiRepo.demo.step2.phase3.label')}</span>
                            <ul>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase3.item1')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase3.item2')}</li>
                              <li>{t('labs.walkthrough.multiRepo.demo.step2.phase3.item3')}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.walkthrough.multiRepo.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.walkthrough.multiRepo.value.traditional.title')}</strong>
                        <p>{t('labs.walkthrough.multiRepo.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.walkthrough.multiRepo.value.withBob.title')}</strong>
                        <p>{t('labs.walkthrough.multiRepo.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.walkthrough.multiRepo.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Inline Section */}
            <section id="security" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.walkthrough.security.title')}</h2>
                  <span className="capability-badge">{t('labs.walkthrough.security.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.walkthrough.security.objective.title')}</h3>
                    <p>{t('labs.walkthrough.security.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.walkthrough.security.demo.title')}</h3>

                    <div className="security-demo">
                      <h4>{t('labs.walkthrough.security.demo.subtitle')}</h4>

                      <div className="security-example">
                        <div className="security-issue">
                          <h5>{t('labs.walkthrough.security.demo.issue1.title')}</h5>
                          <div className="code-comparison">
                            <CodeBlock
                              code="const token = jwt.sign(payload, 'secret-key');"
                              language="javascript"
                              title={t('labs.walkthrough.security.demo.issue1.before')}
                            />
                            <div className="arrow">→</div>
                            <CodeBlock
                              code="const token = jwt.sign(payload, process.env.JWT_SECRET);"
                              language="javascript"
                              title={t('labs.walkthrough.security.demo.issue1.after')}
                            />
                          </div>
                          <p className="security-note"><strong>{t('labs.walkthrough.security.demo.issue1.explanation')}</strong></p>
                        </div>

                        <div className="security-issue">
                          <h5>{t('labs.walkthrough.security.demo.issue2.title')}</h5>
                          <div className="code-comparison">
                            <CodeBlock
                              code="localStorage.setItem('token', token);"
                              language="javascript"
                              title={t('labs.walkthrough.security.demo.issue2.before')}
                            />
                            <div className="arrow">→</div>
                            <CodeBlock
                              code={`// Set httpOnly cookie via server response
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});`}
                              language="javascript"
                              title={t('labs.walkthrough.security.demo.issue2.after')}
                            />
                          </div>
                          <p className="security-note"><strong>{t('labs.walkthrough.security.demo.issue2.explanation')}</strong></p>
                        </div>
                      </div>
                    </div>

                    <div className="security-findings-summary">
                      <h4>{t('labs.walkthrough.security.demo.summary.title')}</h4>
                      <ul>
                        <li>{t('labs.walkthrough.security.demo.summary.item1')}</li>
                        <li>{t('labs.walkthrough.security.demo.summary.item2')}</li>
                        <li>{t('labs.walkthrough.security.demo.summary.item3')}</li>
                        <li>{t('labs.walkthrough.security.demo.summary.item4')}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.walkthrough.security.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.walkthrough.security.value.traditional.title')}</strong>
                        <p>{t('labs.walkthrough.security.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.walkthrough.security.value.withBob.title')}</strong>
                        <p>{t('labs.walkthrough.security.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.walkthrough.security.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">{t('labs.walkthrough.summary.title')}</h2>
                <p>{t('labs.walkthrough.summary.desc')}</p>
                
                <div className="achievement-badges">
                  <div className="badge">
                    <div className="badge-icon">📋</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.requirements')}</div>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">🛡️</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.compliance')}</div>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">🔗</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.multiRepo')}</div>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">🔐</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.security')}</div>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">🚀</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.deployment')}</div>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">📊</div>
                    <div className="badge-title">{t('labs.walkthrough.summary.badges.bobalytics')}</div>
                  </div>
                </div>

                <div className="next-steps">
                  <h3>{t('labs.walkthrough.summary.nextSteps.title')}</h3>
                  <ol>
                    <li>{t('labs.walkthrough.summary.nextSteps.item1')}</li>
                    <li>{t('labs.walkthrough.summary.nextSteps.item2')}</li>
                    <li>{t('labs.walkthrough.summary.nextSteps.item3')}</li>
                    <li>{t('labs.walkthrough.summary.nextSteps.item4')}</li>
                  </ol>
                </div>

                <div className="cta-box">
                  <h3>{t('labs.walkthrough.summary.cta.title')}</h3>
                  <p>{t('labs.walkthrough.summary.cta.desc')}</p>
                  <div className="cta-buttons">
                    <a href="https://www.ibm.com/client-engineering" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      {t('labs.walkthrough.summary.cta.button')}
                    </a>
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

export default Walkthrough;

// Made with Bob
