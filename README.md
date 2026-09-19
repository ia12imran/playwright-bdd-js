<div align="center">

# Playwright BDD (JavaScript)

**Behavior-Driven End-to-End Test Automation Framework**

A professional end-to-end testing solution built with **Playwright**, **Cucumber.js**, and **Page Object Model**, featuring dynamic test-data generation, Allure HTML dashboards, structured logging, and CI/CD out-of-the-box.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Install Playwright Browsers](#3-install-playwright-browsers)
  - [4. Configure Environment](#4-configure-environment)
  - [5. Verify the Setup](#5-verify-the-setup)
- [Writing Tests](#writing-tests)
  - [Feature Files (Gherkin)](#feature-files-gherkin)
  - [Step Definitions](#step-definitions)
  - [Page Objects](#page-objects)
  - [Test Data Generation](#test-data-generation)
- [Running Tests](#running-tests)
  - [NPM Scripts](#npm-scripts)
  - [Cucumber Profiles](#cucumber-profiles)
  - [Expression Tags](#expression-tags)
  - [Environment Overrides](#environment-overrides)
- [Test Reports](#test-reports)
  - [Allure Report](#allure-report)
  - [Cucumber HTML Report](#cucumber-html-report)
  - [Professional Dashboard](#professional-dashboard)
- [Continuous Integration](#continuous-integration)
- [Docker](#docker)
- [Configuration Reference](#configuration-reference)
- [Logging](#logging)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

---

## Overview

This framework automates the **Careers360 user registration flow** across three education levels — **Class Six**, **Class Seven**, and **Class Eight** — using Behavior-Driven Development (BDD).

Gherkin feature files describe the behaviour in plain English, while a layered architecture (features → step definitions → page objects → helpers) keeps tests readable, maintainable, and reusable. Each scenario runs against a real browser (Chromium, Firefox, or WebKit) with auto-generated test data and produces rich, inspectable reports.

---

## Features

- **BDD with Gherkin** — human-readable scenarios written in `Given / When / Then` syntax
- **Playwright browser automation** — cross-browser support (Chromium, Firefox, WebKit)
- **Page Object Model (POM)** — clean separation of selectors, actions, and test logic
- **Dynamic test data** — Faker-powered generator for names, emails, and Indian mobile numbers
- **Multiple reporting formats** — Allure, Cucumber HTML, JSON, and a custom Chart.js dashboard
- **Structured logging** — Winston transports with rotating file logs and console output
- **Hooks & artifacts** — failure screenshots, video recording (optional), browser lifecycle management
- **Parallel execution** — configurable workers for faster test runs
- **Retry support** — automatic scenario retry on flaky failures
- **CI/CD ready** — GitHub Actions workflow on push and pull-request
- **Cucumber profiles** — run Class Six, Seven, or Eight suites in isolation
- **Tag-based selection** — `@smoke`, `@regression`, `@positive`, `@negative`, and custom tags

---

## Tech Stack

| Area             | Technology                                |
| ---------------- | ----------------------------------------- |
| Test Runner      | Cucumber.js (`@cucumber/cucumber` v10)    |
| Browser Engine   | Playwright (v1.62)                        |
| Assertions       | Chai + Chai-as-promised                   |
| Test Data        | Faker (`@faker-js/faker`)                 |
| Reporting        | Allure, cucumber-html-reporter, Chart.js  |
| Logging          | Winston                                   |
| Linting / Format | ESLint / Prettier                         |
| CI               | GitHub Actions                            |
| Runtime          | Node.js 20+                               |

---

## Project Structure

```
playwright-bdd-JS/
│
├── .github/workflows/          # CI/CD pipeline (Node.js CI)
├── config/
│   ├── global-setup.js         # Playwright global setup (creates output dirs)
│   ├── environments/           # Environment-specific config (placeholder)
│   └── test-data/              # Static test data (placeholder)
├── docker/                     # Docker assets (Dockerfile pending)
├── scripts/
│   ├── setup.js                # Scaffolds the project directory structure
│   ├── verify-setup.js         # Validates the local setup
│   └── generate-professional-report.js  # Custom Chart.js HTML dashboard
├── src/
│   ├── features/               # Gherkin .feature files
│   │   ├── registration/       #   Class Six / Seven / Eight flows
│   │   └── verification/       #   Framework sanity checks
│   ├── pages/                  # Page Object Model
│   │   ├── base/BasePage.js    #   Base class — reusable Playwright wrappers
│   │   └── registration/       #   Page objects + companion locator files
│   ├── step-definitions/
│   │   ├── common/             #   hooks.js (browser lifecycle) + common-steps.js
│   │   └── registration/       #   Class-level step definitions
│   └── utilities/
│       ├── helpers/            #   DataGenerator (Faker)
│       └── logger/             #   Logger (Winston singleton)
├── support/
│   └── world.js                # Custom Cucumber World (shared scenario state)
│
├── cucumber.js                 # Primary Cucumber config + profiles
├── playwright.config.js        # Secondary Playwright runner config
├── .reporter-config.json       # Cucumber HTML report metadata
├── .env.example                # Environment variable template
├── .eslintrc.json              # ESLint configuration
└── package.json                # Project manifest & scripts
```

> Generated at runtime (git-ignored): `reports/`, `screenshots/`, `videos/`, `test-results/`.

---

## Prerequisites

| Requirement       | Version / Notes                     |
| ----------------- | ----------------------------------- |
| Node.js           | **20.x or 22.x** (LTS recommended)  |
| npm               | Comes bundled with Node.js          |
| Operating System  | Linux, macOS, or Windows (WSL2)     |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd playwright-bdd-JS
```

### 2. Install Dependencies

```bash
npm install
```

> Use `npm ci` in CI/CD environments for a clean, lockfile-exact install.

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps chromium
```

Install additional browsers if needed (Firefox / WebKit):

```bash
npx playwright install --with-deps firefox webkit
```

### 4. Configure Environment

Create your local environment file from the template:

```bash
cp .env.example .env
```

Then open `.env` and adjust the values as needed (see [Configuration Reference](#configuration-reference)).

### 5. Verify the Setup

Two helper scripts validate your installation:

```bash
npm run setup        # Scaffolds missing directories
npm run verify       # Checks that all required files & folders exist
```

```bash
npm run verify
✅ Verifying setup...
```

---

## Writing Tests

The framework follows a strict layered architecture. Each new test flow requires work at four levels:

```
feature file  ──►  step definitions  ──►  page objects  ──►  (helpers + locators)
```

### Feature Files (Gherkin)

Place `.feature` files under `src/features/<domain>/`. Use kebab-case filenames and meaningful tags.

```gherkin
@registration @smoke
Feature: User Registration Form

  Background:
    Given I am on the registration page for user class Six
    When I Enter UserName for class Six User Creation
    Then I Enter EmailID for class Six User Creation
    When I Enter Mobile Number for class Six User Creation

  @positive
  Scenario: Fill registration form with valid details
    When I click on Studying In Dropdown as Select Class Six
    And I Click on School Board as select board "State Board"
    And I click on Get OTP button
    Then I should see OTP request successful
```

| Element       | Convention                                                  |
| ------------- | ----------------------------------------------------------- |
| Location      | `src/features/<domain>/<kebab-case>.feature`                |
| Naming        | Domain folder per module (e.g. `registration`)              |
| Tags          | `@smoke`, `@regression`, `@positive`, `@negative`, custom   |
| Scenario      | One happy/main path + optional negative variants            |

### Step Definitions

Create one file per feature/class-level flow under `src/step-definitions/<domain>/`. Reusable hooks and framework checks live under `src/step-definitions/common/`.

```js
const { Given, When, Then } = require("@cucumber/cucumber");
const { RegistrationPage } = require("../../pages/registration/RegistrationPage");

When("I click on Get OTP button", async function () {
  this.registrationPage = this.registrationPage || new RegistrationPage(this.page);
  await this.registrationPage.clickGetOTP();
});

Then("I should see OTP request successful", async function () {
  const success = await this.registrationPage.isOTPSuccessful();
  expect(success).to.be.true;
});
```

### Page Objects

Each page object extends `BasePage` (see `src/pages/base/BasePage.js`), which provides reusable wrappers for navigation, clicking, filling, dropdowns, screenshots, and more. Selectors are typically kept in a companion `*Locator(s).js` file.

```js
class RegistrationPage extends BasePage {
  async navigateToRegistration() {
    await this.navigateTo(process.env.REGISTRATION_URL || "/user/register");
  }

  async enterUserName() {
    const name = DataGenerator.generateFullName();
    await this.fill(RegistrationPageLocator.username, name);
    return name;
  }
}
```

### Test Data Generation

`src/utilities/helpers/data-generator.js` wraps Faker and exposes static methods:

| Method                          | Returns                              |
| ------------------------------- | ------------------------------------ |
| `generateFullName()`            | Random full name                     |
| `generateFirstName()`           | Random first name                    |
| `generateLastName()`            | Random last name                     |
| `generateEmail()`               | Lowercased random email              |
| `generateMobileNumber()`        | 10-digit Indian-style mobile number  |

---

## Running Tests

### NPM Scripts

| Script                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm test`            | Run the full suite + generate Allure report        |
| `npm run test:smoke`  | Run scenarios tagged `@smoke`                      |
| `npm run test:regression` | Run scenarios tagged `@regression`             |
| `npm run test:registration` | Run scenarios tagged `@registration`          |
| `npm run test:positive` | Run scenarios tagged `@positive`                 |
| `npm run test:negative` | Run scenarios tagged `@negative`                 |
| `npm run test:headless` | Run all tests headless                          |
| `npm run test:chrome` | Run all tests on Chromium                          |
| `npm run test:firefox` | Run all tests on Firefox                           |
| `npm run test:webkit` | Run all tests on WebKit                            |
| `npm run setup`       | Scaffold missing directories                      |
| `npm run verify`      | Validate local setup                              |
| `npm run report:allure` | Generate the Allure dashboard from results       |
| `npm run report:professional` | Generate the custom Chart.js dashboard       |
| `npm run report:open` | Open the professional dashboard in a browser      |
| `npm run clean`       | Remove all generated artifacts                    |
| `npm run lint`        | Lint source files with ESLint                     |
| `npm run format`      | Format source files with Prettier                 |
| `npm run docker:build` | Build the Docker image                          |
| `npm run docker:run`  | Run tests inside the Docker container           |

### Cucumber Profiles

Run a single class-level suite in isolation via profiles defined in `cucumber.js`:

```bash
npx cucumber-js --config cucumber.js            # default: everything
npx cucumber-js --config cucumber.js --profile registration
npx cucumber-js --config cucumber.js --profile class7
npx cucumber-js --config cucumber.js --profile class8
```

### Expression Tags

Filter which scenarios run using Cucumber tag expressions:

```bash
npx cucumber-js --config cucumber.js --tags "@smoke and not @ignore"
npx cucumber-js --config cucumber.js --tags "@regression or @smoke"
```

### Environment Overrides

Run non-default configurations directly from the CLI — no `.env` edits required:

```bash
HEADLESS=true BROWSER=firefox npm test
PARALLEL_WORKERS=2 RETRY_COUNT=0 npm test
DEBUG=true npm run test:chrome
RECORD_VIDEO=true npm test
```

---

## Test Reports

The Cucumber run emits **four formats simultaneously**:

1. **Progress bar** → console
2. **Allure results** → `reports/allure-results/`
3. **JSON report** → `reports/json/cucumber-report.json`
4. **Cucumber HTML report** → `reports/html/cucumber-report.html`

### Allure Report

Generated automatically at the end of every test script:

```bash
npm run report:allure
```

Serve the static report locally:

```bash
npx allure open reports/allure-report
```

### Cucumber HTML Report

`reports/html/cucumber-report.html` is produced by the `html:` formatter and is ready to open in any browser.

### Professional Dashboard

A custom, self-contained Chart.js dashboard (charts + searchable feature/scenario tables) is generated from the JSON report:

```bash
npm run report:professional
npm run report:open        # opens reports/html/index.html
```

### Additional Artifacts

- **Summary** → `reports/summary.json` (timestamp, environment, browser) written in `AfterAll`
- **Failure screenshots** → `screenshots/failures/<scenario>-<timestamp>.png` (attached to the report)
- **Videos** → `videos/test-execution/` when `RECORD_VIDEO=true`
- **Logs** → `reports/logs/combined.log` and `reports/logs/error.log`

---

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/node.js.yml`) runs the full suite on **every push and pull request** to `main`:

- **Runner:** `ubuntu-24.04`
- **Matrix:** Node.js `20.x` and `22.x`
- **Steps:**
  1. Checkout repository
  2. Set up Node.js with npm caching
  3. `npm ci`
  4. `npx playwright install --with-deps chromium`
  5. `npm test` (full suite + Allure generation)

---

## Docker

> ⚠️ **In progress.** The `docker/` directory is an empty placeholder and the `docker:build` / `docker:run` scripts currently require a `Dockerfile` that has not yet been added.

Once a `Dockerfile` is added, the existing scripts will:

```bash
npm run docker:build     # docker build -t playwright-bdd .
npm run docker:run       # docker run --rm -v $(pwd)/reports:/app/reports playwright-bdd
```

The run command mounts `reports/` into the container so results persist on the host.

---

## Configuration Reference

All runtime behaviour is driven through environment variables. Copy `.env.example` to `.env`:

```dotenv
# ===== Application =====
NODE_ENV=dev                    # Runtime environment (dev / staging / prod)
BASE_URL=https://www.careers360.com   # Base URL for the application under test

# ===== Browser =====
HEADLESS=false                  # true = run without a visible UI
BROWSER=chromium                # chromium | firefox | webkit
SLOW_MO=100                     # Playwright slow-motion in ms (debugging aid)

# ===== Test Execution =====
TIMEOUT=70000                   # Default wait timeout in ms
RETRY_COUNT=1                   # Automatic scenario retries on failure
PARALLEL_WORKERS=4              # Number of parallel workers

# ===== Diagnostics =====
DEBUG=false                     # Log all HTTP requests / responses
LOG_LEVEL=info                  # error | warn | info | http | verbose | debug | silly
```

> Additional variables referenced in code, with no default set:
> - `REGISTRATION_URL` — overrides the registration page path
> - `RECORD_VIDEO=true` — records scenario videos to `videos/test-execution/`

---

## Logging

The Winston-based logger (`src/utilities/logger/Logger.js`) provides:

- **Singleton access** — `Logger.getInstance()` anywhere in the codebase
- **Rotating file transports** — `reports/logs/combined.log` (all levels) and `reports/logs/error.log` (errors only), 5 MB × 5 files
- **Console transport** — colorized output in non-production environments
- **Child loggers** — `Logger.createChild(moduleName)` for per-module context
- **Level control** — via the `LOG_LEVEL` environment variable

```js
const { Logger } = require("../../utilities/logger/Logger");
const logger = Logger.getInstance();
logger.info("Navigating to registration page");
```

---

## Troubleshooting

| Problem                              | Solution                                                |
| ------------------------------------ | ------------------------------------------------------- |
| `npx playwright install` fails      | Retry with `--with-deps` or manually install system deps|
| Tests run but no browser window      | Set `HEADLESS=false` in `.env`                          |
| Selectors time out                   | Increase `TIMEOUT`; check selectors still match the page|
| Port / permissions errors            | Ensure local output dirs are writable; run `npm run setup` |
| Flaky failures                       | Keep default `RETRY_COUNT=1` or increase `PARALLEL_WORKERS`/`SLOW_MO` |
| Reports not generated for a specific run | Re-check tags — no matching scenarios produce empty report |
| Lint errors on edits                 | Run `npm run lint` and `npm run format`                 |

---

## Roadmap

- [x] Cucumber + Playwright BDD framework
- [x] Class Six / Seven / Eight registration flows
- [x] Allure, HTML, JSON, and professional dashboard reports
- [x] GitHub Actions CI pipeline
- [ ] Docker image (`Dockerfile` in `docker/`)
- [ ] Add `.env.example` entries for `REGISTRATION_URL` and `RECORD_VIDEO`
- [ ] Re-enable commented-out negative and smoke scenarios
- [ ] Remove orphaned `Register-Common-Input-Data-Locator.js`
- [ ] Expose Cucumber profiles (`class7`, `class8`) as npm scripts

---

## License

ISC — see the `package.json` for details.