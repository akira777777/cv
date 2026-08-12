# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.js >> Theme Switching & Settings Panel >> toggles dark mode via theme button and persists state
- Location: tests/theme.spec.js:4:3

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('html')
Expected pattern: /dark/
Received string:  "scroll-smooth"
Timeout: 5000ms

Call log:
  - Expect "toHaveClass" with timeout 5000ms
  - waiting for locator('html')
    14 × locator resolved to <html lang="en" class="scroll-smooth">…</html>
       - unexpected value "scroll-smooth"

```

```yaml
- document:
  - link "Skip to main content":
    - /url: "#main-content"
  - navigation
  - main
  - contentinfo
  - button "Scroll back to top": arrow_upward
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Theme Switching & Settings Panel', () => {
  4  |   test('toggles dark mode via theme button and persists state', async ({ page }) => {
  5  |     await page.goto('/index.html');
  6  | 
  7  |     const themeBtn = page.locator('.theme-toggle-btn, [data-theme-toggle]').first();
  8  |     await expect(themeBtn).toBeVisible();
  9  | 
  10 |     const htmlElement = page.locator('html');
  11 |     const wasDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
  12 | 
  13 |     await themeBtn.click();
  14 |     await page.waitForTimeout(400);
  15 | 
  16 |     if (wasDark) {
  17 |       await expect(htmlElement).not.toHaveClass(/dark/);
  18 |     } else {
> 19 |       await expect(htmlElement).toHaveClass(/dark/);
     |                                 ^ Error: expect(locator).toHaveClass(expected) failed
  20 |     }
  21 | 
  22 |     // Check localStorage persistence on reload
  23 |     await page.reload();
  24 |     const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  25 |     expect(savedTheme).toBeTruthy();
  26 |   });
  27 | });
  28 | 
```