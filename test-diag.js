const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
    const results = {};

    for (const pageName of pages) {
        const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
        const page = await context.newPage();
        const errors = [];
        page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });
        page.on('pageerror', err => errors.push('PAGEERR: ' + err.message));
        page.on('requestfailed', req => errors.push(`REQFAIL: ${req.url()} - ${req.failure().errorText}`));

        await page.goto(`http://localhost:9090/${pageName}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(2000);

        const diagnostics = await page.evaluate(() => {
            const d = {};
            d.tailwindLoaded = typeof window.tailwind !== 'undefined';
            const bodyStyle = getComputedStyle(document.body);
            d.bodyBg = bodyStyle.backgroundColor;
            d.bodyColor = bodyStyle.color;
            d.bodyFontFamily = bodyStyle.fontFamily.substring(0, 50);
            d.bodyHeight = document.body.scrollHeight;
            d.bodyWidth = document.body.scrollWidth;
            d.htmlHeight = document.documentElement.scrollHeight;
            d.totalElements = document.querySelectorAll('*').length;
            d.horizontalOverflow = document.documentElement.scrollWidth - window.innerWidth;
            d.threeLoaded = typeof window.THREE !== 'undefined';
            d.canvasElement = !!document.querySelector('canvas');
            d.imgCount = document.querySelectorAll('img').length;
            d.brokenImgs = [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
            d.videoCount = document.querySelectorAll('video').length;
            d.navExists = !!document.querySelector('nav');
            d.navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
            d.totalLinks = document.querySelectorAll('a[href]').length;
            d.hashLinks = [...document.querySelectorAll('a[href]')].filter(a => a.getAttribute('href') === '#').length;
            d.title = document.title;
            d.forms = document.querySelectorAll('form').length;
            const h1 = document.querySelector('h1');
            if (h1) {
                const h1Style = getComputedStyle(h1);
                d.h1FontSize = h1Style.fontSize;
                d.h1Visible = h1.offsetWidth > 0 && h1.offsetHeight > 0;
                d.h1Text = h1.textContent.trim().substring(0, 60);
            }
            // Check for elements that are clipped or overflowing viewport
            d.overflowRight = [...document.querySelectorAll('*')].filter(el => {
                if (!el.offsetWidth) return false;
                const r = el.getBoundingClientRect();
                return r.right > window.innerWidth + 2 && r.width < window.innerWidth && el.children.length === 0;
            }).length;
            return d;
        });

        results[pageName] = { errors, diagnostics };
        await context.close();
    }

    fs.writeFileSync('/tmp/diagnostics.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
    await browser.close();
})();
