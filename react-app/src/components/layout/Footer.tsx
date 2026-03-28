import React from 'react';
import { Link } from 'react-router-dom';
import { LogoGithub } from '@carbon/icons-react';

/**
 * Footer component with Carbon Design System styling
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--cds-layer)',
        borderTop: '1px solid var(--cds-border-subtle)',
        marginTop: 'auto',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1584px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* About Section */}
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--cds-text-primary)',
            }}
          >
            Bob Lab
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--cds-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            Interactive learning platform for IBM watsonx Code Assistant (Bob).
            Explore labs, tutorials, and best practices for AI-assisted development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--cds-text-primary)',
            }}
          >
            Quick Links
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/labs/getting-started"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Getting Started
              </Link>
            </li>
            <li>
              <Link
                to="/narrative"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Narrative
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--cds-text-primary)',
            }}
          >
            Resources
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <li>
              <a
                href="https://www.ibm.com/products/watsonx-code-assistant"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                watsonx Code Assistant
              </a>
            </li>
            <li>
              <a
                href="https://carbondesignsystem.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Carbon Design System
              </a>
            </li>
            <li>
              <a
                href="https://www.ibm.com/docs/en/watsonx-code-assistant"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--cds-link-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Documentation
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--cds-text-primary)',
            }}
          >
            Connect
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="https://github.com/ibm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                color: 'var(--cds-icon-primary)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LogoGithub size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1584px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--cds-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.75rem',
          color: 'var(--cds-text-secondary)',
        }}
      >
        <div>
          <p style={{ margin: 0 }}>
            © {currentYear} IBM Corporation. All rights reserved.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://www.ibm.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--cds-link-primary)',
              textDecoration: 'none',
            }}
          >
            Privacy
          </a>
          <a
            href="https://www.ibm.com/legal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--cds-link-primary)',
              textDecoration: 'none',
            }}
          >
            Terms of Use
          </a>
          <a
            href="https://www.ibm.com/accessibility"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--cds-link-primary)',
              textDecoration: 'none',
            }}
          >
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Made with Bob
