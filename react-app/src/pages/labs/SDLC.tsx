import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const SDLC: React.FC = () => {
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
          <h1>{t('labs.sdlc.title')}</h1>
          <p className="page-subtitle">{t('labs.sdlc.subtitle')}</p>
          <p className="page-description">{t('labs.sdlc.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.sdlc.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.sdlc.nav.overview')}</a>
            <a href="#code-understanding" className="capability-link">{t('labs.sdlc.nav.codeUnderstanding')}</a>
            <a href="#code-review" className="capability-link">{t('labs.sdlc.nav.codeReview')}</a>
            <a href="#code-fixes" className="capability-link">{t('labs.sdlc.nav.codeFixes')}</a>
            <a href="#testing" className="capability-link">{t('labs.sdlc.nav.testing')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.sdlc.overview.title')}</h2>
                  <p>{t('labs.sdlc.overview.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.sdlc.overview.capabilities.codeUnderstanding.title')}</h4>
                      <p>{t('labs.sdlc.overview.capabilities.codeUnderstanding.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.sdlc.overview.capabilities.codeReview.title')}</h4>
                      <p>{t('labs.sdlc.overview.capabilities.codeReview.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.sdlc.overview.capabilities.iterativeFixes.title')}</h4>
                      <p>{t('labs.sdlc.overview.capabilities.iterativeFixes.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.sdlc.overview.capabilities.testGeneration.title')}</h4>
                      <p>{t('labs.sdlc.overview.capabilities.testGeneration.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.sdlc.overview.estimatedTime')}</strong> {t('labs.sdlc.overview.timeValue')}</p>
                  
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #0f62fe 0%, #0353e9 100%)', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>📦 {t('labs.sdlc.overview.downloadTitle')}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 1rem 0' }}>{t('labs.sdlc.overview.downloadDesc')}</p>
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
                      {t('labs.sdlc.overview.downloadButton')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Understanding */}
            <section id="code-understanding" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.sdlc.codeUnderstanding.title')}</h2>
                  <span className="capability-badge">{t('labs.sdlc.codeUnderstanding.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.sdlc.codeUnderstanding.challenge.title')}</h3>
                    <p>{t('labs.sdlc.codeUnderstanding.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.sdlc.codeUnderstanding.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeUnderstanding.demo.step1.title')}</h4>
                        <p>{t('labs.sdlc.codeUnderstanding.demo.step1.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeUnderstanding.demo.step2.title')}</h4>
                        <CodeBlock
                          code={`Analyze this codebase and generate documentation including:
- High-level architecture overview
- Component responsibilities and interactions
- Data flow and API endpoints
- Key business logic and algorithms
- Dependencies and external integrations
- Setup and configuration instructions`}
                          language="text"
                          title={t('labs.sdlc.codeUnderstanding.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeUnderstanding.demo.step3.title')}</h4>
                        <p>{t('labs.sdlc.codeUnderstanding.demo.step3.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.sdlc.codeUnderstanding.demo.step3.item1')}</li>
                            <li>{t('labs.sdlc.codeUnderstanding.demo.step3.item2')}</li>
                            <li>{t('labs.sdlc.codeUnderstanding.demo.step3.item3')}</li>
                            <li>{t('labs.sdlc.codeUnderstanding.demo.step3.item4')}</li>
                            <li>{t('labs.sdlc.codeUnderstanding.demo.step3.item5')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.sdlc.codeUnderstanding.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.sdlc.codeUnderstanding.value.traditional.title')}</strong>
                        <p>{t('labs.sdlc.codeUnderstanding.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.sdlc.codeUnderstanding.value.withBob.title')}</strong>
                        <p>{t('labs.sdlc.codeUnderstanding.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.sdlc.codeUnderstanding.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Review */}
            <section id="code-review" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.sdlc.codeReview.title')}</h2>
                  <span className="capability-badge">{t('labs.sdlc.codeReview.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.sdlc.codeReview.challenge.title')}</h3>
                    <p>{t('labs.sdlc.codeReview.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.sdlc.codeReview.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeReview.demo.step1.title')}</h4>
                        <CodeBlock
                          code={`Review this codebase for:
- Security vulnerabilities
- Performance issues
- Code quality and maintainability
- Best practices violations
- Potential bugs

Provide specific recommendations with code examples.`}
                          language="text"
                          title={t('labs.sdlc.codeReview.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeReview.demo.step2.title')}</h4>
                        <p>{t('labs.sdlc.codeReview.demo.step2.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.sdlc.codeReview.demo.step2.item1')}</li>
                            <li>{t('labs.sdlc.codeReview.demo.step2.item2')}</li>
                            <li>{t('labs.sdlc.codeReview.demo.step2.item3')}</li>
                            <li>{t('labs.sdlc.codeReview.demo.step2.item4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.sdlc.codeReview.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.sdlc.codeReview.value.traditional.title')}</strong>
                        <p>{t('labs.sdlc.codeReview.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.sdlc.codeReview.value.withBob.title')}</strong>
                        <p>{t('labs.sdlc.codeReview.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.sdlc.codeReview.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Iterative Code Fixes */}
            <section id="code-fixes" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.sdlc.codeFixes.title')}</h2>
                  <span className="capability-badge">{t('labs.sdlc.codeFixes.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.sdlc.codeFixes.challenge.title')}</h3>
                    <p>{t('labs.sdlc.codeFixes.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.sdlc.codeFixes.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeFixes.demo.step1.title')}</h4>
                        <CodeBlock
                          code={`Fix all critical and high-severity issues found in the code review.
Apply fixes iteratively:
1. Fix security vulnerabilities first
2. Validate each fix doesn't break existing functionality
3. Fix performance issues
4. Refactor for code quality
5. Re-run analysis after each iteration until all issues resolved`}
                          language="text"
                          title={t('labs.sdlc.codeFixes.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.codeFixes.demo.step2.title')}</h4>
                        
                        <div className="result-box">
                          <h5>{t('labs.sdlc.codeFixes.demo.step2.iteration1.title')}</h5>
                          <ul>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration1.item1')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration1.item2')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration1.item3')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration1.item4')}</li>
                          </ul>
                        </div>

                        <div className="result-box">
                          <h5>{t('labs.sdlc.codeFixes.demo.step2.iteration2.title')}</h5>
                          <ul>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration2.item1')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration2.item2')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration2.item3')}</li>
                          </ul>
                        </div>

                        <div className="result-box">
                          <h5>{t('labs.sdlc.codeFixes.demo.step2.iteration3.title')}</h5>
                          <ul>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration3.item1')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration3.item2')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration3.item3')}</li>
                            <li>{t('labs.sdlc.codeFixes.demo.step2.iteration3.item4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.sdlc.codeFixes.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.sdlc.codeFixes.value.traditional.title')}</strong>
                        <p>{t('labs.sdlc.codeFixes.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.sdlc.codeFixes.value.withBob.title')}</strong>
                        <p>{t('labs.sdlc.codeFixes.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.sdlc.codeFixes.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Test Generation */}
            <section id="testing" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.sdlc.testing.title')}</h2>
                  <span className="capability-badge">{t('labs.sdlc.testing.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.sdlc.testing.challenge.title')}</h3>
                    <p>{t('labs.sdlc.testing.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.sdlc.testing.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.testing.demo.step1.title')}</h4>
                        <CodeBlock
                          code={`Generate comprehensive test suite:
- Unit tests for all business logic
- Integration tests for API endpoints
- Edge case and error handling tests
- Aim for >85% code coverage
- Use Jest and appropriate testing libraries`}
                          language="text"
                          title={t('labs.sdlc.testing.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.sdlc.testing.demo.step2.title')}</h4>
                        <p>{t('labs.sdlc.testing.demo.step2.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.sdlc.testing.demo.step2.item1')}</li>
                            <li>{t('labs.sdlc.testing.demo.step2.item2')}</li>
                            <li>{t('labs.sdlc.testing.demo.step2.item3')}</li>
                            <li>{t('labs.sdlc.testing.demo.step2.item4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.sdlc.testing.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.sdlc.testing.value.traditional.title')}</strong>
                        <p>{t('labs.sdlc.testing.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.sdlc.testing.value.withBob.title')}</strong>
                        <p>{t('labs.sdlc.testing.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.sdlc.testing.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">{t('labs.sdlc.summary.title')}</h2>

                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('labs.sdlc.summary.table.phase')}</th>
                        <th>{t('labs.sdlc.summary.table.traditional')}</th>
                        <th>{t('labs.sdlc.summary.table.withBob')}</th>
                        <th>{t('labs.sdlc.summary.table.savings')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('labs.sdlc.summary.table.row1.phase')}</td>
                        <td>{t('labs.sdlc.summary.table.row1.traditional')}</td>
                        <td>{t('labs.sdlc.summary.table.row1.withBob')}</td>
                        <td className="check">{t('labs.sdlc.summary.table.row1.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.sdlc.summary.table.row2.phase')}</td>
                        <td>{t('labs.sdlc.summary.table.row2.traditional')}</td>
                        <td>{t('labs.sdlc.summary.table.row2.withBob')}</td>
                        <td className="check">{t('labs.sdlc.summary.table.row2.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.sdlc.summary.table.row3.phase')}</td>
                        <td>{t('labs.sdlc.summary.table.row3.traditional')}</td>
                        <td>{t('labs.sdlc.summary.table.row3.withBob')}</td>
                        <td className="check">{t('labs.sdlc.summary.table.row3.savings')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.sdlc.summary.table.row4.phase')}</td>
                        <td>{t('labs.sdlc.summary.table.row4.traditional')}</td>
                        <td>{t('labs.sdlc.summary.table.row4.withBob')}</td>
                        <td className="check">{t('labs.sdlc.summary.table.row4.savings')}</td>
                      </tr>
                      <tr style={{ fontWeight: 600, background: 'var(--bg-alt)' }}>
                        <td><strong>{t('labs.sdlc.summary.table.total.phase')}</strong></td>
                        <td><strong>{t('labs.sdlc.summary.table.total.traditional')}</strong></td>
                        <td><strong>{t('labs.sdlc.summary.table.total.withBob')}</strong></td>
                        <td className="check"><strong>{t('labs.sdlc.summary.table.total.savings')}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-alt)', borderLeft: '4px solid var(--primary-color)' }}>
                  <h3>{t('labs.sdlc.summary.whyBob.title')}</h3>
                  <ul>
                    <li>{t('labs.sdlc.summary.whyBob.item1')}</li>
                    <li>{t('labs.sdlc.summary.whyBob.item2')}</li>
                    <li>{t('labs.sdlc.summary.whyBob.item3')}</li>
                    <li>{t('labs.sdlc.summary.whyBob.item4')}</li>
                  </ul>
                </div>

                <div className="cta-box">
                  <h3>{t('labs.sdlc.summary.cta.title')}</h3>
                  <p>{t('labs.sdlc.summary.cta.desc')}</p>
                  <div className="cta-buttons">
                    <a href="narrative.html" className="btn btn-primary">{t('labs.sdlc.summary.cta.button1')}</a>
                    <a href="walkthrough.html" className="btn btn-secondary">{t('labs.sdlc.summary.cta.button2')}</a>
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

export default SDLC;

// Made with Bob
