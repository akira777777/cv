const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
    const viewports = [
        { name: 'desktop-1920', width: 1920, height: 1080 },
        { name: 'desktop-1440', width: 1440, height: 900 },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'mobile-390', width: 390, height: 844 },
        { name: 'mobile-320', width: 320, height: 568 },
    ];

    const results = [];

    for (const pageName of pages) {
        for (const vp of viewports) {
            const context = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 2,
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
                await page.waitForTimeout(1500);

                const screenshotPath = `/tmp/screenshots/${pageName.replace('.html', '')}-${vp.name}.png`;
                await page.screenshot({ path: screenshotPath, fullPage: true });

                // Check for common issues
                const issues = await page.evaluate(() => {
                    const problems = [];
                    // Check for overflow
                    const docWidth = document.documentElement.scrollWidth;
                    const winWidth = window.innerWidth;
                    if (docWidth > winWidth + 2) {
                        problems.push(`Horizontal overflow: doc=${docWidth}px win=${winWidth}px`);
                    }
                    // Check for elements with no text/empty
                    const emptyBtns = document.querySelectorAll('button:empty, a:empty');
                    if (emptyBtns.length) problems.push(`${emptyBtns.length} empty buttons/links`);
                    // Check for broken images
                    const imgs = [...document.querySelectorAll('img')];
                    const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0);
                    if (brokenImgs.length) problems.push(`${brokenImgs.length} broken images`);
                    // Check for elements off-screen
                    const offScreen = [...document.querySelectorAll('*')].filter(el => {
                        const r = el.getBoundingClientRect();
                        return r.right > winWidth + 5 && r.width < winWidth * 2 && el.children.length === 0 && el.offsetWidth > 0;
                    }).length;
                    if (offScreen > 0) problems.push(`${offScreen} potentially off-screen elements`);
                    // Check for overlapping elements (simplified check)
                    const fixedElements = [...document.querySelectorAll('nav, [class*="fixed"], [class*="sticky"]')];
                    if (fixedElements.length > 3) problems.push(`${fixedElements.length} fixed/sticky/nav elements (check z-index)`);

                    return problems;
                });

                const status = {
                    page: pageName,
                    viewport: vp.name,
                    dimensions: `${vp.width}x${vp.height}`,
                    consoleErrors,
                    consoleWarnings: consoleWarnings.length,
                    pageErrors,
                    issues,
                    screenshot: screenshotPath,
                };
                results.push(status);
                console.log(JSON.stringify(status, null, 2));
            } catch (e) {
                results.push({ page: pageName, viewport: vp.name, error: e.message });
                console.log(`ERROR on ${pageName} ${vp.name}: ${e.message}`);
            }
            await context.close();
        }
    }

    // Write summary
    const fs = require('fs');
    fs.writeFileSync('/tmp/test-results.json', JSON.stringify(results, null, 2));
    console.log('\n=== SUMMARY ===');
    console.log(`Total tests: ${results.length}`);
    const failed = results.filter(r => r.error || (r.issues && r.issues.length) || (r.consoleErrors && r.consoleErrors.length) || (r.pageErrors && r.pageErrors.length));
    console.log(`Tests with issues: ${failed.length}`);
    failed.forEach(r => console.log(`- ${r.page} @ ${r.viewport}: ${r.error || JSON.stringify({issues: r.issues, errors: r.consoleErrors, pageErrors: r.pageErrors})}`));

    await browser.close();
})();
