(function() {
  var TwitterModel;

  TwitterModel = (function() {
    var self;

    self = {};

    function TwitterModel($, io, hbs) {
      this.log.add('notification', '[Model] Constructed.', this);
      self = this;
      self.host = "http://" + window.location.host;
      self.start();
    }

    TwitterModel.prototype.log = new LogHandler('Twitter');

    TwitterModel.prototype.start = function() {
      self.socket = self.connect();
      self.socket.on('error', self.error);
      self.log.add('notification', '[Model] start method called.', self.socket);
      self.listen('tweet');
      return self.listen('firsttweet');
    };

    TwitterModel.prototype.connect = function() {
      return io.connect(self.host);
    };

    TwitterModel.prototype.error = function(err) {
      self.log.add('error', '[Model] socket error.', err);
      PubSub.publish('tweet/error', err);
      return err;
    };

    TwitterModel.prototype.listen = function(theEvent) {
      self.log.add('notification', '[Model] listener set for socket event.', theEvent);
      return self.socket.on(theEvent, self.newTweet);
    };

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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5tb2RlbC5qcyIsInNvdXJjZXMiOlsidHdpdHRlci5tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7Q0FBQSxLQUFBLE1BQUE7O0NBQUEsQ0FBTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FHYSxDQUFJLENBQUosQ0FBQSxrQkFBQztDQUVaLENBQXlCLENBQXJCLENBQUgsRUFBRCxRQUFBLFFBQUE7Q0FBQSxFQUdPLENBQVAsRUFBQTtDQUhBLEVBTWEsQ0FBVCxFQUFKLEVBQW9DLENBQXZCO0NBTmIsR0FTSSxDQUFKLENBQUE7Q0FkRixJQUdhOztDQUhiLEVBb0JBLENBQVMsS0FBQSxDQUFBOztDQXBCVCxFQXVCTyxFQUFQLElBQU87Q0FFTCxFQUFjLENBQVYsRUFBSixDQUFjO0NBQWQsQ0FFQSxFQUFJLENBQUosQ0FBQSxDQUFBO0NBRkEsQ0FLNkIsQ0FBckIsQ0FBSixFQUFKLFFBQUEsZ0JBQUE7Q0FMQSxHQVFJLEVBQUosQ0FBQTtDQUNLLEdBQUQsRUFBSixNQUFBLENBQUE7Q0FsQ0YsSUF1Qk87O0NBdkJQLEVBc0NTLElBQVQsRUFBUztDQUNQLENBQVMsRUFBYSxHQUFmLE1BQUE7Q0F2Q1QsSUFzQ1M7O0NBdENULEVBMkNPLEVBQVAsSUFBUTtDQUNOLENBQXNCLENBQWQsQ0FBSixFQUFKLENBQUEsZ0JBQUE7Q0FBQSxDQUM4QixDQUE5QixHQUFBLENBQUEsTUFBQTtDQUNBLEVBQUEsVUFBTztDQTlDVCxJQTJDTzs7Q0EzQ1AsRUFtRFEsR0FBUixFQUFRLENBQUM7Q0FFUCxDQUE2QixDQUFyQixDQUFKLEVBQUosRUFBQSxNQUFBLDBCQUFBO0NBRUssQ0FBTCxFQUFJLEVBQU8sRUFBWCxLQUFBO0NBdkRGLElBbURROztDQW5EUixFQTREVSxDQUFBLElBQVYsQ0FBVztDQUVULENBQTZCLENBQXJCLENBQUosRUFBSixRQUFBLGVBQUE7Q0FHTyxDQUFxQixFQUE1QixFQUFNLENBQU4sSUFBQSxFQUFBO0NBakVGLElBNERVOztDQTVEVjs7Q0FERjs7Q0FBQSxDQXNFQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU8sQ0FBUDtDQURGLEVBQU87Q0F0RVAifQ==