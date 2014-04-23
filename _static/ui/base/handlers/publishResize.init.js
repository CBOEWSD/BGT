
/*
   * PublishResize
  Allows for modules or classes to subscribe for a window
  resize event to be fired. This does a number of things.
  Primarily, it allows for periodic checking and firing
  as opposed to continuous firing.
  The event that subscriberrs are listening for will only happen
  once a second and prevent a performance issue for
  repeated adustments.
 */

(function() {
  var PublishResize;

  PublishResize = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function PublishResize() {
      self = this;
      self.fireIt = false;
      $(window).bind('resize', self.shouldFire);
      self.periodicCheck();
    }


    /*
       *# `this.shouldFire`
      Simply flags the fireIt variable `true`
     */

    PublishResize.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };


    /*
       *# `this.periodicCheck`
      Will check every second to see
      if the event should be published.
     */

    PublishResize.prototype.periodicCheck = function() {
      return setInterval(function() {
        if (self.fireIt) {
          PubSub.publish('resize');
          return self.fireIt = false;
        }
      }, 1000);
    };

    return PublishResize;

  })();

  window.events = window.events || {};

  events.resize = new PublishResize;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFJlc2l6ZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoUmVzaXplLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsYUFBQTs7QUFBQSxFQVdNO0FBQ0osUUFBQSxJQUFBOztBQUFBLElBQUEsSUFBQSxHQUFPLE1BQVAsQ0FBQTs7QUFFQTtBQUFBOztPQUZBOztBQUthLElBQUEsdUJBQUEsR0FBQTtBQUVYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLE1BQUwsR0FBYyxLQUZkLENBQUE7QUFBQSxNQUtBLENBQUEsQ0FBRyxNQUFILENBQVcsQ0FBQyxJQUFaLENBQWlCLFFBQWpCLEVBQTJCLElBQUksQ0FBQyxVQUFoQyxDQUxBLENBQUE7QUFBQSxNQVFBLElBQUksQ0FBQyxhQUFMLENBQUEsQ0FSQSxDQUZXO0lBQUEsQ0FMYjs7QUFpQkE7QUFBQTs7O09BakJBOztBQUFBLDRCQXFCQSxVQUFBLEdBQVksU0FBQyxDQUFELEdBQUE7YUFDVixJQUFJLENBQUMsTUFBTCxHQUFjLEtBREo7SUFBQSxDQXJCWixDQUFBOztBQXdCQTtBQUFBOzs7O09BeEJBOztBQUFBLDRCQTZCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsV0FBQSxDQUFZLFNBQUEsR0FBQTtBQUNWLFFBQUEsSUFBRyxJQUFJLENBQUMsTUFBUjtBQUNFLFVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxRQUFmLENBQUEsQ0FBQTtpQkFDQSxJQUFJLENBQUMsTUFBTCxHQUFjLE1BRmhCO1NBRFU7TUFBQSxDQUFaLEVBSUUsSUFKRixFQURhO0lBQUEsQ0E3QmYsQ0FBQTs7eUJBQUE7O01BWkYsQ0FBQTs7QUFBQSxFQWlEQSxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUMsTUFBUCxJQUFpQixFQWpEakMsQ0FBQTs7QUFBQSxFQWtEQSxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFBLENBQUEsYUFsRGhCLENBQUE7QUFBQSJ9