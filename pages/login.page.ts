import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  usernameInput = this.page.locator('input[name="username"]')
  passwordInput = this.page.locator('input[name="password"]')
  loginButton = this.page.getByRole('button', { name: 'Login' })

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async verifyLoginPageDisplayed() {
    await expect(this.loginButton).toBeVisible()
  }
}