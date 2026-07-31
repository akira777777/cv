const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
    const viewports = [
        { name: 'mobile-320', width: 320, height: 568 },
        { name: 'mobile-390', width: 390, height: 844 },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'laptop-1024', width: 1024, height: 768 },
        { name: 'desktop-1440', width: 1440, height: 900 },
        { name: 'desktop-1920', width: 1920, height: 1080 },
        { name: 'desktop-2560', width: 2560, height: 1440 },
    ];

    const results = [];
    if (!fs.existsSync('/tmp/screenshots')) fs.mkdirSync('/tmp/screenshots', { recursive: true });

    for (const pageName of pages) {
        for (const vp of viewports) {
            const context = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 1,
            });
            const page = await context.newPage();
            const consoleErrors = [];
            const consoleWarnings = [];
            const pageErrors = [];

            page.on('console', msg => {
                if (msg.type() === 'error') consoleErrors.push(msg.text());
                if (msg.type() === 'warning') consoleWarnings.push(msg.text());
            });
            page.on('pageerror', err => pageErrors.push(err.message));

            try {
                await page.goto(`http://localhost:8080/${pageName}`, { waitUntil: 'networkidle', timeout: 15000 });
                await page.waitForTimeout(2000);

                const screenshotPath = `/tmp/screenshots/${pageName.replace('.html','')}-${vp.name}.png`;
                await page.screenshot({ path: screenshotPath, fullPage: true });

                const issues = await page.evaluate(() => {
                    const problems = [];
                    const docWidth = document.documentElement.scrollWidth;
                    const winWidth = window.innerWidth;
                    if (docWidth > winWidth + 2) {
                        problems.push(`H-OVERFLOW: doc=${docWidth}px win=${winWidth}px`);
                    }
                    const brokenImgs = [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
                    if (brokenImgs.length) problems.push(`BROKEN-IMGS: ${brokenImgs.join(', ')}`);
                    const overflowingText = [...document.querySelectorAll('h1,h2,h3,p,span,a')].filter(el => {
                        if (!el.offsetWidth || el.children.length) return false;
                        const r = el.getBoundingClientRect();
                        return r.right > winWidth + 5;
                    }).map(el => `${el.tagName}:"${el.textContent.trim().substring(0,30)}" right=${Math.round(el.getBoundingClientRect().right)}`);
                    if (overflowingText.length) problems.push(`TEXT-OVERFLOW: ${overflowingText.slice(0,5).join('; ')}`);
                    const bgSurface = document.querySelector('.bg-surface');
                    if (bgSurface) {
                        const bg = getComputedStyle(bgSurface).backgroundColor;
                        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
                            problems.push('TAILWIND-THEME-NOT-APPLIED: bg-surface has no bg');
                        }
                    }
                    if (typeof window.tailwind === 'undefined') {
                        problems.push('NO-TAILWIND-GLOBAL');
                    } else if (!window.tailwind.config) {
                        problems.push('NO-TAILWIND-CONFIG');
                    }
                    const collapsed = [...document.querySelectorAll('img,video,section,footer')].filter(el => {
                        const r = el.getBoundingClientRect();
                        return el.offsetWidth > 0 && r.height === 0;
                    }).map(el => `${el.tagName}.${el.className.substring(0,30)}`);
                    if (collapsed.length) problems.push(`COLLAPSED: ${collapsed.slice(0,3).join('; ')}`);
                    const bodyMinH = getComputedStyle(document.body).minHeight;
                    return { problems, bodyMinH, tailwindExists: typeof window.tailwind !== 'undefined' };
                });

                const status = {
                    page: pageName, viewport: vp.name, dim: `${vp.width}x${vp.height}`,
                    consoleErrors, consoleWarnings: consoleWarnings.length, pageErrors,
                    issues: issues.problems || [], bodyMinH: issues.bodyMinH, tailwindExists: issues.tailwindExists
                };
                results.push(status);
                if (status.issues.length || status.pageErrors.length || status.consoleErrors.length) {
                    console.log(`WARN ${JSON.stringify(status)}`);
                } else {
                    console.log(`OK   ${pageName} @ ${vp.name} (${vp.width}x${vp.height}) tw=${issues.tailwindExists}`);
                }
            } catch (e) {
                results.push({ page: pageName, viewport: vp.name, error: e.message });
                console.log(`ERR  ${pageName} ${vp.name}: ${e.message}`);
            }
            await context.close();
        }
    }

    fs.writeFileSync('/tmp/test-results.json', JSON.stringify(results, null, 2));
    console.log('\n=== SUMMARY ===');
    console.log(`Total tests: ${results.length}`);
    const failed = results.filter(r => r.error || (r.issues && r.issues.length) || (r.consoleErrors && r.consoleErrors.length) || (r.pageErrors && r.pageErrors.length));
    console.log(`Tests with issues: ${failed.length}`);
    failed.forEach(r => console.log(`  - ${r.page} @ ${r.viewport}: ${r.error || JSON.stringify({issues: r.issues, errors: r.consoleErrors, pageErrors: r.pageErrors})}`));
    await browser.close();
})();
