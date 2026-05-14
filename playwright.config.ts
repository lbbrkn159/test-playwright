import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60000,
  globalTimeout: 100000,
  expect: {
    timeout: 10000
  }, 
 

  retries: 0,

  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['list']
  ],

  use: {
    headless: true,
    launchOptions: {
      slowMo: 777,
      args: ['--start-maximized']
    },
    viewport: null,
    screenshot: 'only-on-failure',
    video: {
      mode: 'on',
    },
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});