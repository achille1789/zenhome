Feature: Create User

  Scenario: User is created successfully
    Given I create the following request
      | email                     | password             |
      | valid_email@outlook.co.uk | thisIsAValidPassword |
    When I make a POST request to "/v1/create"
    Then the response status should be 201
    And the response should contain the following json keys
      | token |
    And the decoded token should have valid_email@outlook.co.uk as the email

  Scenario Outline: Error returned if email is invalid
    Given I create the following request
      | email   | password   |
      | <email> | <password> |
    When I make a POST request to "/v1/create"
    Then the response status should be 400
    And The response body should contain String should match pattern
    And The response body should contain <bad_field>
    Examples:
      | email                        | password             | bad_field |
      | !nvalid_email@outlook.co.uk  | thisIsAValidPassword | email     |
      | invalid_email@somedomain.net | thisIsAValidPassword | email     |
      | valid_email@outlook.co.uk    | !nvalidcharacters    | password  |
      | valid_email@outlook.co.uk    | short                | password  |

  Scenario: User cannot be created twice
    Given I create the following request
      | email                             | password             |
      | another_valid_email@outlook.co.uk | thisIsAValidPassword |
    When I make a POST request to "/v1/create"
    Then the response status should be 201
    And the response should contain the following json keys
      | token |
    Then I create the following request
      | email                             | password             |
      | another_valid_email@outlook.co.uk | thisIsAValidPassword |
    When I make a POST request to "/v1/create"
    Then the response status should be 409
    And The response body should contain User already exists