webdriverjs = require 'webdriverjs'
expect = require('chai').expect
assert = require('chai').assert

pkg = require '../../../package.json'


# Methods
checkError = (err) ->
	expect(err).to.be.null

client = webdriverjs.remote
	desiredCapabilities:
		# You may choose other browsers
		# http://code.google.com/p/selenium/wiki/DesiredCapabilities
		# browserName: 'firefox'
		# browserName: 'phantomjs'
		name: 'ADT - Form'
		build: 'Version: ' + pkg.version
		platform: 'Windows 7'
		# os_version: '7'
		browserName: 'chrome'
		'screen-resolution': '1280x1024'
		# 'browserstack.tunnel': true
		'browserstack.user': 'UIDevelopers'
		'browserstack.key': 'S6A94rww3RL7InW08slr'
		'browserstack.debug': true
	host: 'hub.browserstack.com'

	# webdriverjs has a lot of output which is generally useless
	# However, if anything goes wrong, remove this to see more details
	# logLevel: 'verbose'
	# logLevel: 'result'
	logLevel: 'silent'

client.init()

client.addCommand 'pwcAuthenticate', (callback) ->
	@waitFor '#username', 100, () ->
		@setValue('#username', '', checkError)
		.setValue('#password2', '', checkError)
		.click('#SubmitCreds', callback())

World = (callback) ->
	# set up code goes here

	@browser = client

	@visit = (url, callback) ->
		size =
			width: 1280
			height: 1024

		@browser.url(url)
		.windowHandleSize(size)
		.getTitle (err, title) ->
			checkError err

			if(title == 'BGT Websites › Log In')
				@pwcAuthenticate () ->
					callback() if typeof callback is 'function'
			else
				callback() if typeof callback is 'function'

	# last line to tell cucumber.js the World is ready.
	callback this

exports.World = World