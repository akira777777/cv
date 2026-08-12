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
        - link "Work" [ref=e7] [cursor=pointer]:
          - /url: work.html
        - link "About" [ref=e8] [cursor=pointer]:
          - /url: process.html
        - link "Contact" [ref=e9] [cursor=pointer]:
          - /url: contact.html
      - generic [ref=e10]:
        - generic [ref=e11]: Prague / Available
        - button "Switch to Dark Mode" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: dark_mode
        - button "Open Canvas Settings Panel" [ref=e14] [cursor=pointer]:
          - generic [ref=e15]: settings
  - main [ref=e16]:
    - generic [ref=e18]:
      - generic [ref=e19]: Scroll to explore
      - generic [ref=e24]:
        - heading "Elizaveta Vakalova" [level=1] [ref=e25]: ElizavetaVakalova
        - paragraph [ref=e26]: I craft experiences and visual systems that move people to act.
        - link "View selected work arrow_forward" [ref=e28] [cursor=pointer]:
          - /url: work.html
          - generic [ref=e29]: View selected work
          - generic [ref=e30]: arrow_forward
      - img "Portrait of Elizaveta Vakalova" [ref=e33]
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
        - link "Astro Analytics Dashboard Interface View Case Study" [active] [ref=e50] [cursor=pointer]:
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
  - button "Scroll back to top" [ref=e139] [cursor=pointer]:
    - generic [ref=e140]: arrow_upward
  - generic [ref=e142]:
    - button "Close modal" [ref=e143] [cursor=pointer]:
      - generic [ref=e144]: close
    - generic [ref=e145]:
      - generic [ref=e146]:
        - generic [ref=e147]: Product Design
        - generic [ref=e148]: •
        - generic [ref=e149]: "2025"
      - heading "Astro Analytics" [level=2] [ref=e150]
      - paragraph [ref=e151]: Dashboard UX/UI & System Architecture
    - img "Astro Analytics" [ref=e153]
    - generic [ref=e154]:
      - generic [ref=e155]:
        - generic [ref=e156]: +35%
        - generic [ref=e157]: Active Users Growth
      - generic [ref=e158]:
        - generic [ref=e159]: 4.8/5
        - generic [ref=e160]: User Satisfaction Score
      - generic [ref=e161]:
        - generic [ref=e162]: "-45%"
        - generic [ref=e163]: Task Completion Time
    - generic [ref=e164]:
      - generic [ref=e165]:
        - generic [ref=e166]:
          - heading "Project Overview" [level=4] [ref=e167]
          - paragraph [ref=e168]: Astro Analytics is an enterprise-grade telemetry and user analytics dashboard created for fast-scaling engineering and product teams. The goal was to simplify multi-dimensional data visualization while reducing cognitive load.
        - generic [ref=e169]:
          - heading "Key Solution Highlights" [level=4] [ref=e170]
          - list [ref=e171]:
            - listitem [ref=e172]: Dynamic customizable widget grids with responsive canvas snapping
            - listitem [ref=e173]: Real-time query performance monitoring with instant anomaly alerts
            - listitem [ref=e174]: High-contrast accessible visual palette tailored for multi-monitor setups
      - generic [ref=e175]:
        - generic [ref=e176]:
          - heading "Role & Responsibility" [level=4] [ref=e177]
          - paragraph [ref=e178]: Lead Product Designer & UX Researcher
        - generic [ref=e179]:
          - heading "Key Deliverables" [level=4] [ref=e180]
          - paragraph [ref=e181]: Design System, Interactive Prototypes, Micro-interactions, User Testing, Component Library
    - generic [ref=e182]:
      - button "west Previous Case" [ref=e183] [cursor=pointer]:
        - generic [ref=e184]: west
        - text: Previous Case
      - button "Next Case east" [ref=e185] [cursor=pointer]:
        - text: Next Case
        - generic [ref=e186]: east
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