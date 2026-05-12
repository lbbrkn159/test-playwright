import { Page } from '@playwright/test';

export class AdminPage {
  usernameInput;

  userRoleDropdown;

  searchButton;

  constructor(private page: Page) {

  this.usernameInput = this.page
    .locator('label:has-text("Username")')
    .locator('../../..')
    .locator('input');

  this.userRoleDropdown = this.page
    .locator('.oxd-select-text')
    .first();

  this.searchButton = this.page.getByRole('button', {
    name: 'Search'
  });
  }

  async searchByUsername(username: string) {

    await this.usernameInput.fill(username);
  }

  async selectUserRole(role: string) {

    await this.userRoleDropdown.click();

    await this.page
      .locator('.oxd-select-option')
      .getByText(role)
      .click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async searchAdminUser(
    username: string,
    role: string
  ) 
  
  {

    await this.searchByUsername(username);

    await this.selectUserRole(role);

    await this.clickSearch();
  }
}