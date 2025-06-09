import { Locator, Page } from "playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly accountsOverview: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.locator('text=Register');
    this.loginUsernameInput = page.locator('input[name="username"]');
    this.loginPasswordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.logoutLink = page.locator('text=Log Out');
    this.accountsOverview = page.locator('text=Accounts Overview');
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async login(username: string, password: string) {
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}