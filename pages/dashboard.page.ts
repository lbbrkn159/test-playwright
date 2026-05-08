import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  dashboardHeader = this.page.getByRole('heading', {
    name: 'Dashboard',
  })

  async verifyDashboardDisplayed() {
    await expect(this.dashboardHeader).toBeVisible()
  }
}