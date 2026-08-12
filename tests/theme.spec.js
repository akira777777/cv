const { test, expect } = require('@playwright/test');

test.describe('Theme Switching & Settings Panel', () => {
  test('toggles dark mode via theme button and persists state', async ({ page }) => {
    await page.goto('/index.html');

    const themeBtn = page.locator('.theme-toggle-btn, [data-theme-toggle]').first();
    await expect(themeBtn).toBeVisible();

    const htmlElement = page.locator('html');
    const wasDark = await htmlElement.evaluate(el => el.classList.contains('dark'));

    await themeBtn.click();
    await page.waitForTimeout(400);

    if (wasDark) {
      await expect(htmlElement).not.toHaveClass(/dark/);
    } else {
      await expect(htmlElement).toHaveClass(/dark/);
    }

    // Check localStorage persistence on reload
    await page.reload();
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBeTruthy();
  });
});
