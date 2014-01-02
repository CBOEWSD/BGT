# # Twitter Model
# Constructs a stream (using web sockets) to connect with
# our local twitter API stream. When a new tweet is received
# the event `tweet/new` is published along with the data
# object for that tweet.
class TwitterModel
  self = {}

  # ## Constructor
  constructor: ($, io, hbs) ->
    # Set this/that
    self = @

    # Settings
    self.host = "http://#{window.location.host}"

    # Start connection
    self.start()

  # ## `this.start`
  start: ->
    # Create connection
    self.socket = self.connect()

    # Listen for events
    self.listen 'tweet'
    self.listen 'firsttweet'

  # ## `this.connect`
  # Simply creates and returns a connection to the host socket
  connect: () ->
    return self.socket = io.connect self.host

  # ## `this.listen`
  # Takes an event name and listens for that event
  # After which `this.newTweet` is called.
  listen: (theEvent) ->
    self.socket.on theEvent, self.newTweet

  # ## `this.newTweet`
  # Simply publishes the event and data to the rest of our
  # application. This cna be used by any module/analytics throughout.
  newTweet: (data) ->
    # Publish event to global scope
    PubSub.publish 'tweet/new', data


# Define called in require
define ->
  return TwitterModel