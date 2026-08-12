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
        { name: 'mobile-390', width: 390, height: 844 },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'desktop-1440', width: 1440, height: 900 },
    ];

    if (!fs.existsSync('/tmp/screenshots')) fs.mkdirSync('/tmp/screenshots', { recursive: true });
    const results = [];

    for (const pageName of pages) {
        for (const vp of viewports) {
            const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', err => errors.push('PAGEERR: ' + err.message));
            page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });

            try {
                await page.goto(`http://127.0.0.1:9123/${pageName}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
                await page.waitForTimeout(1500);

                const ss = `/tmp/screenshots/${pageName.replace('.html','')}-${vp.name}.png`;
                await page.screenshot({ path: ss, fullPage: true });

                const issues = await page.evaluate(() => {
                    const p = [];
                    const dw = document.documentElement.scrollWidth, ww = window.innerWidth;
                    if (dw > ww + 2) p.push(`H-OVERFLOW: doc=${dw} win=${ww}`);
                    const bi = [...document.querySelectorAll('img')].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src);
                    if (bi.length) p.push(`BROKEN-IMG: ${bi.join(',')}`);
                    const bg = document.querySelector('.bg-surface');
                    if (bg) {
                        const c = getComputedStyle(bg).backgroundColor;
                        if (c === 'rgba(0, 0, 0, 0)') p.push('THEME-NOT-APPLIED');
                    }
                    return p;
                });

                const st = { page: pageName, vp: vp.name, errors, issues };
                results.push(st);
                if (st.issues.length || st.errors.length) console.log(`WARN ${pageName}@${vp.name}: ${JSON.stringify({issues: st.issues, errors: st.errors})}`);
                else console.log(`OK   ${pageName}@${vp.name}`);
            } catch (e) {
                results.push({ page: pageName, vp: vp.name, error: e.message });
                console.log(`ERR  ${pageName}@${vp.name}: ${e.message.substring(0,80)}`);
            }
            await context.close();
        }
    }

    const failed = results.filter(r => r.error || (r.issues && r.issues.length) || (r.errors && r.errors.length));
    console.log(`\n${results.length} tests, ${failed.length} with issues`);
    await browser.close();
})();
