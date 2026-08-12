const { test, expect } = require('@playwright/test');

test.describe('Mobile Navigation Drawer & Responsive Layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('toggles mobile menu drawer on hamburger button click', async ({ page }) => {
    await page.goto('/index.html');

    const mobileToggle = page.locator('#mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    await expect(mobileToggle).toBeVisible();
    await expect(mobileMenu).toHaveClass(/hidden/);

    // Open mobile menu
    await mobileToggle.click();
    await page.waitForTimeout(300);

    await expect(mobileMenu).not.toHaveClass(/hidden/);
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'true');

    // Close mobile menu
    await mobileToggle.click();
    await page.waitForTimeout(300);

    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
