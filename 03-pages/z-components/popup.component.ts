import { Page as Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page:        Page;
  readonly okButton:    Locator;

  constructor(page: Page) {
  this.page         = page;
  this.okButton     = page.getByRole('button', { name: 'ตกลง' });
  }

  async clickOk() {
  await this.okButton.click();
  }

}