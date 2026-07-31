const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const pages = process.argv.slice(2);
    if (!fs.existsSync('/tmp/screenshots')) fs.mkdirSync('/tmp/screenshots', { recursive: true });

    for (const pn of pages) {
        for (const vp of [{n:'m390',w:390,h:844}, {n:'d1440',w:1440,h:900}]) {
            const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
            const page = await ctx.newPage();
            const errs = [];
            page.on('pageerror', e => errs.push(e.message));
            page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });

            await page.goto(`http://localhost:8090/${pn}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
            await page.waitForTimeout(1000);
            // Scroll through page to trigger lazy loading
            await page.evaluate(async () => {
                await new Promise(resolve => {
                    let y = 0;
                    const step = 300;
                    const timer = setInterval(() => {
                        window.scrollTo(0, y);
                        y += step;
                        if (y >= document.body.scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
            await page.waitForTimeout(1000);
            await page.evaluate(() => window.scrollTo(0, 0));

            const d = await page.evaluate(() => {
                const dw = document.documentElement.scrollWidth, ww = window.innerWidth;
                const imgs = [...document.querySelectorAll('img')];
                const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src.split('/').pop());
                return { overflow: dw > ww + 2 ? `doc=${dw} win=${ww}` : 'OK', broken, totalImgs: imgs.length };
            });

            const ss = `/tmp/screenshots/${pn.replace('.html','')}-${vp.n}.png`;
            await page.screenshot({ path: ss, fullPage: true });
            console.log(`${pn}@${vp.n}: overflow=${d.overflow} broken=[${d.broken.join(',')}] imgs=${d.totalImgs} errs=${errs.length?errs:'NONE'}`);
            await ctx.close();
        }
    }
    await browser.close();
})();
