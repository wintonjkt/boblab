import React, { useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import CodeBlock from '../../components/common/CodeBlock';

const BobShell: React.FC = () => {
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
          <h1>{t('labs.bobShell.title')}</h1>
          <p className="page-subtitle">{t('labs.bobShell.subtitle')}</p>
          <p className="page-description">{t('labs.bobShell.description')}</p>
        </div>
      </header>

      <main className="walkthrough-container">
        <aside className="walkthrough-sidebar">
          <div className="sidebar-header">
            <h3>{t('labs.bobShell.sidebar.title')}</h3>
          </div>
          <nav className="capability-nav">
            <a href="#overview" className="capability-link">{t('labs.bobShell.nav.overview')}</a>
            <a href="#installation" className="capability-link">{t('labs.bobShell.nav.installation')}</a>
            <a href="#basic-commands" className="capability-link">{t('labs.bobShell.nav.basicCommands')}</a>
            <a href="#interactive-mode" className="capability-link">{t('labs.bobShell.nav.interactiveMode')}</a>
            <a href="#automation" className="capability-link">{t('labs.bobShell.nav.automation')}</a>
            <a href="#integrations" className="capability-link">{t('labs.bobShell.nav.integrations')}</a>
          </nav>
          <div className="sidebar-footer">
            <a href="https://internal.bob.ibm.com/docs/shell" target="_blank" className="sidebar-github-link">
              <span className="github-text">{t('labs.bobShell.sidebar.documentation')}</span>
              <span className="github-arrow">→</span>
            </a>
          </div>
        </aside>

        <div className="walkthrough-main">
          <div className="walkthrough-content">
            {/* Overview */}
            <section id="overview" className="section">
              <div className="container">
                <div className="info-card compliance">
                  <h2>{t('labs.bobShell.overview.title')}</h2>
                  <p>{t('labs.bobShell.overview.desc')}</p>
                  <p><strong>{t('labs.bobShell.overview.estimatedTime')}</strong> {t('labs.bobShell.overview.timeValue')}</p>
                </div>
              </div>
            </section>

            {/* Installation & Setup */}
            <section id="installation" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">1</span>
                  <h2>{t('labs.bobShell.installation.title')}</h2>
                  <span className="capability-badge">{t('labs.bobShell.installation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="demo-flow">
                    <h3>{t('labs.bobShell.installation.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.installation.demo.step1.title')}</h4>
                        <p>{t('labs.bobShell.installation.demo.step1.desc')}</p>
                        
                        <div className="result-box" style={{ marginBottom: '1rem' }}>
                          <p><strong>{t('labs.bobShell.installation.demo.step1.note')}</strong> {t('labs.bobShell.installation.demo.step1.noteDesc')}</p>
                        </div>

                        <CodeBlock
                          code={`# System Requirements:
- macOS 10.15+ or Linux
- Bash, Zsh, or Fish shell
- Internet connection for API access`}
                          language="text"
                          title={t('labs.bobShell.installation.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.installation.demo.step2.title')}</h4>
                        <p>{t('labs.bobShell.installation.demo.step2.desc')}</p>
                        
                        <CodeBlock
                          code={`# Option 1: Install via curl (recommended)
curl -fsSL https://internal.bob.ibm.com/install.sh | bash

# Option 2: Install from Bob IDE
# Open Command Palette (Cmd+Shift+P)
# Type: "Bob: Install BobShell"
# Follow the prompts`}
                          language="bash"
                          title={t('labs.bobShell.installation.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.installation.demo.step3.title')}</h4>
                        <p>{t('labs.bobShell.installation.demo.step3.desc')}</p>
                        
                        <CodeBlock
                          code={`# For bash (~/.bashrc):
echo 'export BOBSHELL_API_KEY=your_api_key_here' >> ~/.bashrc
source ~/.bashrc

# For zsh (~/.zshrc):
echo 'export BOBSHELL_API_KEY=your_api_key_here' >> ~/.zshrc
source ~/.zshrc

# For fish (~/.config/fish/config.fish):
echo 'set -x BOBSHELL_API_KEY your_api_key_here' >> ~/.config/fish/config.fish
source ~/.config/fish/config.fish`}
                          language="bash"
                          title={t('labs.bobShell.installation.demo.step3.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.installation.demo.step4.title')}</h4>
                        <p>{t('labs.bobShell.installation.demo.step4.desc')}</p>
                        
                        <CodeBlock
                          code={`# Verify installation
bob --version

# Test basic functionality
bob -p "Hello, what can you help me with?"`}
                          language="bash"
                          title={t('labs.bobShell.installation.demo.step4.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Basic Commands */}
            <section id="basic-commands" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">2</span>
                  <h2>{t('labs.bobShell.basicCommands.title')}</h2>
                  <span className="capability-badge">{t('labs.bobShell.basicCommands.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="demo-flow">
                    <h3>{t('labs.bobShell.basicCommands.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.basicCommands.demo.step1.title')}</h4>
                        <p>{t('labs.bobShell.basicCommands.demo.step1.desc')}</p>
                        
                        <CodeBlock
                          code={`# Basic prompt
bob -p "Explain what this project does"

# With file reference
bob -p "Explain the code in @src/main.js"

# Multiple files
bob -p "Compare @src/old.js and @src/new.js"

# Directory reference
bob -p "List all API endpoints defined in @routes/"`}
                          language="bash"
                          title={t('labs.bobShell.basicCommands.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.basicCommands.demo.step2.title')}</h4>
                        <p>{t('labs.bobShell.basicCommands.demo.step2.desc')}</p>
                        
                        <CodeBlock
                          code={`# By default, Bob Shell only uses "non-destructive" tools
# (e.g., "read file") in non-interactive mode

# To enable writing and updating files, use --yolo flag:
bob -p "Fix the bugs in @src/main.js" --yolo

# Note: Even with --yolo mode enabled, Bob Shell will NOT
# write or update files outside the directory where
# Bob Shell was started`}
                          language="bash"
                          title={t('labs.bobShell.basicCommands.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.basicCommands.demo.step3.title')}</h4>
                        <p>{t('labs.bobShell.basicCommands.demo.step3.desc')}</p>
                        
                        <CodeBlock
                          code={`# Add instruction to enclose answer in markdown tags
bob -p "What Java version is this application for? Use the info in @pom.xml. Enclose the answer in markdown tags" > ../bobresp.txt

# Example result:
# I'll check the Java version specified in the pom.xml file...
# \`\`\`markdown
# This application is built for Java 8, as specified in the
# pom.xml file with the following compiler settings:
# <maven.compiler.source>1.8</maven.compiler.source>
# <maven.compiler.target>1.8</maven.compiler.target>
# \`\`\``}
                          language="bash"
                          title={t('labs.bobShell.basicCommands.demo.step3.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.basicCommands.demo.step4.title')}</h4>
                        
                        <CodeBlock
                          code={`# Analyze a file for issues
$ bob -p "What are the potential bugs in @src/payment.js?"

Bob is analyzing the code...

Found 3 potential issues:
1. Missing null check on line 45
2. Unhandled promise rejection on line 67
3. SQL injection vulnerability on line 89

# Get detailed explanation
$ bob -p "Explain the SQL injection issue in @src/payment.js line 89"

The SQL injection vulnerability occurs because user input
is directly concatenated into the SQL query...

# Fix the issue (with --yolo flag)
$ bob -p "Fix the SQL injection in @src/payment.js" --yolo

Applying fix...
✓ Updated src/payment.js
✓ Added parameterized query
✓ Added input validation

# Verify the fix
$ bob -p "Check if @src/payment.js still has security issues"

No security issues found. The code now uses:
- Parameterized queries
- Input validation
- Proper error handling`}
                          language="bash"
                          title={t('labs.bobShell.basicCommands.demo.step4.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.bobShell.basicCommands.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.bobShell.basicCommands.value.traditional.title')}</strong>
                        <p>{t('labs.bobShell.basicCommands.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.bobShell.basicCommands.value.withBob.title')}</strong>
                        <p>{t('labs.bobShell.basicCommands.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.bobShell.basicCommands.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Mode */}
            <section id="interactive-mode" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">3</span>
                  <h2>{t('labs.bobShell.interactiveMode.title')}</h2>
                  <span className="capability-badge">{t('labs.bobShell.interactiveMode.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.bobShell.interactiveMode.challenge.title')}</h3>
                    <p>{t('labs.bobShell.interactiveMode.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.bobShell.interactiveMode.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.interactiveMode.demo.step1.title')}</h4>
                        
                        <CodeBlock
                          code={`# Start interactive mode
$ bob

Welcome to Bob Shell Interactive Mode!
Type 'help' for available commands, 'exit' to quit.

Bob>`}
                          language="bash"
                          title={t('labs.bobShell.interactiveMode.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.interactiveMode.demo.step2.title')}</h4>
                        
                        <CodeBlock
                          code={`Bob> Analyze @src/app.js for performance issues

Analyzing src/app.js...

Found 2 performance issues:
1. Inefficient loop on line 23
2. Unnecessary re-renders on line 45

Bob> Show me the code on line 23

Here's the code on line 23:
\`\`\`javascript
for (let i = 0; i < items.length; i++) {
  processItem(items[i]);
}
\`\`\`

Bob> How can I optimize this?

You can use forEach or map for better readability:
\`\`\`javascript
items.forEach(item => processItem(item));
\`\`\`

Bob> Apply this fix

✓ Updated src/app.js
✓ Replaced loop with forEach

Bob> exit

Goodbye!`}
                          language="bash"
                          title={t('labs.bobShell.interactiveMode.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.bobShell.interactiveMode.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.bobShell.interactiveMode.value.traditional.title')}</strong>
                        <p>{t('labs.bobShell.interactiveMode.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.bobShell.interactiveMode.value.withBob.title')}</strong>
                        <p>{t('labs.bobShell.interactiveMode.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.bobShell.interactiveMode.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Automation & Scripting */}
            <section id="automation" className="section">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">4</span>
                  <h2>{t('labs.bobShell.automation.title')}</h2>
                  <span className="capability-badge">{t('labs.bobShell.automation.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.bobShell.automation.challenge.title')}</h3>
                    <p>{t('labs.bobShell.automation.challenge.desc')}</p>
                  </div>

                  <div className="demo-flow">
                    <h3>{t('labs.bobShell.automation.demo.title')}</h3>

                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.automation.demo.step1.title')}</h4>
                        
                        <CodeBlock
                          code={`#!/bin/bash
# batch-analyze.sh - Analyze multiple files

echo "Analyzing codebase..."

# Get all JavaScript files
FILES=$(find src -name "*.js")

# Analyze each file
for file in $FILES; do
    echo "Analyzing $file..."
    bob -p "Check @$file for bugs and security issues. Answer with 'OK' if no issues, or list issues found." >> analysis-report.txt
    echo "---" >> analysis-report.txt
done

echo "Analysis complete! Check analysis-report.txt"`}
                          language="bash"
                          title={t('labs.bobShell.automation.demo.step1.codeTitle')}
                        />
                      </div>
                    </div>

                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>{t('labs.bobShell.automation.demo.step2.title')}</h4>
                        
                        <CodeBlock
                          code={`#!/bin/bash
# .git/hooks/pre-commit

echo "Running pre-commit checks with Bob Shell..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|py)$' || true)

if [ -z "$STAGED_FILES" ]; then
    echo "No code files to check"
    exit 0
fi

# Check each staged file
for file in $STAGED_FILES; do
    echo "Checking $file..."
    
    # Ask Bob to check for issues
    RESULT=$(bob -p "Check @$file for security issues and bugs. Answer with 'OK' if no issues, or list issues found.")
    
    if [[ ! "$RESULT" =~ "OK" ]]; then
        echo "Issues found in $file:"
        echo "$RESULT"
        echo ""
        echo "Commit aborted. Please fix the issues above."
        exit 1
    fi
done

echo "✓ All checks passed!"
exit 0`}
                          language="bash"
                          title={t('labs.bobShell.automation.demo.step2.codeTitle')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="business-value">
                    <h3>{t('labs.bobShell.automation.value.title')}</h3>
                    <div className="value-comparison">
                      <div className="value-traditional">
                        <strong>{t('labs.bobShell.automation.value.traditional.title')}</strong>
                        <p>{t('labs.bobShell.automation.value.traditional.desc')}</p>
                      </div>
                      <div className="value-bob">
                        <strong>{t('labs.bobShell.automation.value.withBob.title')}</strong>
                        <p>{t('labs.bobShell.automation.value.withBob.desc')}</p>
                      </div>
                    </div>
                    <p className="highlight">{t('labs.bobShell.automation.value.conclusion')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* IDE Integration */}
            <section id="integrations" className="section section-alt">
              <div className="container">
                <div className="capability-header">
                  <span className="capability-number">5</span>
                  <h2>{t('labs.bobShell.integrations.title')}</h2>
                  <span className="capability-badge">{t('labs.bobShell.integrations.badge')}</span>
                </div>

                <div className="capability-content">
                  <div className="objective-box">
                    <h3>{t('labs.bobShell.integrations.challenge.title')}</h3>
                    <p>{t('labs.bobShell.integrations.challenge.desc')}</p>
                  </div>

                  <div className="info-card">
                    <h3>{t('labs.bobShell.integrations.overview.title')}</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                          <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>{t('labs.bobShell.integrations.overview.table.feature')}</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>{t('labs.bobShell.integrations.overview.table.description')}</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>{t('labs.bobShell.integrations.overview.table.benefit')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}><strong>{t('labs.bobShell.integrations.overview.table.row1.feature')}</strong></td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row1.description')}</td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row1.benefit')}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}><strong>{t('labs.bobShell.integrations.overview.table.row2.feature')}</strong></td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row2.description')}</td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row2.benefit')}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}><strong>{t('labs.bobShell.integrations.overview.table.row3.feature')}</strong></td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row3.description')}</td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row3.benefit')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '12px' }}><strong>{t('labs.bobShell.integrations.overview.table.row4.feature')}</strong></td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row4.description')}</td>
                          <td style={{ padding: '12px' }}>{t('labs.bobShell.integrations.overview.table.row4.benefit')}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p style={{ marginTop: '1rem', padding: '12px', backgroundColor: '#e8f4fd', borderLeft: '4px solid #0f62fe', borderRadius: '4px' }}>
                      <strong>{t('labs.bobShell.integrations.overview.note')}</strong> {t('labs.bobShell.integrations.overview.noteDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section id="summary" className="section">
              <div className="container">
                <div className="info-card">
                  <h2>{t('labs.bobShell.summary.title')}</h2>
                  <p>{t('labs.bobShell.summary.desc')}</p>
                  
                  <div className="achievement-badges">
                    <div className="badge">
                      <div className="badge-icon">✓</div>
                      <div className="badge-title">{t('labs.bobShell.summary.badges.installation')}</div>
                    </div>
                    <div className="badge">
                      <div className="badge-icon">✓</div>
                      <div className="badge-title">{t('labs.bobShell.summary.badges.cli')}</div>
                    </div>
                    <div className="badge">
                      <div className="badge-icon">✓</div>
                      <div className="badge-title">{t('labs.bobShell.summary.badges.interactive')}</div>
                    </div>
                    <div className="badge">
                      <div className="badge-icon">✓</div>
                      <div className="badge-title">{t('labs.bobShell.summary.badges.automation')}</div>
                    </div>
                    <div className="badge">
                      <div className="badge-icon">✓</div>
                      <div className="badge-title">{t('labs.bobShell.summary.badges.integration')}</div>
                    </div>
                  </div>

                  <div className="next-steps">
                    <h3>{t('labs.bobShell.summary.keyTakeaways.title')}</h3>
                    <ol>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item1.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item1.desc')}</li>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item2.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item2.desc')}</li>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item3.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item3.desc')}</li>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item4.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item4.desc')}</li>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item5.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item5.desc')}</li>
                      <li><strong>{t('labs.bobShell.summary.keyTakeaways.item6.title')}</strong> {t('labs.bobShell.summary.keyTakeaways.item6.desc')}</li>
                    </ol>
                  </div>

                  <div className="resources-section">
                    <h3>{t('labs.bobShell.summary.resources.title')}</h3>
                    <div className="resource-links">
                      <div className="resource-card">
                        <h4>{t('labs.bobShell.summary.resources.docs.title')}</h4>
                        <p>{t('labs.bobShell.summary.resources.docs.desc')}</p>
                        <a href="https://internal.bob.ibm.com/docs/shell" target="_blank">{t('labs.bobShell.summary.resources.docs.link')}</a>
                      </div>
                      <div className="resource-card">
                        <h4>{t('labs.bobShell.summary.resources.gettingStarted.title')}</h4>
                        <p>{t('labs.bobShell.summary.resources.gettingStarted.desc')}</p>
                        <a href="https://internal.bob.ibm.com/docs/shell/getting-started" target="_blank">{t('labs.bobShell.summary.resources.gettingStarted.link')}</a>
                      </div>
                      <div className="resource-card">
                        <h4>{t('labs.bobShell.summary.resources.examples.title')}</h4>
                        <p>{t('labs.bobShell.summary.resources.examples.desc')}</p>
                        <a href="https://internal.bob.ibm.com/docs/shell/usage-examples" target="_blank">{t('labs.bobShell.summary.resources.examples.link')}</a>
                      </div>
                    </div>
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

export default BobShell;

// Made with Bob
