// RegistrationPageClassSeven.js

const { BasePage } = require("../base/BasePage");
const { RegistrationPageLocator } = require("./RegistrationPageLocator");
const { DataGenerator } = require("../../utilities/helpers/data-generator");

class RegistrationPageClassSeven extends BasePage {
  constructor(page) {
    super(page);
    this.locators = RegistrationPageLocator.locators;
  }

  async navigateToRegistration() {
    this.logger.info("📝 Navigating to registration page for class Seven");
    await this.navigateTo(
      "/user/register?destination=https://www.careers360.com/?&click_location=header",
    );
    // Maximize browser window to full screen dimensions after launching URL
    await this.page.evaluate(() => {
      window.moveTo(0, 0);
      window.resizeTo(screen.availWidth, screen.availHeight);
    });
    await this.page.waitForSelector(this.locators.username, { timeout: 10000 });
    this.logger.info("✅ Registration page loaded for class Seven");
  }

  async enterUserName() {
    const randomName = DataGenerator.generateFullName();
    this.logger.info(`👤 Entering username for class Seven: ${randomName}`);
    await this.page.waitForSelector(this.locators.username, { timeout: 12000 });
    await this.page.fill(this.locators.username, randomName);
    return randomName;
  }

  async enterEmailID() {
    const email = DataGenerator.generateEmail();
    this.logger.info(`📧 Entering email for class Seven: ${email}`);
    await this.page.waitForSelector(this.locators.email_id, { timeout: 12000 });
    await this.page.fill(this.locators.email_id, email);
    return email;
  }

  async enterMobileNumber() {
    const phoneNumber = DataGenerator.generateMobileNumber();
    this.logger.info(`📱 Entering mobile for class Seven: ${phoneNumber}`);
    await this.page.waitForSelector(this.locators.mobile_no, {
      timeout: 12000,
    });
    await this.page.fill(this.locators.mobile_no, phoneNumber);
    return phoneNumber;
  }

  async selectClassSeven() {
    this.logger.info("📚 Selecting Class Seven");
    await this.page.waitForSelector(this.locators.class_dropdown, {
      timeout: 12000,
    });
    await this.page.click(this.locators.class_dropdown);
    await this.page.waitForTimeout(500);
    const classSevenOption = "//div[@role='option' and contains(string(), 'Class 7th')]";
    await this.page.waitForSelector(classSevenOption, { timeout: 12000 });
    await this.page.click(classSevenOption);
    this.logger.info("✅ Class Seven selected");
  }

  async selectBoard(boardName) {
    this.logger.info(`📖 Selecting board for class Seven: ${boardName}`);
    await this.page.waitForSelector(this.locators.board_dropdown, {
      timeout: 12000,
    });
    await this.page.click(this.locators.board_dropdown);
    await this.page.waitForTimeout(500);
    const boardOption = `//div[@role='option' and contains(string(), '${boardName}')]`;
    await this.page.waitForSelector(boardOption, { timeout: 12000 });
    await this.page.click(boardOption);
    this.logger.info(`✅ Board selected: ${boardName}`);
  }

  async selectLocation() {
    this.logger.info("📍 Selecting current location for class Seven");
    await this.page.waitForSelector(this.locators.location_field, {
      timeout: 12000,
    });
    await this.page.click(this.locators.location_field);
    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(".location_dropdown .option", {
      timeout: 12000,
    });
    await this.page.click(".location_dropdown .option");
    await this.page.waitForTimeout(500);
    this.logger.info("✅ Location selected for class Seven");
  }

  async clickGetOTP() {
    this.logger.info("🔑 Clicking Get OTP button for class Seven");
    await this.page.waitForSelector(this.locators.get_otp_button, {
      timeout: 12000,
    });
    await this.page.click(this.locators.get_otp_button);
    await this.page.waitForTimeout(2000);
    this.logger.info("✅ Get OTP button clicked for class Seven");
  }

  async isOTPSuccessful() {
    try {
      await this.page.waitForSelector(this.locators.success_message, {
        timeout: 10000,
        state: "visible",
      });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { RegistrationPageClassSeven };
