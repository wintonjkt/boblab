import React from 'react';
import { HeaderGlobalAction } from '@carbon/react';
import { Asleep, Light, Laptop } from '@carbon/icons-react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode } from '@/types';

/**
 * Theme toggle button component
 * Cycles through: light → dark → system → light
 */
const ThemeToggle: React.FC = () => {
  const { theme, themeMode, setTheme } = useTheme();

  const handleToggle = () => {
    // Cycle through theme modes: light → dark → system → light
    const nextMode: ThemeMode = 
      themeMode === 'light' ? 'dark' :
      themeMode === 'dark' ? 'system' :
      'light';
    
    setTheme(nextMode);
  };

  // Get icon based on current theme mode
  const getIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Light size={20} />;
      case 'dark':
        return <Asleep size={20} />;
      case 'system':
        return <Laptop size={20} />;
      default:
        return <Light size={20} />;
    }
  };

  // Get tooltip text
  const getTooltipText = () => {
    switch (themeMode) {
      case 'light':
        return 'Light mode (click for dark)';
      case 'dark':
        return 'Dark mode (click for system)';
      case 'system':
        return `System mode (${theme}) (click for light)`;
      default:
        return 'Toggle theme';
    }
  };

  return (
    <HeaderGlobalAction
      aria-label={getTooltipText()}
      tooltipAlignment="end"
      onClick={handleToggle}
    >
      {getIcon()}
    </HeaderGlobalAction>
  );
};

export default ThemeToggle;

// Made with Bob
