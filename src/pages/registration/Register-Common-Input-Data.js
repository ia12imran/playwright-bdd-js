const { BasePage } = require("../base/BasePage");
const { DataGenerator } = require("../../utilities/helpers/data-generator");
const { RegistrationPageLocator } = require("./RegistrationPageLocator");

class Register_Common_Input_data extends BasePage {

    constructor(page) {
        super(page);
        this.locators = RegistrationPageLocator.locators;
    }

    async navigateToRegistration() {
        this.logger.info("📝 Navigating to registration page");
        await this.navigateTo("/user/register?destination=https://www.careers360.com/?&click_location=header"
        );
        await this.page.locator(this.locators.username).waitFor({state: "visible",timeout: 10000});
        this.logger.info("✅ Registration page loaded");
    }

    async enterUserName() {
        const username = DataGenerator.generateFirstName();
        this.logger.info(`👤 Entering username: ${username}`);
        const field = this.page.locator(this.locators.username);
        await field.fill(username);
      
        return username;
    }

    async enterEmailID() {
        const email = DataGenerator.generateEmail();
        this.logger.info(`📧 Entering email: ${email}`);
        const field = this.page.locator(this.locators.email_id);
        await field.fill(email);

        return email;
    }

    async enterMobileNumber() {
        const mobile = DataGenerator.generateMobileNumber();
        this.logger.info(`📱 Entering mobile: ${mobile}`);
        const field = this.page.locator(this.locators.mobile_no);
        await field.fill(mobile);

        return mobile;
    }
}

module.exports = { Register_Common_Input_data };