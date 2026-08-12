const { test, expect } = require('@playwright/test');

async function clickNavLink(page, href) {
  // Brand logo for index.html is in header bar on all screen sizes
  if (href === 'index.html') {
    const brandLogo = page.locator('nav a[href="index.html"]').first();
    await brandLogo.click();
    return;
  }

  const mobileToggle = page.locator('#mobile-menu-toggle');
  const isMobile = await mobileToggle.isVisible().catch(() => false);

  if (isMobile) {
    const mobileMenu = page.locator('#mobile-menu');
    const isHidden = await mobileMenu.evaluate(el => el.classList.contains('hidden')).catch(() => false);
    if (isHidden) {
      await mobileToggle.click();
      await expect(mobileMenu).not.toHaveClass(/hidden/);
    }
    const mobileLink = page.locator(`#mobile-menu a[href="${href}"]`).first();
    await mobileLink.click();
    return;
  }

  const navLink = page.locator(`nav a[href="${href}"]`).first();
  await navLink.click();
}

test.describe('Navigation & Core Page Structure', () => {
  test('index.html has correct title, meta, and landmark elements', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page).toHaveTitle(/Elizaveta Vakalova/);
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('navigation bar links route correctly between pages', async ({ page }) => {
    await page.goto('/index.html');
    
    // Click Work link
    await clickNavLink(page, 'work.html');
    await expect(page).toHaveURL(/.*work.html/);
    await expect(page.locator('h1')).toContainText('Selected Works');

    // Click Process link
    await clickNavLink(page, 'process.html');
    await expect(page).toHaveURL(/.*process.html/);
    await expect(page.locator('h1')).toContainText('Design Process');

    // Click Contact link
    await clickNavLink(page, 'contact.html');
    await expect(page).toHaveURL(/.*contact.html/);
    await expect(page.locator('h1')).toContainText('create something meaningful');

    // Click Brand/Home link
    await clickNavLink(page, 'index.html');
    await expect(page).toHaveURL(/.*index.html/);
  });

  test('back to top button becomes visible on scroll and scrolls to top', async ({ page }) => {
    await page.goto('/index.html');
    
    await page.evaluate(() => {
      window.scrollTo(0, 1500);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(400);

    const backToTop = page.locator('#back-to-top');
    await expect(backToTop).toBeVisible();

    await backToTop.click();
    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(200);
  });
});
