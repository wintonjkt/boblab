import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const Cobol2Java: React.FC = () => {
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
          <h1>{t('labs.cobol2Java.title')}</h1>
          <p className="page-subtitle">{t('labs.cobol2Java.subtitle')}</p>
          <p className="page-description">{t('labs.cobol2Java.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.cobol2Java.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.cobol2Java.nav.overview')}</a>
            <a href="#sample-downloads" className="capability-link">{t('labs.cobol2Java.nav.sampleDownloads')}</a>
            <a href="#understand-cobol" className="capability-link">{t('labs.cobol2Java.nav.understandCobol')}</a>
            <a href="#convert-java" className="capability-link">{t('labs.cobol2Java.nav.convertJava')}</a>
            <a href="#create-tests" className="capability-link">{t('labs.cobol2Java.nav.createTests')}</a>
            <a href="#build-ui" className="capability-link">{t('labs.cobol2Java.nav.buildUI')}</a>
            <a href="#rest-api" className="capability-link">{t('labs.cobol2Java.nav.restAPI')}</a>
            <a href="#success-criteria" className="capability-link">{t('labs.cobol2Java.nav.successCriteria')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <h2>{t('labs.cobol2Java.overview.title')}</h2>
                <div className="capability-content">
                  <p>{t('labs.cobol2Java.overview.desc')}</p>
                  <p><strong>{t('labs.cobol2Java.overview.duration')}</strong> {t('labs.cobol2Java.overview.durationValue')}</p>
                  <p><strong>{t('labs.cobol2Java.overview.difficulty')}</strong> {t('labs.cobol2Java.overview.difficultyValue')}</p>
                  <p><strong>{t('labs.cobol2Java.overview.whatYouBuild')}</strong> {t('labs.cobol2Java.overview.whatYouBuildValue')}</p>
                </div>
              </div>
            </section>

            {/* Sample Code Downloads */}
            <section id="sample-downloads" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">0</span>
                  <h2>{t('labs.cobol2Java.sampleDownloads.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.sampleDownloads.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.cobol2Java.sampleDownloads.desc')}</p>
                  
                  <div className="download-grid">
                    <div className="download-card">
                      <h3>{t('labs.cobol2Java.sampleDownloads.helloWorld.title')}</h3>
                      <p>{t('labs.cobol2Java.sampleDownloads.helloWorld.desc')}</p>
                      <a href="../samples/hello.cob" download className="download-button btn btn-secondary">
                        {t('labs.cobol2Java.sampleDownloads.helloWorld.button')}
                      </a>
                    </div>
                    
                    <div className="download-card">
                      <h3>{t('labs.cobol2Java.sampleDownloads.customerRecords.title')}</h3>
                      <p>{t('labs.cobol2Java.sampleDownloads.customerRecords.desc')}</p>
                      <a href="../samples/customer-records.cob" download className="download-button btn btn-secondary">
                        {t('labs.cobol2Java.sampleDownloads.customerRecords.button')}
                      </a>
                    </div>
                    
                    <div className="download-card">
                      <h3>{t('labs.cobol2Java.sampleDownloads.javaHelloWorld.title')}</h3>
                      <p>{t('labs.cobol2Java.sampleDownloads.javaHelloWorld.desc')}</p>
                      <a href="../samples/HelloWorld.java" download className="download-button btn btn-secondary">
                        {t('labs.cobol2Java.sampleDownloads.javaHelloWorld.button')}
                      </a>
                    </div>
                    
                    <div className="download-card">
                      <h3>{t('labs.cobol2Java.sampleDownloads.javaCustomerRecords.title')}</h3>
                      <p>{t('labs.cobol2Java.sampleDownloads.javaCustomerRecords.desc')}</p>
                      <a href="../samples/CustomerRecords.java" download className="download-button btn btn-secondary">
                        {t('labs.cobol2Java.sampleDownloads.javaCustomerRecords.button')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Understand COBOL Code */}
            <section id="understand-cobol" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.cobol2Java.understandCobol.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.understandCobol.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.cobol2Java.understandCobol.whyThisStep.title')}</h3>
                  <p>{t('labs.cobol2Java.understandCobol.whyThisStep.desc')}</p>

                  <h3>{t('labs.cobol2Java.understandCobol.promptForBob.title')}</h3>
                  <CodeBlock
                    code={t('labs.cobol2Java.understandCobol.promptForBob.code')}
                    language="text"
                    title={t('labs.cobol2Java.understandCobol.promptForBob.codeTitle')}
                  />

                  <h3>{t('labs.cobol2Java.understandCobol.whatToLookFor.title')}</h3>
                  <ul>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item1')}</li>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item2')}</li>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item3')}</li>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item4')}</li>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item5')}</li>
                    <li>{t('labs.cobol2Java.understandCobol.whatToLookFor.item6')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Convert to Java */}
            <section id="convert-java" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.cobol2Java.convertJava.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.convertJava.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.cobol2Java.convertJava.whyThisStep.title')}</h3>
                  <p>{t('labs.cobol2Java.convertJava.whyThisStep.desc')}</p>
                  <ul>
                    <li>{t('labs.cobol2Java.convertJava.whyThisStep.item1')}</li>
                    <li>{t('labs.cobol2Java.convertJava.whyThisStep.item2')}</li>
                    <li>{t('labs.cobol2Java.convertJava.whyThisStep.item3')}</li>
                    <li>{t('labs.cobol2Java.convertJava.whyThisStep.item4')}</li>
                  </ul>

                  <h3>{t('labs.cobol2Java.convertJava.promptForBob.title')}</h3>
                  <CodeBlock
                    code={t('labs.cobol2Java.convertJava.promptForBob.code')}
                    language="text"
                    title={t('labs.cobol2Java.convertJava.promptForBob.codeTitle')}
                  />

                  <h3>{t('labs.cobol2Java.convertJava.conversionPatterns.title')}</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid var(--color-border)' }}>{t('labs.cobol2Java.convertJava.conversionPatterns.cobol')}</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid var(--color-border)' }}>{t('labs.cobol2Java.convertJava.conversionPatterns.java')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>PIC S9(9)V99 COMP</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>BigDecimal</code> with scale 2</td>
                      </tr>
                      <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>PIC XX</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>String</code> or custom enum</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>FUNCTION ANNUITY</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Custom annuity formula</td>
                      </tr>
                      <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>UNSTRING ... DELIMITED BY</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>String.split()</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Create Tests */}
            <section id="create-tests" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.cobol2Java.createTests.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.createTests.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.cobol2Java.createTests.whyThisStep.title')}</h3>
                  <p>{t('labs.cobol2Java.createTests.whyThisStep.desc')}</p>

                  <h3>{t('labs.cobol2Java.createTests.promptForBob.title')}</h3>
                  <CodeBlock
                    code={t('labs.cobol2Java.createTests.promptForBob.code')}
                    language="text"
                    title={t('labs.cobol2Java.createTests.promptForBob.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Build UI (Optional) */}
            <section id="build-ui" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.cobol2Java.buildUI.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.buildUI.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.cobol2Java.buildUI.desc')}</p>

                  <CodeBlock
                    code={t('labs.cobol2Java.buildUI.promptForBob.code')}
                    language="text"
                    title={t('labs.cobol2Java.buildUI.promptForBob.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* REST API (Optional) */}
            <section id="rest-api" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">5</span>
                  <h2>{t('labs.cobol2Java.restAPI.title')}</h2>
                  <span className="capability-badge">{t('labs.cobol2Java.restAPI.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.cobol2Java.restAPI.desc')}</p>

                  <CodeBlock
                    code={t('labs.cobol2Java.restAPI.promptForBob.code')}
                    language="text"
                    title={t('labs.cobol2Java.restAPI.promptForBob.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Success Criteria */}
            <section id="success-criteria" className="section">
              <div className="container">
                <h2>{t('labs.cobol2Java.successCriteria.title')}</h2>
                <div className="info-card compliance">
                  <h3>{t('labs.cobol2Java.successCriteria.subtitle')}</h3>
                  <ul>
                    <li>{t('labs.cobol2Java.successCriteria.item1')}</li>
                    <li>{t('labs.cobol2Java.successCriteria.item2')}</li>
                    <li>{t('labs.cobol2Java.successCriteria.item3')}</li>
                    <li>{t('labs.cobol2Java.successCriteria.item4')}</li>
                    <li>{t('labs.cobol2Java.successCriteria.item5')}</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cobol2Java;

// Made with Bob
