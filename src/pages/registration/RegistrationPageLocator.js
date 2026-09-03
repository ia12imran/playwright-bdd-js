  // RegistrationPageLocator.js

  class RegistrationPageLocator {
    static get locators() {
      return {
        username: "#name_focus",
        email_id: "#emailInput",
        mobile_no: "input[name='mobile']",

        class_dropdown: ".css-lagbch",
        class_six_option: "//div[contains(text(), 'Class 6th')]",
        class_seven_option: "//div[contains(text(), 'Class 7th')]",

        board_dropdown: ".css-8rmoi2-control > .css-lagbch",

        location_field: "#location_filed",
        current_location: "//div[contains(text(), 'My current location')]",

        get_otp_button: "button:has-text('Get OTP')",

        success_message: ".success-message, .otp-success",
        error_message: ".error-message, .alert-danger",
      };
    }
  }

  module.exports = { RegistrationPageLocator };
