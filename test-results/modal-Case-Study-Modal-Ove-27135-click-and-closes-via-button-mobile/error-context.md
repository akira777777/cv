# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modal.spec.js >> Case Study Modal Overlays >> opens case study modal on project click and closes via button
- Location: tests/modal.spec.js:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#close-modal, [data-close="true"]').first()

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
        - button "Toggle Mobile Navigation Menu" [ref=e11] [cursor=pointer]:
          - generic [ref=e12]: menu
  - main [ref=e13]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - heading "Elizaveta Vakalova" [level=1] [ref=e17]: ElizavetaVakalova
        - paragraph [ref=e18]: Product · Brand · Campaign
        - generic [ref=e19]: Prague / Available
        - paragraph [ref=e22]: I craft experiences and visual systems that move people to act.
        - link "View selected work arrow_forward" [ref=e24] [cursor=pointer]:
          - /url: work.html
          - generic [ref=e25]: View selected work
          - generic [ref=e26]: arrow_forward
      - img "Portrait of Elizaveta Vakalova" [ref=e29]
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - generic [ref=e34]: "01"
            - generic [ref=e35]: "01"
          - heading "Astro Analytics" [level=2] [ref=e37]
          - paragraph [ref=e38]: Dashboard UX/UI
          - paragraph [ref=e39]: Analytics platform that turns complex data into clear decisions for growing teams.
          - generic [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]: arrow_outward
              - generic [ref=e43]: +35%
            - generic [ref=e44]: increase in active users
        - link "Astro Analytics Dashboard Interface View Case Study" [active] [ref=e45] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e46]:
            - img "Astro Analytics Dashboard Interface" [ref=e47]
            - generic [ref=e49]: View Case Study
      - generic [ref=e51]:
        - link "AURA Identity Branding View Case Study" [ref=e52] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e53]:
            - img "AURA Identity Branding" [ref=e54]
            - generic [ref=e56]: View Case Study
        - generic [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: "02"
            - generic [ref=e61]: "02"
          - heading "AURA Identity" [level=2] [ref=e63]
          - paragraph [ref=e64]: Brand Identity
          - paragraph [ref=e65]: Minimal, timeless identity for a wellness brand rooted in clarity and calm.
          - generic [ref=e66]:
            - generic [ref=e67]:
              - generic [ref=e68]: arrow_outward
              - generic [ref=e69]: +27%
            - generic [ref=e70]: lift in brand recognition
      - generic [ref=e71]:
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: "03"
            - generic [ref=e75]: "03"
          - heading "Alpine Retreat Editorial" [level=2] [ref=e77]
          - paragraph [ref=e78]: Editorial Design
          - paragraph [ref=e79]: Architecture editorial exploring space, light, and the quiet power of place.
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: arrow_outward
              - generic [ref=e83]: 2.4×
            - generic [ref=e84]: longer average read time
        - link "Alpine Retreat Editorial Spread View Project" [ref=e85] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e86]:
            - img "Alpine Retreat Editorial Spread" [ref=e87]
            - generic [ref=e89]: View Project
      - generic [ref=e91]:
        - link "3D Motion Reel play_circle View 3D Case Study" [ref=e92] [cursor=pointer]:
          - /url: javascript:void(0)
          - generic [ref=e93]:
            - generic [ref=e95]: 3D Motion Reel
            - generic [ref=e100]:
              - generic [ref=e101]: play_circle
              - text: View 3D Case Study
        - generic [ref=e102]:
          - generic [ref=e103]:
            - generic [ref=e104]: "04"
            - generic [ref=e105]: "04"
          - heading "Mist & Chrome" [level=2] [ref=e107]
          - paragraph [ref=e108]: 3D Motion & Visual Art
          - paragraph [ref=e109]: Organic forest atmosphere meets fluid liquid-chrome typography in an immersive 3D motion exploration.
          - generic [ref=e110]:
            - generic [ref=e111]:
              - generic [ref=e112]: arrow_outward
              - generic [ref=e113]: 4.5M
            - generic [ref=e114]: campaign impressions
    - generic [ref=e117]:
      - paragraph [ref=e118]: I work across product, brand, editorial, and campaigns—bringing strategy, craft, and a user-centered mindset to every detail.
      - link "About my process arrow_forward" [ref=e119] [cursor=pointer]:
        - /url: process.html
        - generic [ref=e120]: About my process
        - generic [ref=e121]: arrow_forward
  - contentinfo [ref=e122]:
    - generic [ref=e123]:
      - generic [ref=e124]:
        - heading "Have a project in mind? Let's create something meaningful." [level=3] [ref=e125]
        - link "Start a project" [ref=e126] [cursor=pointer]:
          - /url: contact.html
      - generic [ref=e127]:
        - generic [ref=e128]:
          - link "Email" [ref=e129] [cursor=pointer]:
            - /url: mailto:hello@vakalova.design
          - link "LinkedIn" [ref=e130] [cursor=pointer]:
            - /url: redirect.html?url=https://linkedin.com
          - link "Instagram" [ref=e131] [cursor=pointer]:
            - /url: redirect.html?url=https://instagram.com
          - link "Twitter" [ref=e132] [cursor=pointer]:
            - /url: redirect.html?url=https://x.com
        - paragraph [ref=e133]: © 2026 Elizaveta Vakalova
  - button "Scroll back to top" [ref=e134] [cursor=pointer]:
    - generic [ref=e135]: arrow_upward
  - generic [ref=e137]:
    - button "Close modal" [ref=e138] [cursor=pointer]:
      - generic [ref=e139]: close
    - generic [ref=e140]:
      - generic [ref=e141]:
        - generic [ref=e142]: Product Design
        - generic [ref=e143]: •
        - generic [ref=e144]: "2025"
      - heading "Astro Analytics" [level=2] [ref=e145]
      - paragraph [ref=e146]: Dashboard UX/UI & System Architecture
    - generic:
      - img "Astro Analytics"
    - generic [ref=e147]:
      - generic [ref=e148]:
        - generic [ref=e149]: +35%
        - generic [ref=e150]: Active Users Growth
      - generic [ref=e151]:
        - generic [ref=e152]: 4.8/5
        - generic [ref=e153]: User Satisfaction Score
      - generic [ref=e154]:
        - generic [ref=e155]: "-45%"
        - generic [ref=e156]: Task Completion Time
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]:
          - heading "Project Overview" [level=4] [ref=e160]
          - paragraph [ref=e161]: Astro Analytics is an enterprise-grade telemetry and user analytics dashboard created for fast-scaling engineering and product teams. The goal was to simplify multi-dimensional data visualization while reducing cognitive load.
        - generic [ref=e162]:
          - heading "Key Solution Highlights" [level=4] [ref=e163]
          - list [ref=e164]:
            - listitem [ref=e165]: Dynamic customizable widget grids with responsive canvas snapping
            - listitem [ref=e166]: Real-time query performance monitoring with instant anomaly alerts
            - listitem [ref=e167]: High-contrast accessible visual palette tailored for multi-monitor setups
      - generic [ref=e168]:
        - generic [ref=e169]:
          - heading "Role & Responsibility" [level=4] [ref=e170]
          - paragraph [ref=e171]: Lead Product Designer & UX Researcher
        - generic [ref=e172]:
          - heading "Key Deliverables" [level=4] [ref=e173]
          - paragraph [ref=e174]: Design System, Interactive Prototypes, Micro-interactions, User Testing, Component Library
    - generic [ref=e175]:
      - button "west Previous Case" [ref=e176] [cursor=pointer]:
        - generic [ref=e177]: west
        - text: Previous Case
      - button "Next Case east" [ref=e178] [cursor=pointer]:
        - text: Next Case
        - generic [ref=e179]: east
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
> 18 |     await closeBtn.click();
     |                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  39 |     await expect(modal).not.toBeVisible();
  40 |   });
  41 | });
  42 | 
```