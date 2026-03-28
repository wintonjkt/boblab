import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const IBMi: React.FC = () => {
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
          <h1>{t('labs.ibmi.title')}</h1>
          <p className="page-subtitle">{t('labs.ibmi.subtitle')}</p>
          <p className="page-description">{t('labs.ibmi.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.ibmi.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.ibmi.nav.overview')}</a>
            <a href="#codebase-analysis" className="capability-link">{t('labs.ibmi.nav.codebaseAnalysis')}</a>
            <a href="#qa-codebase" className="capability-link">{t('labs.ibmi.nav.qaCod ebase')}</a>
            <a href="#modernization" className="capability-link">{t('labs.ibmi.nav.modernization')}</a>
            <a href="#transformation" className="capability-link">{t('labs.ibmi.nav.transformation')}</a>
            <a href="#results" className="capability-link">{t('labs.ibmi.nav.results')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.ibmi.overview.title')}</h2>
                  <p>{t('labs.ibmi.overview.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.ibmi.overview.capabilities.codebaseAnalysis.title')}</h4>
                      <p>{t('labs.ibmi.overview.capabilities.codebaseAnalysis.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.ibmi.overview.capabilities.intelligentQA.title')}</h4>
                      <p>{t('labs.ibmi.overview.capabilities.intelligentQA.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.ibmi.overview.capabilities.modernizationPlanning.title')}</h4>
                      <p>{t('labs.ibmi.overview.capabilities.modernizationPlanning.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.ibmi.overview.capabilities.codeTransformation.title')}</h4>
                      <p>{t('labs.ibmi.overview.capabilities.codeTransformation.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.ibmi.overview.estimatedTime')}</strong> {t('labs.ibmi.overview.timeValue')}</p>
                  
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #0f62fe 0%, #0353e9 100%)', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>📦 {t('labs.ibmi.overview.downloadTitle')}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 1rem 0' }}>{t('labs.ibmi.overview.downloadDesc')}</p>
                    <a 
                      href="../samples/GenApp_SRC.zip" 
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
                      {t('labs.ibmi.overview.downloadButton')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Codebase Analysis */}
            <section id="codebase-analysis" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.ibmi.codebaseAnalysis.title')}</h2>
                  <span className="capability-badge">{t('labs.ibmi.codebaseAnalysis.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.ibmi.codebaseAnalysis.objective.title')}</h3>
                    <p>{t('labs.ibmi.codebaseAnalysis.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.ibmi.codebaseAnalysis.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.ibmi.codebaseAnalysis.demo.step1.title')}</h4>
                        <CodeBlock
                          code={t('labs.ibmi.codebaseAnalysis.demo.step1.code')}
                          language="text"
                          title={t('labs.ibmi.codebaseAnalysis.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.ibmi.codebaseAnalysis.demo.step2.title')}</h4>
                        <p>{t('labs.ibmi.codebaseAnalysis.demo.step2.desc')}</p>
                        <div className="result-box">
                          <h4>{t('labs.ibmi.codebaseAnalysis.demo.step2.resultTitle')}</h4>
                          <ul>
                            <li><strong>{t('labs.ibmi.codebaseAnalysis.demo.step2.item1.title')}</strong> {t('labs.ibmi.codebaseAnalysis.demo.step2.item1.desc')}</li>
                            <li><strong>{t('labs.ibmi.codebaseAnalysis.demo.step2.item2.title')}</strong> {t('labs.ibmi.codebaseAnalysis.demo.step2.item2.desc')}</li>
                            <li><strong>{t('labs.ibmi.codebaseAnalysis.demo.step2.item3.title')}</strong> {t('labs.ibmi.codebaseAnalysis.demo.step2.item3.desc')}</li>
                            <li><strong>{t('labs.ibmi.codebaseAnalysis.demo.step2.item4.title')}</strong> {t('labs.ibmi.codebaseAnalysis.demo.step2.item4.desc')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.ibmi.codebaseAnalysis.demo.step3.title')}</h4>
                        <p>{t('labs.ibmi.codebaseAnalysis.demo.step3.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.ibmi.codebaseAnalysis.demo.step4.title')}</h4>
                        <CodeBlock
                          code={`Architecture Pattern: 3-Tier Layered Architecture

Presentation Layer (5250 Screens)
    ↓
Business Logic Layer (COBOL Programs)
    ├── Customer Services (LGACUS01, LGICUS01, LGUCUS01)
    ├── Policy Services (LGAPOL01, LGIPOL01, LGUPOL01, LGDPOL01)
    ├── Validation Services (LGACVS01, LGIPVS01, LGUPVS01)
    └── Web Services (LGWEBST5)
    ↓
Data Access Layer (Database Programs)
    ├── Customer DB (LGACDB01, LGICDB01, LGUCDB01)
    ├── Policy DB (LGAPDB01, LGIPDB01, LGUPDB01, LGDPDB01)
    └── Validation DB (LGACVS01, LGIPVS01, LGUPVS01)
    ↓
Database Layer (DB2 for i)
    ├── CUSTOMER table
    ├── POLICY table
    ├── CLAIMS table
    ├── ENDOWMENT table
    └── MOTOR table`}
                          language="text"
                          title={t('labs.ibmi.codebaseAnalysis.demo.step4.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>{t('labs.ibmi.codebaseAnalysis.demo.step5.title')}</h4>
                        <CodeBlock
                          code={`-- CUSTOMER Table
CREATE TABLE CUSTOMER (
    CUSTOMER_NUM     DECIMAL(10,0) NOT NULL PRIMARY KEY,
    CUSTOMER_NAME    CHAR(60),
    CUSTOMER_ADDRESS CHAR(160),
    DATE_OF_BIRTH    DATE,
    HOUSE_NAME       CHAR(20),
    HOUSE_NUM        CHAR(4),
    POSTCODE         CHAR(8)
);

-- POLICY Table
CREATE TABLE POLICY (
    POLICY_NUM       DECIMAL(10,0) NOT NULL PRIMARY KEY,
    CUSTOMER_NUM     DECIMAL(10,0) NOT NULL,
    ISSUE_DATE       DATE,
    EXPIRY_DATE      DATE,
    POLICY_TYPE      CHAR(1),
    LAST_CHANGED     TIMESTAMP,
    BROKER_ID        DECIMAL(6,0),
    FOREIGN KEY (CUSTOMER_NUM) REFERENCES CUSTOMER(CUSTOMER_NUM)
);`}
                          language="sql"
                          title={t('labs.ibmi.codebaseAnalysis.demo.step5.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.ibmi.codebaseAnalysis.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.ibmi.codebaseAnalysis.value.traditional.title')}</strong>
                        <p>{t('labs.ibmi.codebaseAnalysis.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.ibmi.codebaseAnalysis.value.withBob.title')}</strong>
                        <p>{t('labs.ibmi.codebaseAnalysis.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.ibmi.codebaseAnalysis.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Q&A with Codebase */}
            <section id="qa-codebase" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.ibmi.qaCod ebase.title')}</h2>
                  <span className="capability-badge">{t('labs.ibmi.qaCodebase.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.ibmi.qaCodebase.objective.title')}</h3>
                    <p>{t('labs.ibmi.qaCodebase.objective.desc')}</p>
                  </div>

                  <p>{t('labs.ibmi.qaCodebase.desc')}</p>

                  <div className="demo-flow">
                    <h3>{t('labs.ibmi.qaCodebase.examplesTitle')}</h3>
                    
                    <div className="step-item">
                      <div className="step-content">
                        <h4>{t('labs.ibmi.qaCodebase.example1.question')}</h4>
                        <div className="result-box">
                          <p>{t('labs.ibmi.qaCodebase.example1.answer')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-content">
                        <h4>{t('labs.ibmi.qaCodebase.example2.question')}</h4>
                        <div className="result-box">
                          <p>{t('labs.ibmi.qaCodebase.example2.answer')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-content">
                        <h4>{t('labs.ibmi.qaCodebase.example3.question')}</h4>
                        <div className="result-box">
                          <p>{t('labs.ibmi.qaCodebase.example3.answer')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Modernization Planning */}
            <section id="modernization" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.ibmi.modernization.title')}</h2>
                  <span className="capability-badge">{t('labs.ibmi.modernization.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.ibmi.modernization.objective.title')}</h3>
                    <p>{t('labs.ibmi.modernization.objective.desc')}</p>
                  </div>

                  <CodeBlock
                    code={t('labs.ibmi.modernization.prompt.code')}
                    language="text"
                    title={t('labs.ibmi.modernization.prompt.codeTitle')}
                  />

                  <div className="result-box">
                    <h4>{t('labs.ibmi.modernization.result.title')}</h4>
                    <ul>
                      <li>{t('labs.ibmi.modernization.result.item1')}</li>
                      <li>{t('labs.ibmi.modernization.result.item2')}</li>
                      <li>{t('labs.ibmi.modernization.result.item3')}</li>
                      <li>{t('labs.ibmi.modernization.result.item4')}</li>
                      <li>{t('labs.ibmi.modernization.result.item5')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Transformation */}
            <section id="transformation" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.ibmi.transformation.title')}</h2>
                  <span className="capability-badge">{t('labs.ibmi.transformation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.ibmi.transformation.objective.title')}</h3>
                    <p>{t('labs.ibmi.transformation.objective.desc')}</p>
                  </div>

                  <CodeBlock
                    code={t('labs.ibmi.transformation.prompt.code')}
                    language="text"
                    title={t('labs.ibmi.transformation.prompt.codeTitle')}
                  />

                  <p>{t('labs.ibmi.transformation.result.desc')}</p>
                </div>
              </div>
            </section>

            {/* Results & Summary */}
            <section id="results" className="section section-alt">
              <div className="container">
                <h2>{t('labs.ibmi.results.title')}</h2>

                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('labs.ibmi.results.table.aspect')}</th>
                        <th>{t('labs.ibmi.results.table.before')}</th>
                        <th>{t('labs.ibmi.results.table.after')}</th>
                        <th>{t('labs.ibmi.results.table.benefit')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('labs.ibmi.results.table.row1.aspect')}</td>
                        <td>{t('labs.ibmi.results.table.row1.before')}</td>
                        <td>{t('labs.ibmi.results.table.row1.after')}</td>
                        <td className="check">{t('labs.ibmi.results.table.row1.benefit')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.ibmi.results.table.row2.aspect')}</td>
                        <td>{t('labs.ibmi.results.table.row2.before')}</td>
                        <td>{t('labs.ibmi.results.table.row2.after')}</td>
                        <td className="check">{t('labs.ibmi.results.table.row2.benefit')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.ibmi.results.table.row3.aspect')}</td>
                        <td>{t('labs.ibmi.results.table.row3.before')}</td>
                        <td>{t('labs.ibmi.results.table.row3.after')}</td>
                        <td className="check">{t('labs.ibmi.results.table.row3.benefit')}</td>
                      </tr>
                      <tr>
                        <td>{t('labs.ibmi.results.table.row4.aspect')}</td>
                        <td>{t('labs.ibmi.results.table.row4.before')}</td>
                        <td>{t('labs.ibmi.results.table.row4.after')}</td>
                        <td className="check">{t('labs.ibmi.results.table.row4.benefit')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="info-card compliance">
                  <h3>{t('labs.ibmi.results.whyBob.title')}</h3>
                  <ul>
                    <li>{t('labs.ibmi.results.whyBob.item1')}</li>
                    <li>{t('labs.ibmi.results.whyBob.item2')}</li>
                    <li>{t('labs.ibmi.results.whyBob.item3')}</li>
                    <li>{t('labs.ibmi.results.whyBob.item4')}</li>
                    <li>{t('labs.ibmi.results.whyBob.item5')}</li>
                  </ul>
                </div>

                <div className="cta-box">
                  <h3>{t('labs.ibmi.results.cta.title')}</h3>
                  <p>{t('labs.ibmi.results.cta.desc')}</p>
                  <div className="cta-buttons">
                    <a href="../index.html" className="btn btn-primary">{t('labs.ibmi.results.cta.button1')}</a>
                    <a href="appmod.html" className="btn btn-secondary">{t('labs.ibmi.results.cta.button2')}</a>
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

export default IBMi;

// Made with Bob
