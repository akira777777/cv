const { test, expect } = require('@playwright/test');

test.describe('Case Study Modal Overlays', () => {
  test('opens case study modal on project click and closes via button', async ({ page }) => {
    await page.goto('/index.html');

    // Click Astro project card
    const astroCard = page.locator('[data-case-study="astro"]').first();
    await astroCard.scrollIntoViewIfNeeded();
    await astroCard.click({ force: true });
    await page.waitForTimeout(400);

    const modal = page.locator('#case-study-modal, .case-study-modal-container').first();
    await expect(modal).toBeVisible();

    // Close modal using close button
    const closeBtn = page.locator('#modal-close-btn, #close-modal, [data-close="true"]').first();
    await closeBtn.click({ force: true });
    await page.waitForTimeout(400);

    const isHidden = await page.evaluate(() => {
      const el = document.querySelector('#case-study-modal, .case-study-modal-container');
      return !el || el.classList.contains('hidden') || getComputedStyle(el).display === 'none';
    });
    expect(isHidden).toBe(true);
  });

  test('closes case study modal when ESC key is pressed', async ({ page }) => {
    await page.goto('/index.html');

    const auraCard = page.locator('[data-case-study="aura"]').first();
    await auraCard.scrollIntoViewIfNeeded();
    await auraCard.click({ force: true });
    await page.waitForTimeout(400);

    const modal = page.locator('#case-study-modal, .case-study-modal-container').first();
    await expect(modal).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const isHidden = await page.evaluate(() => {
      const el = document.querySelector('#case-study-modal, .case-study-modal-container');
      return !el || el.classList.contains('hidden') || getComputedStyle(el).display === 'none';
    });
    expect(isHidden).toBe(true);
  });
});
