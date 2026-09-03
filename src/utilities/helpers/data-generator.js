// const { faker } = require('@faker-js/faker');

// class DataGenerator {
//   // Generate email
//   static generateEmail() {
//     return faker.internet.email().toLowerCase();
//   }

//   // Generate first name
//   static generateFirstName() {
//     return faker.person.firstName();
//   }

//   // Generate last name
//   static generateLastName() {
//     return faker.person.lastName();
//   }

//   // Generate full name
//   static generateFullName() {
//     return faker.person.fullName();
//   }

//   // Generate Indian mobile number
//   static generateMobileNumber() {
//     const prefix = ['6', '7', '8', '9'][Math.floor(Math.random() * 4)];
//     const rest = faker.string.numeric(9);
//     return `${prefix}${rest}`;
//   }

//   // Generate password
//   static generatePassword() {
//     return faker.internet.password({
//       length: 10,
//       memorable: true,
//       pattern: /[A-Za-z0-9!@#$%^&*()]/
//     });
//   }

//   // Generate date of birth
//   static generateDateOfBirth() {
//     return faker.date.birthdate({
//       min: 18,
//       max: 65,
//       mode: 'age'
//     });
//   }

//   // Generate city
//   static generateCity() {
//     return faker.location.city();
//   }

//   // Generate state
//   static generateState() {
//     return faker.location.state();
//   }

//   // Generate country
//   static generateCountry() {
//     return faker.location.country();
//   }

//   // Generate random number
//   static generateRandomNumber(min = 1, max = 100) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   // Generate random string
//   static generateRandomString(length = 10) {
//     return faker.string.alphanumeric(length);
//   }

//   // Generate complete user data
//   static generateUserData() {
//     return {
//       name: this.generateFullName(),
//       email: this.generateEmail(),
//       mobile: this.generateMobileNumber(),
//       password: this.generatePassword(),
//       city: this.generateCity(),
//       state: this.generateState(),
//       country: this.generateCountry(),
//       dob: this.generateDateOfBirth()
//     };
//   }

//   // Generate registration data
//   static generateRegistrationData() {
//     const password = this.generatePassword();
//     const userData = this.generateUserData();
//     return {
//       ...userData,
//       password: password,
//       confirmPassword: password,
//       acceptTerms: true,
//       class: 'Class 6th',
//       board: 'State Board'
//     };
//   }

//   // Generate Class Six specific user data
//   static generateClassSixUserData() {
//     return {
//       name: `Student_${this.generateRandomString(5)}`,
//       email: `student${Date.now()}@gmail.com`,
//       mobile: this.generateMobileNumber(),
//       class: 'Class 6th',
//       board: 'State Board',
//       location: 'My current location'
//     };
//   }

//   // Generate invalid user data for testing
//   static generateInvalidUserData(type = 'email') {
//     const invalidData = {
//       email: {
//         name: 'Test User',
//         email: 'invalid-email',
//         mobile: this.generateMobileNumber()
//       },
//       mobile: {
//         name: 'Test User',
//         email: this.generateEmail(),
//         mobile: '12345'
//       },
//       empty: {
//         name: '',
//         email: '',
//         mobile: ''
//       }
//     };
//     return invalidData[type] || invalidData.email;
//   }
// }

// module.exports = { DataGenerator };


//===========================================================================


// data-generator.js - Faker methods like Cypress

// const { faker } = require("@faker-js/faker");

// class DataGenerator {

//   comn_loctr = {
//     username: "#name_focus",
//   }
//   // Generate full name
//   // Similar to Cypress: faker.name.firstName() + faker.name.lastName()
//   static generateFullName() {
//     return faker.person.fullName();
//   }
//   async enetrFullName() {
//     const randomName = faker.person.firstName();
//     const usernameInput = page.locator(this.comn_loctr.username);
//     await usernameInput.fill(randomName);  // Type into the field (Playwright automatically waits for visibility)
//     await expect(usernameInput).toHaveValue(randomName);
//   }

//   // Generate first name
//   // Similar to Cypress: faker.name.firstName()
//   static generateFirstName() {
//     return faker.person.firstName();
//   }

//   // Generate last name
//   // Similar to Cypress: faker.name.lastName()
//   static generateLastName() {
//     return faker.person.lastName();
//   }

//   // Generate email
//   // Similar to Cypress: faker.internet.email()
//   static generateEmail() {
//     return faker.internet.email().toLowerCase();
//   }

//   // Generate mobile number
//   // Similar to Cypress: faker.phone.number('963#######')
//   static generateMobileNumber() {
//     const prefix = ["6", "7", "8", "9"][Math.floor(Math.random() * 4)];
//     const rest = faker.string.numeric(9);
//     return `${prefix}${rest}`;
//   }
// }

// module.exports = { DataGenerator };


//====================================================================

// const { faker } = require('@faker-js/faker');

// class DataGenerator {
//   // Generate email
//   static generateEmail() {
//     return faker.internet.email().toLowerCase();
//   }

//   // Generate first name
//   static generateFirstName() {
//     return faker.person.firstName();
//   }

//   // Generate last name
//   static generateLastName() {
//     return faker.person.lastName();
//   }

//   // Generate full name
//   static generateFullName() {
//     return faker.person.fullName();
//   }

//   // Generate Indian mobile number
//   static generateMobileNumber() {
//     const prefix = ['6', '7', '8', '9'][Math.floor(Math.random() * 4)];
//     const rest = faker.string.numeric(9);
//     return `${prefix}${rest}`;
//   }

//   // Generate password
//   static generatePassword() {
//     return faker.internet.password({
//       length: 10,
//       memorable: true,
//       pattern: /[A-Za-z0-9!@#$%^&*()]/
//     });
//   }

//   // Generate date of birth
//   static generateDateOfBirth() {
//     return faker.date.birthdate({
//       min: 18,
//       max: 65,
//       mode: 'age'
//     });
//   }

//   // Generate city
//   static generateCity() {
//     return faker.location.city();
//   }

//   // Generate state
//   static generateState() {
//     return faker.location.state();
//   }

//   // Generate country
//   static generateCountry() {
//     return faker.location.country();
//   }

//   // Generate random number
//   static generateRandomNumber(min = 1, max = 100) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   // Generate random string
//   static generateRandomString(length = 10) {
//     return faker.string.alphanumeric(length);
//   }

//   // Generate complete user data
//   static generateUserData() {
//     return {
//       name: this.generateFullName(),
//       email: this.generateEmail(),
//       mobile: this.generateMobileNumber(),
//       password: this.generatePassword(),
//       city: this.generateCity(),
//       state: this.generateState(),
//       country: this.generateCountry(),
//       dob: this.generateDateOfBirth()
//     };
//   }

//   // Generate registration data
//   static generateRegistrationData() {
//     const password = this.generatePassword();
//     const userData = this.generateUserData();
//     return {
//       ...userData,
//       password: password,
//       confirmPassword: password,
//       acceptTerms: true,
//       class: 'Class 6th',
//       board: 'State Board'
//     };
//   }

//   // Generate Class Six specific user data
//   static generateClassSixUserData() {
//     return {
//       name: `Student_${this.generateRandomString(5)}`,
//       email: `student${Date.now()}@gmail.com`,
//       mobile: this.generateMobileNumber(),
//       class: 'Class 6th',
//       board: 'State Board',
//       location: 'My current location'
//     };
//   }

//   // Generate invalid user data for testing
//   static generateInvalidUserData(type = 'email') {
//     const invalidData = {
//       email: {
//         name: 'Test User',
//         email: 'invalid-email',
//         mobile: this.generateMobileNumber()
//       },
//       mobile: {
//         name: 'Test User',
//         email: this.generateEmail(),
//         mobile: '12345'
//       },
//       empty: {
//         name: '',
//         email: '',
//         mobile: ''
//       }
//     };
//     return invalidData[type] || invalidData.email;
//   }
// }

// module.exports = { DataGenerator };

// data-generator.js - Faker methods like Cypress

const { faker } = require("@faker-js/faker");

class DataGenerator {

  // Generate full name
  static generateFullName() {
    return faker.person.fullName();
  }

  // Generate first name
  static generateFirstName() {
    return faker.person.firstName();
  }

  // Generate last name
  // Similar to Cypress: faker.name.lastName()
  static generateLastName() {
    return faker.person.lastName();
  }

  // Generate email
  // Similar to Cypress: faker.internet.email()
  static generateEmail() {
    return faker.internet.email().toLowerCase();
  }

  // Generate mobile number
  // Similar to Cypress: faker.phone.number('963#######')
  static generateMobileNumber() {
    const prefix = ["6", "7", "8", "9"][Math.floor(Math.random() * 4)];
    const rest = faker.string.numeric(9);
    return `${prefix}${rest}`;
  }
}

module.exports = { DataGenerator };
