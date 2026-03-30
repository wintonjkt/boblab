import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Column } from '@carbon/react';
import { LogoGithub } from '@carbon/icons-react';
import '@/styles/footer.scss';

/**
 * Footer component with Carbon Design System
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Grid className="footer__content">
        {/* About Section */}
        <Column sm={4} md={4} lg={4}>
          <h3 className="footer__heading">Bob Lab</h3>
          <p className="footer__text">
            Interactive learning platform for IBM watsonx Code Assistant (Bob).
            Explore labs, tutorials, and best practices for AI-assisted development.
          </p>
        </Column>

        {/* Quick Links */}
        <Column sm={4} md={4} lg={4}>
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            <li>
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/labs/getting-started" className="footer__link">
                Getting Started
              </Link>
            </li>
            <li>
              <Link to="/narrative" className="footer__link">
                Narrative
              </Link>
            </li>
          </ul>
        </Column>

        {/* Resources */}
        <Column sm={4} md={4} lg={4}>
          <h3 className="footer__heading">Resources</h3>
          <ul className="footer__list">
            <li>
              <a
                href="https://www.ibm.com/products/watsonx-code-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                watsonx Code Assistant
              </a>
            </li>
            <li>
              <a
                href="https://carbondesignsystem.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Carbon Design System
              </a>
            </li>
            <li>
              <a
                href="https://www.ibm.com/docs/en/watsonx-code-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Documentation
              </a>
            </li>
          </ul>
        </Column>

        {/* Connect */}
        <Column sm={4} md={4} lg={4}>
          <h3 className="footer__heading">Connect</h3>
          <div className="footer__social">
            <a
              href="https://github.com/ibm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer__social-link"
            >
              <LogoGithub size={24} />
            </a>
          </div>
        </Column>
      </Grid>

      {/* Bottom Bar */}
      <Grid className="footer__bottom">
        <Column sm={4} md={8} lg={16}>
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} IBM Corporation. All rights reserved.
            </p>
            <div className="footer__legal-links">
              <a
                href="https://www.ibm.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__legal-link"
              >
                Privacy
              </a>
              <a
                href="https://www.ibm.com/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__legal-link"
              >
                Terms of Use
              </a>
              <a
                href="https://www.ibm.com/accessibility"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__legal-link"
              >
                Accessibility
              </a>
            </div>
          </div>
        </Column>
      </Grid>
    </footer>
  );
};

export default Footer;

// Made with Bob
