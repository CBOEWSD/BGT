class TwitterView
  self = {}

  constructor: (el, tpl) ->
    self = @
    self.$el = $(el)
    self.view = window["JST"]["modules/twitter/tweet.share.handlebars"]

    pubsub.subscribe 'tweet/new', @handleTweet

  handleTweet: (e, data) ->
    # Check that data exists
    if typeof data.tweet == 'object' and typeof data.tweet.friends == 'undefined'
      if typeof data.tweet[0] != 'undefined'
        self.renderTweet data.tweet[0]
      else
        self.renderTweet data.tweet

  renderTweet: (tweet) ->
    self.$el.html self.view tweet


define ->
  return TwitterView