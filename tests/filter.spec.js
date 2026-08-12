const { test, expect } = require('@playwright/test');

test.describe('Work Portfolio Filter Chips', () => {
  test('filters projects by category on work.html', async ({ page }) => {
    await page.goto('/work.html');

    // Click Brand Identity filter chip
    const brandChip = page.locator('.filter-chip', { hasText: 'Brand Identity' }).first();
    await brandChip.click();
    await page.waitForTimeout(300);

    await expect(brandChip).toHaveClass(/active/);

    // Verify Brand Identity project (aura) is displayed
    const auraCard = page.locator('#aura');
    await expect(auraCard).toBeVisible();

    // Click Product Design filter chip
    const productChip = page.locator('.filter-chip', { hasText: 'Product Design' }).first();
    await productChip.click();
    await page.waitForTimeout(300);

    await expect(productChip).toHaveClass(/active/);
    const astroCard = page.locator('#astro');
    await expect(astroCard).toBeVisible();

    // Click All filter chip
    const allChip = page.locator('.filter-chip', { hasText: 'All' }).first();
    await allChip.click();
    await page.waitForTimeout(300);

    await expect(allChip).toHaveClass(/active/);
    await expect(astroCard).toBeVisible();
    await expect(auraCard).toBeVisible();
  });
});
