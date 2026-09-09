const { Given, When, Then } = require("@cucumber/cucumber");
const { Register_Common_Input_data } = require("../../pages/registration/Register-Common-Input-Data");
const { RegisterLevelsData } = require("../../pages/registration/Register-LevelsData");

Given("I am on the registration page for user class eight", async function () {
  this.Rgster_Input_data = new Register_Common_Input_data(this.page);
  this.Rgstry_lvl_dta = new RegisterLevelsData(this.page);
  await this.Rgster_Input_data.navigateToRegistration();
});

When("I Enter UserName for class Eight User Creation", async function () {
  await this.Rgster_Input_data.enterUserName();
});

Then("I Enter EmailID for class Eight User Creation", async function () {
  await this.Rgster_Input_data.enterEmailID();
});

When("I Enter Mobile Number for class Eight User Creation", async function () {
  await this.Rgster_Input_data.enterMobileNumber();
});

When("I click on Studying In Dropdown as Select Class Eight", async function () {
  await this.Rgstry_lvl_dta.selectClassEight();
});