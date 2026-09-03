@registration @smoke
Feature: User Registration Form Class Seven 

  As a new user
  I want to fill the registration form
  So that I can create an account

  Background:
    Given I am on the registration page for user class Seven
    When I Enter UserName for class Seven User Creation
    Then I Enter EmailID for class Seven User Creation
    When I Enter Mobile Number for class Seven User Creation

  @positive
  Scenario: Fill registration form with valid details for class Seven User creation
    When I click on Studying In Dropdown as Select Class Seven
    And I Click on School Board as select board "State Board"
    And I click on Location as Select "My current location"
    And I click on Get OTP button
    Then I should see OTP request successful