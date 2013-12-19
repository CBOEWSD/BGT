
class TwitterModel
  self = {}

  constructor: ($, io, hbs) ->
    self = @

    # Settings
    self.host = "http://#{window.location.host}"

    # Start connection
    self.start()

  start: ->
    self.socket = self.connect()
    self.listen 'tweet'
    self.listen 'firsttweet'

  connect: () ->
    return self.socket = io.connect self.host

  listen: (theEvent) ->
    self.socket.on theEvent, self.newTweet

  newTweet: (data) ->
    # Publish event to global scope
    pubsub.publish 'tweet/new', data


# Define called in require
define ->
  return TwitterModel