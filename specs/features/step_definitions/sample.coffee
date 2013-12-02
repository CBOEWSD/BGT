expect = require('chai').expect
assert = require('chai').assert

# Methods
checkError = (err) ->
	expect(err).to.be.null

sampleTest = ->
	@World = require('../support/world.coffee').World

	@Given /^I want to vist a page$/, (callback) ->
		@visit('url heree')
		.call callback

	@Then /^some test$/, (callback) ->
		browser = @browser
		@browser.waitFor 'some element', 100, () ->
			callback()

	@Then /^I close the browser$/, (callback) ->
		require("webdriverjs").endAll(callback)


module.exports = sampleTest