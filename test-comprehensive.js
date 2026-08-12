const { chromium } = require('playwright');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

(async () => {
    const customChromium = '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
    const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || (fs.existsSync(customChromium) ? customChromium : undefined);

    const launchOpts = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    };
    if (executablePath) launchOpts.executablePath = executablePath;

    const browser = await chromium.launch(launchOpts);

    const viewports = [
        { name: 'desktop-1920', width: 1920, height: 1080 },
        { name: 'desktop-1440', width: 1440, height: 900 },
        { name: 'tablet-768', width: 768, height: 1024 },
        { name: 'mobile-390', width: 390, height: 844 },
        { name: 'mobile-320', width: 320, height: 568 },
    ];

    const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
    const allResults = {};

    for (const pageName of pages) {
        allResults[pageName] = {};
        for (const vp of viewports) {
            const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
            const page = await context.newPage();
            const errors = [];
            const warnings = [];
            page.on('console', msg => {
                if (msg.type() === 'error') errors.push(msg.text());
                if (msg.type() === 'warning') warnings.push(msg.text());
            });
            page.on('pageerror', err => errors.push('PAGEERR: ' + err.message));

            try {
                // Force reveal fade-in-up elements and scroll page to trigger lazy loading of images
                await page.evaluate(() => {
                    document.querySelectorAll('.fade-in-up, .image-mask-reveal').forEach(el => el.classList.add('visible'));
                    window.scrollTo(0, document.body.scrollHeight);
                });

                // Wait for all images to complete loading
                await page.waitForFunction(() => {
                    const imgs = Array.from(document.querySelectorAll('img'));
                    return imgs.every(img => img.complete && img.naturalWidth > 0);
                }, { timeout: 4000 }).catch(() => {});

                await page.evaluate(() => window.scrollTo(0, 0));
                await page.waitForTimeout(200);

                const diag = await page.evaluate(() => {
                    const d = {};
                    // Tailwind
                    d.tailwindLoaded = typeof window.tailwind !== 'undefined';
                    d.tailwindConfig = (typeof window.tailwind !== 'undefined' && window.tailwind.config) ? Object.keys(window.tailwind.config.theme.extend.colors).length : 0;
                    // Overflow
                    d.hOverflow = document.documentElement.scrollWidth - window.innerWidth;
                    // Images
                    d.imgTotal = document.querySelectorAll('img').length;
                    d.brokenImgs = [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src.replace(/.*\//, ''));
                    // Content
                    d.bodyH = document.body.scrollHeight;
                    d.elementCount = document.querySelectorAll('*').length;
                    // Overflow elements
                    d.overflowEls = [...document.querySelectorAll('h1,h2,h3,p,span,a,div,button,img,video,canvas')].filter(el => {
                        if (!el.offsetWidth || el.children.length > 0) return false;
                        const r = el.getBoundingClientRect();
                        return r.right > window.innerWidth + 2 && r.width > 50;
                    }).map(el => {
                        const r = el.getBoundingClientRect();
                        return `${el.tagName}:"${el.textContent.trim().substring(0,30)}" right=${Math.round(r.right)} w=${Math.round(r.width)}`;
                    }).slice(0, 10);
                    // Nav
                    d.navH = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                    // Dead links
                    d.deadLinks = [...document.querySelectorAll('a[href="#"]')].map(a => a.textContent.trim().substring(0,20));
                    // Buttons/inputs
                    d.inputs = document.querySelectorAll('input,textarea,select').length;
                    d.buttons = document.querySelectorAll('button').length;
                    // H1
                    const h1 = document.querySelector('h1');
                    if (h1) {
                        const s = getComputedStyle(h1);
                        d.h1Size = s.fontSize;
                        d.h1Text = h1.textContent.trim().substring(0, 40);
                        d.h1Right = Math.round(h1.getBoundingClientRect().right);
                    }
                    return d;
                });

                allResults[pageName][vp.name] = { errors, warnings: warnings.length, diag };
            } catch (e) {
                allResults[pageName][vp.name] = { error: e.message };
            }
            await context.close();
        }
    }

    fs.writeFileSync('/tmp/comprehensive-results.json', JSON.stringify(allResults, null, 2));
    
    // Print summary
    for (const [page, vps] of Object.entries(allResults)) {
        console.log(`\n=== ${page} ===`);
        for (const [vp, data] of Object.entries(vps)) {
            if (data.error) { console.log(`  ${vp}: ERROR: ${data.error}`); continue; }
            const d = data.diag;
            const issues = [];
            if (data.errors.length) issues.push(`errors: ${data.errors.length} (${data.errors.slice(0,2).join('; ')})`);
            if (d.hOverflow > 2) issues.push(`H-OVERFLOW: ${d.hOverflow}px`);
            if (d.brokenImgs.length) issues.push(`BROKEN-IMGS: ${d.brokenImgs.join(',')}`);
            if (d.overflowEls.length) issues.push(`OVERFLOW-ELS: ${d.overflowEls.length} (${d.overflowEls.slice(0,3).join('; ')})`);
            if (d.deadLinks.length) issues.push(`DEAD-LINKS: ${d.deadLinks.join(',')}`);
            if (!d.tailwindLoaded) issues.push('NO-TAILWIND');
            if (!d.tailwindConfig) issues.push('NO-TAILWIND-CONFIG');
            console.log(`  ${vp} (${d.bodyH}px h, ${d.elementCount} els): ${issues.length ? issues.join(' | ') : 'OK'}`);
        }
    }
    
    await browser.close();
    console.log('\n=== DONE ===');
})();
