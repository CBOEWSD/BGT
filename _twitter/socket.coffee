module.exports = twitterSocket = (server) ->
  server = if typeof server == 'undefined' then 9000 else server
  io = require('socket.io').listen server, { log: !isProd }

  # ## Config
  conf = require './config.coffee'
  config = conf.config

  # ## Twitter API
  twitapi = require 'twitter'
  twitter = new twitapi config

  io.sockets.on 'connection', (socket) ->
    twitter.getUserTimeline config.handles[0], (data) ->
      console.log 'Tweet: First tweet published.'
      socket.emit 'firsttweet', {'tweet': data.splice(0, 4)}
    if typeof config.handles isnt 'undefined'
      twitter.stream 'user',
        track: config.handles
      , (stream) ->
        stream.on 'data', (data) ->
          console.log 'Tweet: New tweet published.'
          socket.emit 'tweet', {tweet: data}