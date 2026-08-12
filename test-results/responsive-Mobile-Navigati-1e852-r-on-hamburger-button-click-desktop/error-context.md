# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Mobile Navigation Drawer & Responsive Layout >> toggles mobile menu drawer on hamburger button click
- Location: tests/responsive.spec.js:6:3

# Error details

```
Error: expect(locator).not.toHaveClass(expected) failed

Locator: locator('#mobile-menu')
Expected pattern: not /hidden/
Received string: "hidden md:hidden bg-surface-container/95 backdrop-blur-xl border-b border-outline/10 px-6 py-6"
Timeout: 5000ms

Call log:
  - Expect "not toHaveClass" with timeout 5000ms
  - waiting for locator('#mobile-menu')
    14 × locator resolved to <div id="mobile-menu" class="hidden md:hidden bg-surface-container/95 backdrop-blur-xl border-b border-outline/10 px-6 py-6">…</div>
       - unexpected value "hidden md:hidden bg-surface-container/95 backdrop-blur-xl border-b border-outline/10 px-6 py-6"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- navigation:
  - link "Elizaveta Vakalova":
    - /url: index.html
  - button "Switch to Dark Mode": dark_mode
  - button "Open Canvas Settings Panel": settings
  - button "Toggle Mobile Navigation Menu": menu
- main:
  - heading "Elizaveta Vakalova" [level=1]
  - paragraph: Product · Brand · Campaign
  - text: Prague / Available
  - paragraph: I craft experiences and visual systems that move people to act.
  - link "View selected work arrow_forward":
    - /url: work.html
  - img "Portrait of Elizaveta Vakalova"
  - text: 01 01
  - heading "Astro Analytics" [level=2]
  - paragraph: Dashboard UX/UI
  - paragraph: Analytics platform that turns complex data into clear decisions for growing teams.
  - text: arrow_outward +35% increase in active users
  - link "Astro Analytics Dashboard Interface View Case Study":
    - /url: javascript:void(0)
    - img "Astro Analytics Dashboard Interface"
    - text: View Case Study
  - link "AURA Identity Branding View Case Study":
    - /url: javascript:void(0)
    - img "AURA Identity Branding"
    - text: View Case Study
  - text: 02 02
  - heading "AURA Identity" [level=2]
  - paragraph: Brand Identity
  - paragraph: Minimal, timeless identity for a wellness brand rooted in clarity and calm.
  - text: arrow_outward +27% lift in brand recognition 03 03
  - heading "Alpine Retreat Editorial" [level=2]
  - paragraph: Editorial Design
  - paragraph: Architecture editorial exploring space, light, and the quiet power of place.
  - text: arrow_outward 2.4× longer average read time
  - link "Alpine Retreat Editorial Spread View Project":
    - /url: javascript:void(0)
    - img "Alpine Retreat Editorial Spread"
    - text: View Project
  - link "3D Motion Reel play_circle View 3D Case Study":
    - /url: javascript:void(0)
  - text: 04 04
  - heading "Mist & Chrome" [level=2]
  - paragraph: 3D Motion & Visual Art
  - paragraph: Organic forest atmosphere meets fluid liquid-chrome typography in an immersive 3D motion exploration.
  - text: arrow_outward 4.5M campaign impressions
  - paragraph: I work across product, brand, editorial, and campaigns—bringing strategy, craft, and a user-centered mindset to every detail.
  - link "About my process arrow_forward":
    - /url: process.html
- contentinfo:
  - heading "Have a project in mind? Let's create something meaningful." [level=3]
  - link "Start a project":
    - /url: contact.html
  - link "Email":
    - /url: mailto:hello@vakalova.design
  - link "LinkedIn":
    - /url: redirect.html?url=https://linkedin.com
  - link "Instagram":
    - /url: redirect.html?url=https://instagram.com
  - link "Twitter":
    - /url: redirect.html?url=https://x.com
  - paragraph: © 2026 Elizaveta Vakalova
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Mobile Navigation Drawer & Responsive Layout', () => {
  4  |   test.use({ viewport: { width: 390, height: 844 } });
  5  | 
  6  |   test('toggles mobile menu drawer on hamburger button click', async ({ page }) => {
  7  |     await page.goto('/index.html');
  8  | 
  9  |     const mobileToggle = page.locator('#mobile-menu-toggle');
  10 |     const mobileMenu = page.locator('#mobile-menu');
  11 | 
  12 |     await expect(mobileToggle).toBeVisible();
  13 |     await expect(mobileMenu).toHaveClass(/hidden/);
  14 | 
  15 |     // Open mobile menu
  16 |     await mobileToggle.click();
  17 |     await page.waitForTimeout(300);
  18 | 
> 19 |     await expect(mobileMenu).not.toHaveClass(/hidden/);
     |                                  ^ Error: expect(locator).not.toHaveClass(expected) failed
  20 |     await expect(mobileToggle).toHaveAttribute('aria-expanded', 'true');
  21 | 
  22 |     // Close mobile menu
  23 |     await mobileToggle.click();
  24 |     await page.waitForTimeout(300);
  25 | 
  26 |     await expect(mobileMenu).toHaveClass(/hidden/);
  27 |     await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
  28 |   });
  29 | });
  30 | 
```