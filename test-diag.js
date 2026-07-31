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

        await page.goto(`http://localhost:8080/${pageName}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(2000);

        const diagnostics = await page.evaluate(() => {
            const d = {};
            // Check if Tailwind is loaded
            d.tailwindLoaded = typeof window.tailwind !== 'undefined';
            // Check body has styles
            const bodyStyle = getComputedStyle(document.body);
            d.bodyBg = bodyStyle.backgroundColor;
            d.bodyColor = bodyStyle.color;
            d.bodyFontFamily = bodyStyle.fontFamily.substring(0, 50);
            // Check if content rendered
            d.bodyHeight = document.body.scrollHeight;
            d.bodyWidth = document.body.scrollWidth;
            d.htmlHeight = document.documentElement.scrollHeight;
            // Count elements
            d.totalElements = document.querySelectorAll('*').length;
            d.visibleElements = [...document.querySelectorAll('*')].filter(el => {
                const s = getComputedStyle(el);
                return s.display !== 'none' && s.visibility !== 'hidden' && el.offsetWidth > 0;
            }).length;
            // Check for horizontal overflow
            d.horizontalOverflow = document.documentElement.scrollWidth - window.innerWidth;
            // Check fonts loaded
            d.fontsLoaded = document.fonts.size;
            // Check Three.js
            d.threeLoaded = typeof window.THREE !== 'undefined';
            d.canvasElement = !!document.querySelector('canvas');
            // Check for missing resources
            d.imgCount = document.querySelectorAll('img').length;
            d.brokenImgs = [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
            // Check for videos
            d.videoCount = document.querySelectorAll('video').length;
            // Check nav
            d.navExists = !!document.querySelector('nav');
            d.navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
            // Check for hidden content
            const hiddenSections = [...document.querySelectorAll('section, main > div')].filter(el => {
                const r = el.getBoundingClientRect();
                return r.height === 0 || (r.width === 0 && r.height === 0);
            });
            d.hiddenSections = hiddenSections.length;
            // Check links
            const links = [...document.querySelectorAll('a[href]')];
            d.totalLinks = links.length;
            d.hashLinks = links.filter(a => a.getAttribute('href') === '#').length;
            d.internalLinks = links.filter(a => a.href.includes('localhost')).length;
            // Get the title
            d.title = document.title;
            // Check for overlay/modal elements
            d.modals = document.querySelectorAll('[id*="modal"], [id*="case-study"]').length;
            // Check for forms
            d.forms = document.querySelectorAll('form').length;
            // Computed style of first heading
            const h1 = document.querySelector('h1');
            if (h1) {
                const h1Style = getComputedStyle(h1);
                d.h1FontSize = h1Style.fontSize;
                d.h1Visible = h1.offsetWidth > 0 && h1.offsetHeight > 0;
            }
            return d;
        });

        results[pageName] = { errors, diagnostics };
        await context.close();
    }

    fs.writeFileSync('/tmp/diagnostics.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
    await browser.close();
})();
