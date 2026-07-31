const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push('PAGEERR: ' + err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });

    await page.goto('http://localhost:8090/index.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
        const r = {};
        r.tailwindExists = typeof window.tailwind !== 'undefined';
        r.tailwindConfig = window.tailwind ? !!window.tailwind.config : false;
        // Check custom color applied
        const bgSurface = document.querySelector('.bg-surface');
        r.bgSurfaceColor = bgSurface ? getComputedStyle(bgSurface).backgroundColor : 'NO-ELEMENT';
        // Check custom spacing
        const maxW = document.querySelector('.max-w-container-max');
        r.maxWidth = maxW ? getComputedStyle(maxW).maxWidth : 'NO-ELEMENT';
        // Check custom font size
        const headline = document.querySelector('.text-display-xl');
        r.displayXlSize = headline ? getComputedStyle(headline).fontSize : 'NO-ELEMENT';
        // Check section-gap
        const sectionGap = document.querySelector('.py-section-gap');
        r.sectionGapPadding = sectionGap ? getComputedStyle(sectionGap).paddingTop : 'NO-ELEMENT';
        // Check if body has min-h-[884px]
        r.bodyMinHeight = getComputedStyle(document.body).minHeight;
        // Check for any unstyled custom classes (elements with 0 height that should have content)
        return r;
    });

    console.log('=== TAILWIND CONFIG CHECK ===');
    console.log('window.tailwind exists:', data.tailwindExists);
    console.log('window.tailwind.config exists:', data.tailwindConfig);
    console.log('bg-surface color:', data.bgSurfaceColor);
    console.log('max-w-container-max:', data.maxWidth);
    console.log('text-display-xl fontSize:', data.displayXlSize);
    console.log('py-section-gap paddingTop:', data.sectionGapPadding);
    console.log('body min-height:', data.bodyMinHeight);
    console.log('Errors:', errors.length ? errors : 'NONE');

    await browser.close();
})();
