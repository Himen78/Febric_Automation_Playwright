import { Page, Locator, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly openAccountLink: Locator;
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openNewAccountButton: Locator;
  readonly newAccountNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountLink = page.locator('//a[normalize-space()="Open New Account"]');
    this.accountTypeSelect = page.locator('select#type');
    this.fromAccountSelect = page.locator('select#fromAccountId');
    this.openNewAccountButton = page.locator('//input[@value="Open New Account"]');
    this.newAccountNumber = page.locator('//a[@id="newAccountId"]');
  }

  async openNewSavingsAccount(): Promise<string> {
    await expect(this.openAccountLink).toBeVisible();
    await this.openAccountLink.click();
    await expect(this.page).toHaveURL(/openaccount/);

    await expect(this.accountTypeSelect).toBeVisible();
    await this.accountTypeSelect.selectOption('1');

    await expect(this.fromAccountSelect.first()).toBeVisible();
    await this.fromAccountSelect.first().click();

    await expect(this.openNewAccountButton).toBeVisible({ timeout: 5000 });

    await this.page.waitForTimeout(3000);

    await this.openNewAccountButton.click({ force: true });

    await expect(this.newAccountNumber).toBeVisible({ timeout: 10000 });

    const accountNumber = await this.newAccountNumber.textContent();
    expect(accountNumber).not.toBeNull();
    expect(accountNumber!.trim()).not.toBe('');
    return accountNumber!.trim();
  }
}
