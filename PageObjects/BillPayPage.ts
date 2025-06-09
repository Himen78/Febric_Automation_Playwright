import { Page, Locator, expect } from '@playwright/test';
import billPayData from '../fixtures/billPayData.json';


export class BillPayPage {
  readonly page: Page;
  readonly billPayLink: Locator;
  readonly payeeName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly account: Locator;
  readonly amount: Locator;
  readonly fromAccount: Locator;
  readonly sendPaymentButton: Locator;
  readonly confirmationMessage: Locator;
  readonly verifyAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayLink = page.locator('text=Bill Pay');
    this.payeeName = page.locator('input[name="payee.name"]');
    this.address = page.locator('input[name="payee.address.street"]');
    this.city = page.locator('input[name="payee.address.city"]');
    this.state = page.locator('input[name="payee.address.state"]');
    this.zipCode = page.locator('input[name="payee.address.zipCode"]');
    this.phone = page.locator('input[name="payee.phoneNumber"]');
    this.account = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccount = page.locator('//input[@name="verifyAccount"]');
    this.amount = page.locator('input[name="amount"]');
    this.fromAccount = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    this.confirmationMessage = page.getByText('Bill Payment Complete');
  }

  async payBill(fromAccount: string, amount: string) {
    await this.billPayLink.click();
    await expect(this.page).toHaveURL(/billpay/);

    await this.payeeName.fill(billPayData.payeeName);
    await expect(this.payeeName).toHaveValue(billPayData.payeeName);

    await this.address.fill(billPayData.address);
    await expect(this.address).toHaveValue(billPayData.address);

    await this.city.fill(billPayData.city);
    await expect(this.city).toHaveValue(billPayData.city);

    await this.state.fill(billPayData.state);
    await expect(this.state).toHaveValue(billPayData.state);

    await this.zipCode.fill(billPayData.zipCode);
    await expect(this.zipCode).toHaveValue(billPayData.zipCode);

    await this.phone.fill(billPayData.phone);
    await expect(this.phone).toHaveValue(billPayData.phone);

    await this.account.fill(billPayData.account);
    await expect(this.account).toHaveValue(billPayData.account);

    await this.verifyAccount.fill(billPayData.verifyAccount);
    await expect(this.verifyAccount).toHaveValue(billPayData.verifyAccount);

    await this.amount.fill(amount);
    await expect(this.amount).toHaveValue(amount);

    await this.fromAccount.selectOption(fromAccount);
    await expect(this.fromAccount).toHaveValue(fromAccount);

    await this.sendPaymentButton.click();
    await expect(this.confirmationMessage).toHaveText(billPayData.confirmationMessage);

    console.log(`Bill paid successfully from account ${fromAccount} with amount ${amount}`);
  }
}
