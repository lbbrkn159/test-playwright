import { Page, Locator } from '@playwright/test';

export class PPMenu {
  readonly page: Page;
  readonly ppnpaButton: Locator;
  readonly ppnpaClaimButton: Locator;
  readonly ppnplButton: Locator;
  readonly ppnplClaimButton: Locator;
  constructor(page: Page) {
    this.page               = page;
    this.ppnpaButton        = page.getByRole('button', { name: /Portfolio NPA/ });
    this.ppnpaClaimButton   = page.getByRole('button', { name: /เคลม PPNPA/ });
    this.ppnplButton        = page.getByRole('button', { name: /Portfolio NPL/ });
    this.ppnplClaimButton   = page.getByRole('button', { name: /เคลม PPNPL/ });
  }
  async navigateToPP() {
    await this.ppnpaButton.click();
  }
  async navigateToPPNPAClaim() {
    await this.ppnpaClaimButton.click();
  }
  async navigateToPPNPL() {
    await this.ppnplButton.click();
  }  
  async navigateToPPNPLClaim() {
    await this.ppnplClaimButton.click();
  }
}