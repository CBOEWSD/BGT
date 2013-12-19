class TwitterView
  self = {}

  constructor: (el) ->
    self = @
    self.$el = $(el)
    self.template = $('#tweet-template').text()
    self.view = hbs.compile self.template

    pubsub.subscribe 'tweet/new', @handleTweet

  handleTweet: (e, data) ->
    # Check that data exists
    if typeof data.tweet == 'object' and typeof data.tweet.friends == 'undefined'
      self.renderTweet data.tweet[0]

  renderTweet: (tweet) ->
    console.log tweet

    console.log self.template
    console.log self.view tweet

    self.$el.html self.view tweet


define ->
  return TwitterView