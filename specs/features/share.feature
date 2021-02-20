@share
Feature: Upload and Download a file

  Background: Stella visits the serendipitous 'we transfer' website to share her ideas for the first time
    Given Stella navigates to the homepage

  @unregistered
  Scenario: Stella would like to share some files with her friends without registering
    When Stella uploads files called 'unicorns.pdf' and 'rainbows.zip'
      And Harry navigates to the shared link
      And Harry downloads the file 'rainbows.zip'
      And Harry downloads the file 'unicorns.pdf'
    Then Harry verifies the file 'unicorns.pdf'
      And Harry verifies the file 'rainbows.zip'
  