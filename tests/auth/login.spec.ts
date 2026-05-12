import { test, expect } from '../../fixtures/base.fixture';
import { ENV } from '../../config/env';
import { users } from '../../data/users';

test.describe('Login Feature', () => {

  test('Admin can login successfully', async ({ page, loginPage }) => {

    await page.goto(ENV.BASE_URL);

    await loginPage.login(
      users.admin.username,
      users.admin.password
    );

    await loginPage.verifyLoginSuccess();
  });

});