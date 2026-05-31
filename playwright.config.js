const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/mobile.spec.js'],
    },
    {
      // iPhone 13 Pro viewport + DPR + UA, rendered by chromium (no webkit install needed).
      name: 'mobile',
      use: {
        ...devices['iPhone 13 Pro'],
        defaultBrowserType: 'chromium',
        browserName: 'chromium',
      },
      testMatch: ['**/mobile.spec.js'],
    },
  ],
});
