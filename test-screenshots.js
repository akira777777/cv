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
        { name: 'desktop-1920', width: 1920, height: 1080 },
        { name: 'mobile-390', width: 390, height: 844 },
    ];

    const results = [];

    for (const pageName of pages) {
        for (const vp of viewports) {
            const context = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 1,
            });
            const page = await context.newPage();
            const consoleErrors = [];
            const pageErrors = [];

            page.on('console', msg => {
                if (msg.type() === 'error') consoleErrors.push(msg.text());
            });
            page.on('pageerror', err => pageErrors.push(err.message));

            try {
                await page.goto(`http://localhost:8080/${pageName}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
                await page.waitForTimeout(1000);

                const issues = await page.evaluate(() => {
                    const problems = [];
                    const docWidth = document.documentElement.scrollWidth;
                    const winWidth = window.innerWidth;
                    if (docWidth > winWidth + 2) {
                        problems.push(`H-OVERFLOW: doc=${docWidth}px win=${winWidth}px`);
                    }
                    const brokenImgs = [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
                    if (brokenImgs.length) problems.push(`BROKEN-IMGS: ${brokenImgs.join(', ')}`);
                    // Check for text overflow / truncation issues
                    const overflowingText = [...document.querySelectorAll('h1,h2,h3,p,span,a')].filter(el => {
                        if (!el.offsetWidth || el.children.length) return false;
                        const r = el.getBoundingClientRect();
                        return r.right > winWidth + 5;
                    }).map(el => `${el.tagName}:"${el.textContent.trim().substring(0,30)}" right=${Math.round(el.getBoundingClientRect().right)}`);
                    if (overflowingText.length) problems.push(`TEXT-OVERFLOW: ${overflowingText.slice(0,5).join('; ')}`);
                    return problems;
                });

                const status = { page: pageName, viewport: vp.name, dim: `${vp.width}x${vp.height}`, consoleErrors, pageErrors, issues };
                results.push(status);
                console.log(JSON.stringify(status));
            } catch (e) {
                results.push({ page: pageName, viewport: vp.name, error: e.message });
                console.log(`ERROR: ${pageName} ${vp.name}: ${e.message}`);
            }
            await context.close();
        }
    }

    fs.writeFileSync('/tmp/test-results.json', JSON.stringify(results, null, 2));
    console.log('\n=== DONE ===');
    await browser.close();
})();
