// RegistrationPage.js - Page object with methods like Cypress

const { BasePage } = require("../base/BasePage");
const { DataGenerator } = require("../../utilities/helpers/data-generator");
const { RegistrationPageLocator } = require("./RegistrationPageLocator");

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = RegistrationPageLocator.locators;
  }

  // ============================================
  // Navigate to registration page - Class Six specific
  // ============================================
  async navigateToRegistration() {
    this.logger.info("📝 Navigating to registration page for class Six");
    await this.navigateTo(
      "/user/register?destination=https://www.careers360.com/?&click_location=header",
    );
    await this.page.waitForSelector(this.locators.username, { timeout: 10000 });
    this.logger.info("✅ Registration page loaded");
  }

  // ============================================
  // Enter UserName - Class Six specific
  // ============================================
  async enterUserName() {
    const randomName = DataGenerator.generateFullName();
    this.logger.info(`👤 Entering username: ${randomName}`);

    // Playwright version of: cy.get(this.locators.username).type(randomName).should('have.value', randomName)
    await this.page.waitForSelector(this.locators.username, { timeout: 12000 });
    await this.page.fill(this.locators.username, randomName);

    // Verify the value (similar to .should('have.value'))
    const enteredValue = await this.page.inputValue(this.locators.username);
    if (enteredValue !== randomName) {
      throw new Error(`Expected ${randomName} but got ${enteredValue}`);
    }

    return randomName;
  }

  // ============================================
  // Enter EmailID - Class Six specific
  // Similar to Cypress: enterEmail_ID() { cy.get().type() }
  // ============================================
  async enterEmailID() {
    const email = DataGenerator.generateEmail();
    this.logger.info(`📧 Entering email: ${email}`);

    // Playwright version of: cy.get(this.locators.email_id).type(email).should('have.value', email)
    await this.page.waitForSelector(this.locators.email_id, { timeout: 12000 });
    await this.page.fill(this.locators.email_id, email);

    const enteredValue = await this.page.inputValue(this.locators.email_id);
    if (enteredValue !== email) {
      throw new Error(`Expected ${email} but got ${enteredValue}`);
    }

    return email;
  }

  // ============================================
  // Enter Mobile Number - Class Six specific
  // Similar to Cypress: enterMobileNumber() { cy.get().type() }
  // ============================================
  async enterMobileNumber() {
    const phoneNumber = DataGenerator.generateMobileNumber();
    this.logger.info(`📱 Entering mobile: ${phoneNumber}`);

    // Playwright version of: cy.get(this.locators.mobile_no).type(phoneNumber).should('have.value', phoneNumber)
    await this.page.waitForSelector(this.locators.mobile_no, {
      timeout: 12000,
    });
    await this.page.fill(this.locators.mobile_no, phoneNumber);

    const enteredValue = await this.page.inputValue(this.locators.mobile_no);
    if (enteredValue !== phoneNumber) {
      throw new Error(`Expected ${phoneNumber} but got ${enteredValue}`);
    }

    return phoneNumber;
  }

  // ============================================
  // Select Class Six from dropdown
  // Similar to Cypress: cy.get().click()
  // ============================================
  async selectClassSix() {
    this.logger.info("📚 Selecting Class Six");

    // Playwright version of: cy.get(this.locators.class_dropdown).click()
    await this.page.waitForSelector(this.locators.class_dropdown, {
      timeout: 12000,
    });
    await this.page.click(this.locators.class_dropdown);

    // Wait for dropdown to open
    await this.page.waitForTimeout(500);

    // Click on Class Six option
    await this.page.waitForSelector(this.locators.class_six_option, {
      timeout: 12000,
    });
    await this.page.click(this.locators.class_six_option);

    this.logger.info("✅ Class Six selected");
  }

  // ============================================
  // Select Board - Class Six specific
  // Similar to Cypress: cy.get().click()
  // ============================================
  async selectBoard(boardName) {
    this.logger.info(`📖 Selecting board: ${boardName}`);

    // Playwright version of: cy.get(this.locators.board_dropdown).click()
    await this.page.waitForSelector(this.locators.board_dropdown, {
      timeout: 12000,
    });
    await this.page.click(this.locators.board_dropdown);

    await this.page.waitForTimeout(500);

    // Click on specific board option
    const boardOption = `//div[@role='option' and contains(string(), '${boardName}')]`;
    await this.page.waitForSelector(boardOption, { timeout: 12000 });
    await this.page.click(boardOption);

    this.logger.info(`✅ Board selected: ${boardName}`);
  }

  // ============================================
  // Select Location - Class Six specific
  // Similar to Cypress: cy.get().click()
  // ============================================
  async selectLocation() {
    this.logger.info("📍 Selecting current location");

    // Playwright version of: cy.get(this.locators.location_field).click()
    await this.page.waitForSelector(this.locators.location_field, {
      timeout: 12000,
    });
    await this.page.click(this.locators.location_field);

    await this.page.waitForTimeout(1000);

    // Select the first suggested city from the dropdown
    await this.page.waitForSelector(".location_dropdown .option", {
      timeout: 12000,
    });
    await this.page.click(".location_dropdown .option");
    await this.page.waitForTimeout(500);

    this.logger.info("✅ Location selected");
  }

  // ============================================
  // Click Get OTP Button - Class Six specific
  // Similar to Cypress: cy.get().click()
  // ============================================
  async clickGetOTP() {
    this.logger.info("🔑 Clicking Get OTP button");

    // Playwright version of: cy.get(this.locators.get_otp_button).click()
    await this.page.waitForSelector(this.locators.get_otp_button, {
      timeout: 12000,
    });
    await this.page.click(this.locators.get_otp_button);

    await this.page.waitForTimeout(2000);
    this.logger.info("✅ Get OTP button clicked");
  }

  // ============================================
  // Click Get OTP without filling details
  // ============================================
  async clickGetOTPWithoutFilling() {
    this.logger.info("🔑 Clicking Get OTP without filling details");

    // Clear all fields first
    await this.page.fill(this.locators.username, "");
    await this.page.fill(this.locators.email_id, "");
    await this.page.fill(this.locators.mobile_no, "");

    await this.clickGetOTP();
  }

  // ============================================
  // Check OTP Success - Class Six specific
  // Similar to Cypress: cy.get().should('be.visible')
  // ============================================
  async isOTPSuccessful() {
    this.logger.info("🔍 Checking OTP success");

    try {
      // Playwright version of: cy.get(this.locators.success_message).should('be.visible')
      await this.page.waitForSelector(this.locators.success_message, {
        timeout: 10000,
        state: "visible",
      });
      return true;
    } catch {
      return false;
    }
  }

  // ============================================
  // Get Error Message - Class Six specific
  // Similar to Cypress: cy.get().text()
  // ============================================
  async getErrorMessage() {
    this.logger.info("🔍 Getting error message");

    try {
      // Playwright version of: cy.get(this.locators.error_message).text()
      await this.page.waitForSelector(this.locators.error_message, {
        timeout: 5000,
        state: "visible",
      });
      return await this.page.textContent(this.locators.error_message);
    } catch {
      return null;
    }
  }

  // ============================================
  // Check if form is visible - Class Six specific
  // Similar to Cypress: cy.get().should('be.visible')
  // ============================================
  async isFormVisible() {
    this.logger.info("🔍 Checking if form is visible");

    try {
      await this.page.waitForSelector(this.locators.username, {
        timeout: 5000,
        state: "visible",
      });
      await this.page.waitForSelector(this.locators.email_id, {
        timeout: 5000,
        state: "visible",
      });
      await this.page.waitForSelector(this.locators.mobile_no, {
        timeout: 5000,
        state: "visible",
      });
      return true;
    } catch {
      return false;
    }
  }

  // ============================================
  // Check if all required fields are visible
  // ============================================
  async allFieldsVisible() {
    this.logger.info("🔍 Checking all required fields");

    const fields = [
      this.locators.username,
      this.locators.email_id,
      this.locators.mobile_no,
      this.locators.class_dropdown,
      this.locators.board_dropdown,
      this.locators.location_field,
      this.locators.get_otp_button,
    ];

    for (const field of fields) {
      try {
        await this.page.waitForSelector(field, {
          timeout: 5000,
          state: "visible",
        });
      } catch {
        return false;
      }
    }
    return true;
  }

  // ============================================
  // Check field validation errors
  // ============================================
  async hasFieldErrors() {
    this.logger.info("🔍 Checking field validation errors");

    try {
      await this.page.waitForSelector(this.locators.error_message, {
        timeout: 5000,
        state: "visible",
      });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { RegistrationPage };
