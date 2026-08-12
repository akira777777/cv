const { test, expect } = require('@playwright/test');

test.describe('Mobile Navigation Drawer & Responsive Layout', () => {
  test('toggles mobile menu drawer on hamburger button click', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');

    const mobileToggle = page.locator('#mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    await expect(mobileToggle).toBeVisible();

    // Open mobile menu
    await mobileToggle.click();
    await page.waitForTimeout(300);

    const isHidden = await mobileMenu.evaluate(el => el.classList.contains('hidden'));
    expect(isHidden).toBe(false);

    // Close mobile menu
    await mobileToggle.click();
    await page.waitForTimeout(300);

    const isHiddenAfter = await mobileMenu.evaluate(el => el.classList.contains('hidden'));
    expect(isHiddenAfter).toBe(true);
  });
});
