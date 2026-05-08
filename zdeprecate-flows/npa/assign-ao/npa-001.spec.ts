import { test, expect } from '@playwright/test';


test('assign ao by manager', async ({ page }) => {
  await page.goto('https://ncs-npa-uat2.bam.co.th/login.html');

  await page.fill('#usernameInput', process.env.Manager_PKK3!);
  await page.fill('#passwordInput', process.env.Password!);
  await page.getByRole('button', {name: 'Sign in'}).click();

  await expect(page).toHaveTitle(/หน้าหลัก/);

  await page.getByRole('button', {name: 'NPA', exact: true}).click();
  await page.getByRole('button', {name: 'มอบหมายงานผู้ดูแล (', exact: false}).first().click();

  await page.locator('[id*="textBox46"]').fill('CITI');
  
// กดปุ่มค้นหา
  await page.locator('.customer-search-container').first().locator('button').first().click({ force: true });

});
