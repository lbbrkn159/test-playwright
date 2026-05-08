import { Page } from '@playwright/test';
import { LoginFlow } from '../../02-flows/login-flow.ts';
import { PPMenu } from '../../03-pages/pp-page/pp.menu.ts';
import { PPNPAMakerMenu } from '../../03-pages/pp-page/ppnpa.maker.ts';

export async function fdfdvds(page: Page) {
  const loginPage = new LoginFlow(page);

  await loginPage.openLoginPage(CA_UAT1_URL);
  await loginPage.clickSomething();
}