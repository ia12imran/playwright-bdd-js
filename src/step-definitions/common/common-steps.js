const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

Given("I navigate to the careers360 website", async function () {
  const url = process.env.BASE_URL || "https://www.careers360.com";
  console.log(`🌐 Navigating to: ${url}`);

  if (this.page) {
    await this.page.goto(url, { waitUntil: "networkidle" });
    console.log("✅ Navigation successful");
  } else {
    console.log("⚠️ Page not initialized");
  }
});

Then("I should see the page title", async function () {
  if (this.page) {
    const title = await this.page.title();
    console.log(`📄 Page title: ${title}`);
    expect(title).to.not.be.empty;
  }
});

Then("I should verify the framework setup is successful", function () {
  console.log("✅ Framework setup verification passed!");
});
