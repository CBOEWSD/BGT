@form @ui @validation @nightly
Feature: Form validation
Tests the form with multiple entries to verify validation

	# Scenario: Maxlength of fields is set correctly
	# Given I want to check the maxlength of the fields
	# Then All fields have the corresponding maxlength

	# Scenario: Invalid form data - No mask applied
	# Given I want to submit a form with invalid data
	# When I enter invalid data into all fields
	# And I click submit
	# Then the form marks the field as invalid

	# Scenario: Valid form data - No mask applied
	# Given I want to submit a form with valid data
	# When I enter valid data into all fields
	# And I click submit
	# Then I'm redirected to the thank you page

	Scenario: The email subject gets the DNIS appended on submit
	Given I want to test the email subject
	When I enter valid data into all fields
	And I click submit and the email subject gets the correct DNIS
	And I'm redirected to the thank you page

	# Scenario: The email subject gets the customer DNIS appended on submit
	# Given I want to test the email subject
	# When I enter valid data into all fields
	# And I click submit
	# Then the email subject gets the correct DNIS
	# And I'm redirected to the thank you page

	# Scenario: Form mediation / characters get switched correctly
	# Given I want to form mediations
	# When I enter valid data into all fields
	# And I click submit
	# Then the email subject gets the correct DNIS
	# And I'm redirected to the thank you page