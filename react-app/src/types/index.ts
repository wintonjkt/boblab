// Type definitions for the application

export interface Lab {
  id: string;
  title: string;
  description: string;
  path: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Translation {
  [key: string]: string | Translation;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

// Language types
export type Language = 'en' | 'ko' | 'zh-CN' | 'zh-TW' | 'hi' | 'ms' | 'vi' | 'th' | 'id';

export interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => Promise<void>;
  t: (key: string, options?: any) => string;
  isLoading: boolean;
  error: Error | null;
}

// Progress tracking types
export interface ProgressData {
  [labId: string]: {
    completed: boolean;
    lastVisited?: string;
    progress?: number;
  };
}

export interface PageProgress {
  completedItems: string[];
  totalItems: number;
  percentage: number;
}

export interface UseProgressReturn {
  markComplete: (pageId: string, itemId: string) => void;
  markIncomplete: (pageId: string, itemId: string) => void;
  isComplete: (pageId: string, itemId: string) => boolean;
  getProgress: (pageId: string) => PageProgress;
  clearProgress: (pageId: string) => void;
  getAllProgress: () => Record<string, string[]>;
}

// Made with Bob
