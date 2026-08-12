# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Navigation & Core Page Structure >> navigation bar links route correctly between pages
- Location: tests/navigation.spec.js:26:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="work.html"]').first()
    - locator resolved to <a href="work.html" class="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-all duration-300">Work</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    55 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "Elizaveta Vakalova" [ref=e5] [cursor=pointer]:
        - /url: index.html
      - generic [ref=e6]:
        - button "Switch to Dark Mode" [ref=e7] [cursor=pointer]:
          - generic [ref=e8]: dark_mode
        - button "Open Canvas Settings Panel" [ref=e9] [cursor=pointer]:
          - generic [ref=e10]: settings
        - button "Toggle Mobile Navigation Menu" [expanded] [active] [ref=e11] [cursor=pointer]:
          - generic [ref=e12]: menu
    - generic [ref=e14]:
      - link "Work" [ref=e15] [cursor=pointer]:
        - /url: work.html
      - link "About" [ref=e16] [cursor=pointer]:
        - /url: process.html
      - link "Contact" [ref=e17] [cursor=pointer]:
        - /url: contact.html
  - main [ref=e18]:
    - generic [ref=e20]:
      - generic [ref=e21]:
        - heading "Elizaveta Vakalova" [level=1] [ref=e22]: ElizavetaVakalova
        - paragraph [ref=e23]: Product · Brand · Campaign
        - generic [ref=e24]: Prague / Available
        - paragraph [ref=e27]: I craft experiences and visual systems that move people to act.
        - link "View selected work arrow_forward" [ref=e29] [cursor=pointer]:
          - /url: work.html
          - generic [ref=e30]: View selected work
          - generic [ref=e31]: arrow_forward
      - img "Portrait of Elizaveta Vakalova" [ref=e34]
    - generic [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: "01"
            - generic [ref=e40]: "01"
          - heading "Astro Analytics" [level=2] [ref=e42]
          - paragraph [ref=e43]: Dashboard UX/UI
          - paragraph [ref=e44]: Analytics platform that turns complex data into clear decisions for growing teams.
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: arrow_outward
              - generic [ref=e48]: +35%
            - generic [ref=e49]: increase in active users
        - link "Astro Analytics Dashboard Interface View Case Study" [ref=e50] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e51]:
            - img "Astro Analytics Dashboard Interface" [ref=e52]
            - generic [ref=e54]: View Case Study
      - generic [ref=e56]:
        - link "AURA Identity Branding View Case Study" [ref=e57] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e58]:
            - img "AURA Identity Branding" [ref=e59]
            - generic [ref=e61]: View Case Study
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: "02"
            - generic [ref=e66]: "02"
          - heading "AURA Identity" [level=2] [ref=e68]
          - paragraph [ref=e69]: Brand Identity
          - paragraph [ref=e70]: Minimal, timeless identity for a wellness brand rooted in clarity and calm.
          - generic [ref=e71]:
            - generic [ref=e72]:
              - generic [ref=e73]: arrow_outward
              - generic [ref=e74]: +27%
            - generic [ref=e75]: lift in brand recognition
      - generic [ref=e76]:
        - generic [ref=e77]:
          - generic [ref=e78]:
            - generic [ref=e79]: "03"
            - generic [ref=e80]: "03"
          - heading "Alpine Retreat Editorial" [level=2] [ref=e82]
          - paragraph [ref=e83]: Editorial Design
          - paragraph [ref=e84]: Architecture editorial exploring space, light, and the quiet power of place.
          - generic [ref=e85]:
            - generic [ref=e86]:
              - generic [ref=e87]: arrow_outward
              - generic [ref=e88]: 2.4×
            - generic [ref=e89]: longer average read time
        - link "Alpine Retreat Editorial Spread View Project" [ref=e90] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e91]:
            - img "Alpine Retreat Editorial Spread" [ref=e92]
            - generic [ref=e94]: View Project
      - generic [ref=e96]:
        - link "3D Motion Reel play_circle View 3D Case Study" [ref=e97] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e98]:
            - generic [ref=e100]: 3D Motion Reel
            - generic [ref=e105]:
              - generic [ref=e106]: play_circle
              - text: View 3D Case Study
        - generic [ref=e107]:
          - generic [ref=e108]:
            - generic [ref=e109]: "04"
            - generic [ref=e110]: "04"
          - heading "Mist & Chrome" [level=2] [ref=e112]
          - paragraph [ref=e113]: 3D Motion & Visual Art
          - paragraph [ref=e114]: Organic forest atmosphere meets fluid liquid-chrome typography in an immersive 3D motion exploration.
          - generic [ref=e115]:
            - generic [ref=e116]:
              - generic [ref=e117]: arrow_outward
              - generic [ref=e118]: 4.5M
            - generic [ref=e119]: campaign impressions
    - generic [ref=e122]:
      - paragraph [ref=e123]: I work across product, brand, editorial, and campaigns—bringing strategy, craft, and a user-centered mindset to every detail.
      - link "About my process arrow_forward" [ref=e124] [cursor=pointer]:
        - /url: process.html
        - generic [ref=e125]: About my process
        - generic [ref=e126]: arrow_forward
  - contentinfo [ref=e127]:
    - generic [ref=e128]:
      - generic [ref=e129]:
        - heading "Have a project in mind? Let's create something meaningful." [level=3] [ref=e130]
        - link "Start a project" [ref=e131] [cursor=pointer]:
          - /url: contact.html
      - generic [ref=e132]:
        - generic [ref=e133]:
          - link "Email" [ref=e134] [cursor=pointer]:
            - /url: mailto:hello@vakalova.design
          - link "LinkedIn" [ref=e135] [cursor=pointer]:
            - /url: redirect.html?url=https://linkedin.com
          - link "Instagram" [ref=e136] [cursor=pointer]:
            - /url: redirect.html?url=https://instagram.com
          - link "Twitter" [ref=e137] [cursor=pointer]:
            - /url: redirect.html?url=https://x.com
        - paragraph [ref=e138]: © 2026 Elizaveta Vakalova
  - button "Scroll back to top":
    - generic: arrow_upward
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | async function clickNavLink(page, href) {
  4  |   const mobileToggle = page.locator('#mobile-menu-toggle');
  5  |   if (await mobileToggle.isVisible()) {
  6  |     const mobileMenu = page.locator('#mobile-menu');
  7  |     if (await mobileMenu.evaluate(el => el.classList.contains('hidden'))) {
  8  |       await mobileToggle.click();
  9  |       await page.waitForTimeout(200);
  10 |     }
  11 |   }
  12 |   const link = page.locator(`a[href="${href}"]`).first();
> 13 |   await link.click();
     |              ^ Error: locator.click: Test timeout of 30000ms exceeded.
  14 | }
  15 | 
  16 | test.describe('Navigation & Core Page Structure', () => {
  17 |   test('index.html has correct title, meta, and landmark elements', async ({ page }) => {
  18 |     await page.goto('/index.html');
  19 |     await expect(page).toHaveTitle(/Elizaveta Vakalova/);
  20 |     const nav = page.locator('nav');
  21 |     await expect(nav).toBeVisible();
  22 |     const h1 = page.locator('h1');
  23 |     await expect(h1).toBeVisible();
  24 |   });
  25 | 
  26 |   test('navigation bar links route correctly between pages', async ({ page }) => {
  27 |     await page.goto('/index.html');
  28 |     
  29 |     // Click Work link
  30 |     await clickNavLink(page, 'work.html');
  31 |     await expect(page).toHaveURL(/.*work.html/);
  32 |     await expect(page.locator('h1')).toContainText('Selected Works');
  33 | 
  34 |     // Click Process link
  35 |     await clickNavLink(page, 'process.html');
  36 |     await expect(page).toHaveURL(/.*process.html/);
  37 |     await expect(page.locator('h1')).toContainText('Design Process');
  38 | 
  39 |     // Click Contact link
  40 |     await clickNavLink(page, 'contact.html');
  41 |     await expect(page).toHaveURL(/.*contact.html/);
  42 |     await expect(page.locator('h1')).toContainText('create something meaningful');
  43 | 
  44 |     // Click Brand/Home link
  45 |     await clickNavLink(page, 'index.html');
  46 |     await expect(page).toHaveURL(/.*index.html/);
  47 |   });
  48 | 
  49 |   test('back to top button becomes visible on scroll and scrolls to top', async ({ page }) => {
  50 |     await page.goto('/index.html');
  51 |     
  52 |     await page.evaluate(() => {
  53 |       window.scrollTo(0, 1500);
  54 |       window.dispatchEvent(new Event('scroll'));
  55 |     });
  56 |     await page.waitForTimeout(400);
  57 | 
  58 |     const backToTop = page.locator('#back-to-top');
  59 |     await expect(backToTop).toBeVisible();
  60 | 
  61 |     await backToTop.click();
  62 |     await page.waitForTimeout(500);
  63 |     const scrollY = await page.evaluate(() => window.scrollY);
  64 |     expect(scrollY).toBeLessThan(200);
  65 |   });
  66 | });
  67 | 
```