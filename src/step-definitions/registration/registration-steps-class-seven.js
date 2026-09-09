const { Given, When, Then } = require("@cucumber/cucumber");
const {
  RegistrationPageClassSeven,
} = require("../../pages/registration/RegistrationPageClassSeven");

Given("I am on the registration page for user class Seven", async function () {
  this.registrationPage = new RegistrationPageClassSeven(this.page);
  await this.registrationPage.navigateToRegistration();
});

When("I Enter UserName for class Seven User Creation", async function () {
  const name = await this.registrationPage.enterUserName();
  this.userData = this.userData || {};
  this.userData.name = name;
});

Then("I Enter EmailID for class Seven User Creation", async function () {
  const email = await this.registrationPage.enterEmailID();
  this.userData = this.userData || {};
  this.userData.email = email;
});

When("I Enter Mobile Number for class Seven User Creation", async function () {
  const mobile = await this.registrationPage.enterMobileNumber();
  this.userData = this.userData || {};
  this.userData.mobile = mobile;
});

When("I click on Studying In Dropdown as Select Class Seven", async function () {
  await this.registrationPage.selectClassSeven();
});