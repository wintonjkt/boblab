import { useState, useCallback } from 'react';
import { UseProgressReturn, PageProgress } from '@/types';

const PROGRESS_KEY_PREFIX = 'progress-';

/**
 * Save progress data to localStorage for a specific page
 */
const saveProgress = (pageId: string, completedItems: string[]): void => {
  try {
    const key = `${PROGRESS_KEY_PREFIX}${pageId}`;
    localStorage.setItem(key, JSON.stringify(completedItems));
  } catch (error) {
    console.warn(`Failed to save progress for page ${pageId}:`, error);
  }
};

/**
 * Get all progress data from localStorage
 */
const getAllStoredProgress = (): Record<string, string[]> => {
  const allProgress: Record<string, string[]> = {};
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PROGRESS_KEY_PREFIX)) {
        const pageId = key.substring(PROGRESS_KEY_PREFIX.length);
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            allProgress[pageId] = parsed;
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to read all progress:', error);
  }
  
  return allProgress;
};

/**
 * Custom hook for tracking progress per page
 *
 * Tracks completion of individual items within pages using localStorage.
 * Each page has its own progress stored with key format: `progress-{pageId}`
 *
 * Features:
 * - Per-page progress tracking
 * - localStorage persistence
 * - Completion percentage calculation
 * - Mark items as complete/incomplete
 * - Clear progress for a page
 * - Get all progress data
 *
 * @example
 * ```tsx
 * const { markComplete, isComplete, getProgress } = useProgress();
 *
 * // Mark an item as complete
 * markComplete('lab-1', 'step-1');
 *
 * // Check if an item is complete
 * const completed = isComplete('lab-1', 'step-1');
 *
 * // Get progress for a page
 * const { completedItems, percentage } = getProgress('lab-1');
 * ```
 */
export const useProgress = (): UseProgressReturn => {
  // Store progress state in memory for reactive updates
  const [progressState, setProgressState] = useState<Record<string, string[]>>(() => {
    return getAllStoredProgress();
  });

  /**
   * Mark an item as complete for a specific page
   */
  const markComplete = useCallback((pageId: string, itemId: string) => {
    setProgressState(prev => {
      const pageProgress = prev[pageId] || [];
      
      // Don't add if already complete
      if (pageProgress.includes(itemId)) {
        return prev;
      }
      
      const updated = [...pageProgress, itemId];
      saveProgress(pageId, updated);
      
      return {
        ...prev,
        [pageId]: updated,
      };
    });
  }, []);

  /**
   * Mark an item as incomplete for a specific page
   */
  const markIncomplete = useCallback((pageId: string, itemId: string) => {
    setProgressState(prev => {
      const pageProgress = prev[pageId] || [];
      const updated = pageProgress.filter(id => id !== itemId);
      
      saveProgress(pageId, updated);
      
      return {
        ...prev,
        [pageId]: updated,
      };
    });
  }, []);

  /**
   * Check if an item is complete for a specific page
   */
  const isComplete = useCallback((pageId: string, itemId: string): boolean => {
    const pageProgress = progressState[pageId] || [];
    return pageProgress.includes(itemId);
  }, [progressState]);

  /**
   * Get progress information for a specific page
   */
  const getProgress = useCallback((pageId: string): PageProgress => {
    const completedItems = progressState[pageId] || [];
    const totalItems = completedItems.length; // This is just completed count
    const percentage = totalItems > 0 ? 100 : 0; // If we don't know total, show 100% if any completed
    
    return {
      completedItems,
      totalItems,
      percentage,
    };
  }, [progressState]);

  /**
   * Clear all progress for a specific page
   */
  const clearProgress = useCallback((pageId: string) => {
    try {
      const key = `${PROGRESS_KEY_PREFIX}${pageId}`;
      localStorage.removeItem(key);
      
      setProgressState(prev => {
        const updated = { ...prev };
        delete updated[pageId];
        return updated;
      });
    } catch (error) {
      console.warn(`Failed to clear progress for page ${pageId}:`, error);
    }
  }, []);

  /**
   * Get all progress data
   */
  const getAllProgress = useCallback((): Record<string, string[]> => {
    return { ...progressState };
  }, [progressState]);

  return {
    markComplete,
    markIncomplete,
    isComplete,
    getProgress,
    clearProgress,
    getAllProgress,
  };
};

// Made with Bob
