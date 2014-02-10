(function() {
  var TwitterView;

  TwitterView = (function() {
    var self;

    self = {};

    function TwitterView(el, tpl) {
      this.log.add('notification', '[View] Constructed.', this);
      self = this;
      self.$el = $(el);
      self.view = window["JST"]["modules/twitter/tweet.share.handlebars"];
      PubSub.subscribe('tweet/new', this.handleTweet);
    }

    TwitterView.prototype.log = new LogHandler('Twitter');

    TwitterView.prototype.handleTweet = function(e, data) {
      self.log.add('notification', '[View] handleTweet called.', data);
      if (typeof data.tweet === 'object' && typeof data.tweet.friends === 'undefined') {
        if (typeof data.tweet[0] !== 'undefined') {
          return self.renderTweet(data.tweet[0]);
        } else {
          return self.renderTweet(data.tweet);
        }
      } else {
        return self.log.add('warning', '[View] data appears to be undefined or not an object.', data);
      }
    };

    TwitterView.prototype.renderTweet = function(tweet) {
      self.$el.html(self.view(tweet));
      return this.log.add('notification', '[View] View rendered.', self.$el.html());
    };

    return TwitterView;

  })();

  define(function() {
    return TwitterView;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci52aWV3LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0NBQUEsS0FBQSxLQUFBOztDQUFBLENBQU07Q0FDSixHQUFBLElBQUE7O0NBQUEsQ0FBQSxDQUFPLENBQVA7O0NBR2EsQ0FBQSxDQUFBLENBQUEsaUJBQUM7Q0FFWixDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQSxPQUFBO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxDQU1XLENBQVgsQ0FBSSxFQUFKO0NBTkEsRUFTWSxDQUFSLENBQWUsQ0FBbkIsa0NBQTBCO0NBVDFCLENBWThCLEVBQUMsRUFBL0IsR0FBQSxFQUFBO0NBakJGLElBR2E7O0NBSGIsRUF1QkEsQ0FBUyxLQUFBLENBQUE7O0NBdkJULENBMkJpQixDQUFKLENBQUEsS0FBQyxFQUFkO0NBRUUsQ0FBNkIsQ0FBckIsQ0FBSixFQUFKLFFBQUEsY0FBQTtBQUdHLENBQUgsR0FBRyxDQUFBLENBQUgsQ0FBcUMsQ0FBbEMsR0FBSDtBQUVLLENBQUgsR0FBRyxDQUFrQixDQUFsQixFQUFILEdBQUE7Q0FDTyxHQUFELENBQXdCLE1BQTVCLE1BQUE7TUFERixJQUFBO0NBSU8sR0FBRCxDQUFKLE1BQUEsTUFBQTtVQU5KO01BQUEsRUFBQTtDQVNPLENBQW1CLENBQWhCLENBQUosS0FBSixNQUFBLHdDQUFBO1FBZFM7Q0EzQmIsSUEyQmE7O0NBM0JiLEVBOENhLEVBQUEsSUFBQyxFQUFkO0NBQ0UsRUFBUSxDQUFKLENBQVUsQ0FBZDtDQUdDLENBQXdCLENBQXJCLENBQUgsU0FBRCxDQUFBLFNBQUE7Q0FsREYsSUE4Q2E7O0NBOUNiOztDQURGOztDQUFBLENBc0RBLENBQU8sR0FBUCxHQUFPO0NBQ0wsVUFBTztDQURULEVBQU87Q0F0RFAifQ==