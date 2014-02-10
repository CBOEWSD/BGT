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
      self.log.add('notification', '[Model] start method called.', self.socket);
      self.listen('tweet');
      return self.listen('firsttweet');
    };

    TwitterModel.prototype.connect = function() {
      return self.socket = io.connect(self.host);
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5tb2RlbC5qcyIsInNvdXJjZXMiOlsidHdpdHRlci5tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7Q0FBQSxLQUFBLE1BQUE7O0NBQUEsQ0FBTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FHYSxDQUFJLENBQUosQ0FBQSxrQkFBQztDQUVaLENBQXlCLENBQXJCLENBQUgsRUFBRCxRQUFBLFFBQUE7Q0FBQSxFQUdPLENBQVAsRUFBQTtDQUhBLEVBTWEsQ0FBVCxFQUFKLEVBQW9DLENBQXZCO0NBTmIsR0FTSSxDQUFKLENBQUE7Q0FkRixJQUdhOztDQUhiLEVBb0JBLENBQVMsS0FBQSxDQUFBOztDQXBCVCxFQXVCTyxFQUFQLElBQU87Q0FFTCxFQUFjLENBQVYsRUFBSixDQUFjO0NBQWQsQ0FHNkIsQ0FBckIsQ0FBSixFQUFKLFFBQUEsZ0JBQUE7Q0FIQSxHQU1JLEVBQUosQ0FBQTtDQUNLLEdBQUQsRUFBSixNQUFBLENBQUE7Q0FoQ0YsSUF1Qk87O0NBdkJQLEVBb0NTLElBQVQsRUFBUztDQUNQLENBQXVCLENBQUYsQ0FBVixFQUFKLENBQWMsTUFBZDtDQXJDVCxJQW9DUzs7Q0FwQ1QsRUEwQ1EsR0FBUixFQUFRLENBQUM7Q0FFUCxDQUE2QixDQUFyQixDQUFKLEVBQUosRUFBQSxNQUFBLDBCQUFBO0NBRUssQ0FBTCxFQUFJLEVBQU8sRUFBWCxLQUFBO0NBOUNGLElBMENROztDQTFDUixFQW1EVSxDQUFBLElBQVYsQ0FBVztDQUVULENBQTZCLENBQXJCLENBQUosRUFBSixRQUFBLGVBQUE7Q0FHTyxDQUFxQixFQUE1QixFQUFNLENBQU4sSUFBQSxFQUFBO0NBeERGLElBbURVOztDQW5EVjs7Q0FERjs7Q0FBQSxDQTZEQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU8sQ0FBUDtDQURGLEVBQU87Q0E3RFAifQ==