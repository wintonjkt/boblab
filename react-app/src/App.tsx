import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Home from '@/pages/Home';
import Narrative from '@/pages/Narrative';
import { Loading, Grid, Column, Button } from '@carbon/react';
import { ArrowLeft } from '@carbon/icons-react';

// Lazy load lab pages for better performance
const GettingStarted = lazy(() => import('@/pages/labs/GettingStarted'));
const Walkthrough = lazy(() => import('@/pages/labs/Walkthrough'));
const AppMod = lazy(() => import('@/pages/labs/AppMod'));
const IBMi = lazy(() => import('@/pages/labs/IBMi'));
const SDLC = lazy(() => import('@/pages/labs/SDLC'));
const BobShell = lazy(() => import('@/pages/labs/BobShell'));
const BobRules = lazy(() => import('@/pages/labs/BobRules'));
const CustomModes = lazy(() => import('@/pages/labs/CustomModes'));
const MCP = lazy(() => import('@/pages/labs/MCP'));
const CarbonReact = lazy(() => import('@/pages/labs/CarbonReact'));
const Cobol2Java = lazy(() => import('@/pages/labs/Cobol2Java'));
const WxoOrchestrate = lazy(() => import('@/pages/labs/WxoOrchestrate'));
const SpecDrivenDevelopment = lazy(() => import('@/pages/labs/SpecDrivenDevelopment'));

/**
 * Loading fallback component
 */
const LoadingFallback: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px' 
  }}>
    <Loading description="Loading page..." withOverlay={false} />
  </div>
);

/**
 * Layout component that wraps all pages
 */
const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Breadcrumb />
      <main className="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Main App component with routing
 */
const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Home and Narrative pages */}
              <Route index element={<Home />} />
              <Route path="narrative" element={<Narrative />} />
              
              {/* Lab pages */}
              <Route path="labs">
                <Route path="getting-started" element={<GettingStarted />} />
                <Route path="walkthrough" element={<Walkthrough />} />
                <Route path="appmod" element={<AppMod />} />
                <Route path="ibmi" element={<IBMi />} />
                <Route path="sdlc" element={<SDLC />} />
                <Route path="bobshell" element={<BobShell />} />
                <Route path="bob-rules" element={<BobRules />} />
                <Route path="custom-modes" element={<CustomModes />} />
                <Route path="mcp" element={<MCP />} />
                <Route path="carbon-react" element={<CarbonReact />} />
                <Route path="cobol2java" element={<Cobol2Java />} />
                <Route path="wxo-orchestrate" element={<WxoOrchestrate />} />
                <Route path="spec-driven-development" element={<SpecDrivenDevelopment />} />
              </Route>
              
              {/* 404 fallback */}
              <Route path="*" element={
                <Grid>
                  <Column sm={4} md={8} lg={16}>
                    <div style={{
                      textAlign: 'center',
                      padding: 'var(--cds-spacing-09) var(--cds-spacing-05)'
                    }}>
                      <h1 style={{
                        fontSize: '3rem',
                        marginBottom: 'var(--cds-spacing-05)',
                        color: 'var(--cds-text-primary)'
                      }}>
                        404
                      </h1>
                      <h2 style={{
                        fontSize: '1.5rem',
                        marginBottom: 'var(--cds-spacing-05)',
                        color: 'var(--cds-text-secondary)'
                      }}>
                        Page Not Found
                      </h2>
                      <p style={{
                        marginBottom: 'var(--cds-spacing-07)',
                        color: 'var(--cds-text-secondary)'
                      }}>
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                      <Button
                        as={Link}
                        to="/"
                        renderIcon={ArrowLeft}
                        kind="primary"
                      >
                        Back to Home
                      </Button>
                    </div>
                  </Column>
                </Grid>
              } />
            </Route>
          </Routes>
        </I18nProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;

// Made with Bob
