import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { AdminPage } from '../pages/admin.page';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
};

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  }

});

export { expect } from '@playwright/test';