require("dotenv").config();

const commonFormats = [
  "progress-bar",
  "allure-cucumberjs/reporter",
  "json:reports/json/cucumber-report.json",
  "html:reports/html/cucumber-report.html",
];

const commonFormatOptions = {
  snippetInterface: "async-await",
  resultsDir: "reports/allure-results",
};

const commonWorldParameters = {
  env: process.env.NODE_ENV || "dev",
  baseURL: process.env.BASE_URL,
};

module.exports = {
  default: {
    require: ["src/step-definitions/**/*.js", "support/**/*.js"],
    format: commonFormats,
    formatOptions: commonFormatOptions,
    paths: ["src/features/**/*.feature"],
    parallel: parseInt(process.env.PARALLEL_WORKERS) || 4,
    retry: parseInt(process.env.RETRY_COUNT) || 1,
    tags: "not @ignore",
    worldParameters: commonWorldParameters,
  },
  // Run only class-eight-register feature with its specific step definitions
  class8: {
    require: [
      "src/step-definitions/common/**/*.js",
      "src/step-definitions/registration/class-eight-register.js",
      "support/**/*.js",
    ],
    format: commonFormats,
    formatOptions: commonFormatOptions,
    paths: ["src/features/registration/class-eight-register.feature"],
    parallel: 1,
    retry: parseInt(process.env.RETRY_COUNT) || 1,
    tags: "not @ignore",
    worldParameters: commonWorldParameters,
  },
  // Run only class-seven-registration feature with its specific step definitions
  class7: {
    require: [
      "src/step-definitions/common/**/*.js",
      "src/step-definitions/registration/registration-steps-class-seven.js",
      "support/**/*.js",
    ],
    format: commonFormats,
    formatOptions: commonFormatOptions,
    paths: ["src/features/registration/user-class-seven-registration.feature"],
    parallel: 1,
    retry: parseInt(process.env.RETRY_COUNT) || 1,
    tags: "not @ignore",
    worldParameters: commonWorldParameters,
  },
  // Run only user-registration feature with its specific step definitions
  registration: {
    require: [
      "src/step-definitions/common/**/*.js",
      "src/step-definitions/registration/registration-steps.js",
      "support/**/*.js",
    ],
    format: commonFormats,
    formatOptions: commonFormatOptions,
    paths: ["src/features/registration/user-registration.feature"],
    parallel: 1,
    retry: parseInt(process.env.RETRY_COUNT) || 1,
    tags: "not @ignore",
    worldParameters: commonWorldParameters,
  },
};