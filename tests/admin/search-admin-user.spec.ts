import { test, expect }
from '../../fixtures/base.fixture';

import { ENV } from '../../config/env';

import { users }
from '../../data/users';

import { adminSearchData }
from '../../data/admin-search-data';

test.describe('Admin Search', () => {

  test('Search admin user by username and role',
    async ({
      page,
      loginPage,
      dashboardPage,
      adminPage
    }) => {

      // login
      await page.goto(ENV.BASE_URL);

      await loginPage.login(
        users.admin.username,
        users.admin.password
      );

      // go to admin page
      await dashboardPage.goToAdminPage();

      // search
      await adminPage.searchAdminUser(
        adminSearchData.username,
        adminSearchData.role
      );

      // assertion
      await expect(page)
        .toHaveURL(/admin/);

      await page.waitForTimeout(10000);

  });

});