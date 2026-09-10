class RegisterLevelDataLocator {
    static get locators() {
        return {
            class_dropdown: ".css-lagbch",
            class_six_option: "//div[@role='option' and contains(string(), 'Class 6th')]",
            class_seven_option: "//div[@role='option' and contains(string(), 'Class 7th')]",

            StudyingIn: "//input[@name='education_level']/..",
            Select_Class_eight: "//div[@id='react-select-2-option-0-5']",

            board_dropdown: ".css-8rmoi2-control > .css-lagbch",

            location_field: "#location_filed",
            current_location: "//div[contains(text(), 'My current location')]",

            get_otp_button: "button:has-text('Get OTP')",

            success_message: ".success-message, .otp-success, .success_card",
            error_message: ".error-message, .alert-danger",
        };
    }
}
module.exports = { RegisterLevelDataLocator }