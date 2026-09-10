Feature: Here we will creaet user as class level eight in careers360.
   
    Background: 
    Given I am on the registration page for user class eight
    When I Enter UserName for class Eight User Creation
    Then I Enter EmailID for class Eight User Creation
    When I Enter Mobile Number for class Eight User Creation

    @class_8
  Scenario: Fill registration form with valid details for class Eight User creation
    When I click on Studying In Dropdown as Select Class Eight
    Then I click School Board Dropdown as Select Value
    