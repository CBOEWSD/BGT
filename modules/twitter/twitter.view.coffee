# # Twitter View
# This is our view layer tied with the events coming frm
# `twitter.model.coffee` and rendering the response data
# to the page.

class TwitterView
  self = {}

  # ## Constructor
  constructor: (el, tpl) ->
    # This/that
    self = @

    # Set element variables/objects
    self.$el = $(el)
    # The `window["JST"]` object is provided from `*.share.handlebars`
    # files. The object itself is constructed by a grunt task.
    self.view = window["JST"]["modules/twitter/tweet.share.handlebars"]

    # Subscribe to new tweet events
    pubsub.subscribe 'tweet/new', @handleTweet

  # ## `this.handleTweet`
  # Called on the event of a new tweet being published
  handleTweet: (e, data) ->
    # Check that data exists
    if typeof data.tweet == 'object' and typeof data.tweet.friends == 'undefined'
      # If it is an array of tweets we only want the latest
      if typeof data.tweet[0] != 'undefined'
        self.renderTweet data.tweet[0]
      # Otherwise we want the tweet
      else
        self.renderTweet data.tweet

  # ## `this.renderTweet`
  # Using our handlebars template we render the new tweet
  # to our module.
  renderTweet: (tweet) ->
    console.log tweet
    self.$el.html self.view tweet

# Return defined twitter view for require
define ->
  return TwitterView