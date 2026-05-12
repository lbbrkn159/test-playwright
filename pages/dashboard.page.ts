import { Page } from '@playwright/test';

export class DashboardPage {

  adminMenu;

  constructor(private page: Page) {
    this.adminMenu = this.page.getByRole('link', {
      name: 'Admin'
    });
  }

  async goToAdminPage() {
    await this.adminMenu.click();
  }
}