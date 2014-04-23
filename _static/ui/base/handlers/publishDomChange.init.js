
/*
   * Publish DomChange
  Allows for modules or classes to subscribe for the body
  `DOMSubtreeModified` event to be fired periodically.
  This will fire when any DOM node is change in the body.
  A good example of this is when an image is loaded using EchoJS.
  This does a number of things.  Primarily, it allows for
  periodic checking and firing as opposed to continuous firing.
  The event that subscriberrs are listening for will only happen
  once a second and prevent a performance issue for
  repeated adustments.
 */

(function() {
  var DomChange;

  DomChange = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function DomChange() {
      self = this;
      self.fireIt = false;
      $('body').bind('DOMSubtreeModified', self.shouldFire);
      self.periodicCheck();
    }


    /*
       *# `this.shouldFire`
      Simply flags the fireIt variable `true`
     */

    DomChange.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };


    /*
       *# `this.periodicCheck`
      Will check every second to see
      if the event should be published.
     */

    DomChange.prototype.periodicCheck = function() {
      return setInterval(function() {
        if (self.fireIt) {
          PubSub.publish('DomChange');
          return self.fireIt = false;
        }
      }, 1000);
    };

    return DomChange;

  })();

  window.events = window.events || {};

  events.domChange = new DomChange;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaERvbUNoYW5nZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoRG9tQ2hhbmdlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxTQUFBOztBQUFBLEVBYU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxtQkFBQSxHQUFBO0FBRVgsTUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsTUFBTCxHQUFjLEtBRmQsQ0FBQTtBQUFBLE1BS0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxvQkFBZixFQUFxQyxJQUFJLENBQUMsVUFBMUMsQ0FMQSxDQUFBO0FBQUEsTUFRQSxJQUFJLENBQUMsYUFBTCxDQUFBLENBUkEsQ0FGVztJQUFBLENBTGI7O0FBaUJBO0FBQUE7OztPQWpCQTs7QUFBQSx3QkFxQkEsVUFBQSxHQUFZLFNBQUMsQ0FBRCxHQUFBO2FBQ1YsSUFBSSxDQUFDLE1BQUwsR0FBYyxLQURKO0lBQUEsQ0FyQlosQ0FBQTs7QUF3QkE7QUFBQTs7OztPQXhCQTs7QUFBQSx3QkE2QkEsYUFBQSxHQUFlLFNBQUEsR0FBQTthQUNiLFdBQUEsQ0FBWSxTQUFBLEdBQUE7QUFDVixRQUFBLElBQUcsSUFBSSxDQUFDLE1BQVI7QUFDRSxVQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsV0FBZixDQUFBLENBQUE7aUJBQ0EsSUFBSSxDQUFDLE1BQUwsR0FBYyxNQUZoQjtTQURVO01BQUEsQ0FBWixFQUlFLElBSkYsRUFEYTtJQUFBLENBN0JmLENBQUE7O3FCQUFBOztNQWRGLENBQUE7O0FBQUEsRUFtREEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFBTSxDQUFDLE1BQVAsSUFBaUIsRUFuRGpDLENBQUE7O0FBQUEsRUFvREEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsR0FBQSxDQUFBLFNBcERuQixDQUFBO0FBQUEifQ==