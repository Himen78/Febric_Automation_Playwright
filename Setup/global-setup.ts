import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { RegistrationPage } from '../PageObjects/RegistrationPage';
import userData from '../fixtures/userData.json';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({headless:true});
  const context = await browser.newContext();
  const page = await context.newPage();

  const login = new LoginPage(page);
  const register = new RegistrationPage(page);

  const randomUsername = `user${Date.now()}`;
  console.log(`Generated Username: ${randomUsername}`);
  const password = userData.password;

  await login.navigate();
  await login.clickRegister();
  await register.registerNewUser(randomUsername, password);
  await register.verifyRegistrationSuccess(randomUsername);

  await login.logout();
  await login.login(randomUsername, password);

  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
