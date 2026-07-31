const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const pages = process.argv.slice(2);
    const vp = { width: 1440, height: 900 };
    for (const pn of pages) {
        const ctx = await browser.newContext({ viewport: vp });
        const page = await ctx.newPage();
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
        // Track failed requests
        const failedReqs = [];
        page.on('requestfailed', req => failedReqs.push(`${req.url()} (${req.failure()?.errorText})`));
        await page.goto(`http://localhost:8090/${pn}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
        await page.waitForTimeout(2000);
        const d = await page.evaluate(() => {
            const dw = document.documentElement.scrollWidth, ww = window.innerWidth;
            const imgs = [...document.querySelectorAll('img')];
            const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => ({src: i.src, alt: i.alt}));
            const allImgs = imgs.map(i => ({src: i.src.split('/').pop(), w: i.naturalWidth, h: i.naturalHeight, complete: i.complete}));
            return { overflow: dw > ww + 2 ? `doc=${dw} win=${ww}` : 'OK', broken, allImgs, bodyH: document.body.scrollHeight };
        });
        console.log(`\n=== ${pn} (1440x900) ===`);
        console.log(`overflow=${d.overflow} bodyH=${d.bodyH} errs=${errs.length ? errs : 'NONE'}`);
        if (failedReqs.length) console.log(`FAILED_REQUESTS: ${failedReqs.join('; ')}`);
        if (d.broken.length) console.log(`BROKEN_IMGS: ${JSON.stringify(d.broken)}`);
        console.log(`ALL_IMGS: ${JSON.stringify(d.allImgs)}`);
        await ctx.close();
    }
    await browser.close();
})();
