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
      self.host = "http://" + window.location.host;
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5tb2RlbC5qcyIsInNvdXJjZXMiOlsidHdpdHRlci5tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLE1BQUE7O0NBQUEsQ0FRTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBSSxDQUFKLENBQUEsa0JBQUM7Q0FFWixDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQSxRQUFBO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxFQU1hLENBQVQsRUFBSixFQUFvQyxDQUF2QjtDQU5iLEdBU0ksQ0FBSixDQUFBO0NBaEJGLElBS2E7O0NBYWI7Ozs7OztDQWxCQTs7Q0FBQSxFQXdCQSxDQUFTLEtBQUEsQ0FBQTs7Q0FFVDs7OztDQTFCQTs7Q0FBQSxFQThCTyxFQUFQLElBQU87Q0FFTCxFQUFjLENBQVYsRUFBSixDQUFjO0NBQWQsQ0FFQSxFQUFJLENBQUosQ0FBQSxDQUFBO0NBRkEsQ0FLNkIsQ0FBckIsQ0FBSixFQUFKLFFBQUEsZ0JBQUE7Q0FMQSxHQVFJLEVBQUosQ0FBQTtDQUNLLEdBQUQsRUFBSixNQUFBLENBQUE7Q0F6Q0YsSUE4Qk87O0NBYVA7Ozs7Q0EzQ0E7O0NBQUEsRUErQ1MsSUFBVCxFQUFTO0NBQ1AsQ0FBUyxFQUFhLEdBQWYsTUFBQTtDQWhEVCxJQStDUzs7Q0FHVDs7OztDQWxEQTs7Q0FBQSxFQXNETyxFQUFQLElBQVE7Q0FDTixDQUFzQixDQUFkLENBQUosRUFBSixDQUFBLGdCQUFBO0NBQUEsQ0FDOEIsQ0FBOUIsR0FBQSxDQUFBLE1BQUE7Q0FDQSxFQUFBLFVBQU87Q0F6RFQsSUFzRE87O0NBS1A7Ozs7O0NBM0RBOztDQUFBLEVBZ0VRLEdBQVIsRUFBUSxDQUFDO0NBRVAsQ0FBNkIsQ0FBckIsQ0FBSixFQUFKLEVBQUEsTUFBQSwwQkFBQTtDQUVLLENBQUwsRUFBSSxFQUFPLEVBQVgsS0FBQTtDQXBFRixJQWdFUTs7Q0FNUjs7Ozs7Q0F0RUE7O0NBQUEsRUEyRVUsQ0FBQSxJQUFWLENBQVc7Q0FFVCxDQUE2QixDQUFyQixDQUFKLEVBQUosUUFBQSxlQUFBO0NBR08sQ0FBcUIsRUFBNUIsRUFBTSxDQUFOLElBQUEsRUFBQTtDQWhGRixJQTJFVTs7Q0EzRVY7O0NBVEY7O0NBQUEsQ0E2RkEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxVQUFPLENBQVA7Q0FERixFQUFPO0NBN0ZQIn0=