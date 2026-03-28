import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb as CarbonBreadcrumb, BreadcrumbItem } from '@carbon/react';

/**
 * Map of paths to display names
 */
const PATH_NAMES: Record<string, string> = {
  '': 'Home',
  'narrative': 'Narrative',
  'labs': 'Labs',
  'getting-started': 'Getting Started',
  'walkthrough': 'Walkthrough',
  'bob-rules': 'Bob Rules',
  'custom-modes': 'Custom Modes',
  'mcp': 'MCP',
  'bobshell': 'Bob Shell',
  'spec-driven-development': 'Spec-Driven Development',
  'sdlc': 'SDLC',
  'carbon-react': 'Carbon React',
  'cobol2java': 'COBOL to Java',
  'appmod': 'App Modernization',
  'ibmi': 'IBM i',
  'wxo-orchestrate': 'WxO Orchestrate',
};

/**
 * Breadcrumb component that shows navigation path
 */
const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  // Split path into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, idx) => {
    const path = '/' + pathSegments.slice(0, idx + 1).join('/');
    const isLast = idx === pathSegments.length - 1;
    const displayName = PATH_NAMES[segment] || segment;

    return {
      path,
      displayName,
      isLast,
    };
  });

  return (
    <div className="breadcrumb-container" style={{
      backgroundColor: 'var(--cds-layer)',
      borderBottom: '1px solid var(--cds-border-subtle)',
      padding: '0.75rem 1rem',
    }}>
      <CarbonBreadcrumb noTrailingSlash>
        {/* Always show Home as first item */}
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        
        {/* Show path segments */}
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.path} isCurrentPage={item.isLast}>
            {item.isLast ? (
              <span>{item.displayName}</span>
            ) : (
              <Link to={item.path}>{item.displayName}</Link>
            )}
          </BreadcrumbItem>
        ))}
      </CarbonBreadcrumb>
    </div>
  );
};

export default Breadcrumb;

// Made with Bob
