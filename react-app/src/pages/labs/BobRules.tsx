import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const BobRules: React.FC = () => {
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
          <h1>{t('labs.bobRules.title')}</h1>
          <p className="page-subtitle">{t('labs.bobRules.subtitle')}</p>
          <p className="page-description">{t('labs.bobRules.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        {/* Sidebar Navigation */}
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.bobRules.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#introduction" className="capability-link">{t('labs.bobRules.nav.introduction')}</a>
            <a href="#what-are-rules" className="capability-link">{t('labs.bobRules.nav.whatAreRules')}</a>
            <a href="#adding-rules" className="capability-link">{t('labs.bobRules.nav.addingRules')}</a>
            <a href="#rule-scopes" className="capability-link">{t('labs.bobRules.nav.ruleScopes')}</a>
            <a href="#configuration-methods" className="capability-link">{t('labs.bobRules.nav.configurationMethods')}</a>
            <a href="#rule-priority" className="capability-link">{t('labs.bobRules.nav.rulePriority')}</a>
            <a href="#writing-effective-rules" className="capability-link">{t('labs.bobRules.nav.writingEffectiveRules')}</a>
            <a href="#advanced-configuration" className="capability-link">{t('labs.bobRules.nav.advancedConfiguration')}</a>
            <a href="#team-standardization" className="capability-link">{t('labs.bobRules.nav.teamStandardization')}</a>
          </nav>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Introduction Section */}
            <section id="introduction" className="section">
              <div className="container">
                <div className="capability-content">
                  <h2>{t('labs.bobRules.introduction.title')}</h2>
                  <p>{t('labs.bobRules.introduction.desc')}</p>
                  <p><strong>{t('labs.bobRules.introduction.estimatedTime')}</strong> {t('labs.bobRules.introduction.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* What Are Custom Rules Section */}
            <section id="what-are-rules" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.bobRules.whatAreRules.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.whatAreRules.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.bobRules.whatAreRules.desc')}</p>
                  
                  <h3>{t('labs.bobRules.whatAreRules.commonUses.title')}</h3>
                  <ul>
                    <li><strong>{t('labs.bobRules.whatAreRules.commonUses.item1.title')}</strong> {t('labs.bobRules.whatAreRules.commonUses.item1.desc')}</li>
                    <li><strong>{t('labs.bobRules.whatAreRules.commonUses.item2.title')}</strong> {t('labs.bobRules.whatAreRules.commonUses.item2.desc')}</li>
                    <li><strong>{t('labs.bobRules.whatAreRules.commonUses.item3.title')}</strong> {t('labs.bobRules.whatAreRules.commonUses.item3.desc')}</li>
                    <li><strong>{t('labs.bobRules.whatAreRules.commonUses.item4.title')}</strong> {t('labs.bobRules.whatAreRules.commonUses.item4.desc')}</li>
                    <li><strong>{t('labs.bobRules.whatAreRules.commonUses.item5.title')}</strong> {t('labs.bobRules.whatAreRules.commonUses.item5.desc')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Adding Custom Rules Section */}
            <section id="adding-rules" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.bobRules.addingRules.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.addingRules.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.bobRules.addingRules.desc')}</p>
                  
                  <div className="demo-flow">
                    <h3>{t('labs.bobRules.addingRules.stepsTitle')}</h3>
                    
                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step1.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step1.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step2.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step2.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step3.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step3.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step4.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step4.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step5.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step5.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">6</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step6.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step6.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="step-item">
                      <div className="step-number">7</div>
                      <div className="step-content">
                        <h4>{t('labs.bobRules.addingRules.step7.title')}</h4>
                        <p>{t('labs.bobRules.addingRules.step7.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Rule Scopes Section */}
            <section id="rule-scopes" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.bobRules.ruleScopes.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.ruleScopes.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.bobRules.ruleScopes.desc')}</p>
                  
                  <h3>{t('labs.bobRules.ruleScopes.global.title')}</h3>
                  <p>{t('labs.bobRules.ruleScopes.global.desc')}</p>
                  <ul>
                    <li>{t('labs.bobRules.ruleScopes.global.item1')}</li>
                    <li>{t('labs.bobRules.ruleScopes.global.item2')}</li>
                    <li>{t('labs.bobRules.ruleScopes.global.item3')}</li>
                  </ul>
                  
                  <h3>{t('labs.bobRules.ruleScopes.workspace.title')}</h3>
                  <p>{t('labs.bobRules.ruleScopes.workspace.desc')}</p>
                  <ul>
                    <li>{t('labs.bobRules.ruleScopes.workspace.item1')}</li>
                    <li>{t('labs.bobRules.ruleScopes.workspace.item2')}</li>
                    <li>{t('labs.bobRules.ruleScopes.workspace.item3')}</li>
                  </ul>
                  
                  <h3>{t('labs.bobRules.ruleScopes.whenToUse.title')}</h3>
                  <ul>
                    <li><strong>{t('labs.bobRules.ruleScopes.whenToUse.global.title')}</strong> {t('labs.bobRules.ruleScopes.whenToUse.global.desc')}</li>
                    <li><strong>{t('labs.bobRules.ruleScopes.whenToUse.workspace.title')}</strong> {t('labs.bobRules.ruleScopes.whenToUse.workspace.desc')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Configuration Methods Section */}
            <section id="configuration-methods" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.bobRules.configurationMethods.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.configurationMethods.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.bobRules.configurationMethods.desc')}</p>
                  
                  <h3>{t('labs.bobRules.configurationMethods.fileBased.title')}</h3>
                  <p>{t('labs.bobRules.configurationMethods.fileBased.desc')}</p>
                  
                  <CodeBlock
                    code={`.bobrules              # General rules for all modes
.bobrules-code         # Rules specific to Code mode
.bobrules-{modeSlug}   # Rules for any specific mode`}
                    language="plaintext"
                    title={t('labs.bobRules.configurationMethods.fileBased.codeTitle')}
                  />
                  
                  <h3>{t('labs.bobRules.configurationMethods.directoryBased.title')}</h3>
                  <p>{t('labs.bobRules.configurationMethods.directoryBased.desc')}</p>
                  
                  <CodeBlock
                    code={`.bob/rules/            # Workspace rules directory
~/.bob/rules/          # Global rules directory`}
                    language="plaintext"
                    title={t('labs.bobRules.configurationMethods.directoryBased.codeTitle')}
                  />
                  
                  <h3>{t('labs.bobRules.configurationMethods.creating.title')}</h3>
                  <p>{t('labs.bobRules.configurationMethods.creating.desc')}</p>
                  
                  <CodeBlock
                    code={`# Create a general rules file
echo "Always use TypeScript for new files" > .bobrules

# Create a Code mode specific rules file
echo "Follow the project's ESLint configuration" > .bobrules-code`}
                    language="bash"
                    title={t('labs.bobRules.configurationMethods.creating.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Rule Priority Section */}
            <section id="rule-priority" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">5</span>
                  <h2>{t('labs.bobRules.rulePriority.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.rulePriority.badge')}</span>
                </div>
                <div className="capability-content">
                  <p>{t('labs.bobRules.rulePriority.desc')}</p>
                  
                  <ol>
                    <li>{t('labs.bobRules.rulePriority.item1')}</li>
                    <li>{t('labs.bobRules.rulePriority.item2')}</li>
                  </ol>
                  
                  <p>{t('labs.bobRules.rulePriority.withinScope')}</p>
                  <ul>
                    <li>{t('labs.bobRules.rulePriority.example1')}</li>
                    <li>{t('labs.bobRules.rulePriority.example2')}</li>
                  </ul>
                  
                  <div className="info-card info">
                    <h3>{t('labs.bobRules.rulePriority.keyPoint.title')}</h3>
                    <p>{t('labs.bobRules.rulePriority.keyPoint.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Writing Effective Rules Section */}
            <section id="writing-effective-rules" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">6</span>
                  <h2>{t('labs.bobRules.writingEffectiveRules.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.writingEffectiveRules.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.bobRules.writingEffectiveRules.beSpecific.title')}</h3>
                  <p>{t('labs.bobRules.writingEffectiveRules.beSpecific.desc')}</p>
                  
                  <div className="demo-flow">
                    <h4>{t('labs.bobRules.writingEffectiveRules.badExample.title')}</h4>
                    <CodeBlock
                      code="Write good code"
                      language="plaintext"
                      title={t('labs.bobRules.writingEffectiveRules.badExample.codeTitle')}
                    />
                    
                    <h4>{t('labs.bobRules.writingEffectiveRules.goodExample.title')}</h4>
                    <CodeBlock
                      code={`Use camelCase for variable names and PascalCase for class names. 
Add JSDoc comments for all public functions.`}
                      language="plaintext"
                      title={t('labs.bobRules.writingEffectiveRules.goodExample.codeTitle')}
                    />
                  </div>
                  
                  <h3>{t('labs.bobRules.writingEffectiveRules.useStructure.title')}</h3>
                  <p>{t('labs.bobRules.writingEffectiveRules.useStructure.desc')}</p>
                  
                  <CodeBlock
                    code={`# Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Use UPPER_SNAKE_CASE for constants

# Documentation
- Add JSDoc comments for all public APIs
- Include examples in documentation
- Document all parameters and return values`}
                    language="markdown"
                    title={t('labs.bobRules.writingEffectiveRules.useStructure.codeTitle')}
                  />
                  
                  <h3>{t('labs.bobRules.writingEffectiveRules.examples.title')}</h3>
                  
                  <CodeBlock
                    code={`# Example 1: Framework Preference
Always use React hooks instead of class components. 
Prefer functional components with useState and useEffect.

# Example 2: Testing Requirements
Write unit tests for all business logic functions.
Aim for at least 80% code coverage.
Use Jest for testing and React Testing Library for component tests.

# Example 3: Error Handling
Always use try-catch blocks for async operations.
Log errors with context information.
Never expose sensitive information in error messages.

# Example 4: Code Organization
Keep components under 200 lines.
Extract complex logic into custom hooks.
Use barrel exports (index.ts) for cleaner imports.

# Example 5: Security
Never commit API keys or secrets.
Use environment variables for configuration.
Sanitize all user inputs before processing.`}
                    language="markdown"
                    title={t('labs.bobRules.writingEffectiveRules.examples.codeTitle')}
                  />
                </div>
              </div>
            </section>

            {/* Advanced Configuration Section */}
            <section id="advanced-configuration" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">7</span>
                  <h2>{t('labs.bobRules.advancedConfiguration.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.advancedConfiguration.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.bobRules.advancedConfiguration.modeSpecific.title')}</h3>
                  <p>{t('labs.bobRules.advancedConfiguration.modeSpecific.desc')}</p>
                  
                  <CodeBlock
                    code={`.bob/rules/code.md       # Rules for Code mode
.bob/rules/architect.md  # Rules for Architect mode
.bob/rules/ask.md        # Rules for Ask mode`}
                    language="plaintext"
                    title={t('labs.bobRules.advancedConfiguration.modeSpecific.codeTitle')}
                  />
                  
                  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.directory')}</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.scope')}</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.description')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>~/.bob/rules/</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.row1.scope')}</td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.row1.description')}</td>
                      </tr>
                      <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}><code>.bob/rules/</code></td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.row2.scope')}</td>
                        <td style={{ padding: '12px', border: '1px solid var(--color-border)' }}>{t('labs.bobRules.advancedConfiguration.table.row2.description')}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h3>{t('labs.bobRules.advancedConfiguration.advanced.title')}</h3>
                  <p>{t('labs.bobRules.advancedConfiguration.advanced.desc')}</p>
                  
                  <h3>{t('labs.bobRules.advancedConfiguration.fileBehavior.title')}</h3>
                  <ul>
                    <li>{t('labs.bobRules.advancedConfiguration.fileBehavior.item1')}</li>
                    <li>{t('labs.bobRules.advancedConfiguration.fileBehavior.item2')}</li>
                    <li>{t('labs.bobRules.advancedConfiguration.fileBehavior.item3')}</li>
                    <li>{t('labs.bobRules.advancedConfiguration.fileBehavior.item4')}</li>
                    <li>{t('labs.bobRules.advancedConfiguration.fileBehavior.item5')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Team Standardization Section */}
            <section id="team-standardization" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">8</span>
                  <h2>{t('labs.bobRules.teamStandardization.title')}</h2>
                  <span className="capability-badge">{t('labs.bobRules.teamStandardization.badge')}</span>
                </div>
                <div className="capability-content">
                  <h3>{t('labs.bobRules.teamStandardization.projectLevel.title')}</h3>
                  <p>{t('labs.bobRules.teamStandardization.projectLevel.desc')}</p>
                  
                  <CodeBlock
                    code={`git add .bobrules .bob/
git commit -m "Add Bob custom rules for team"
git push`}
                    language="bash"
                    title={t('labs.bobRules.teamStandardization.projectLevel.codeTitle')}
                  />
                  
                  <p>{t('labs.bobRules.teamStandardization.projectLevel.ensures')}</p>
                  
                  <h3>{t('labs.bobRules.teamStandardization.orgWide.title')}</h3>
                  <p>{t('labs.bobRules.teamStandardization.orgWide.desc')}</p>
                  
                  <ol>
                    <li>{t('labs.bobRules.teamStandardization.orgWide.step1')}</li>
                    <li>{t('labs.bobRules.teamStandardization.orgWide.step2')}</li>
                    <li>{t('labs.bobRules.teamStandardization.orgWide.step3')}</li>
                    <li>{t('labs.bobRules.teamStandardization.orgWide.step4')}</li>
                  </ol>
                  
                  <h3>{t('labs.bobRules.teamStandardization.hybrid.title')}</h3>
                  <p>{t('labs.bobRules.teamStandardization.hybrid.desc')}</p>
                  
                  <ul>
                    <li><strong>{t('labs.bobRules.teamStandardization.hybrid.global.title')}</strong> {t('labs.bobRules.teamStandardization.hybrid.global.desc')}</li>
                    <li><strong>{t('labs.bobRules.teamStandardization.hybrid.workspace.title')}</strong> {t('labs.bobRules.teamStandardization.hybrid.workspace.desc')}</li>
                  </ul>
                  
                  <p>{t('labs.bobRules.teamStandardization.hybrid.conclusion')}</p>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section id="summary" className="section section-alt">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.bobRules.summary.title')}</h2>
                  <p>{t('labs.bobRules.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.bobRules.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.bobRules.summary.nextSteps.step1')}</li>
                      <li>{t('labs.bobRules.summary.nextSteps.step2')}</li>
                      <li>{t('labs.bobRules.summary.nextSteps.step3')}</li>
                      <li>{t('labs.bobRules.summary.nextSteps.step4')}</li>
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

export default BobRules;

// Made with Bob
