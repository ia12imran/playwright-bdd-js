@registration @smoke
Feature: User Registration Form

  As a new user
  I want to fill the registration form
  So that I can create an account

  Background:
    Given I am on the registration page for user class Six
    When I Enter UserName for class Six User Creation
    Then I Enter EmailID for class Six User Creation
    When I Enter Mobile Number for class Six User Creation

  @positive
  Scenario: Fill registration form with valid details for class Six User creation
    When I click on Studying In Dropdown as Select Class Six
    And I Click on School Board as select board "State Board"
    And I click on Location as Select "My current location"
    And I click on Get OTP button
    Then I should see OTP request successful

  @negative
  Scenario: Fill registration form with invalid email
    When I Enter invalid EmailID "invalid-email" for class Six User Creation
    And I click on Get OTP button
    Then I should see error message for invalid email

  @negative
  Scenario: Fill registration form without required fields
    When I click on Get OTP button without filling details
    Then I should see field validation errors

  @smoke
  Scenario: Verify registration page loads
    Given I am on the registration page for user class Six
    Then I should see the registration form
    And I should see all required fields