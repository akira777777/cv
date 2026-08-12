const { chromium } = require('playwright');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const CUSTOM_CHROMIUM = '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const EXECUTABLE_PATH = process.env.PLAYWRIGHT_CHROMIUM_PATH || (fs.existsSync(CUSTOM_CHROMIUM) ? CUSTOM_CHROMIUM : undefined);

function checkServerReady(port) {
    return new Promise(resolve => {
        const req = http.get(`http://127.0.0.1:${port}/index.html`, res => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.setTimeout(1000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

async function ensureServerRunning() {
    const isReady = await checkServerReady(PORT);
    if (isReady) {
        console.log(`Server already running on ${BASE_URL}`);
        return null;
    }

    console.log(`Starting local server on port ${PORT}...`);
    const serverProc = spawn('node', ['serve.js'], {
        cwd: __dirname,
        env: { ...process.env, PORT: String(PORT) },
        stdio: 'ignore'
    });

    // Wait until server is up
    for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 250));
        if (await checkServerReady(PORT)) {
            console.log(`Server started successfully on ${BASE_URL}`);
            return serverProc;
        }
    }
    throw new Error(`Failed to start server on port ${PORT}`);
}

(async () => {
    let serverProcess = null;
    let exitCode = 0;

    try {
        serverProcess = await ensureServerRunning();

        const launchOptions = {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
        };
        if (EXECUTABLE_PATH) launchOptions.executablePath = EXECUTABLE_PATH;

        const browser = await chromium.launch(launchOptions);

        const viewports = [
            { name: 'desktop-1920', width: 1920, height: 1080 },
            { name: 'desktop-1440', width: 1440, height: 900 },
            { name: 'tablet-768', width: 768, height: 1024 },
            { name: 'mobile-390', width: 390, height: 844 },
            { name: 'mobile-320', width: 320, height: 568 },
        ];

        const pages = ['index.html', 'work.html', 'process.html', 'contact.html', 'redirect.html'];
        const results = [];

        console.log('\n======================================================');
        console.log('       RUNNING COMPREHENSIVE PORTFOLIO TESTS          ');
        console.log('======================================================\n');

        for (const pageName of pages) {
            for (const vp of viewports) {
                const context = await browser.newContext({
                    viewport: { width: vp.width, height: vp.height },
                    deviceScaleFactor: 1
                });
                const page = await context.newPage();
                const consoleErrors = [];
                const pageErrors = [];

                page.on('console', msg => {
                    if (msg.type() === 'error') consoleErrors.push(msg.text());
                });
                page.on('pageerror', err => pageErrors.push(err.message));

                try {
                    await page.goto(`${BASE_URL}/${pageName}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
                    await page.waitForTimeout(500);

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
                        const issues = [];
                        const dw = document.documentElement.scrollWidth;
                        const ww = window.innerWidth;
                        if (dw > ww + 2) issues.push(`H-OVERFLOW: doc=${dw}px win=${ww}px`);

                        const imgs = [...document.querySelectorAll('img')];
                        const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src.split('/').pop());
                        if (broken.length) issues.push(`BROKEN-IMGS: ${broken.join(',')}`);

                        const tailwindOk = typeof window.tailwind !== 'undefined';
                        if (!tailwindOk) issues.push('NO-TAILWIND');

                        const deadLinks = [...document.querySelectorAll('a[href="#"]')].map(a => a.textContent.trim().substring(0, 20));
                        if (deadLinks.length) issues.push(`DEAD-LINKS: ${deadLinks.join(',')}`);

                        return {
                            issues,
                            bodyH: document.body.scrollHeight,
                            elementCount: document.querySelectorAll('*').length,
                        };
                    });

                    const allErrors = [...consoleErrors, ...pageErrors];
                    const hasIssues = allErrors.length > 0 || diag.issues.length > 0;
                    if (hasIssues) exitCode = 1;

                    const statusStr = hasIssues ? 'FAIL' : 'OK  ';
                    console.log(`[${statusStr}] ${pageName.padEnd(14)} @ ${vp.name.padEnd(14)} | H:${String(diag.bodyH).padStart(5)}px | Els:${String(diag.elementCount).padStart(4)} ${hasIssues ? '| Issues: ' + [...allErrors, ...diag.issues].join('; ') : ''}`);

                    results.push({ page: pageName, vp: vp.name, errors: allErrors, issues: diag.issues });
                } catch (err) {
                    exitCode = 1;
                    console.log(`[ERR ] ${pageName.padEnd(14)} @ ${vp.name.padEnd(14)} | ${err.message}`);
                    results.push({ page: pageName, vp: vp.name, error: err.message });
                } finally {
                    await context.close();
                }
            }
        }

        await browser.close();

        console.log('\n======================================================');
        if (exitCode === 0) {
            console.log('    SUCCESS: All tests passed cleanly! (0 issues)');
        } else {
            console.log('    FAILURE: Some tests reported errors/issues.');
        }
        console.log('======================================================\n');

    } catch (err) {
        console.error('Fatal Test Runner Error:', err);
        exitCode = 1;
    } finally {
        if (serverProcess) {
            console.log('Shutting down test server process...');
            serverProcess.kill();
        }
    }

    process.exit(exitCode);
})();
