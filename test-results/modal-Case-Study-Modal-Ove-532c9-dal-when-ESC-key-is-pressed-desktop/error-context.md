# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modal.spec.js >> Case Study Modal Overlays >> closes case study modal when ESC key is pressed
- Location: tests/modal.spec.js:24:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('#case-study-modal, .case-study-modal-container').first()
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('#case-study-modal, .case-study-modal-container').first()
    14 × locator resolved to <div id="case-study-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-xl">…</div>
       - unexpected value "visible"

```

```yaml
- button "Close modal": close
- text: Brand Identity • 2024
- heading "AURA Identity" [level=2]
- paragraph: Brand Identity & Visual System
- img "AURA Identity"
- text: +27% Brand Recognition Lift 3.2M Launch Impressions 14 Design Awards
- heading "Project Overview" [level=4]
- paragraph: AURA is a minimalist holistic wellness brand based in Scandinavia. The design system leverages natural typography, organic material palettes, and restrained spatial hierarchy to express calm and balance.
- heading "Key Solution Highlights" [level=4]
- list:
  - listitem: Custom bespoke display typography paired with tactile texture rules
  - listitem: Tactile eco-friendly packaging specifications using zero-plastic craft stock
  - listitem: Omnichannel digital brand portal and interactive styleguide
- heading "Role & Responsibility" [level=4]
- paragraph: Creative Director & Brand Designer
- heading "Key Deliverables" [level=4]
- paragraph: Brand Strategy, Visual Identity, Packaging Design, Digital Guidelines, Merchandise
- button "west Previous Case"
- button "Next Case east"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Case Study Modal Overlays', () => {
  4  |   test('opens case study modal on project click and closes via button', async ({ page }) => {
  5  |     await page.goto('/index.html');
  6  | 
  7  |     // Click Astro project card
  8  |     const astroCard = page.locator('[data-case-study="astro"]').first();
  9  |     await astroCard.scrollIntoViewIfNeeded();
  10 |     await astroCard.click();
  11 |     await page.waitForTimeout(400);
  12 | 
  13 |     const modal = page.locator('#case-study-modal, .case-study-modal-container').first();
  14 |     await expect(modal).toBeVisible();
  15 | 
  16 |     // Close modal using close button
  17 |     const closeBtn = page.locator('#close-modal, [data-close="true"]').first();
  18 |     await closeBtn.click();
  19 |     await page.waitForTimeout(400);
  20 | 
  21 |     await expect(modal).not.toBeVisible();
  22 |   });
  23 | 
  24 |   test('closes case study modal when ESC key is pressed', async ({ page }) => {
  25 |     await page.goto('/index.html');
  26 | 
  27 |     const auraCard = page.locator('[data-case-study="aura"]').first();
  28 |     await auraCard.scrollIntoViewIfNeeded();
  29 |     await auraCard.click();
  30 |     await page.waitForTimeout(400);
  31 | 
  32 |     const modal = page.locator('#case-study-modal, .case-study-modal-container').first();
  33 |     await expect(modal).toBeVisible();
  34 | 
  35 |     // Press Escape
  36 |     await page.keyboard.press('Escape');
  37 |     await page.waitForTimeout(400);
  38 | 
> 39 |     await expect(modal).not.toBeVisible();
     |                             ^ Error: expect(locator).not.toBeVisible() failed
  40 |   });
  41 | });
  42 | 
```