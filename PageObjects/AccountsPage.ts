import { Page, Locator, expect } from '@playwright/test';

export class AccountsPage {
  readonly page: Page;
  readonly accountsOverviewLink: Locator;
  readonly balanceTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewLink = page.locator('text=Accounts Overview');
    this.balanceTable = page.locator('table#accountTable');
  }

  async validateBalanceForAccount(accountNumber: string) {
    await this.accountsOverviewLink.click();
    await expect(this.page).toHaveURL(/overview/);

    await expect(this.balanceTable).toBeVisible();

    const accountRow = this.page.locator(`//a[normalize-space()='${accountNumber}']`);
    await expect(accountRow).toBeVisible();

    const balanceText = await accountRow.innerText();
    expect(balanceText).not.toBe('');
    console.log(`Balance for account ${accountNumber}: ${balanceText}`);
    await this.page.waitForTimeout(2000);
  }
}
