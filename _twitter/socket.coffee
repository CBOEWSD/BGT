# ## Twitter WebSocket
# Creates a stream between client-side and twitter API
# for near instant publishing of tweets from Twitter to
# the front-end of CBOE.

module.exports = twitterSocket = (server) ->
  # Check if server has been defined
  # If not we'll open the socket on port 9000
  server = if typeof server == 'undefined' then 9000 else server
  io = require('socket.io').listen server, { log: !isProd }

  # ## Config
  conf = require './config.coffee'
  config = conf.config

  # ## Twitter API
  twitapi = require 'twitter'
  twitter = new twitapi config

  # On connection (from client side)
  io.sockets.on 'connection', (socket) ->
    # Check if user defined in config
    if typeof config.handles isnt 'undefined'
      # Grab our first tweet and emit the event
      twitter.getUserTimeline config.handles[0], (data) ->
        console.log 'Tweet: First tweet published.'
        socket.emit 'firsttweet', {'tweet': data.splice(0, 4)}

      # Create stream for user
      twitter.stream 'user',
        track: config.handles
      , (stream) ->
        # On data stream emit the event and data
        stream.on 'data', (data) ->
          console.log 'Tweet: New tweet published.'
          socket.emit 'tweet', {tweet: data}