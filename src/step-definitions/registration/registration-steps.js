// const { Given, When, Then } = require('@cucumber/cucumber');
// const { expect } = require('chai');
// const { RegistrationPage } = require('../../pages/registration/RegistrationPage');
// const { DataGenerator } = require('../../utilities/helpers/data-generator');
// const { Logger } = require('../../utilities/logger/Logger');

// const logger = Logger.getInstance();

// // Background Steps - Class Six specific
// Given('I am on the registration page for user class Six', async function() {
//   logger.info('📋 Given: I am on the registration page for user class Six');
//   this.registrationPage = new RegistrationPage(this.page);
//   await this.registrationPage.navigateToRegistration();
// });

// When('I Enter UserName for class Six User Creation', async function() {
//   logger.info('📝 When: I Enter UserName for class Six User Creation');
//   const userName = 'Dummy User';
//   this.userData = this.userData || {};
//   this.userData.name = userName;
//   await this.registrationPage.fillName(userName);
// });

// Then('I Enter EmailID for class Six User Creation', async function() {
//   logger.info('📧 Then: I Enter EmailID for class Six User Creation');
//   const email = `dummyuser${Date.now()}@gmail.com`;
//   this.userData = this.userData || {};
//   this.userData.email = email;
//   await this.registrationPage.fillEmail(email);
// });

// When('I Enter Mobile Number for class Six User Creation', async function() {
//   logger.info('📱 When: I Enter Mobile Number for class Six User Creation');
//   const mobile = DataGenerator.generateMobileNumber();
//   this.userData = this.userData || {};
//   this.userData.mobile = mobile;
//   await this.registrationPage.fillMobile(mobile);
// });

// // Positive Scenario Steps - Class Six specific
// When('I click on Studying In Dropdown as Select Class Six', async function() {
//   logger.info('📚 When: I click on Studying In Dropdown as Select Class Six');
//   await this.registrationPage.selectClassSix();
// });

// When('I Click on School Board as select board {string}', async function(boardName) {
//   logger.info(`📖 When: I Click on School Board as select board ${boardName}`);
//   await this.registrationPage.selectBoard(boardName);
// });

// When('I click on Location as Select {string}', async function(locationText) {
//   logger.info(`📍 When: I click on Location as Select ${locationText}`);
//   await this.registrationPage.selectLocation(locationText);
// });

// When('I click on Get OTP button', async function() {
//   logger.info('🔑 When: I click on Get OTP button');
//   await this.registrationPage.clickGetOTP();
// });

// Then('I should see OTP request successful', async function() {
//   logger.info('✅ Then: I should see OTP request successful');
//   const success = await this.registrationPage.isOTPSuccessful();
//   expect(success).to.be.true;
// });

// // Negative Scenario Steps
// When('I Enter invalid EmailID {string} for class Six User Creation', async function(email) {
//   logger.info(`📧 When: I Enter invalid EmailID ${email} for class Six User Creation`);
//   this.userData = this.userData || {};
//   this.userData.email = email;
//   await this.registrationPage.fillEmail(email);
// });

// Then('I should see error message for invalid email', async function() {
//   logger.info('❌ Then: I should see error message for invalid email');
//   const errorMessage = await this.registrationPage.getErrorMessage();
//   logger.info(`Error message: ${errorMessage}`);
//   expect(errorMessage).to.not.be.null;
//   expect(errorMessage.toLowerCase()).to.include('email');
// });

// When('I click on Get OTP button without filling details', async function() {
//   logger.info('🔑 When: I click on Get OTP button without filling details');
//   // Clear any existing data
//   await this.registrationPage.fillName('');
//   await this.registrationPage.fillEmail('');
//   await this.registrationPage.fillMobile('');
//   await this.registrationPage.clickGetOTP();
// });

// Then('I should see field validation errors', async function() {
//   logger.info('❌ Then: I should see field validation errors');
//   const hasErrors = await this.registrationPage.hasErrors();
//   expect(hasErrors).to.be.true;
// });

// // Verification Steps
// Then('I should see the registration form', async function() {
//   logger.info('✅ Then: I should see the registration form');
//   const isVisible = await this.registrationPage.isFormVisible();
//   expect(isVisible).to.be.true;
// });

// Then('I should see all required fields', async function() {
//   logger.info('✅ Then: I should see all required fields');
//   const fields = await this.registrationPage.getAllRequiredFields();

//   logger.info('Fields visibility:', fields);

//   expect(fields.name).to.be.true;
//   expect(fields.email).to.be.true;
//   expect(fields.mobile).to.be.true;
//   expect(fields.class).to.be.true;
//   expect(fields.board).to.be.true;
//   expect(fields.location).to.be.true;
//   expect(fields.otpButton).to.be.true;
// });

// // Additional steps for backward compatibility
// When('I fill the registration form with user details', async function() {
//   logger.info('📝 When: I fill the registration form with user details');
//   const userData = {
//     name: 'Dummy User',
//     email: `dummyuser${Date.now()}@gmail.com`,
//     mobile: DataGenerator.generateMobileNumber()
//   };
//   this.userData = userData;
//   await this.registrationPage.fillName(userData.name);
//   await this.registrationPage.fillEmail(userData.email);
//   await this.registrationPage.fillMobile(userData.mobile);
// });

// When('I select class {string}', async function(className) {
//   logger.info(`📚 When: I select class ${className}`);
//   if (className === 'Class 6th' || className === 'Class Six') {
//     await this.registrationPage.selectClassSix();
//   }
// });

// When('I click on {string}', async function(locationText) {
//   logger.info(`📍 When: I click on ${locationText}`);
//   if (locationText === 'My current location') {
//     await this.registrationPage.selectLocation(locationText);
//   }
// });

// registration-steps.js - Step definitions like Cypress pattern

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  RegistrationPage,
} = require("../../pages/registration/RegistrationPage");
const { Logger } = require("../../utilities/logger/Logger");

const logger = Logger.getInstance();

// ============================================
// Background Steps - Class Six specific
// Similar to Cypress: Given('I am on the registration page...')
// ============================================

Given("I am on the registration page for user class Six", async function () {
  logger.info("📋 Opening registration page for class Six");
  this.registrationPage = new RegistrationPage(this.page);
  await this.registrationPage.navigateToRegistration();
});

// ============================================
// Step: Enter UserName - Class Six specific
// Similar to Cypress: When('I Enter UserName...', () => { page.enterUserName() })
// ============================================

When("I Enter UserName for class Six User Creation", async function () {
  logger.info("👤 Entering username");
  const name = await this.registrationPage.enterUserName();
  this.userData = this.userData || {};
  this.userData.name = name;
});

// ============================================
// Step: Enter EmailID - Class Six specific
// Similar to Cypress: Then('I Enter EmailID...', () => { page.enterEmailID() })
// ============================================

Then("I Enter EmailID for class Six User Creation", async function () {
  logger.info("📧 Entering email");
  const email = await this.registrationPage.enterEmailID();
  this.userData = this.userData || {};
  this.userData.email = email;
});

// ============================================
// Step: Enter Mobile Number - Class Six specific
// Similar to Cypress: When('I Enter Mobile Number...', () => { page.enterMobileNumber() })
// ============================================

When("I Enter Mobile Number for class Six User Creation", async function () {
  logger.info("📱 Entering mobile");
  const mobile = await this.registrationPage.enterMobileNumber();
  this.userData = this.userData || {};
  this.userData.mobile = mobile;
});

// ============================================
// Positive Scenario Steps - Class Six specific
// Similar to Cypress: When('I click on Studying In Dropdown...')
// ============================================

When("I click on Studying In Dropdown as Select Class Six", async function () {
  logger.info("📚 Selecting Class Six");
  await this.registrationPage.selectClassSix();
});

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
// Negative Scenario Steps - Class Six specific
// Similar to Cypress: When('I Enter invalid EmailID...')
// ============================================

When(
  "I Enter invalid EmailID {string} for class Six User Creation",
  async function (email) {
    logger.info(`📧 Entering invalid email: ${email}`);
    await this.registrationPage.enterEmailID(); // Override with invalid email
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
// Verification Steps - Class Six specific
// Similar to Cypress: Then('I should see the registration form')
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
