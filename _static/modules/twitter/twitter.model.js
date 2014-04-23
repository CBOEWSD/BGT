
/*
   * Twitter Model
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
       *# Constructor
     */

    function TwitterModel($, io, hbs) {
      this.log.add('notification', '[Model] Constructed.', this);
      self = this;
      self.host = "http://" + window.location.host;
      self.start();
    }


    /*
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    TwitterModel.prototype.log = new LogHandler('Twitter');


    /*
       *# this.start
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
       *# this.connect
      Simply creates and returns a connection to the host socket
     */

    TwitterModel.prototype.connect = function() {
      return io.connect(self.host);
    };


    /*
       *# this.error
      Error handler for socket.io events
     */

    TwitterModel.prototype.error = function(err) {
      self.log.add('error', '[Model] socket error.', err);
      PubSub.publish('tweet/error', err);
      return err;
    };


    /*
       *# this.listen
      Takes an event name and listens for that event
      After which `this.newTweet` is called.
     */

    TwitterModel.prototype.listen = function(theEvent) {
      self.log.add('notification', '[Model] listener set for socket event.', theEvent);
      return self.socket.on(theEvent, self.newTweet);
    };


    /*
       *# this.newTweet
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5tb2RlbC5qcyIsInNvdXJjZXMiOlsidHdpdHRlci5tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxZQUFBOztBQUFBLEVBUU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxzQkFBQyxDQUFELEVBQUksRUFBSixFQUFRLEdBQVIsR0FBQTtBQUVYLE1BQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxHQUFMLENBQVMsY0FBVCxFQUF5QixzQkFBekIsRUFBaUQsSUFBakQsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFBLEdBQU8sSUFIUCxDQUFBO0FBQUEsTUFNQSxJQUFJLENBQUMsSUFBTCxHQUFhLFNBQUEsR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBTnJDLENBQUE7QUFBQSxNQVNBLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FUQSxDQUZXO0lBQUEsQ0FMYjs7QUFrQkE7QUFBQTs7Ozs7T0FsQkE7O0FBQUEsMkJBd0JBLEdBQUEsR0FBUyxJQUFBLFVBQUEsQ0FBVyxTQUFYLENBeEJULENBQUE7O0FBMEJBO0FBQUE7OztPQTFCQTs7QUFBQSwyQkE4QkEsS0FBQSxHQUFPLFNBQUEsR0FBQTtBQUVMLE1BQUEsSUFBSSxDQUFDLE1BQUwsR0FBYyxJQUFJLENBQUMsT0FBTCxDQUFBLENBQWQsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFaLENBQWUsT0FBZixFQUF3QixJQUFJLENBQUMsS0FBN0IsQ0FGQSxDQUFBO0FBQUEsTUFLQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQVQsQ0FBYSxjQUFiLEVBQTZCLDhCQUE3QixFQUE2RCxJQUFJLENBQUMsTUFBbEUsQ0FMQSxDQUFBO0FBQUEsTUFRQSxJQUFJLENBQUMsTUFBTCxDQUFZLE9BQVosQ0FSQSxDQUFBO2FBU0EsSUFBSSxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBWEs7SUFBQSxDQTlCUCxDQUFBOztBQTJDQTtBQUFBOzs7T0EzQ0E7O0FBQUEsMkJBK0NBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxhQUFPLEVBQUUsQ0FBQyxPQUFILENBQVcsSUFBSSxDQUFDLElBQWhCLENBQVAsQ0FETztJQUFBLENBL0NULENBQUE7O0FBa0RBO0FBQUE7OztPQWxEQTs7QUFBQSwyQkFzREEsS0FBQSxHQUFPLFNBQUMsR0FBRCxHQUFBO0FBQ0wsTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQVQsQ0FBYSxPQUFiLEVBQXNCLHVCQUF0QixFQUErQyxHQUEvQyxDQUFBLENBQUE7QUFBQSxNQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsYUFBZixFQUE4QixHQUE5QixDQURBLENBQUE7QUFFQSxhQUFPLEdBQVAsQ0FISztJQUFBLENBdERQLENBQUE7O0FBMkRBO0FBQUE7Ozs7T0EzREE7O0FBQUEsMkJBZ0VBLE1BQUEsR0FBUSxTQUFDLFFBQUQsR0FBQTtBQUVOLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULENBQWEsY0FBYixFQUE2Qix3Q0FBN0IsRUFBdUUsUUFBdkUsQ0FBQSxDQUFBO2FBRUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFaLENBQWUsUUFBZixFQUF5QixJQUFJLENBQUMsUUFBOUIsRUFKTTtJQUFBLENBaEVSLENBQUE7O0FBc0VBO0FBQUE7Ozs7T0F0RUE7O0FBQUEsMkJBMkVBLFFBQUEsR0FBVSxTQUFDLElBQUQsR0FBQTtBQUVSLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULENBQWEsY0FBYixFQUE2Qiw2QkFBN0IsRUFBNEQsSUFBNUQsQ0FBQSxDQUFBO2FBR0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxXQUFmLEVBQTRCLElBQTVCLEVBTFE7SUFBQSxDQTNFVixDQUFBOzt3QkFBQTs7TUFURixDQUFBOztBQUFBLEVBNkZBLE1BQUEsQ0FBTyxTQUFBLEdBQUE7QUFDTCxXQUFPLFlBQVAsQ0FESztFQUFBLENBQVAsQ0E3RkEsQ0FBQTtBQUFBIn0=