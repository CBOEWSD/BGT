# # Twitter View
# This is our view layer tied with the events coming frm
# `twitter.model.coffee` and rendering the response data
# to the page.

class TwitterView
  self = {}

  # ## Constructor
  constructor: (el, tpl) ->
    # Log: construction event
    @log.add 'notification', '[View] Constructed.', @

    # This/that
    self = @

    # Set element variables/objects
    self.$el = $(el)
    # The `window["JST"]` object is provided from `*.share.handlebars`
    # files. The object itself is constructed by a grunt task.
    self.view = window["JST"]["modules/twitter/tweet.share.handlebars"]

    # Subscribe to new tweet events
    PubSub.subscribe 'tweet/new', @handleTweet
    PubSub.subscribe 'tweet/error', @handleError

  # ## this.log
  # Add local instance of logging to this module.
  # Can be called with:
  # ``` @log.add 'notification', 'message...', @ ```
  log: new LogHandler 'Twitter'

  # ## this.handleTweet
  # Called on the event of a new tweet being published
  handleTweet: (data) ->
    # Log: method called
    self.log.add 'notification', '[View] handleTweet called.', data

    # Check that data exists
    if typeof data.tweet == 'object' and typeof data.tweet.friends == 'undefined'
      # If it is an array of tweets we only want the latest
      if typeof data.tweet[0] != 'undefined'
        self.renderTweet data.tweet[0]
      # Otherwise we want the tweet
      else
        self.renderTweet data.tweet
    else
      # Log: bad data
      self.log.add 'warning', '[View] data appears to be undefined or not an object.', data

  # ## this.handleError
  # Handle error pubsub event from Twitter model
  handleError: (e, err) ->
    self.$el.html 'There was an error connecting with the server.'

  # ## this.renderTweet
  # Using our handlebars template we render the new tweet
  # to our module.
  renderTweet: (tweet) ->
    self.$el.html self.view tweet

    # Log: method called
    @log.add 'notification', '[View] View rendered.', self.$el.html()

# Return defined twitter view for require
define ->
  return TwitterView