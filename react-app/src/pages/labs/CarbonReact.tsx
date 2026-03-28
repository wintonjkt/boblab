import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const CarbonReact: React.FC = () => {
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
          <h1>{t('labs.carbonReact.title')}</h1>
          <p className="page-subtitle">{t('labs.carbonReact.subtitle')}</p>
          <p className="page-description">{t('labs.carbonReact.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.carbonReact.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#introduction" className="capability-link">{t('labs.carbonReact.nav.introduction')}</a>
            <a href="#getting-started" className="capability-link">{t('labs.carbonReact.nav.gettingStarted')}</a>
            <a href="#component-specification" className="capability-link">{t('labs.carbonReact.nav.componentSpecification')}</a>
            <a href="#implementation" className="capability-link">{t('labs.carbonReact.nav.implementation')}</a>
            <a href="#best-practices" className="capability-link">{t('labs.carbonReact.nav.bestPractices')}</a>
            <a href="#examples" className="capability-link">{t('labs.carbonReact.nav.examples')}</a>
            <a href="#conclusion" className="capability-link">{t('labs.carbonReact.nav.conclusion')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Introduction */}
            <section id="introduction" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.carbonReact.introduction.title')}</h2>
                  <p>{t('labs.carbonReact.introduction.desc')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.carbonReact.introduction.capabilities.componentLibrary.title')}</h4>
                      <p>{t('labs.carbonReact.introduction.capabilities.componentLibrary.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.carbonReact.introduction.capabilities.designTokens.title')}</h4>
                      <p>{t('labs.carbonReact.introduction.capabilities.designTokens.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.carbonReact.introduction.capabilities.accessibilityFirst.title')}</h4>
                      <p>{t('labs.carbonReact.introduction.capabilities.accessibilityFirst.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.carbonReact.introduction.capabilities.responsiveDesign.title')}</h4>
                      <p>{t('labs.carbonReact.introduction.capabilities.responsiveDesign.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.carbonReact.introduction.estimatedTime')}</strong> {t('labs.carbonReact.introduction.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.carbonReact.gettingStarted.title')}</h2>
                  <span className="capability-badge">{t('labs.carbonReact.gettingStarted.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.carbonReact.gettingStarted.objective.title')}</h3>
                    <p>{t('labs.carbonReact.gettingStarted.objective.desc')}</p>
                  </div>

                  <h3>{t('labs.carbonReact.gettingStarted.installation.title')}</h3>
                  <CodeBlock
                    code={`npm install @carbon/react
# or
yarn add @carbon/react`}
                    language="bash"
                    title={t('labs.carbonReact.gettingStarted.installation.codeTitle')}
                  />

                  <h3>{t('labs.carbonReact.gettingStarted.setup.title')}</h3>
                  <CodeBlock
                    code={`import '@carbon/react/scss/styles.scss';
// or for specific theme
import '@carbon/react/scss/themes/g10.scss';`}
                    language="javascript"
                    title={t('labs.carbonReact.gettingStarted.setup.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Component Specification */}
            <section id="component-specification" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.carbonReact.componentSpecification.title')}</h2>
                  <span className="capability-badge">{t('labs.carbonReact.componentSpecification.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.carbonReact.componentSpecification.objective.title')}</h3>
                    <p>{t('labs.carbonReact.componentSpecification.objective.desc')}</p>
                  </div>

                  <h3>{t('labs.carbonReact.componentSpecification.example.title')}</h3>
                  <CodeBlock
                    code={`Create a user profile form with:
- Grid layout (16 columns)
- TextInput for name and email
- Dropdown for department
- DatePicker for join date
- Button group (Save/Cancel)
- Use Carbon spacing tokens
- Implement form validation`}
                    language="text"
                    title={t('labs.carbonReact.componentSpecification.example.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Implementation Process */}
            <section id="implementation" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.carbonReact.implementation.title')}</h2>
                  <span className="capability-badge">{t('labs.carbonReact.implementation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.carbonReact.implementation.objective.title')}</h3>
                    <p>{t('labs.carbonReact.implementation.objective.desc')}</p>
                  </div>

                  <div className="step-card">
                    <h3>{t('labs.carbonReact.implementation.step1.title')}</h3>
                    <p>{t('labs.carbonReact.implementation.step1.desc')}</p>
                    <CodeBlock
                      code={`Header: Header (fixed position)
Navigation: HeaderNavigation
Content: Grid + Row + Column
Form: Form with TextInput, Button, etc.
Footer: Footer (simple)`}
                      language="text"
                      title={t('labs.carbonReact.implementation.step1.codeTitle')}
                    />
                  </div>

                  <div className="step-card">
                    <h3>{t('labs.carbonReact.implementation.step2.title')}</h3>
                    <p>{t('labs.carbonReact.implementation.step2.desc')}</p>
                    <CodeBlock
                      code={`1. Set up the basic layout structure
2. Add major components (Header, Footer)
3. Implement the main content area
4. Add interactive elements
5. Apply responsive design
6. Refine spacing and styling`}
                      language="text"
                      title={t('labs.carbonReact.implementation.step2.codeTitle')}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.carbonReact.bestPractices.title')}</h2>
                  <span className="capability-badge">{t('labs.carbonReact.bestPractices.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="guidelines-grid">
                    <div className="guideline-card">
                      <h3>{t('labs.carbonReact.bestPractices.startWithLayout.title')}</h3>
                      <p>{t('labs.carbonReact.bestPractices.startWithLayout.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.carbonReact.bestPractices.startWithLayout.example')}</strong>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <h3>{t('labs.carbonReact.bestPractices.useCarbonProps.title')}</h3>
                      <p>{t('labs.carbonReact.bestPractices.useCarbonProps.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.carbonReact.bestPractices.useCarbonProps.good')}</strong><br />
                        <strong>{t('labs.carbonReact.bestPractices.useCarbonProps.bad')}</strong>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <h3>{t('labs.carbonReact.bestPractices.designTokens.title')}</h3>
                      <p>{t('labs.carbonReact.bestPractices.designTokens.desc')}</p>
                      <div className="example-box">
                        <strong>{t('labs.carbonReact.bestPractices.designTokens.example')}</strong>
                      </div>
                    </div>

                    <div className="guideline-card">
                      <h3>{t('labs.carbonReact.bestPractices.themeSupport.title')}</h3>
                      <p>{t('labs.carbonReact.bestPractices.themeSupport.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="section section-alt">
              <div className="container">
                <h2>{t('labs.carbonReact.examples.title')}</h2>
                
                <CodeBlock
                  code={`import { Grid, Column, TextInput, Button, Form } from '@carbon/react';

function UserForm() {
  return (
    <Grid>
      <Column lg={8} md={6} sm={4}>
        <Form>
          <TextInput
            id="name"
            labelText="Name"
            placeholder="Enter your name"
          />
          <TextInput
            id="email"
            labelText="Email"
            type="email"
            placeholder="Enter your email"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Column>
    </Grid>
  );
}`}
                  language="jsx"
                  title={t('labs.carbonReact.examples.codeTitle')}
                />
              </div>
            </section>

            {/* Summary */}
            <section id="conclusion" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.carbonReact.summary.title')}</h2>
                  <p>{t('labs.carbonReact.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.carbonReact.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.carbonReact.summary.nextSteps.step1')}</li>
                      <li>{t('labs.carbonReact.summary.nextSteps.step2')}</li>
                      <li>{t('labs.carbonReact.summary.nextSteps.step3')}</li>
                      <li>{t('labs.carbonReact.summary.nextSteps.step4')}</li>
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

export default CarbonReact;

// Made with Bob
