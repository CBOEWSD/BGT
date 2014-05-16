
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
