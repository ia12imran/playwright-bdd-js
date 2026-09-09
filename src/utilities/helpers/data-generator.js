const { faker } = require("@faker-js/faker");

class DataGenerator {
  static generateFullName() {
    return faker.person.fullName();
  }

  static generateFirstName() {
    return faker.person.firstName();
  }

  static generateLastName() {
    return faker.person.lastName();
  }

  static generateEmail() {
    return faker.internet.email().toLowerCase();
  }

  static generateMobileNumber() {
    const prefix = ["6", "7", "8", "9"][Math.floor(Math.random() * 4)];
    const rest = faker.string.numeric(9);
    return `${prefix}${rest}`;
  }
}

module.exports = { DataGenerator };