import { Page } from '@playwright/test'
import { LoginComponent } from '../03-pages/z-components/login.component'

export class LoginFlow {

  private loginComponent: LoginComponent

  constructor(private page: Page) {

    this.loginComponent = new LoginComponent(page)

  }

  async openLoginPage(baseUrl: string) {

    await this.page.goto(`${baseUrl}`)

  }

  async login(baseUrl: string, username: string, password: string) {

    await this.openLoginPage(baseUrl)
    await this.loginComponent.login(username, password)

  }

  async logPageVersion(): Promise<string> {

	const version = await this.loginComponent.getVersion()
	console.log(`Page Version: ${version}`)
	return version

  }

}
