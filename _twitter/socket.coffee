module.exports = twitterSocket = ->
  io = require('socket.io').listen 9000

  # ## Config
  conf = require './config.coffee'
  config = conf.config

  # ## Twitter API
  twitapi = require 'twitter'
  twitter = new twitapi

  io.sockets.on 'connection', (socket) ->
    twitter.getUserTimeline config.handles[0], (data) ->
      console.log data
      socket.emit 'firsttweet', {'tweet': data.splice(0, 4)}
    if typeof config.handles isnt 'undefined'
      twitter.stream 'user',
        track: config.handles
      , (stream) ->
        stream.on 'data', (data) ->
          console.log 'stream', data
          socket.emit 'tweet': {tweet: data}

twitterSocket()