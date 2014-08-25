/*
  # Twitter Model
  Constructs a stream (using web sockets) to connect with
  our local twitter API stream. When a new tweet is received
  the event `tweet/new` is published along with the data
  object for that tweet.
*/


(function() {
  var TwitterModel;

  TwitterModel = (function() {
    var self;

    self = {};

    /*
      ## Constructor
    */


    function TwitterModel($, io, hbs) {
      this.log.add('notification', '[Model] Constructed.', this);
      self = this;
      self.host = "" + location.protocol + "//" + window.location.host;
      self.start();
    }

    /*
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    TwitterModel.prototype.log = new LogHandler('Twitter');

    /*
      ## this.start
      Called to initialize the web socket and start tracking events.
    */


    TwitterModel.prototype.start = function() {
      self.socket = self.connect();
      self.socket.on('error', self.error);
      self.log.add('notification', '[Model] start method called.', self.socket);
      self.listen('tweet');
      return self.listen('firsttweet');
    };

    /*
      ## this.connect
      Simply creates and returns a connection to the host socket
    */


    TwitterModel.prototype.connect = function() {
      return io.connect(self.host);
    };

    /*
      ## this.error
      Error handler for socket.io events
    */


    TwitterModel.prototype.error = function(err) {
      self.log.add('error', '[Model] socket error.', err);
      PubSub.publish('tweet/error', err);
      return err;
    };

    /*
      ## this.listen
      Takes an event name and listens for that event
      After which `this.newTweet` is called.
    */


    TwitterModel.prototype.listen = function(theEvent) {
      self.log.add('notification', '[Model] listener set for socket event.', theEvent);
      return self.socket.on(theEvent, self.newTweet);
    };

    /*
      ## this.newTweet
      Simply publishes the event and data to the rest of our
      application. This cna be used by any module/analytics throughout.
    */


    TwitterModel.prototype.newTweet = function(data) {
      self.log.add('notification', '[Model] newTweet published.', data);
      return PubSub.publish('tweet/new', data);
    };

    return TwitterModel;

  })();

  define(function() {
    return TwitterModel;
  });

}).call(this);
