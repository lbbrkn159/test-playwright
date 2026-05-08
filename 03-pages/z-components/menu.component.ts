import { Page as Page, Locator } from '@playwright/test';

export class BasePage {
    // เริ่มต้นด้วยการสร้าง object page สำหรับ class
  readonly page: Page;
    // ประกาศ locator สำหรับเมนูต่างๆ
  readonly ppButton:            Locator;
  readonly ccButton:            Locator;
  readonly caButton:            Locator;
  readonly apprButton:          Locator;
  readonly maButton:            Locator;
  readonly npaButton:           Locator;
  readonly npaPaymentButton:    Locator;
  readonly nplButton:           Locator;
  readonly lawButton:           Locator;
  readonly prButton:            Locator;
  readonly rcButton:            Locator;
  readonly ctdButton:           Locator;
  readonly rpButton:            Locator;
  readonly agdButton:           Locator;
  readonly jobButton:           Locator;
  readonly settingButton:       Locator;
  readonly logoutButton:        Locator;
  
    // ใน constructor ให้รับ page และกำหนดค่าให้กับ locator ต่างๆ
  constructor(page: Page) {
    this.page = page;
    this.ppButton               = page.getByRole('button', { name: /^Prospective Portfolio/ });
    this.ccButton               = page.getByRole('button', { name: /^Centralized Customer/ });
    this.caButton               = page.getByRole('button', { name: /^Centralized Asset/ });
    this.apprButton             = page.getByRole('button', { name: /^Appraisal Asset/ });
    this.maButton               = page.getByRole('button', { name: /^Maintenance/ });
    this.npaButton              = page.getByRole('button', { name: 'NPA' });
    this.npaPaymentButton       = page.getByRole('button', { name: 'NPA Payment' });
    this.nplButton              = page.getByRole('button', { name: 'NPL' });
    this.lawButton              = page.getByRole('button', { name: 'LAW' });
    this.prButton               = page.getByRole('button', { name: /^Payment Requisition/ });
    this.rcButton               = page.getByRole('button', { name: /^Recieve/ });
    this.ctdButton              = page.getByRole('button', { name: /^Custodian/ });
    this.rpButton               = page.getByRole('button', { name: /^Report/ });
    this.agdButton              = page.getByRole('button', { name: /^Agenda/ });
    this.jobButton              = page.getByRole('button', { name: /^Job/ });
    this.settingButton          = page.locator('.mx-name-antdDropdownMenu_User1')
    this.logoutButton           = page.getByRole('menuitem', { name: 'ออกจากระบบ' })
  }
  async navigateToPP() {
    await this.ppButton.click();
  }
  async navigateToCC() {
    await this.ccButton.click();
  }
  async navigateToCA() {
    await this.caButton.click();
  }
  async navigateToAppraisal() {
    await this.apprButton.click();
  }
  async navigateToMA() {
    await this.maButton.click();
  }
  async navigateToNPA() {
    await this.npaButton.click();
  }
  async navigateToNPAPayment() {
    await this.npaPaymentButton.click();
  }
  async navigateToNPL() {
    await this.nplButton.click();
  }
  async navigateToLAW() {
    await this.lawButton.click();
  }
  async navigateToPR() {
    await this.prButton.click();
  }
  async navigateToRC() {
    await this.rcButton.click();
  }
  async navigateToCTD() {
    await this.ctdButton.click();
  }
  async navigateToRP() {
    await this.rpButton.click();
  }
  async navigateToAGD() {
    await this.agdButton.click();
  }
  async navigateToJob() {
    await this.jobButton.click();
  }
  async navigateToSetting() {
    await this.settingButton.click();
  }
  async logout() {
    await this.logoutButton.click();
  }
  


}