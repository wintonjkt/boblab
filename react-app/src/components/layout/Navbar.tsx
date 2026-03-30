import React from 'react';
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
  OverflowMenu,
  OverflowMenuItem,
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

  const handleLanguageChange = async (lang: Language) => {
    try {
      await changeLanguage(lang);
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
              <OverflowMenu
                renderIcon={Translate}
                iconDescription="Change language"
                flipped
                aria-label="Language selector"
              >
                {LANGUAGE_OPTIONS.map(option => (
                  <OverflowMenuItem
                    key={option.code}
                    itemText={
                      <div>
                        <div style={{ fontWeight: language === option.code ? 600 : 400 }}>
                          {option.nativeName}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                          {option.name}
                        </div>
                      </div>
                    }
                    onClick={() => handleLanguageChange(option.code)}
                    hasDivider={false}
                  />
                ))}
              </OverflowMenu>

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
