/*
# Twitter View
This is our view layer tied with the events coming frm
`twitter.model.coffee` and rendering the response data
to the page.
*/


(function() {
  var TwitterView;

  TwitterView = (function() {
    var self;

    self = {};

    /*
      ## Constructor
    */


    function TwitterView(el, tpl) {
      this.log.add('notification', '[View] Constructed.', this);
      self = this;
      self.$el = $(el);
      self.view = window["JST"]["modules/twitter/tweet.share.handlebars"];
      PubSub.subscribe('tweet/new', this.handleTweet);
      PubSub.subscribe('tweet/error', this.handleError);
    }

    /*
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    TwitterView.prototype.log = new LogHandler('Twitter');

    /*
      ## this.handleTweet
      Called on the event of a new tweet being published
    */


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

    /*
      ## this.handleError
      Handle error pubsub event from Twitter model
    */


    TwitterView.prototype.handleError = function(e, err) {
      return self.$el.html('There was an error connecting with the server.');
    };

    /*
      ## this.renderTweet
      Using our handlebars template we render the new tweet
      to our module.
    */


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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci52aWV3LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLEtBQUE7O0NBQUEsQ0FPTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBQSxDQUFBLENBQUEsaUJBQUM7Q0FFWixDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQSxPQUFBO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxDQU1XLENBQVgsQ0FBSSxFQUFKO0NBTkEsRUFTWSxDQUFSLENBQWUsQ0FBbkIsa0NBQTBCO0NBVDFCLENBWThCLEVBQUMsRUFBL0IsR0FBQSxFQUFBO0NBWkEsQ0FhZ0MsRUFBQyxFQUFqQyxHQUFBLEVBQUEsRUFBQTtDQXBCRixJQUthOztDQWlCYjs7Ozs7O0NBdEJBOztDQUFBLEVBNEJBLENBQVMsS0FBQSxDQUFBOztDQUVUOzs7O0NBOUJBOztDQUFBLENBa0NpQixDQUFKLENBQUEsS0FBQyxFQUFkO0NBRUUsQ0FBNkIsQ0FBckIsQ0FBSixFQUFKLFFBQUEsY0FBQTtBQUdHLENBQUgsR0FBRyxDQUFBLENBQUgsQ0FBcUMsQ0FBbEMsR0FBSDtBQUVLLENBQUgsR0FBRyxDQUFrQixDQUFsQixFQUFILEdBQUE7Q0FDTyxHQUFELENBQXdCLE1BQTVCLE1BQUE7TUFERixJQUFBO0NBSU8sR0FBRCxDQUFKLE1BQUEsTUFBQTtVQU5KO01BQUEsRUFBQTtDQVNPLENBQW1CLENBQWhCLENBQUosS0FBSixNQUFBLHdDQUFBO1FBZFM7Q0FsQ2IsSUFrQ2E7O0NBZ0JiOzs7O0NBbERBOztDQUFBLENBc0RpQixDQUFKLE1BQUMsRUFBZDtDQUNPLEVBQUcsQ0FBSixTQUFKLG1DQUFBO0NBdkRGLElBc0RhOztDQUdiOzs7OztDQXpEQTs7Q0FBQSxFQThEYSxFQUFBLElBQUMsRUFBZDtDQUNFLEVBQVEsQ0FBSixDQUFVLENBQWQ7Q0FHQyxDQUF3QixDQUFyQixDQUFILFNBQUQsQ0FBQSxTQUFBO0NBbEVGLElBOERhOztDQTlEYjs7Q0FSRjs7Q0FBQSxDQTZFQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU87Q0FEVCxFQUFPO0NBN0VQIn0=