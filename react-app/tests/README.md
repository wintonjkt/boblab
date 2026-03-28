# End-to-End Testing with Playwright

This directory contains end-to-end (E2E) tests for the Bob Lab React application using Playwright.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing New Tests](#writing-new-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The E2E test suite covers:

- **Home Page**: Page loading, feature cards, navigation
- **Navigation**: Links, breadcrumbs, 404 handling
- **Theme Toggle**: Light/dark/system modes, persistence
- **Language Selector**: Multi-language support (English, Korean, Chinese), persistence
- **Narrative Page**: Content loading, sidebar navigation
- **Lab Pages**: Individual lab page loading and navigation
- **Responsive Design**: Mobile, tablet, and desktop viewports
- **Accessibility**: Heading hierarchy, ARIA labels, navigation
- **Performance**: Page load times

## Setup

### Prerequisites

- Node.js or Bun installed
- Development server running on `http://localhost:3002`

### Installation

Playwright and browsers are already installed. If you need to reinstall:

```bash
# Install Playwright
bun add -D @playwright/test

# Install browsers
bunx playwright install
```

## Running Tests

### All Tests

Run all tests in headless mode:

```bash
bun run test:e2e
```

### Headed Mode

Run tests with browser visible:

```bash
bun run test:e2e:headed
```

### Debug Mode

Run tests in debug mode with Playwright Inspector:

```bash
bun run test:e2e:debug
```

### UI Mode

Run tests with Playwright UI (interactive mode):

```bash
bun run test:e2e:ui
```

### Specific Browser

Run tests on a specific browser:

```bash
# Chromium only
bun run test:e2e:chromium

# Firefox only
bun run test:e2e:firefox

# WebKit only
bun run test:e2e:webkit
```

### View Test Report

After running tests, view the HTML report:

```bash
bun run test:e2e:report
```

### Run Specific Test File

```bash
bunx playwright test tests/e2e/app.spec.ts
```

### Run Specific Test

```bash
bunx playwright test -g "should load home page"
```

## Test Structure

```
tests/
├── e2e/                    # End-to-end test files
│   └── app.spec.ts        # Main application tests
├── utils/                  # Test utilities and helpers
│   └── helpers.ts         # Helper functions
└── README.md              # This file
```

### Test Organization

Tests are organized into describe blocks by feature:

- **Home Page**: Tests for the home page
- **Navigation**: Tests for navigation functionality
- **Theme Toggle**: Tests for theme switching
- **Language Selector**: Tests for language switching
- **Narrative Page**: Tests for the narrative page
- **Lab Pages**: Tests for individual lab pages
- **Responsive Design**: Tests for different viewport sizes
- **Accessibility**: Tests for accessibility features
- **Performance**: Tests for page load performance

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { navigateAndWait, takeScreenshot } from '../utils/helpers';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate to page
    await navigateAndWait(page, '/path');
    
    // Perform actions
    await page.click('button');
    
    // Assert expectations
    await expect(page.locator('h1')).toBeVisible();
    
    // Take screenshot
    await takeScreenshot(page, 'feature-screenshot');
  });
});
```

### Using Helper Functions

The `helpers.ts` file provides utility functions:

```typescript
// Navigation
await navigateAndWait(page, '/path');
await clickAndWaitForNavigation(page, 'a[href="/path"]');

// Theme
const theme = await getCurrentTheme(page);
await waitForThemeChange(page, 'dark');

// Language
const lang = await getCurrentLanguage(page);
await waitForLanguageChange(page, 'ko');

// Viewport
await setViewportSize(page, 375, 667);
const size = await getViewportSize(page);

// Screenshots
await takeScreenshot(page, 'name', { fullPage: true });

// Waiting
await waitForPageLoad(page);
await waitForElement(page, 'selector');

// Mobile menu
const isMobile = await isMobileMenuVisible(page);
await openMobileMenu(page);

// Verification
await verifyURL(page, '/expected-path');
await verifyPageTitle(page, 'Expected Title');
```

### Adding Screenshots

Screenshots are automatically saved to `test-results/screenshots/`:

```typescript
// Basic screenshot
await takeScreenshot(page, 'my-feature');

// Full page screenshot
await takeScreenshot(page, 'full-page', { fullPage: true });
```

## Best Practices

### 1. Use Descriptive Test Names

```typescript
// Good
test('should display error message when form is invalid', async ({ page }) => {});

// Bad
test('test form', async ({ page }) => {});
```

### 2. Wait for Elements Properly

```typescript
// Good - wait for element to be visible
await page.waitForSelector('button', { state: 'visible' });

// Better - use helper function
await waitForElement(page, 'button');

// Best - use Playwright's auto-waiting
await expect(page.locator('button')).toBeVisible();
```

### 3. Use Locators Wisely

```typescript
// Good - semantic selectors
await page.locator('button[aria-label="Submit"]').click();

// Better - role-based selectors
await page.getByRole('button', { name: 'Submit' }).click();

// Good - text-based selectors
await page.getByText('Submit').click();
```

### 4. Handle Async Operations

```typescript
// Always await async operations
await page.click('button');
await page.waitForLoadState('networkidle');
```

### 5. Take Screenshots for Visual Verification

```typescript
// Take screenshots at key points
await takeScreenshot(page, 'before-action');
await page.click('button');
await takeScreenshot(page, 'after-action');
```

### 6. Test Across Browsers

Tests run on Chromium, Firefox, and WebKit by default. Ensure your tests work across all browsers.

### 7. Keep Tests Independent

Each test should be independent and not rely on the state from previous tests.

```typescript
test.beforeEach(async ({ page }) => {
  // Reset state before each test
  await page.goto('/');
});
```

### 8. Use Test Fixtures

```typescript
test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup
    await navigateAndWait(page, '/feature');
  });

  test('test 1', async ({ page }) => {
    // Test implementation
  });

  test('test 2', async ({ page }) => {
    // Test implementation
  });
});
```

## Troubleshooting

### Tests Failing Due to Timeout

**Problem**: Tests timeout waiting for elements.

**Solution**:
- Increase timeout in `playwright.config.ts`
- Use proper wait strategies
- Check if dev server is running

```typescript
// Increase timeout for specific test
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // Test implementation
});
```

### Dev Server Not Running

**Problem**: Tests fail because dev server is not accessible.

**Solution**:
- Ensure dev server is running: `bun run dev`
- Check if port 3002 is available
- Verify `baseURL` in `playwright.config.ts`

### Flaky Tests

**Problem**: Tests pass sometimes and fail other times.

**Solution**:
- Add proper waits: `await page.waitForLoadState('networkidle')`
- Use `waitForElement()` helper
- Avoid hard-coded timeouts
- Use Playwright's auto-waiting features

```typescript
// Bad - flaky
await page.click('button');
await page.waitForTimeout(1000); // Hard-coded wait

// Good - reliable
await page.click('button');
await page.waitForLoadState('networkidle');
await expect(page.locator('.result')).toBeVisible();
```

### Element Not Found

**Problem**: Test fails with "Element not found" error.

**Solution**:
- Verify selector is correct
- Check if element is in viewport
- Wait for element to be visible
- Use browser inspector to find correct selector

```typescript
// Debug selector
const element = page.locator('button');
console.log('Element count:', await element.count());
console.log('Is visible:', await element.isVisible());
```

### Screenshots Not Saving

**Problem**: Screenshots are not being saved.

**Solution**:
- Ensure `test-results/screenshots/` directory exists
- Check file permissions
- Verify screenshot path in helper function

### Browser Not Installed

**Problem**: Error about missing browser.

**Solution**:
```bash
bunx playwright install
```

### Tests Running Too Slow

**Problem**: Test suite takes too long to run.

**Solution**:
- Run tests in parallel (default)
- Run specific test files
- Use `--project` flag to test single browser
- Optimize wait times

```bash
# Run only Chromium tests
bun run test:e2e:chromium

# Run specific test file
bunx playwright test tests/e2e/app.spec.ts
```

### Debugging Tests

**Use Playwright Inspector**:
```bash
bun run test:e2e:debug
```

**Use UI Mode**:
```bash
bun run test:e2e:ui
```

**Add Console Logs**:
```typescript
test('debug test', async ({ page }) => {
  console.log('Current URL:', page.url());
  const element = page.locator('button');
  console.log('Element count:', await element.count());
});
```

**Pause Test Execution**:
```typescript
test('pause test', async ({ page }) => {
  await page.pause(); // Opens Playwright Inspector
});
```

## Configuration

Test configuration is in `playwright.config.ts`:

- **Base URL**: `http://localhost:3002`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Timeouts**: 60s test timeout, 10s action timeout
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## CI/CD Integration

To run tests in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: bun install

- name: Install Playwright browsers
  run: bunx playwright install --with-deps

- name: Run tests
  run: bun run test:e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Test Runner](https://playwright.dev/docs/test-runners)

## Support

For issues or questions:
1. Check this README
2. Review Playwright documentation
3. Check test output and screenshots
4. Use debug mode to investigate