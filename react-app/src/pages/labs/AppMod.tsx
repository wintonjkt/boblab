import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const AppMod: React.FC = () => {
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
          <h1>{t('labs.appMod.title')}</h1>
          <p className="page-subtitle">{t('labs.appMod.subtitle')}</p>
          <p className="page-description">{t('labs.appMod.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        {/* Sidebar Navigation */}
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.appMod.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.appMod.nav.overview')}</a>
            <a href="#codebase-review" className="capability-link">{t('labs.appMod.nav.codebaseReview')}</a>
            <a href="#modernization-plan" className="capability-link">{t('labs.appMod.nav.modernizationPlan')}</a>
            <a href="#code-transformation" className="capability-link">{t('labs.appMod.nav.codeTransformation')}</a>
            <a href="#testing" className="capability-link">{t('labs.appMod.nav.testing')}</a>
            <a href="#documentation" className="capability-link">{t('labs.appMod.nav.documentation')}</a>
            <a href="#deployment" className="capability-link">{t('labs.appMod.nav.deployment')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview Section */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.appMod.overview.title')}</h2>
                  <p>{t('labs.appMod.overview.intro')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.codebaseReview.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.codebaseReview.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.modernizationPlan.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.modernizationPlan.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.codeTransformation.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.codeTransformation.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.testing.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.testing.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.documentation.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.documentation.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.appMod.overview.capabilities.deployment.title')}</h4>
                      <p>{t('labs.appMod.overview.capabilities.deployment.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.appMod.overview.estimatedTime')}</strong> {t('labs.appMod.overview.timeValue')}</p>
                  
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #0f62fe 0%, #0353e9 100%)', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>📦 {t('labs.appMod.overview.downloadTitle')}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 1rem 0' }}>{t('labs.appMod.overview.downloadDesc')}</p>
                    <a 
                      href="../samples/modresorts-twas-j8.zip" 
                      download
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
                      {t('labs.appMod.overview.downloadButton')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Codebase Review Section */}
            <section id="codebase-review" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.appMod.codebaseReview.title')}</h2>
                  <span className="capability-badge">{t('labs.appMod.codebaseReview.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.appMod.codebaseReview.objective.title')}</h3>
                    <p>{t('labs.appMod.codebaseReview.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.appMod.codebaseReview.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.codebaseReview.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.appMod.codebaseReview.demo.step1.code')}
                          language="text"
                          title={t('labs.appMod.codebaseReview.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.codebaseReview.demo.step2.title')}</h4>
                        <p>{t('labs.appMod.codebaseReview.demo.step2.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.appMod.codebaseReview.demo.step2.item1')}</li>
                            <li>{t('labs.appMod.codebaseReview.demo.step2.item2')}</li>
                            <li>{t('labs.appMod.codebaseReview.demo.step2.item3')}</li>
                            <li>{t('labs.appMod.codebaseReview.demo.step2.item4')}</li>
                            <li>{t('labs.appMod.codebaseReview.demo.step2.item5')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.appMod.codebaseReview.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.appMod.codebaseReview.value.traditional.title')}</strong>
                        <p>{t('labs.appMod.codebaseReview.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.appMod.codebaseReview.value.withBob.title')}</strong>
                        <p>{t('labs.appMod.codebaseReview.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.appMod.codebaseReview.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Modernization Plan Section */}
            <section id="modernization-plan" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.appMod.modernizationPlan.title')}</h2>
                  <span className="capability-badge">{t('labs.appMod.modernizationPlan.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.appMod.modernizationPlan.objective.title')}</h3>
                    <p>{t('labs.appMod.modernizationPlan.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.appMod.modernizationPlan.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.modernizationPlan.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.appMod.modernizationPlan.demo.step1.code')}
                          language="text"
                          title={t('labs.appMod.modernizationPlan.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.modernizationPlan.demo.step2.title')}</h4>
                        <p>{t('labs.appMod.modernizationPlan.demo.step2.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.appMod.modernizationPlan.demo.step2.item1')}</li>
                            <li>{t('labs.appMod.modernizationPlan.demo.step2.item2')}</li>
                            <li>{t('labs.appMod.modernizationPlan.demo.step2.item3')}</li>
                            <li>{t('labs.appMod.modernizationPlan.demo.step2.item4')}</li>
                            <li>{t('labs.appMod.modernizationPlan.demo.step2.item5')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.appMod.modernizationPlan.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.appMod.modernizationPlan.value.traditional.title')}</strong>
                        <p>{t('labs.appMod.modernizationPlan.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.appMod.modernizationPlan.value.withBob.title')}</strong>
                        <p>{t('labs.appMod.modernizationPlan.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.appMod.modernizationPlan.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Transformation Section */}
            <section id="code-transformation" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.appMod.codeTransformation.title')}</h2>
                  <span className="capability-badge">{t('labs.appMod.codeTransformation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.appMod.codeTransformation.objective.title')}</h3>
                    <p>{t('labs.appMod.codeTransformation.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.appMod.codeTransformation.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.codeTransformation.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.appMod.codeTransformation.demo.step1.code')}
                          language="text"
                          title={t('labs.appMod.codeTransformation.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.codeTransformation.demo.step2.title')}</h4>
                        <p>{t('labs.appMod.codeTransformation.demo.step2.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.codeTransformation.demo.step3.title')}</h4>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.appMod.codeTransformation.demo.step3.item1')}</li>
                            <li>{t('labs.appMod.codeTransformation.demo.step3.item2')}</li>
                            <li>{t('labs.appMod.codeTransformation.demo.step3.item3')}</li>
                            <li>{t('labs.appMod.codeTransformation.demo.step3.item4')}</li>
                            <li>{t('labs.appMod.codeTransformation.demo.step3.item5')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.appMod.codeTransformation.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.appMod.codeTransformation.value.traditional.title')}</strong>
                        <p>{t('labs.appMod.codeTransformation.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.appMod.codeTransformation.value.withBob.title')}</strong>
                        <p>{t('labs.appMod.codeTransformation.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.appMod.codeTransformation.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing Section */}
            <section id="testing" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.appMod.testing.title')}</h2>
                  <span className="capability-badge">{t('labs.appMod.testing.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.appMod.testing.objective.title')}</h3>
                    <p>{t('labs.appMod.testing.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.appMod.testing.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.testing.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.appMod.testing.demo.step1.code')}
                          language="text"
                          title={t('labs.appMod.testing.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.testing.demo.step2.title')}</h4>
                        <p>{t('labs.appMod.testing.demo.step2.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.appMod.testing.demo.step3.title')}</h4>
                        <CodeBlock
                          code={t('labs.appMod.testing.demo.step3.code')}
                          language="text"
                          title={t('labs.appMod.testing.demo.step3.codeTitle')}
                        />
                        <p style={{ marginTop: '1rem' }}><strong>{t('labs.appMod.testing.demo.step3.processTitle')}</strong></p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.appMod.testing.demo.step3.item1')}</li>
                            <li>{t('labs.appMod.testing.demo.step3.item2')}</li>
                            <li>{t('labs.appMod.testing.demo.step3.item3')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.appMod.testing.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.appMod.testing.value.traditional.title')}</strong>
                        <p>{t('labs.appMod.testing.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.appMod.testing.value.withBob.title')}</strong>
                        <p>{t('labs.appMod.testing.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.appMod.testing.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">{t('labs.appMod.summary.title')}</h2>

                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('labs.appMod.summary.table.phase')}</th>
                        <th>{t('labs.appMod.summary.table.traditional')}</th>
                        <th>{t('labs.appMod.summary.table.withBob')}</th>
                        <th>{t('labs.appMod.summary.table.savings')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row1.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row1.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row1.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row1.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row2.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row2.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row2.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row2.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row3.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row3.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row3.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row3.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row4.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row4.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row4.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row4.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row5.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row5.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row5.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row5.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.appMod.summary.table.row6.phase')}</td>
                        <td>{t('labs.appMod.summary.table.row6.traditional')}</td>
                        <td>{t('labs.appMod.summary.table.row6.withBob')}</td>
                        <td className="check">{t('labs.appMod.summary.table.row6.savings')}</td>
                      </tr>
                      <tr style={{ fontWeight: 600, background: 'var(--bg-alt)' }}>
                        <td><strong>{t('labs.appMod.summary.table.total.phase')}</strong></td>
                        <td><strong>{t('labs.appMod.summary.table.total.traditional')}</strong></td>
                        <td><strong>{t('labs.appMod.summary.table.total.withBob')}</strong></td>
                        <td className="check"><strong>{t('labs.appMod.summary.table.total.savings')}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--cds-layer-accent)', borderLeft: '4px solid var(--cds-background-brand)' }}>
                  <h3>{t('labs.appMod.summary.whyBob.title')}</h3>
                  <ul>
                    <li>{t('labs.appMod.summary.whyBob.item1')}</li>
                    <li>{t('labs.appMod.summary.whyBob.item2')}</li>
                    <li>{t('labs.appMod.summary.whyBob.item3')}</li>
                    <li>{t('labs.appMod.summary.whyBob.item4')}</li>
                    <li>{t('labs.appMod.summary.whyBob.item5')}</li>
                  </ul>
                </div>

                <div className="cta-box">
                  <h3>{t('labs.appMod.summary.cta.title')}</h3>
                  <p>{t('labs.appMod.summary.cta.desc')}</p>
                  <div className="cta-buttons">
                    <a href="narrative.html" className="btn btn-primary">{t('labs.appMod.summary.cta.button1')}</a>
                    <a href="walkthrough.html" className="btn btn-secondary">{t('labs.appMod.summary.cta.button2')}</a>
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

export default AppMod;

// Made with Bob
