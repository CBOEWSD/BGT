###
  # Twitter Model
  Constructs a stream (using web sockets) to connect with
  our local twitter API stream. When a new tweet is received
  the event `tweet/new` is published along with the data
  object for that tweet.
###

class TwitterModel
  self = {}

  ###
    ## Constructor
  ###
  constructor: ($, io, hbs) ->
    # Log: construction event
    @log.add 'notification', '[Model] Constructed.', @

    # Set this/that
    self = @

    # Settings
    self.host = "#{location.protocol}//#{window.location.host}"

    # Start connection
    self.start()

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'Twitter'

  ###
    ## this.start
    Called to initialize the web socket and start tracking events.
  ###
  start: ->
    # Create connection
    self.socket = self.connect()

    self.socket.on 'error', self.error

    # Log: Method called.
    self.log.add 'notification', '[Model] start method called.', self.socket

    # Listen for events
    self.listen 'tweet'
    self.listen 'firsttweet'

  ###
    ## this.connect
    Simply creates and returns a connection to the host socket
  ###
  connect: () ->
    return io.connect self.host

  ###
    ## this.error
    Error handler for socket.io events
  ###
  error: (err) ->
    self.log.add 'error', '[Model] socket error.', err
    PubSub.publish 'tweet/error', err
    return err

  ###
    ## this.listen
    Takes an event name and listens for that event
    After which `this.newTweet` is called.
  ###
  listen: (theEvent) ->
    # Log: Method called.
    self.log.add 'notification', '[Model] listener set for socket event.', theEvent

    self.socket.on theEvent, self.newTweet

  ###
    ## this.newTweet
    Simply publishes the event and data to the rest of our
    application. This cna be used by any module/analytics throughout.
  ###
  newTweet: (data) ->
    # Log: Method called.
    self.log.add 'notification', '[Model] newTweet published.', data

    # Publish event to global scope
    PubSub.publish 'tweet/new', data


# Define called by require
define ->
  return TwitterModel