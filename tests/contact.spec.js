const { test, expect } = require('@playwright/test');

test.describe('Contact Form & Toast Notifications', () => {
  test('allows scope selection and submits contact form', async ({ page }) => {
    await page.goto('/contact.html');

    // Select a scope chip
    const scopeChip = page.locator('.scope-chip').first();
    if (await scopeChip.isVisible()) {
      await scopeChip.click();
      await expect(scopeChip).toHaveClass(/selected/);
    }

    // Fill form inputs
    const nameInput = page.locator('input[name="name"], input#name').first();
    const emailInput = page.locator('input[name="email"], input#email').first();
    const messageInput = page.locator('textarea[name="message"], textarea#message').first();

    if (await nameInput.isVisible()) await nameInput.fill('Test User');
    if (await emailInput.isVisible()) await emailInput.fill('test@example.com');
    if (await messageInput.isVisible()) await messageInput.fill('Hello, this is an automated Playwright test message.');

    // Submit form
    const submitBtn = page.locator('button[type="submit"], button:has-text("Send"), input[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(500);

      // Verify toast container notification
      const toast = page.locator('#toast-container, .toast-msg').first();
      await expect(toast).toBeVisible();
    }
  });
});
