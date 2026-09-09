require("dotenv").config();

module.exports = {
  default: {
    require: ["src/step-definitions/**/*.js", "support/**/*.js"],
    format: [
      "progress-bar",
      "json:reports/json/cucumber-report.json",
      "html:reports/html/cucumber-report.html",
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/features/**/*.feature"],
    parallel: parseInt(process.env.PARALLEL_WORKERS) || 4,
    retry: parseInt(process.env.RETRY_COUNT) || 1,
    tags: "not @ignore",
    worldParameters: {
      env: process.env.NODE_ENV || "dev",
      baseURL: process.env.BASE_URL,
    },
  },
};