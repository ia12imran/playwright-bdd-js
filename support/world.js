const { World } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.context = {};
    this.testData = {};
    this.page = null;
    this.browser = null;
  }
}

module.exports = { CustomWorld };