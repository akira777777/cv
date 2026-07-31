const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const pages = process.argv.slice(2);
    const vp = { width: 390, height: 844 };
    for (const pn of pages) {
        const ctx = await browser.newContext({ viewport: vp });
        const page = await ctx.newPage();
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
        await page.goto(`http://localhost:8090/${pn}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
        await page.waitForTimeout(1500);
        const d = await page.evaluate(() => {
            const dw = document.documentElement.scrollWidth, ww = window.innerWidth;
            const bi = [...document.querySelectorAll('img')].filter(i => !i.complete || i.naturalWidth === 0).length;
            const bg = document.querySelector('.bg-surface');
            const themeOk = bg ? getComputedStyle(bg).backgroundColor !== 'rgba(0, 0, 0, 0)' : 'N/A';
            return { overflow: dw > ww + 2 ? `doc=${dw} win=${ww}` : 'OK', brokenImgs: bi, themeOk, bodyH: document.body.scrollHeight };
        });
        console.log(`${pn}: overflow=${d.overflow} brokenImgs=${d.brokenImgs} theme=${d.themeOk} bodyH=${d.bodyH} errs=${errs.length ? errs : 'NONE'}`);
        await ctx.close();
    }
    await browser.close();
})();
