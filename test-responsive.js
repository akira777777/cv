const { firefox } = require('playwright');

(async () => {
    const browser = await firefox.launch({ headless: true });
    
    const viewports = [
        { name: 'Mobile (375px)', width: 375, height: 812 },
        { name: 'Tablet (768px)', width: 768, height: 1024 },
        { name: 'Desktop (1440px)', width: 1440, height: 900 }
    ];
    
    const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
    
    for (const vp of viewports) {
        console.log(`\n=== ${vp.name} ===`);
        const context = await browser.newContext({
            viewport: { width: vp.width, height: vp.height }
        });
        
        for (const pageUrl of pages) {
            const page = await context.newPage();
            try {
                await page.goto(`http://localhost:8080/${pageUrl}`, { waitUntil: 'networkidle', timeout: 15000 });
                
                // Check for console errors
                const errors = [];
                page.on('console', msg => {
                    if (msg.type() === 'error') errors.push(msg.text());
                });
                
                await page.waitForTimeout(2000);
                
                // Check if navbar exists and is visible
                const navbar = await page.$('#navbar');
                const navbarVisible = navbar ? await navbar.isVisible() : false;
                
                // Check if mobile menu toggle exists (should be visible on mobile)
                const mobileToggle = await page.$('#mobile-menu-toggle');
                const mobileToggleVisible = mobileToggle ? await mobileToggle.isVisible() : false;
                
                // Check for horizontal overflow
                const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
                const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
                const hasOverflow = scrollWidth > clientWidth;
                
                // Check if main content is visible
                const mainVisible = await page.evaluate(() => {
                    const main = document.querySelector('main');
                    return main ? main.getBoundingClientRect().height > 100 : false;
                });
                
                console.log(`  ${pageUrl}: navbar=${navbarVisible}, mobileToggle=${mobileToggleVisible}, overflow=${hasOverflow}, mainContent=${mainVisible}, errors=${errors.length}`);
                
                if (errors.length > 0) {
                    errors.forEach(e => console.log(`    ERROR: ${e}`));
                }
                
                if (hasOverflow) {
                    console.log(`    WARNING: Horizontal overflow detected (${scrollWidth}px > ${clientWidth}px)`);
                }
                
            } catch (err) {
                console.log(`  ${pageUrl}: FAILED - ${err.message}`);
            }
            await page.close();
        }
        
        await context.close();
    }
    
    await browser.close();
    console.log('\n=== Test Complete ===');
})();