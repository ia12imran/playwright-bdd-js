import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

module.exports = defineConfig({
  testDir: './src/features',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 4,
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/playwright-report.json' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.careers360.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 30000,
    navigationTimeout: 30000,
    headless: process.env.HEADLESS === 'true'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
  globalSetup: './config/global-setup.js'
}); 