const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  RegistrationPage,
} = require("../../pages/registration/RegistrationPage");
const { Logger } = require("../../utilities/logger/Logger");

const logger = Logger.getInstance();

// ============================================
// Background Steps - Class Six
// ============================================

Given("I am on the registration page for user class Six", async function () {
  logger.info("📋 Opening registration page for class Six");
  this.registrationPage = new RegistrationPage(this.page);
  await this.registrationPage.navigateToRegistration();
});

When("I Enter UserName for class Six User Creation", async function () {
  logger.info("👤 Entering username");
  const name = await this.registrationPage.enterUserName();
  this.userData = this.userData || {};
  this.userData.name = name;
});

Then("I Enter EmailID for class Six User Creation", async function () {
  logger.info("📧 Entering email");
  const email = await this.registrationPage.enterEmailID();
  this.userData = this.userData || {};
  this.userData.email = email;
});

When("I Enter Mobile Number for class Six User Creation", async function () {
  logger.info("📱 Entering mobile");
  const mobile = await this.registrationPage.enterMobileNumber();
  this.userData = this.userData || {};
  this.userData.mobile = mobile;
});

// ============================================
// Class-specific dropdown steps
// ============================================

When("I click on Studying In Dropdown as Select Class Six", async function () {
  logger.info("📚 Selecting Class Six");
  await this.registrationPage.selectClassSix();
});

// ============================================
// Shared steps (work for Class Six and Class Seven)
// ============================================

When(
  "I Click on School Board as select board {string}",
  async function (boardName) {
    logger.info(`📖 Selecting board: ${boardName}`);
    await this.registrationPage.selectBoard(boardName);
  },
);

When("I click on Location as Select {string}", async function (locationText) {
  logger.info(`📍 Selecting location: ${locationText}`);
  await this.registrationPage.selectLocation();
});

When("I click on Get OTP button", async function () {
  logger.info("🔑 Clicking Get OTP");
  await this.registrationPage.clickGetOTP();
});

Then("I should see OTP request successful", async function () {
  logger.info("✅ Verifying OTP success");
  const success = await this.registrationPage.isOTPSuccessful();
  expect(success).to.be.true;
});

// ============================================
// Negative scenario steps - Class Six
// ============================================

When(
  "I Enter invalid EmailID {string} for class Six User Creation",
  async function (email) {
    logger.info(`📧 Entering invalid email: ${email}`);
    await this.registrationPage.enterEmailID();
    await this.registrationPage.page.fill("#emailInput", email);
  },
);

Then("I should see error message for invalid email", async function () {
  logger.info("❌ Checking error message");
  const error = await this.registrationPage.getErrorMessage();
  expect(error).to.not.be.null;
  expect(error.toLowerCase()).to.include("email");
});

When("I click on Get OTP button without filling details", async function () {
  logger.info("🔑 Clicking OTP without filling");
  await this.registrationPage.clickGetOTPWithoutFilling();
});

Then("I should see field validation errors", async function () {
  logger.info("❌ Checking validation errors");
  const hasErrors = await this.registrationPage.hasFieldErrors();
  expect(hasErrors).to.be.true;
});

// ============================================
// Verification steps
// ============================================

Then("I should see the registration form", async function () {
  logger.info("✅ Checking registration form");
  const isVisible = await this.registrationPage.isFormVisible();
  expect(isVisible).to.be.true;
});

Then("I should see all required fields", async function () {
  logger.info("✅ Checking all fields");
  const allVisible = await this.registrationPage.allFieldsVisible();
  expect(allVisible).to.be.true;
});