const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        executablePath: '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const tests = [
        { page: 'index.html', vp: { width: 1920, height: 1080 }, dark: false, name: 'index-desktop-light' },
        { page: 'index.html', vp: { width: 1920, height: 1080 }, dark: true, name: 'index-desktop-dark' },
        { page: 'index.html', vp: { width: 390, height: 844 }, dark: false, name: 'index-mobile-light' },
        { page: 'index.html', vp: { width: 768, height: 1024 }, dark: false, name: 'index-tablet-light' },
        { page: 'work.html', vp: { width: 1920, height: 1080 }, dark: false, name: 'work-desktop-light' },
        { page: 'work.html', vp: { width: 390, height: 844 }, dark: false, name: 'work-mobile-light' },
        { page: 'process.html', vp: { width: 1920, height: 1080 }, dark: false, name: 'process-desktop-light' },
        { page: 'process.html', vp: { width: 390, height: 844 }, dark: false, name: 'process-mobile-light' },
        { page: 'contact.html', vp: { width: 1920, height: 1080 }, dark: false, name: 'contact-desktop-light' },
        { page: 'contact.html', vp: { width: 390, height: 844 }, dark: false, name: 'contact-mobile-light' },
        { page: 'redirect.html', vp: { width: 1920, height: 1080 }, dark: false, name: 'redirect-desktop-light' },
        { page: 'redirect.html', vp: { width: 390, height: 844 }, dark: false, name: 'redirect-mobile-light' },
    ];

    fs.mkdirSync('/tmp/screenshots', { recursive: true });

    for (const test of tests) {
        const context = await browser.newContext({
            viewport: test.vp,
            deviceScaleFactor: 1,
            colorScheme: test.dark ? 'dark' : 'light',
        });
        const page = await context.newPage();

        // Set theme
        if (test.dark) {
            await page.addInitScript(() => {
                localStorage.setItem('theme', 'dark');
            });
        } else {
            await page.addInitScript(() => {
                localStorage.removeItem('theme');
            });
        }

        try {
            await page.goto(`http://localhost:8080/${test.page}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
            await page.waitForTimeout(2000);
            await page.screenshot({ path: `/tmp/screenshots/${test.name}.png`, fullPage: true });
            console.log(`OK: ${test.name}`);
        } catch (e) {
            console.log(`FAIL: ${test.name}: ${e.message}`);
        }
        await context.close();
    }

    console.log('\n=== SCREENSHOTS DONE ===');
    await browser.close();
})();
