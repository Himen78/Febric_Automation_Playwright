# 🏦 ParaBank E2E Test Automation (Playwright + TypeScript)

This project automates end-to-end testing of the [ParaBank application](https://parabank.parasoft.com/) using [Playwright](https://playwright.dev/) with TypeScript. It covers both UI and API testing including:

- User Registration
- Login
- Creating Savings Account
- Fund Transfer
- Bill Payment
- Transaction History Validation via API

---

## 📦 Tech Stack

- **Playwright** with **TypeScript**
- Page Object Model (POM)
- API + UI Hybrid Testing
- JSON test data integration
- Environment setup via `global-setup.ts`

---

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Himen78/Febric_Automation_Playwright.git
cd Febric_Automation_Playwright

### 2. Install Dependencies
npm install

### 2.  Install Browsers
npx playwright install

🏁 Test Execution
npx playwright test --headed

.
├── tests/
│   └── paraBank.spec.ts           # Main test scenario
├── PageObjects/
│   ├── LoginPage.ts
│   ├── RegistrationPage.ts
│   ├── OpenAccountPage.ts
│   ├── TransferFundsPage.ts
│   └── BillPayPage.ts
├── test-data/
│   └── userData.json             
├── global-setup.ts              
├── playwright.config.ts
└── README.md