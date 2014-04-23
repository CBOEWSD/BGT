
/*
 * Twitter View
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
       *# Constructor
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
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    TwitterView.prototype.log = new LogHandler('Twitter');


    /*
       *# this.handleTweet
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
       *# this.handleError
      Handle error pubsub event from Twitter model
     */

    TwitterView.prototype.handleError = function(e, err) {
      return self.$el.html('There was an error connecting with the server.');
    };


    /*
       *# this.renderTweet
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci52aWV3LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBT007QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxxQkFBQyxFQUFELEVBQUssR0FBTCxHQUFBO0FBRVgsTUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxjQUFULEVBQXlCLHFCQUF6QixFQUFnRCxJQUFoRCxDQUFBLENBQUE7QUFBQSxNQUdBLElBQUEsR0FBTyxJQUhQLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxHQUFMLEdBQVcsQ0FBQSxDQUFFLEVBQUYsQ0FOWCxDQUFBO0FBQUEsTUFTQSxJQUFJLENBQUMsSUFBTCxHQUFZLE1BQU8sQ0FBQSxLQUFBLENBQU8sQ0FBQSx3Q0FBQSxDQVQxQixDQUFBO0FBQUEsTUFZQSxNQUFNLENBQUMsU0FBUCxDQUFpQixXQUFqQixFQUE4QixJQUFDLENBQUEsV0FBL0IsQ0FaQSxDQUFBO0FBQUEsTUFhQSxNQUFNLENBQUMsU0FBUCxDQUFpQixhQUFqQixFQUFnQyxJQUFDLENBQUEsV0FBakMsQ0FiQSxDQUZXO0lBQUEsQ0FMYjs7QUFzQkE7QUFBQTs7Ozs7T0F0QkE7O0FBQUEsMEJBNEJBLEdBQUEsR0FBUyxJQUFBLFVBQUEsQ0FBVyxTQUFYLENBNUJULENBQUE7O0FBOEJBO0FBQUE7OztPQTlCQTs7QUFBQSwwQkFrQ0EsV0FBQSxHQUFhLFNBQUMsQ0FBRCxFQUFJLElBQUosR0FBQTtBQUVYLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULENBQWEsY0FBYixFQUE2Qiw0QkFBN0IsRUFBMkQsSUFBM0QsQ0FBQSxDQUFBO0FBR0EsTUFBQSxJQUFHLE1BQUEsQ0FBQSxJQUFXLENBQUMsS0FBWixLQUFxQixRQUFyQixJQUFrQyxNQUFBLENBQUEsSUFBVyxDQUFDLEtBQUssQ0FBQyxPQUFsQixLQUE2QixXQUFsRTtBQUVFLFFBQUEsSUFBRyxNQUFBLENBQUEsSUFBVyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQWxCLEtBQXdCLFdBQTNCO2lCQUNFLElBQUksQ0FBQyxXQUFMLENBQWlCLElBQUksQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUE1QixFQURGO1NBQUEsTUFBQTtpQkFJRSxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFJLENBQUMsS0FBdEIsRUFKRjtTQUZGO09BQUEsTUFBQTtlQVNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBVCxDQUFhLFNBQWIsRUFBd0IsdURBQXhCLEVBQWlGLElBQWpGLEVBVEY7T0FMVztJQUFBLENBbENiLENBQUE7O0FBa0RBO0FBQUE7OztPQWxEQTs7QUFBQSwwQkFzREEsV0FBQSxHQUFhLFNBQUMsQ0FBRCxFQUFJLEdBQUosR0FBQTthQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBVCxDQUFjLGdEQUFkLEVBRFc7SUFBQSxDQXREYixDQUFBOztBQXlEQTtBQUFBOzs7O09BekRBOztBQUFBLDBCQThEQSxXQUFBLEdBQWEsU0FBQyxLQUFELEdBQUE7QUFDWCxNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBVCxDQUFjLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBVixDQUFkLENBQUEsQ0FBQTthQUdBLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLGNBQVQsRUFBeUIsdUJBQXpCLEVBQWtELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBVCxDQUFBLENBQWxELEVBSlc7SUFBQSxDQTlEYixDQUFBOzt1QkFBQTs7TUFSRixDQUFBOztBQUFBLEVBNkVBLE1BQUEsQ0FBTyxTQUFBLEdBQUE7QUFDTCxXQUFPLFdBQVAsQ0FESztFQUFBLENBQVAsQ0E3RUEsQ0FBQTtBQUFBIn0=