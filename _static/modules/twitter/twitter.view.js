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
      PubSub.subscribe('tweet/error', this.handleError);
    }

    TwitterView.prototype.log = new LogHandler('Twitter');

    TwitterView.prototype.handleTweet = function(data) {
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

    TwitterView.prototype.handleError = function(e, err) {
      return self.$el.html('There was an error connecting with the server.');
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci52aWV3LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0NBQUEsS0FBQSxLQUFBOztDQUFBLENBQU07Q0FDSixHQUFBLElBQUE7O0NBQUEsQ0FBQSxDQUFPLENBQVA7O0NBR2EsQ0FBQSxDQUFBLENBQUEsaUJBQUM7Q0FFWixDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQSxPQUFBO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxDQU1XLENBQVgsQ0FBSSxFQUFKO0NBTkEsRUFTWSxDQUFSLENBQWUsQ0FBbkIsa0NBQTBCO0NBVDFCLENBWThCLEVBQUMsRUFBL0IsR0FBQSxFQUFBO0NBWkEsQ0FhZ0MsRUFBQyxFQUFqQyxHQUFBLEVBQUEsRUFBQTtDQWxCRixJQUdhOztDQUhiLEVBd0JBLENBQVMsS0FBQSxDQUFBOztDQXhCVCxFQTRCYSxDQUFBLEtBQUMsRUFBZDtDQUVFLENBQTZCLENBQXJCLENBQUosRUFBSixRQUFBLGNBQUE7QUFHRyxDQUFILEdBQUcsQ0FBQSxDQUFILENBQXFDLENBQWxDLEdBQUg7QUFFSyxDQUFILEdBQUcsQ0FBa0IsQ0FBbEIsRUFBSCxHQUFBO0NBQ08sR0FBRCxDQUF3QixNQUE1QixNQUFBO01BREYsSUFBQTtDQUlPLEdBQUQsQ0FBSixNQUFBLE1BQUE7VUFOSjtNQUFBLEVBQUE7Q0FTTyxDQUFtQixDQUFoQixDQUFKLEtBQUosTUFBQSx3Q0FBQTtRQWRTO0NBNUJiLElBNEJhOztDQTVCYixDQThDaUIsQ0FBSixNQUFDLEVBQWQ7Q0FDTyxFQUFHLENBQUosU0FBSixtQ0FBQTtDQS9DRixJQThDYTs7Q0E5Q2IsRUFvRGEsRUFBQSxJQUFDLEVBQWQ7Q0FDRSxFQUFRLENBQUosQ0FBVSxDQUFkO0NBR0MsQ0FBd0IsQ0FBckIsQ0FBSCxTQUFELENBQUEsU0FBQTtDQXhERixJQW9EYTs7Q0FwRGI7O0NBREY7O0NBQUEsQ0E0REEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxVQUFPO0NBRFQsRUFBTztDQTVEUCJ9