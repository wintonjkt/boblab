import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const SpecDrivenDevelopment: React.FC = () => {
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
          <h1>{t('labs.specDriven.title')}</h1>
          <p className="page-subtitle">{t('labs.specDriven.subtitle')}</p>
          <p className="page-description">{t('labs.specDriven.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.specDriven.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#introduction" className="capability-link">{t('labs.specDriven.nav.introduction')}</a>
            <a href="#what-is-spec-driven" className="capability-link">{t('labs.specDriven.nav.whatIsSpecDriven')}</a>
            <a href="#workflow" className="capability-link">{t('labs.specDriven.nav.workflow')}</a>
            <a href="#creating-specs" className="capability-link">{t('labs.specDriven.nav.creatingSpecs')}</a>
            <a href="#using-bob" className="capability-link">{t('labs.specDriven.nav.usingBob')}</a>
            <a href="#practical-example" className="capability-link">{t('labs.specDriven.nav.practicalExample')}</a>
            <a href="#organization" className="capability-link">{t('labs.specDriven.nav.organization')}</a>
            <a href="#tips" className="capability-link">{t('labs.specDriven.nav.tips')}</a>
            <a href="#pitfalls" className="capability-link">{t('labs.specDriven.nav.pitfalls')}</a>
            <a href="#conclusion" className="capability-link">{t('labs.specDriven.nav.conclusion')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Introduction */}
            <section id="introduction" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.specDriven.introduction.title')}</h2>
                  <p>{t('labs.specDriven.introduction.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.specDriven.introduction.capabilities.clearRequirements.title')}</h4>
                      <p>{t('labs.specDriven.introduction.capabilities.clearRequirements.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.specDriven.introduction.capabilities.reducedAmbiguity.title')}</h4>
                      <p>{t('labs.specDriven.introduction.capabilities.reducedAmbiguity.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.specDriven.introduction.capabilities.betterPlanning.title')}</h4>
                      <p>{t('labs.specDriven.introduction.capabilities.betterPlanning.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.specDriven.introduction.capabilities.livingDocumentation.title')}</h4>
                      <p>{t('labs.specDriven.introduction.capabilities.livingDocumentation.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.specDriven.introduction.estimatedTime')}</strong> {t('labs.specDriven.introduction.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* What is Spec-Driven Development */}
            <section id="what-is-spec-driven" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.specDriven.whatIsSpecDriven.title')}</h2>
                  <span className="capability-badge">{t('labs.specDriven.whatIsSpecDriven.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.specDriven.whatIsSpecDriven.definition.title')}</h3>
                    <p>{t('labs.specDriven.whatIsSpecDriven.definition.desc')}</p>
                  </div>

                  <div className="info-card">
                    <h3>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.title')}</h3>
                    <div className="best-practices-grid">
                      <div className="practice-card">
                        <h4>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.clarity.title')}</h4>
                        <p>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.clarity.desc')}</p>
                      </div>
                      <div className="practice-card">
                        <h4>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.efficiency.title')}</h4>
                        <p>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.efficiency.desc')}</p>
                      </div>
                      <div className="practice-card">
                        <h4>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.quality.title')}</h4>
                        <p>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.quality.desc')}</p>
                      </div>
                      <div className="practice-card">
                        <h4>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.collaboration.title')}</h4>
                        <p>{t('labs.specDriven.whatIsSpecDriven.keyBenefits.collaboration.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Spec-Driven Workflow */}
            <section id="workflow" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.specDriven.workflow.title')}</h2>
                  <span className="capability-badge">{t('labs.specDriven.workflow.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="demo-flow">
                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step1.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step1.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.workflow.step1.example.title')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.workflow.step1.example.item1')}</li>
                          <li>{t('labs.specDriven.workflow.step1.example.item2')}</li>
                          <li>{t('labs.specDriven.workflow.step1.example.item3')}</li>
                          <li>{t('labs.specDriven.workflow.step1.example.item4')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step2.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step2.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.workflow.step2.example.title')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.workflow.step2.example.item1')}</li>
                          <li>{t('labs.specDriven.workflow.step2.example.item2')}</li>
                          <li>{t('labs.specDriven.workflow.step2.example.item3')}</li>
                          <li>{t('labs.specDriven.workflow.step2.example.item4')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step3.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step3.desc')}</p>
                    </div>

                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step4.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step4.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.workflow.step4.example.title')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.workflow.step4.example.item1')}</li>
                          <li>{t('labs.specDriven.workflow.step4.example.item2')}</li>
                          <li>{t('labs.specDriven.workflow.step4.example.item3')}</li>
                          <li>{t('labs.specDriven.workflow.step4.example.item4')}</li>
                          <li>{t('labs.specDriven.workflow.step4.example.item5')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step5.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step5.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.workflow.step5.example.title')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.workflow.step5.example.item1')}</li>
                          <li>{t('labs.specDriven.workflow.step5.example.item2')}</li>
                          <li>{t('labs.specDriven.workflow.step5.example.item3')}</li>
                          <li>{t('labs.specDriven.workflow.step5.example.item4')}</li>
                          <li>{t('labs.specDriven.workflow.step5.example.item5')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-card">
                      <h3>{t('labs.specDriven.workflow.step6.title')}</h3>
                      <p>{t('labs.specDriven.workflow.step6.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.workflow.step6.example.title')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.workflow.step6.example.item1')}</li>
                          <li>{t('labs.specDriven.workflow.step6.example.item2')}</li>
                          <li>{t('labs.specDriven.workflow.step6.example.item3')}</li>
                          <li>{t('labs.specDriven.workflow.step6.example.item4')}</li>
                          <li>{t('labs.specDriven.workflow.step6.example.item5')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Creating Effective Specifications */}
            <section id="creating-specs" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.specDriven.creatingSpecs.title')}</h2>
                  <span className="capability-badge">{t('labs.specDriven.creatingSpecs.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.specDriven.creatingSpecs.objective.title')}</h3>
                    <p>{t('labs.specDriven.creatingSpecs.objective.desc')}</p>
                  </div>

                  <div className="guidelines-grid">
                    <div className="guideline-card">
                      <div className="guideline-icon">📝</div>
                      <h3>{t('labs.specDriven.creatingSpecs.clearLanguage.title')}</h3>
                      <p>{t('labs.specDriven.creatingSpecs.clearLanguage.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.creatingSpecs.clearLanguage.good')}</strong><br /><br />
                        <strong>{t('labs.specDriven.creatingSpecs.clearLanguage.bad')}</strong>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <div className="guideline-icon">👤</div>
                      <h3>{t('labs.specDriven.creatingSpecs.userStories.title')}</h3>
                      <p>{t('labs.specDriven.creatingSpecs.userStories.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.creatingSpecs.userStories.format')}</strong><br /><br />
                        <strong>{t('labs.specDriven.creatingSpecs.userStories.example')}</strong>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <div className="guideline-icon">✅</div>
                      <h3>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.title')}</h3>
                      <p>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.exampleTitle')}</strong>
                        <ul>
                          <li>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.item1')}</li>
                          <li>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.item2')}</li>
                          <li>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.item3')}</li>
                          <li>{t('labs.specDriven.creatingSpecs.acceptanceCriteria.item4')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <div className="guideline-icon">🎨</div>
                      <h3>{t('labs.specDriven.creatingSpecs.visualAids.title')}</h3>
                      <p>{t('labs.specDriven.creatingSpecs.visualAids.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Using Bob for Spec-Driven Development */}
            <section id="using-bob" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.specDriven.usingBob.title')}</h2>
                  <span className="capability-badge">{t('labs.specDriven.usingBob.badge')}</span>
                </div>

                <div className="capability-content">
                  <p>{t('labs.specDriven.usingBob.desc')}</p>

                  <h3>{t('labs.specDriven.usingBob.example.title')}</h3>
                  <CodeBlock
                    code={t('labs.specDriven.usingBob.example.code')}
                    language="text"
                    title={t('labs.specDriven.usingBob.example.codeTitle')}
                  />

                  <div className="info-card">
                    <h3>{t('labs.specDriven.usingBob.benefits.title')}</h3>
                    <ul>
                      <li>{t('labs.specDriven.usingBob.benefits.item1')}</li>
                      <li>{t('labs.specDriven.usingBob.benefits.item2')}</li>
                      <li>{t('labs.specDriven.usingBob.benefits.item3')}</li>
                      <li>{t('labs.specDriven.usingBob.benefits.item4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Spec File Organization */}
            <section id="organization" className="section section-alt">
              <div className="container">
                <h2>{t('labs.specDriven.organization.title')}</h2>
                <p>{t('labs.specDriven.organization.desc')}</p>

                <CodeBlock
                  code={`project-root/
├── spec.md              # Main specification
├── README.md            # Project overview
├── TODO.md              # Task tracking
├── ARCHITECTURE.md      # Architecture decisions
└── docs/
    ├── index.html       # Documentation landing page
    └── specs/           # Additional specifications
        ├── feature-a.md
        └── feature-b.md`}
                  language="text"
                  title={t('labs.specDriven.organization.codeTitle')}
                />
              </div>
            </section>

            {/* Tips for Success */}
            <section id="tips" className="section">
              <div className="container">
                <h2>{t('labs.specDriven.tips.title')}</h2>
                
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.tips.startSmall.title')}</h3>
                    <p>{t('labs.specDriven.tips.startSmall.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.tips.iterateOften.title')}</h3>
                    <p>{t('labs.specDriven.tips.iterateOften.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.tips.involveStakeholders.title')}</h3>
                    <p>{t('labs.specDriven.tips.involveStakeholders.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.tips.keepUpdated.title')}</h3>
                    <p>{t('labs.specDriven.tips.keepUpdated.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Pitfalls */}
            <section id="pitfalls" className="section section-alt">
              <div className="container">
                <h2>{t('labs.specDriven.pitfalls.title')}</h2>
                
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.pitfalls.tooVague.title')}</h3>
                    <p>{t('labs.specDriven.pitfalls.tooVague.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.pitfalls.tooDetailed.title')}</h3>
                    <p>{t('labs.specDriven.pitfalls.tooDetailed.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.pitfalls.outdatedSpecs.title')}</h3>
                    <p>{t('labs.specDriven.pitfalls.outdatedSpecs.desc')}</p>
                  </div>
                  
                  <div className="guideline-card">
                    <h3>{t('labs.specDriven.pitfalls.noValidation.title')}</h3>
                    <p>{t('labs.specDriven.pitfalls.noValidation.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section id="conclusion" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.specDriven.summary.title')}</h2>
                  <p>{t('labs.specDriven.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.specDriven.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.specDriven.summary.nextSteps.step1')}</li>
                      <li>{t('labs.specDriven.summary.nextSteps.step2')}</li>
                      <li>{t('labs.specDriven.summary.nextSteps.step3')}</li>
                      <li>{t('labs.specDriven.summary.nextSteps.step4')}</li>
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

export default SpecDrivenDevelopment;

// Made with Bob
