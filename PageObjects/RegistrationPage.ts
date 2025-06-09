import { Page, Locator, expect } from '@playwright/test';
import userData from '../fixtures/registrationData.json';

export class RegistrationPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="customer.firstName"]');
    this.lastName = page.locator('input[name="customer.lastName"]');
    this.address = page.locator('input[name="customer.address.street"]');
    this.city = page.locator('input[name="customer.address.city"]');
    this.state = page.locator('input[name="customer.address.state"]');
    this.zipCode = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumber = page.locator('input[name="customer.phoneNumber"]');
    this.ssn = page.locator('input[name="customer.ssn"]');
    this.username = page.locator('input[name="customer.username"]');
    this.password = page.locator('input[name="customer.password"]');
    this.confirmPassword = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.welcomeText = page.locator('.title');
  }

  async registerNewUser(username: string, password: string) {
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(userData.firstName);
    await expect(this.firstName).toHaveValue(userData.firstName);

    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(userData.lastName);
    await expect(this.lastName).toHaveValue(userData.lastName);

    await expect(this.address).toBeVisible();
    await this.address.fill(userData.address);
    await expect(this.address).toHaveValue(userData.address);

    await expect(this.city).toBeVisible();
    await this.city.fill(userData.city);
    await expect(this.city).toHaveValue(userData.city);

    await expect(this.state).toBeVisible();
    await this.state.fill(userData.state);
    await expect(this.state).toHaveValue(userData.state);

    await expect(this.zipCode).toBeVisible();
    await this.zipCode.fill(userData.zipCode);
    await expect(this.zipCode).toHaveValue(userData.zipCode);

    await expect(this.phoneNumber).toBeVisible();
    await this.phoneNumber.fill(userData.phoneNumber);
    await expect(this.phoneNumber).toHaveValue(userData.phoneNumber);

    await expect(this.ssn).toBeVisible();
    await this.ssn.fill(userData.ssn);
    await expect(this.ssn).toHaveValue(userData.ssn);

    await expect(this.username).toBeVisible();
    await this.username.fill(username);
    await expect(this.username).toHaveValue(username);

    await expect(this.password).toBeVisible();
    await this.password.fill(password);
    await expect(this.password).toHaveValue(password);

    await expect(this.confirmPassword).toBeVisible();
    await this.confirmPassword.fill(password);
    await expect(this.confirmPassword).toHaveValue(password);

    await expect(this.registerButton).toBeVisible();
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess(username: string) {
    await this.page.waitForSelector('.title');
    await this.welcomeText.waitFor({ state: 'visible' });
    const welcomeMessage = await this.welcomeText.textContent();
    expect(welcomeMessage).not.toBeNull();
    expect(welcomeMessage).toContain(username);
  }
}
