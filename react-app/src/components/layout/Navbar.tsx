import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenuItem,
  HeaderMenu,
} from '@carbon/react';
import { Translate } from '@carbon/icons-react';
import { useI18n } from '@/hooks/useI18n';
import { Language } from '@/types';
import ThemeToggle from './ThemeToggle';

/**
 * Language options with display names
 */
const LANGUAGE_OPTIONS: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
];

/**
 * Lab menu items
 */
const LAB_ITEMS = [
  { path: '/labs/getting-started', label: 'Getting Started' },
  { path: '/labs/walkthrough', label: 'Walkthrough' },
  { path: '/labs/bob-rules', label: 'Bob Rules' },
  { path: '/labs/custom-modes', label: 'Custom Modes' },
  { path: '/labs/mcp', label: 'MCP' },
  { path: '/labs/bobshell', label: 'Bob Shell' },
  { path: '/labs/spec-driven-development', label: 'Spec-Driven Development' },
  { path: '/labs/sdlc', label: 'SDLC' },
  { path: '/labs/carbon-react', label: 'Carbon React' },
  { path: '/labs/cobol2java', label: 'COBOL to Java' },
  { path: '/labs/appmod', label: 'App Modernization' },
  { path: '/labs/ibmi', label: 'IBM i' },
  { path: '/labs/wxo-orchestrate', label: 'WxO Orchestrate' },
];

/**
 * Navbar component with Carbon Design System
 */
const Navbar: React.FC = () => {
  const { language, changeLanguage } = useI18n();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleLanguageChange = async (lang: Language) => {
    try {
      await changeLanguage(lang);
      setIsLanguageMenuOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded: expanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Bob Lab">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={expanded ? 'Close menu' : 'Open menu'}
              onClick={onClickSideNavExpand}
              isActive={expanded}
              aria-expanded={expanded}
            />
            <HeaderName as={Link} to="/" prefix="IBM">
              Bob Lab
            </HeaderName>
            
            {/* Desktop Navigation */}
            <HeaderNavigation aria-label="Main navigation">
              <HeaderMenuItem as={NavLink} to="/">
                Home
              </HeaderMenuItem>
              
              <HeaderMenu aria-label="Labs" menuLinkName="Labs">
                {LAB_ITEMS.map(item => (
                  <HeaderMenuItem
                    key={item.path}
                    as={NavLink}
                    to={item.path}
                  >
                    {item.label}
                  </HeaderMenuItem>
                ))}
              </HeaderMenu>
              
              <HeaderMenuItem as={NavLink} to="/narrative">
                Narrative
              </HeaderMenuItem>
            </HeaderNavigation>

            {/* Global Actions */}
            <HeaderGlobalBar>
              {/* Language Selector */}
              <div style={{ position: 'relative' }}>
                <HeaderGlobalAction
                  aria-label="Change language"
                  tooltipAlignment="end"
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <Translate size={20} />
                </HeaderGlobalAction>
                
                {isLanguageMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: 'var(--cds-layer)',
                      border: '1px solid var(--cds-border-subtle)',
                      borderRadius: '4px',
                      marginTop: '4px',
                      minWidth: '200px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      zIndex: 9999,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    {LANGUAGE_OPTIONS.map(option => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: 'none',
                          backgroundColor: language === option.code 
                            ? 'var(--cds-layer-selected)' 
                            : 'transparent',
                          color: 'var(--cds-text-primary)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                        }}
                        onMouseEnter={(e) => {
                          if (language !== option.code) {
                            e.currentTarget.style.backgroundColor = 'var(--cds-layer-hover)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (language !== option.code) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span style={{ fontWeight: language === option.code ? 600 : 400 }}>
                          {option.nativeName}
                        </span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                          {option.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </HeaderGlobalBar>

            {/* Mobile Side Navigation */}
            <SideNav
              aria-label="Side navigation"
              expanded={expanded}
              isPersistent={false}
              onOverlayClick={onClickSideNavExpand}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem as={NavLink} to="/">
                    Home
                  </HeaderMenuItem>
                  
                  <HeaderMenu aria-label="Labs" menuLinkName="Labs">
                    {LAB_ITEMS.map(item => (
                      <HeaderMenuItem
                        key={item.path}
                        as={NavLink}
                        to={item.path}
                      >
                        {item.label}
                      </HeaderMenuItem>
                    ))}
                  </HeaderMenu>
                  
                  <HeaderMenuItem as={NavLink} to="/narrative">
                    Narrative
                  </HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};

export default Navbar;

// Made with Bob
