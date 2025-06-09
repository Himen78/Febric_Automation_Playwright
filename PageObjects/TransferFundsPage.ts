import { Page, Locator, expect } from '@playwright/test';
import transferData from '../fixtures/transferData.json';


export class TransferFundsPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsLink = page.locator('//a[normalize-space()="Transfer Funds"]');
    this.amountInput = page.locator('//input[@id="amount"]');
    this.fromAccountSelect = page.locator('//select[@id="fromAccountId"]');
    this.toAccountSelect = page.locator('select#toAccountId');
    this.transferButton = page.locator('input.button');
    this.confirmationHeader = page.getByText('Transfer Complete!');
  }
  async navigateToTransferPage() {
    await expect(this.transferFundsLink).toBeVisible();
    await this.transferFundsLink.click();
    await expect(this.fromAccountSelect).toBeVisible();
    await expect(this.amountInput).toBeVisible();
    await expect(this.toAccountSelect).toBeVisible();
    await expect(this.transferButton).toBeVisible();
  }

  async getAvailableAccounts(): Promise<string[]> {
    await this.navigateToTransferPage();
    await this.fromAccountSelect.locator('option').first().waitFor({ state: 'attached', timeout: 5000 });
    const options = await this.fromAccountSelect.locator('option').all();
    const accountIds: string[] = [];
    for (const option of options) {
      const value = await option.getAttribute('value');
      if (value) {
        accountIds.push(value);
      }
    }
    console.log('Available accounts:', accountIds);
    return accountIds;
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: string) {
    await expect(this.amountInput).toBeVisible();
    await this.amountInput.fill(amount);
    await expect(this.amountInput).toHaveValue(amount);

    await expect(this.fromAccountSelect).toBeVisible();
    await this.fromAccountSelect.selectOption(fromAccount);
    await expect(this.fromAccountSelect).toHaveValue(fromAccount);

    await expect(this.toAccountSelect).toBeVisible();
    await this.toAccountSelect.selectOption(toAccount);
    await expect(this.toAccountSelect).toHaveValue(toAccount);

    await expect(this.transferButton).toBeVisible();
    await this.transferButton.click();

    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationHeader).toHaveText(transferData.transferCompleteValText);
  }
}
