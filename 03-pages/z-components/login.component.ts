import { Page, Locator } from '@playwright/test';

export class LoginComponent {

  readonly page: Page
  readonly versionText: Locator
  readonly inputUsername: Locator
  readonly inputPassword: Locator
  readonly btnLogin: Locator

  constructor(page: Page) {

    this.page = page

    this.versionText = page.locator('.env-style')
    this.inputUsername = page.locator('#usernameInput')
    this.inputPassword = page.locator('#passwordInput')
    this.btnLogin = page.locator('#loginButton')

  }

  async getVersion() {
    
    const version = await this.versionText.innerText()
	return version

  }

  async fillUsername(username: string) {

    await this.inputUsername.fill(username)

  }

  async fillPassword(password: string) {

    await this.inputPassword.fill(password)

  }

  async clickLogin() {

    await this.btnLogin.click()

  }

  async login(username: string, password: string) {

    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickLogin()

  }

}
