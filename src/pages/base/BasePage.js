const { expect } = require("chai");
const { Logger } = require("../../utilities/logger/Logger");

class BasePage {
  constructor(page) {
    this.page = page;
    this.logger = Logger.getInstance();
    this.timeout = parseInt(process.env.TIMEOUT) || 60000;
    this.baseURL = process.env.BASE_URL || "https://www.careers360.com";
  }

  async navigateTo(url) {
    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
      fullUrl = `${this.baseURL}/${cleanUrl}`;
    }

    this.logger.info(`🌐 Navigating to: ${fullUrl}`);
    try {
      await this.page.goto(fullUrl, {
        waitUntil: "domcontentloaded",
        timeout: this.timeout,
      });
      this.logger.info("✅ Navigation successful");
    } catch (error) {
      this.logger.error(`❌ Navigation failed: ${error.message}`);
      throw error;
    }
  }

  async waitForPageLoad() {
    try {
      // Only wait for DOM content, not network idle
      await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
      this.logger.debug("✅ DOM content loaded");
    } catch (error) {
      this.logger.warn("⚠️ DOM content load timeout, continuing...");
    }

    // Small pause for any initial rendering
    await this.page.waitForTimeout(2000);
  }

  async click(selector) {
    this.logger.debug(`Clicking element: ${selector}`);
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: this.timeout,
    });
    await this.page.click(selector);
  }

  async fill(selector, text) {
    this.logger.debug(`Filling field: ${selector} with: ${text}`);
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: this.timeout,
    });
    await this.page.fill(selector, text);
  }

  async pressKey(selector, key) {
    this.logger.debug(`Pressing key: ${key} on: ${selector}`);
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: this.timeout,
    });
    await this.page.press(selector, key);
  }

  async getText(selector) {
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: this.timeout,
    });
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    try {
      await this.page.waitForSelector(selector, {
        state: "visible",
        timeout: 5000,
      });
      return true;
    } catch {
      return false;
    }
  }

  async waitForSelector(selector, options = {}) {
    return await this.page.waitForSelector(selector, {
      timeout: this.timeout,
      ...options,
    });
  }

  async takeScreenshot(name) {
    const timestamp = Date.now();
    const path = `screenshots/${name}-${timestamp}.png`;
    await this.page.screenshot({ path, fullPage: true });
    this.logger.info(`📸 Screenshot saved: ${path}`);
    return path;
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getTitle() {
    return await this.page.title();
  }

  async selectOption(selector, value) {
    this.logger.debug(`Selecting option: ${value} from: ${selector}`);
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: this.timeout,
    });
    await this.page.selectOption(selector, value);
  }

  async clickAndFill(selector, text) {
    await this.click(selector);
    await this.fill(selector, text);
  }

  async clickAndPressTab(selector, text) {
    await this.click(selector);
    await this.fill(selector, text);
    await this.pressKey(selector, "Tab");
  }

  async waitForElement(selector, state = "visible") {
    await this.page.waitForSelector(selector, { state, timeout: this.timeout });
  }

  async scrollToElement(selector) {
    await this.page.scrollIntoViewIfNeeded(selector);
  }

  async clickAndWait(selector, waitTime = 1000) {
    await this.click(selector);
    await this.page.waitForTimeout(waitTime);
  }

  async selectDropdownOption(dropdownSelector, optionText) {
    await this.click(dropdownSelector);
    await this.page.waitForTimeout(500);
    const optionSelector = `//div[contains(text(), '${optionText}')]`;
    await this.page.locator(optionSelector).first().click();
    await this.page.waitForTimeout(500);
  }

  async selectLocation(locationText) {
    await this.click("#location_filed");
    await this.page.waitForTimeout(1000);
    await this.click(`//div[contains(text(), '${locationText}')]`);
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { BasePage };
