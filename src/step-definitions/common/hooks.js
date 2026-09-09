const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const fs = require("fs-extra");
const path = require("path");
const { Logger } = require("../../utilities/logger/Logger");

const logger = Logger.getInstance();
setDefaultTimeout(60000);

BeforeAll(async function () {
  logger.info("🏁 Starting test execution...");
  logger.info(`📱 Environment: ${process.env.NODE_ENV || "dev"}`);
  logger.info(`🌐 Base URL: ${process.env.BASE_URL}`);
  logger.info(`📝 Registration URL: ${process.env.REGISTRATION_URL}`);

  // Create required directories
  const dirs = [
    "./reports",
    "./reports/html",
    "./reports/html/assets",
    "./reports/html/screenshots",
    "./reports/json",
    "./reports/logs",
    "./screenshots",
    "./screenshots/failures",
    "./screenshots/successes",
    "./videos",
    "./videos/test-execution",
  ];

  for (const dir of dirs) {
    await fs.ensureDir(dir);
  }
});

Before(async function () {
  const scenarioName = this.pickle?.name || "Unknown Scenario";
  logger.info(`📋 Initializing test scenario: ${scenarioName}`);

  const browserType = process.env.BROWSER || "chromium";
  const headless = process.env.HEADLESS === "true";
  const slowMo = parseInt(process.env.SLOW_MO) || 100;

  logger.info(`🎮 Launching browser: ${browserType} (headless: ${headless})`);

  let browserLauncher;
  switch (browserType.toLowerCase()) {
    case "firefox":
      browserLauncher = firefox;
      break;
    case "webkit":
      browserLauncher = webkit;
      break;
    default:
      browserLauncher = chromium;
  }

  this.browser = await browserLauncher.launch({
    headless: headless,
    slowMo: slowMo,
    args: ["--start-maximized", "--disable-web-security"],
  });

  this.context = await this.browser.newContext({
    viewport: null,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    recordVideo:
      process.env.RECORD_VIDEO === "true"
        ? { dir: "videos/test-execution" }
        : undefined,
  });

  this.page = await this.context.newPage();

  // Log page events for debugging
  if (process.env.DEBUG === "true") {
    this.page.on("request", (request) => {
      logger.debug(`➡️  ${request.method()} ${request.url()}`);
    });

    this.page.on("response", (response) => {
      logger.debug(`⬅️  ${response.status()} ${response.url()}`);
    });
  }

  this.page.on("console", (msg) => {
    logger.debug(`🖥️  ${msg.type()}: ${msg.text()}`);
  });

  this.page.on("dialog", async (dialog) => {
    logger.info(`🔔 Dialog: ${dialog.message()}`);
    await dialog.accept();
  });

  logger.info("✅ Test scenario initialized");
});

After(async function (scenario) {
  const scenarioName = this.pickle?.name || "Unknown Scenario";
  logger.info(`🧹 Cleaning up test scenario: ${scenarioName}`);

  if (scenario.result && scenario.result.status === "FAILED") {
    try {
      const timestamp = Date.now();
      const screenshotName = `failure-${scenarioName.replace(/\s/g, "_")}-${timestamp}`;
      const screenshotPath = `screenshots/failures/${screenshotName}.png`;

      await fs.ensureDir(path.dirname(screenshotPath));
      await this.page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      logger.info(`📸 Screenshot saved: ${screenshotPath}`);

      const screenshotBuffer = await fs.readFile(screenshotPath);
      this.attach(screenshotBuffer, "image/png");
    } catch (error) {
      logger.error("⚠️ Could not capture screenshot:", error.message);
    }
  }

  try {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  } catch (error) {
    logger.error("⚠️ Error during cleanup:", error.message);
  }

  logger.info("✅ Cleanup completed");
});

AfterAll(async function () {
  logger.info("🏁 Test execution completed");

  try {
    const summary = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "dev",
      browser: process.env.BROWSER || "chromium",
    };

    await fs.writeJSON("reports/summary.json", summary, { spaces: 2 });
    logger.info("✅ Summary report generated");
  } catch (error) {
    logger.error("⚠️ Could not generate summary:", error.message);
  }
});

module.exports = {
  BeforeAll,
  Before,
  After,
  AfterAll,
};
