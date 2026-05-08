# Playwright OrangeHRM Automation POC

Automation Testing POC using Playwright + TypeScript with OrangeHRM demo application.

---

# Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- GitHub Actions
- HTML Report

---

# Demo Application

OrangeHRM Demo:

https://opensource-demo.orangehrmlive.com

---

# Project Structure

```text
playwright-orangehrm-poc/
│
├── tests/
│   └── auth/
│       └── login.spec.ts
│
├── pages/
│   ├── base.page.ts
│   ├── login.page.ts
│   └── dashboard.page.ts
│
├── fixtures/
│   └── auth.fixture.ts
│
├── data/
│   └── users.ts
│
├── config/
│   └── env.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Features

- Login automation
- Page Object Model (POM)
- Reusable fixtures
- Config management
- HTML reporting
- Screenshot on failure
- Video recording
- Trace viewer
- GitHub Actions CI/CD

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd playwright-orangehrm-poc
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

# Environment Variables

Create `.env`

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
```

---

# Run Tests

## Run all tests

```bash
npx playwright test
```

---

## Run specific test

```bash
npx playwright test tests/auth/login.spec.ts
```

---

## Run headed mode

```bash
npx playwright test --headed
```

---

## Run debug mode

```bash
npx playwright test --debug
```

---

# Reports

## Open HTML Report

```bash
npx playwright show-report
```

---

# GitHub Actions

CI/CD workflow file:

```text
.github/workflows/playwright.yml
```

Workflow automatically runs tests when:
- push to main branch
- pull request created

---

# Example Test Flow

## Login Success

- Open login page
- Enter username
- Enter password
- Click login
- Verify dashboard displayed

---

# Example Architecture

```text
Test
 ↓
Fixture
 ↓
Page Object
 ↓
Playwright
 ↓
Browser
```

---

# Coding Standards

## Recommended Locators

Use:

```ts
getByRole()
getByLabel()
locator('[data-testid=]')
```

Avoid:

```ts
xpath
nth-child
hard wait
```

---

# Best Practices

- Keep tests independent
- Avoid hard waits
- Use reusable page objects
- Separate test data from test logic
- Use environment variables for config
- Keep locators stable

---

# Useful Commands

## Generate selectors/code

```bash
npx playwright codegen
```

---

## Show trace viewer

```bash
npx playwright show-trace trace.zip
```

---

# Future Improvements

- Add Employee flow
- API testing
- Parallel execution
- Allure Report
- Docker support
- Cross-browser testing

---

# Author

Playwright Automation Testing POC