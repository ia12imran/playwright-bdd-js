// registration-steps-class-seven.js

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  RegistrationPageClassSeven,
} = require("../../pages/registration/RegistrationPageClassSeven");

// ============================================
// Background Steps
// ============================================

Given("I am on the registration page for user class Seven", async function () {
  this.registrationPageSeven = new RegistrationPageClassSeven(this.page);
  await this.registrationPageSeven.navigateToRegistration();
});

When("I Enter UserName for class Seven User Creation", async function () {
  const name = await this.registrationPageSeven.enterUserName();
  this.userData = this.userData || {};
  this.userData.name = name;
});

Then("I Enter EmailID for class Seven User Creation", async function () {
  const email = await this.registrationPageSeven.enterEmailID();
  this.userData = this.userData || {};
  this.userData.email = email;
});

When("I Enter Mobile Number for class Seven User Creation", async function () {
  const mobile = await this.registrationPageSeven.enterMobileNumber();
  this.userData = this.userData || {};
  this.userData.mobile = mobile;
});

// ============================================
// Positive Scenario Steps
// ============================================

When(
  "I click on Studying In Dropdown as Select Class Seven",
  async function () {
    await this.registrationPageSeven.selectClassSeven();
  },
);

When(
  "I Click on School Board as select board {string}",
  async function (boardName) {
    await this.registrationPageSeven.selectBoard(boardName);
  },
);

When("I click on Location as Select {string}", async function (locationText) {
  await this.registrationPageSeven.selectLocation();
});

When("I click on Get OTP button", async function () {
  await this.registrationPageSeven.clickGetOTP();
});

Then("I should see OTP request successful", async function () {
  const success = await this.registrationPageSeven.isOTPSuccessful();
  expect(success).to.be.true;
});
