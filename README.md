# OrangeHRM Playwright Automation Framework

Production-ready UI Automation Framework using Playwright + TypeScript for OrangeHRM.

---

# Tech Stack

* Playwright
* TypeScript
* Page Object Model (POM)
* Fixtures
* Environment Configuration
* GitHub Actions CI
* HTML Reporting

---

# Project Structure

```bash
orangehrm-playwright/
│
├── tests/
├── pages/
├── fixtures/
├── data/
├── config/
├── utils/
├── reports/
├── .github/workflows/
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd orangehrm-playwright
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Playwright Browsers

```bash
npx playwright install
```

---

# Environment Setup

Create `.env` file in root directory.

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
USERNAME=Admin
PASSWORD=admin123
```

---

# Run Tests

## Run All Tests

```bash
npm test
```

---

## Run in Headed Mode

```bash
npm run test:headed
```

---

## Run Playwright UI Mode

```bash
npm run test:ui
```

---

## Run Specific Test

```bash
npx playwright test tests/auth/login.spec.ts
```

---

# HTML Report

After execution:

```bash
npm run report
```

Report location:

```bash
reports/html-report/index.html
```

---

# Framework Architecture

## Page Object Model (POM)

Encapsulates UI elements and page actions.

Example:

```ts
await loginPage.login(username, password);
```

Benefits:

* Reusable code
* Better maintainability
* Cleaner test files
* Easier scaling

---

# Fixtures

Fixtures provide reusable test setup and dependencies.

Example:

```ts
test('Login', async ({ loginPage }) => {
  await loginPage.login('Admin', 'admin123');
});
```

---

# Environment Configuration

Environment variables are managed using `.env`.

Example:

```ts
ENV.BASE_URL
ENV.USERNAME
ENV.PASSWORD
```

Supports:

* local
* staging
* production

---

# GitHub Actions CI

Pipeline location:

```bash
.github/workflows/playwright.yml
```

Triggers:

* push
* pull_request

Features:

* Install dependencies
* Install browsers
* Execute Playwright tests
* Upload HTML report artifact

---

# Example Test

```ts
test('Admin can login successfully', async ({ page, loginPage }) => {

  await page.goto(ENV.BASE_URL);

  await loginPage.login(
    users.admin.username,
    users.admin.password
  );

  await loginPage.verifyLoginSuccess();

});
```

---

# Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| npm test            | Run all tests            |
| npm run test:headed | Run tests in headed mode |
| npm run test:ui     | Open Playwright UI       |
| npm run report      | Open HTML report         |

---

# Best Practices

* Keep assertions inside test files
* Keep locators inside page objects
* Use fixtures for shared setup
* Avoid hardcoded waits
* Use test data separation
* Use environment variables
* Use reusable helper methods

---

# Recommended Next Enhancements

* Storage State Authentication
* API Testing Layer
* Docker Support
* Parallel Execution
* Cross-browser Execution
* Slack Notifications
* Test Tagging
* Allure Reporting
* Retry Strategy
* Test Data Management

---

# Sample Folder Structure

```bash
tests/
 ├── auth/
 └── employee/

pages/
 ├── login.page.ts
 ├── dashboard.page.ts
 └── pim.page.ts

fixtures/
 └── base.fixture.ts

data/
 └── users.ts

config/
 └── env.ts
```

---

# CI/CD Execution

Automatically runs on:

* Push to main/develop
* Pull Request to main/develop

GitHub Actions uploads:

* HTML Report
* Trace Files
* Videos
* Screenshots

---

# Author

Automation Framework POC for OrangeHRM using Playwright + TypeScript.
