import { Page, expect } from '@playwright/test';

/**
 * Helper functions for Playwright tests
 */

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(
  page: Page,
  name: string,
  options?: { fullPage?: boolean }
): Promise<void> {
  await page.screenshot({
    path: `test-results/screenshots/${name}.png`,
    fullPage: options?.fullPage ?? false,
  });
}

/**
 * Navigate to a path and wait for it to load
 */
export async function navigateAndWait(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await waitForPageLoad(page);
}

/**
 * Get the current theme from the document
 */
export async function getCurrentTheme(page: Page): Promise<string> {
  return await page.evaluate(() => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
    return 'system';
  });
}

/**
 * Wait for theme to change
 */
export async function waitForThemeChange(page: Page, expectedTheme: string): Promise<void> {
  await page.waitForFunction(
    (theme) => {
      const html = document.documentElement;
      if (theme === 'dark') return html.classList.contains('dark');
      if (theme === 'light') return html.classList.contains('light');
      return !html.classList.contains('dark') && !html.classList.contains('light');
    },
    expectedTheme,
    { timeout: 5000 }
  );
}

/**
 * Get the current language from localStorage
 */
export async function getCurrentLanguage(page: Page): Promise<string> {
  return await page.evaluate(() => {
    return localStorage.getItem('language') || 'en';
  });
}

/**
 * Wait for language to change
 */
export async function waitForLanguageChange(page: Page, expectedLang: string): Promise<void> {
  await page.waitForFunction(
    (lang) => {
      return localStorage.getItem('language') === lang;
    },
    expectedLang,
    { timeout: 5000 }
  );
}

/**
 * Check if element is visible in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
  await page.waitForTimeout(500); // Wait for smooth scroll
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Additional wait for animations
}

/**
 * Click and wait for navigation
 */
export async function clickAndWaitForNavigation(page: Page, selector: string): Promise<void> {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click(selector),
  ]);
  await page.waitForTimeout(500);
}

/**
 * Get all visible text content from a selector
 */
export async function getTextContent(page: Page, selector: string): Promise<string> {
  const element = await page.locator(selector).first();
  return (await element.textContent()) || '';
}

/**
 * Check if text exists on page
 */
export async function hasText(page: Page, text: string): Promise<boolean> {
  try {
    await page.getByText(text, { exact: false }).first().waitFor({ timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for element to be visible
 */
export async function waitForElement(page: Page, selector: string, timeout = 10000): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Get viewport size
 */
export async function getViewportSize(page: Page): Promise<{ width: number; height: number }> {
  return await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
}

/**
 * Set viewport size
 */
export async function setViewportSize(
  page: Page,
  width: number,
  height: number
): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(500); // Wait for resize
}

/**
 * Check if mobile menu is visible
 */
export async function isMobileMenuVisible(page: Page): Promise<boolean> {
  try {
    const hamburger = page.locator('[aria-label*="menu" i], .hamburger, .mobile-menu-button');
    return await hamburger.isVisible();
  } catch {
    return false;
  }
}

/**
 * Open mobile menu
 */
export async function openMobileMenu(page: Page): Promise<void> {
  const hamburger = page.locator('[aria-label*="menu" i], .hamburger, .mobile-menu-button').first();
  await hamburger.click();
  await page.waitForTimeout(500); // Wait for menu animation
}

/**
 * Close mobile menu
 */
export async function closeMobileMenu(page: Page): Promise<void> {
  const closeButton = page.locator('[aria-label*="close" i], .close-menu').first();
  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(500);
  }
}

/**
 * Verify page title
 */
export async function verifyPageTitle(page: Page, expectedTitle: string): Promise<void> {
  await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
}

/**
 * Verify URL contains path
 */
export async function verifyURL(page: Page, expectedPath: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(expectedPath));
}

/**
 * Clear localStorage
 */
export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}

/**
 * Clear sessionStorage
 */
export async function clearSessionStorage(page: Page): Promise<void> {
  await page.evaluate(() => sessionStorage.clear());
}

/**
 * Reload page and wait
 */
export async function reloadAndWait(page: Page): Promise<void> {
  await page.reload();
  await waitForPageLoad(page);
}

// Made with Bob
