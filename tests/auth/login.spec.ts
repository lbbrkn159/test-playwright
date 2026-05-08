import { test, expect } from '../../fixtures/auth.fixture'
import { users } from '../../data/users'
import { ENV } from '../../config/env'

test.describe('Login', () => {
  test('should login successfully', async ({
    page,
    loginPage,
    dashboardPage,
  }) => {
    await page.goto(ENV.BASE_URL)

    await loginPage.verifyLoginPageDisplayed()

    await loginPage.login(
      users.admin.username,
      users.admin.password
    )

    await dashboardPage.verifyDashboardDisplayed()

    await expect(page).toHaveURL(/dashboard/)
  })
})