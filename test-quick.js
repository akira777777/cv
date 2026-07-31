const { firefox } = require('playwright');

(async () => {
    let browser;
    try {
        browser = await firefox.launch({ 
            headless: true,
            executablePath: '/usr/bin/firefox'
        });
        const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
        
        // Test index.html on mobile
        await page.goto('http://localhost:8080/index.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1000);
        
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        const navbarVisible = await page.evaluate(() => {
            const n = document.querySelector('#navbar');
            return n ? n.getBoundingClientRect().height > 0 : false;
        });
        
        console.log('Mobile 375px - index.html:');
        console.log('  overflow:', scrollWidth > clientWidth, `(${scrollWidth} vs ${clientWidth})`);
        console.log('  navbar:', navbarVisible);
        
        // Test work.html
        await page.goto('http://localhost:8080/work.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1000);
        const ws = await page.evaluate(() => document.documentElement.scrollWidth);
        const wc = await page.evaluate(() => document.documentElement.clientWidth);
        console.log('Mobile 375px - work.html:');
        console.log('  overflow:', ws > wc, `(${ws} vs ${wc})`);
        
        // Desktop test
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('http://localhost:8080/index.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1000);
        const ds = await page.evaluate(() => document.documentElement.scrollWidth);
        const dc = await page.evaluate(() => document.documentElement.clientWidth);
        console.log('Desktop 1440px - index.html:');
        console.log('  overflow:', ds > dc, `(${ds} vs ${dc})`);
        
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (browser) await browser.close();
    }
})();