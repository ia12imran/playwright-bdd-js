// // RegistrationPageLocator.js

class RegisterCommonInputDataLocator {
    static get locators() {
        return {
            username: "#name_focus",
            email_id: "#emailInput",
            mobile_no: "input[name='mobile']",

        };
    }
}a

module.exports = { RegisterCommonInputDataLocator };
