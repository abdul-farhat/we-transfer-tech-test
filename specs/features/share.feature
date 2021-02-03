@share
Feature: Upload and Download a file

  Background: Stella visits the serendipitous 'we transfer' website to share her ideas for the first time
    Given Stella navigates to the homepage

  @unregistered
  Scenario: Stella would like to share some files with her friends without signing up
    When Stella uploads a file to share
    And Harry downloads it
    Then Harry verifies it
  