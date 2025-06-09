import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../PageObjects/OpenAccountPage';
import { AccountsPage } from '../PageObjects/AccountsPage';
import { TransferFundsPage } from '../PageObjects/TransferFundsPage';
import { BillPayPage } from '../PageObjects/BillPayPage';
import { LoginPage } from '../PageObjects/LoginPage';
import transferFund from '../fixtures/transferData.json';
import { Logger } from '../Utils/logger';
import { getFormattedTodayDate } from '../Utils/dateUtils';
let newAccountNumber;

test('ParaBank - Create new Saving account, Transfer funds & Pay Bill', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const accountsPage = new AccountsPage(page);
  const transferFundsPage = new TransferFundsPage(page);
  const billPayPage = new BillPayPage(page);
  const loginPage = new LoginPage(page);

  Logger.info('Navigating to ParaBank login page');
  await loginPage.navigate();

  Logger.info('Opening a new savings account');
  newAccountNumber = await openAccountPage.openNewSavingsAccount();
  Logger.info(`New savings account created: ${newAccountNumber}`);

  Logger.info('Validating balance for the new account');
  await accountsPage.validateBalanceForAccount(newAccountNumber);

  Logger.info('Fetching available accounts for transfer');
  const availableAccounts = await transferFundsPage.getAvailableAccounts();
  expect(availableAccounts.length).toBeGreaterThanOrEqual(1);

  if (availableAccounts.length === 0) {
    Logger.error('No available accounts found for transfer.');
    throw new Error('No available accounts found for transfer.');
  }

  const fromAccount = newAccountNumber;
  const toAccount = availableAccounts[0];
  Logger.info(`From Account: ${fromAccount}`);
  Logger.info(`To Account: ${toAccount}`);

  Logger.info('Transferring funds');
  await transferFundsPage.transferFunds(fromAccount, toAccount, transferFund.transferFund);

  Logger.info('Paying bill from the new account');
  await billPayPage.payBill(newAccountNumber, '25');
  Logger.info('Bill payment completed');
});

test('Find Transactions API Response', async ({ request }) => {
  const accountId = newAccountNumber;
  const formattedDate = getFormattedTodayDate();

  const response = await request.get(
    `/parabank/services_proxy/bank/accounts/${accountId}/transactions/onDate/${formattedDate}`,
    {
      headers: { 'Accept': 'application/json' },
      timeout: 30000
    }
  );
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log(body);

  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  expect(body.some(txn => txn.accountId == accountId)).toBeTruthy();
  expect(body.some(txn => txn.accountId == accountId && txn.amount == transferFund.transferFund)).toBeTruthy();

  for (const txn of body) {
  expect(txn).toHaveProperty('id');
  expect(txn).toHaveProperty('accountId');
  expect(txn).toHaveProperty('type');
  expect(txn).toHaveProperty('amount');
  expect(txn).toHaveProperty('date');
  expect(txn).toHaveProperty('description');
  }

});
