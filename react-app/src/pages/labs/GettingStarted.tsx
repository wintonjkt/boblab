import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const GettingStarted: React.FC = () => {
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
          <h1>{t('labs.gettingStarted.title')}</h1>
          <p className="page-subtitle">{t('labs.gettingStarted.subtitle')}</p>
          <p className="page-description">{t('labs.gettingStarted.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        {/* Sidebar Navigation */}
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.gettingStarted.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.gettingStarted.nav.overview')}</a>
            <a href="#installation" className="capability-link">{t('labs.gettingStarted.nav.installation')}</a>
            <a href="#prompt-engineering" className="capability-link">{t('labs.gettingStarted.nav.promptEngineering')}</a>
            <a href="#reading-documents" className="capability-link">{t('labs.gettingStarted.nav.readingDocuments')}</a>
            <a href="#code-generation" className="capability-link">{t('labs.gettingStarted.nav.codeGeneration')}</a>
            <a href="#multi-file" className="capability-link">{t('labs.gettingStarted.nav.multiFile')}</a>
            <a href="#context-awareness" className="capability-link">{t('labs.gettingStarted.nav.contextAwareness')}</a>
            <a href="#iterative-refinement" className="capability-link">{t('labs.gettingStarted.nav.iterativeRefinement')}</a>
          </nav>
          <div className="sidebar-footer">
            <a href="https://github.ibm.com/bob-ide/examples" target="_blank" rel="noopener noreferrer" className="sidebar-github-link">
              <span className="github-text">{t('labs.gettingStarted.sidebar.viewExamples')}</span>
              <span className="github-arrow">→</span>
            </a>
          </div>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview Section */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.gettingStarted.overview.title')}</h2>
                  <p>{t('labs.gettingStarted.overview.intro')}</p>

                  <div className="capabilities-overview">
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.documentUnderstanding.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.documentUnderstanding.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.smartCodeGeneration.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.smartCodeGeneration.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.multiFileOperations.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.multiFileOperations.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.contextAwareness.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.contextAwareness.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.interactiveRefinement.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.interactiveRefinement.desc')}</p>
                    </div>
                    <div className="cap-card">
                      <h4>{t('labs.gettingStarted.overview.capabilities.learningAdaptation.title')}</h4>
                      <p>{t('labs.gettingStarted.overview.capabilities.learningAdaptation.desc')}</p>
                    </div>
                  </div>

                  <p><strong>{t('labs.gettingStarted.overview.estimatedTime')}</strong> {t('labs.gettingStarted.overview.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* Installation Section */}
            <section id="installation" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">0</span>
                  <h2>{t('labs.gettingStarted.installation.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.installation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.installation.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.installation.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.installation.steps.title')}</h3>
                    
                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.installation.steps.step1.title')}</h4>
                        <p>{t('labs.gettingStarted.installation.steps.step1.desc')}</p>
                        <CodeBlock
                          code="https://ibm.biz/get-bob"
                          language="text"
                          title={t('labs.gettingStarted.installation.steps.step1.codeTitle')}
                        />
                        <div className="result-box">
                          <p><strong>{t('labs.gettingStarted.installation.steps.step1.requirements')}</strong> {t('labs.gettingStarted.installation.steps.step1.requirementsDesc')}</p>
                        </div>
                        <p style={{ marginTop: '1rem' }}>{t('labs.gettingStarted.installation.steps.step1.note')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.installation.steps.step2.title')}</h4>
                        <p>{t('labs.gettingStarted.installation.steps.step2.desc')}</p>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.installation.steps.step3.title')}</h4>
                        <p>{t('labs.gettingStarted.installation.steps.step3.desc')}</p>
                        <CodeBlock
                          code="Hello Bob! List the files in the current directory"
                          language="text"
                          title={t('labs.gettingStarted.installation.steps.step3.codeTitle')}
                        />
                        <p>{t('labs.gettingStarted.installation.steps.step3.note')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.installation.nextSteps.title')}</h3>
                    <p>{t('labs.gettingStarted.installation.nextSteps.desc')}</p>
                    
                    <div className="next-steps">
                      <ul>
                        <li><strong>{t('labs.gettingStarted.installation.nextSteps.item1.title')}</strong> {t('labs.gettingStarted.installation.nextSteps.item1.desc')}</li>
                        <li><strong>{t('labs.gettingStarted.installation.nextSteps.item2.title')}</strong> {t('labs.gettingStarted.installation.nextSteps.item2.desc')}</li>
                        <li><strong>{t('labs.gettingStarted.installation.nextSteps.item3.title')}</strong> {t('labs.gettingStarted.installation.nextSteps.item3.desc')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prompt Engineering Section */}
            <section id="prompt-engineering" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.gettingStarted.promptEngineering.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.promptEngineering.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.promptEngineering.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.promptEngineering.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.promptEngineering.principles.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.promptEngineering.principles.principle1.title')}</h4>
                        <p>{t('labs.gettingStarted.promptEngineering.principles.principle1.desc')}</p>
                        <CodeBlock
                          code={`- Ineffective: Fix the code.
+ Effective: Fix the bug in the calculateTotal function that causes it to return incorrect results.`}
                          language="diff"
                          title={t('labs.gettingStarted.promptEngineering.principles.principle1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.promptEngineering.principles.principle2.title')}</h4>
                        <p>{t('labs.gettingStarted.promptEngineering.principles.principle2.desc')}</p>
                        <CodeBlock
                          code="@/src/utils.ts Refactor the calculateTotal function to use async/await."
                          language="text"
                          title={t('labs.gettingStarted.promptEngineering.principles.principle2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.promptEngineering.principles.principle3.title')}</h4>
                        <p>{t('labs.gettingStarted.promptEngineering.principles.principle3.desc')}</p>
                        <CodeBlock
                          code={`Help me implement user authentication:
1. First, analyze the current user model
2. Then, create authentication middleware
3. Finally, add protected routes`}
                          language="text"
                          title={t('labs.gettingStarted.promptEngineering.principles.principle3.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.promptEngineering.principles.principle4.title')}</h4>
                        <p>{t('labs.gettingStarted.promptEngineering.principles.principle4.desc')}</p>
                        <CodeBlock
                          code={`Create a data validator following this pattern:
const validateUser = (data) => {
  const { error, value } = schema.validate(data);
  if (error) return { isValid: false, errors: error.details };
  return { isValid: true, value };
};

Now create a similar validator for product data.`}
                          language="javascript"
                          title={t('labs.gettingStarted.promptEngineering.principles.principle4.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">5</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.promptEngineering.principles.principle5.title')}</h4>
                        <p>{t('labs.gettingStarted.promptEngineering.principles.principle5.desc')}</p>
                        <CodeBlock
                          code={`List all API endpoints in this project.
Return the response as a JSON array with this structure:
[
  {
    "method": "GET",
    "path": "/api/users",
    "description": "Get all users"
  }
]`}
                          language="text"
                          title={t('labs.gettingStarted.promptEngineering.principles.principle5.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.promptEngineering.tips.title')}</h3>
                    <ul>
                      <li><strong>{t('labs.gettingStarted.promptEngineering.tips.tip1.title')}</strong> {t('labs.gettingStarted.promptEngineering.tips.tip1.desc')}</li>
                      <li><strong>{t('labs.gettingStarted.promptEngineering.tips.tip2.title')}</strong> {t('labs.gettingStarted.promptEngineering.tips.tip2.desc')}</li>
                      <li><strong>{t('labs.gettingStarted.promptEngineering.tips.tip3.title')}</strong> {t('labs.gettingStarted.promptEngineering.tips.tip3.desc')}</li>
                      <li><strong>{t('labs.gettingStarted.promptEngineering.tips.tip4.title')}</strong> {t('labs.gettingStarted.promptEngineering.tips.tip4.desc')}</li>
                      <li><strong>{t('labs.gettingStarted.promptEngineering.tips.tip5.title')}</strong> {t('labs.gettingStarted.promptEngineering.tips.tip5.desc')}</li>
                    </ul>
                    <p className="highlight">{t('labs.gettingStarted.promptEngineering.tips.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reading Documents Section */}
            <section id="reading-documents" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.gettingStarted.readingDocuments.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.readingDocuments.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.readingDocuments.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.readingDocuments.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.readingDocuments.steps.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.readingDocuments.steps.step1.title')}</h4>
                        <p>{t('labs.gettingStarted.readingDocuments.steps.step1.desc')}</p>
                        <ul>
                          <li>{t('labs.gettingStarted.readingDocuments.steps.step1.format1')}</li>
                          <li>{t('labs.gettingStarted.readingDocuments.steps.step1.format2')}</li>
                          <li>{t('labs.gettingStarted.readingDocuments.steps.step1.format3')}</li>
                          <li>{t('labs.gettingStarted.readingDocuments.steps.step1.format4')}</li>
                          <li>{t('labs.gettingStarted.readingDocuments.steps.step1.format5')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.readingDocuments.steps.step2.title')}</h4>
                        <CodeBlock
                          code={`Read this document and tell me:
1. What is the main objective?
2. What are the key requirements?
3. What technical approach is suggested?
4. What questions should I ask?`}
                          language="text"
                          title={t('labs.gettingStarted.readingDocuments.steps.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.readingDocuments.steps.step3.title')}</h4>
                        <p>{t('labs.gettingStarted.readingDocuments.steps.step3.desc')}</p>
                        <div className="result-box">
                          <ul>
                            <li>{t('labs.gettingStarted.readingDocuments.steps.step3.item1')}</li>
                            <li>{t('labs.gettingStarted.readingDocuments.steps.step3.item2')}</li>
                            <li>{t('labs.gettingStarted.readingDocuments.steps.step3.item3')}</li>
                            <li>{t('labs.gettingStarted.readingDocuments.steps.step3.item4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.readingDocuments.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.gettingStarted.readingDocuments.value.traditional.title')}</strong>
                        <p>{t('labs.gettingStarted.readingDocuments.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.gettingStarted.readingDocuments.value.withBob.title')}</strong>
                        <p>{t('labs.gettingStarted.readingDocuments.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.gettingStarted.readingDocuments.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Generation Section */}
            <section id="code-generation" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.gettingStarted.codeGeneration.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.codeGeneration.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.codeGeneration.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.codeGeneration.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.codeGeneration.steps.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.codeGeneration.steps.step1.title')}</h4>
                        <p>{t('labs.gettingStarted.codeGeneration.steps.step1.desc')}</p>
                        <ul>
                          <li>{t('labs.gettingStarted.codeGeneration.steps.step1.item1')}</li>
                          <li>{t('labs.gettingStarted.codeGeneration.steps.step1.item2')}</li>
                          <li>{t('labs.gettingStarted.codeGeneration.steps.step1.item3')}</li>
                          <li>{t('labs.gettingStarted.codeGeneration.steps.step1.item4')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.codeGeneration.steps.step2.title')}</h4>
                        <CodeBlock
                          code={`Create a REST API endpoint for user authentication.
Use Express.js with async/await.
Include input validation and error handling.
Follow the existing code style in this project.`}
                          language="text"
                          title={t('labs.gettingStarted.codeGeneration.steps.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.codeGeneration.steps.step3.title')}</h4>
                        <CodeBlock
                          code={`// Bob detected your project uses Express.js and async/await
// Bob noticed your error handling pattern and matched it
// Bob included validation based on your existing user model

const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authUtils = require('../utils/auth');

exports.authenticate = async (req, res) => {
  try {
    // Input validation following your project's pattern
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    
    // Authentication logic
    const user = await User.findOne({ email });
    if (!user || !await authUtils.comparePassword(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Token generation matching your existing approach
    const token = authUtils.generateToken(user);
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    // Error handling consistent with your project
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};`}
                          language="javascript"
                          title={t('labs.gettingStarted.codeGeneration.steps.step3.codeTitle')}
                        />
                        <p className="security-note"><strong>{t('labs.gettingStarted.codeGeneration.steps.step3.note')}</strong> {t('labs.gettingStarted.codeGeneration.steps.step3.noteDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.codeGeneration.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.gettingStarted.codeGeneration.value.traditional.title')}</strong>
                        <p>{t('labs.gettingStarted.codeGeneration.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.gettingStarted.codeGeneration.value.withBob.title')}</strong>
                        <p>{t('labs.gettingStarted.codeGeneration.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.gettingStarted.codeGeneration.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Multi-File Changes Section */}
            <section id="multi-file" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.gettingStarted.multiFile.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.multiFile.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.multiFile.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.multiFile.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.multiFile.steps.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.multiFile.steps.step1.title')}</h4>
                        <p>{t('labs.gettingStarted.multiFile.steps.step1.desc')}</p>
                        <CodeBlock
                          code={`Add a new feature for user profile management.

Create/modify:
1. New controller: controllers/profileController.js
2. New routes: routes/profileRoutes.js
3. Update main app.js to include new routes
4. Update user model to add profile fields
5. Create profile validation schema

Follow existing patterns and conventions.`}
                          language="text"
                          title={t('labs.gettingStarted.multiFile.steps.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.multiFile.steps.step2.title')}</h4>
                        <p>{t('labs.gettingStarted.multiFile.steps.step2.desc')}</p>
                        <div className="result-box">
                          <h5>{t('labs.gettingStarted.multiFile.steps.step2.planTitle')}</h5>
                          <ul>
                            <li><strong>{t('labs.gettingStarted.multiFile.steps.step2.item1.title')}</strong> {t('labs.gettingStarted.multiFile.steps.step2.item1.desc')}</li>
                            <li><strong>{t('labs.gettingStarted.multiFile.steps.step2.item2.title')}</strong> {t('labs.gettingStarted.multiFile.steps.step2.item2.desc')}</li>
                            <li><strong>{t('labs.gettingStarted.multiFile.steps.step2.item3.title')}</strong> {t('labs.gettingStarted.multiFile.steps.step2.item3.desc')}</li>
                            <li><strong>{t('labs.gettingStarted.multiFile.steps.step2.item4.title')}</strong> {t('labs.gettingStarted.multiFile.steps.step2.item4.desc')}</li>
                            <li><strong>{t('labs.gettingStarted.multiFile.steps.step2.item5.title')}</strong> {t('labs.gettingStarted.multiFile.steps.step2.item5.desc')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.multiFile.steps.step3.title')}</h4>
                        <p>{t('labs.gettingStarted.multiFile.steps.step3.desc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.multiFile.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.gettingStarted.multiFile.value.traditional.title')}</strong>
                        <p>{t('labs.gettingStarted.multiFile.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.gettingStarted.multiFile.value.withBob.title')}</strong>
                        <p>{t('labs.gettingStarted.multiFile.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.gettingStarted.multiFile.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Context Awareness Section */}
            <section id="context-awareness" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">5</span>
                  <h2>{t('labs.gettingStarted.contextAwareness.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.contextAwareness.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.contextAwareness.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.contextAwareness.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.contextAwareness.steps.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.contextAwareness.steps.step1.title')}</h4>
                        <p>{t('labs.gettingStarted.contextAwareness.steps.step1.desc')}</p>
                        <ul>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step1.item1')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step1.item2')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step1.item3')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step1.item4')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step1.item5')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.contextAwareness.steps.step2.title')}</h4>
                        <p>{t('labs.gettingStarted.contextAwareness.steps.step2.desc')}</p>
                        <CodeBlock
                          code='"Add logging to the user authentication service like the other services"'
                          language="text"
                          title={t('labs.gettingStarted.contextAwareness.steps.step2.codeTitle')}
                        />
                        <p>{t('labs.gettingStarted.contextAwareness.steps.step2.bobWill')}</p>
                        <ul>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step2.item1')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step2.item2')}</li>
                          <li>{t('labs.gettingStarted.contextAwareness.steps.step2.item3')}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.contextAwareness.steps.step3.title')}</h4>
                        <p>{t('labs.gettingStarted.contextAwareness.steps.step3.desc')}</p>
                        <CodeBlock
                          code={`Bob's Context Analysis:

Project Type: Node.js REST API
Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JWT
Pattern: MVC with controllers, models, routes

Recent Changes:
- Updated user model (2 hours ago)
- Added rate limiting (1 day ago)
- Fixed CORS issues (3 days ago)

Dependencies in Use:
- express, mongoose, jsonwebtoken
- helmet, cors, express-rate-limit
- joi for validation

Code Style:
- Async/await pattern
- Centralized error handling
- Response wrapper: { success, data, error }`}
                          language="bash"
                          title={t('labs.gettingStarted.contextAwareness.steps.step3.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.contextAwareness.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.gettingStarted.contextAwareness.value.traditional.title')}</strong>
                        <p>{t('labs.gettingStarted.contextAwareness.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.gettingStarted.contextAwareness.value.withBob.title')}</strong>
                        <p>{t('labs.gettingStarted.contextAwareness.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.gettingStarted.contextAwareness.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Iterative Refinement Section */}
            <section id="iterative-refinement" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">6</span>
                  <h2>{t('labs.gettingStarted.iterativeRefinement.title')}</h2>
                  <span className="capability-badge">{t('labs.gettingStarted.iterativeRefinement.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.gettingStarted.iterativeRefinement.objective.title')}</h3>
                    <p>{t('labs.gettingStarted.iterativeRefinement.objective.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.gettingStarted.iterativeRefinement.steps.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.iterativeRefinement.steps.step1.title')}</h4>
                        <CodeBlock
                          code="Create an email validation function"
                          language="text"
                          title={t('labs.gettingStarted.iterativeRefinement.steps.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.iterativeRefinement.steps.step2.title')}</h4>
                        <p>{t('labs.gettingStarted.iterativeRefinement.steps.step2.desc')}</p>
                        <CodeBlock
                          code={`Add these improvements:
1. Support international email addresses
2. Check for disposable email domains
3. Add detailed error messages
4. Make it configurable`}
                          language="text"
                          title={t('labs.gettingStarted.iterativeRefinement.steps.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.iterativeRefinement.steps.step3.title')}</h4>
                        <CodeBlock
                          code={`const EmailValidator = require('email-validator');

const disposableDomains = [
  'tempmail.com', 'throwaway.email', '10minutemail.com'
];

const validateEmail = (email, options = {}) => {
  const {
    allowInternational = true,
    checkDisposable = true,
    detailedErrors = false
  } = options;

  // Basic format validation
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: detailedErrors ? 'Email is required and must be a string' : 'Invalid email'
    };
  }

  // International domain support
  if (allowInternational && !EmailValidator.validate(email)) {
    return {
      isValid: false,
      error: detailedErrors ? 'Email format is invalid' : 'Invalid email'
    };
  }

  // Check for disposable domains
  if (checkDisposable) {
    const domain = email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      return {
        isValid: false,
        error: detailedErrors ? 'Disposable email addresses are not allowed' : 'Invalid email'
      };
    }
  }

  // Additional business rules can be added here
  
  return {
    isValid: true,
    normalizedEmail: email.toLowerCase().trim()
  };
};

module.exports = { validateEmail };`}
                          language="javascript"
                          title={t('labs.gettingStarted.iterativeRefinement.steps.step3.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.gettingStarted.iterativeRefinement.steps.step4.title')}</h4>
                        <p>{t('labs.gettingStarted.iterativeRefinement.steps.step4.desc')}</p>
                        <ul>
                          <li>{t('labs.gettingStarted.iterativeRefinement.steps.step4.item1')}</li>
                          <li>{t('labs.gettingStarted.iterativeRefinement.steps.step4.item2')}</li>
                          <li>{t('labs.gettingStarted.iterativeRefinement.steps.step4.item3')}</li>
                          <li>{t('labs.gettingStarted.iterativeRefinement.steps.step4.item4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.gettingStarted.iterativeRefinement.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.gettingStarted.iterativeRefinement.value.traditional.title')}</strong>
                        <p>{t('labs.gettingStarted.iterativeRefinement.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.gettingStarted.iterativeRefinement.value.withBob.title')}</strong>
                        <p>{t('labs.gettingStarted.iterativeRefinement.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.gettingStarted.iterativeRefinement.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section id="summary" className="section">
              <div className="container">
                <div className="info-card">
                  <h2>{t('labs.gettingStarted.summary.title')}</h2>
                  <p>{t('labs.gettingStarted.summary.desc')}</p>
                  
                  <div className="next-steps">
                    <h3>{t('labs.gettingStarted.summary.nextSteps.title')}</h3>
                    <ol>
                      <li>{t('labs.gettingStarted.summary.nextSteps.item1')}</li>
                      <li>{t('labs.gettingStarted.summary.nextSteps.item2')}</li>
                      <li>{t('labs.gettingStarted.summary.nextSteps.item3')}</li>
                      <li>{t('labs.gettingStarted.summary.nextSteps.item4')}</li>
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

export default GettingStarted;

// Made with Bob
