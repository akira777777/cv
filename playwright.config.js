const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');

const CUSTOM_CHROMIUM = '/home/akira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const EXECUTABLE_PATH = process.env.PLAYWRIGHT_CHROMIUM_PATH || (fs.existsSync(CUSTOM_CHROMIUM) ? CUSTOM_CHROMIUM : undefined);

const launchOpts = {
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
};
if (EXECUTABLE_PATH) {
  launchOpts.executablePath = EXECUTABLE_PATH;
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'off',
    launchOptions: launchOpts
  },

  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)' },
    },
  ],

  webServer: {
    command: 'node serve.js',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 10000,
  },
});
