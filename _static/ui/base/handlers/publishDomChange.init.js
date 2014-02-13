/*
  # Publish DomChange
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
    /*
      ## Constructor
    */

    function DomChange() {
      var self;
      self = this;
      self.fireIt = false;
      $('body').bind('DOMSubtreeModified', self.shouldFire);
      self.periodicCheck();
    }

    /*
      ## `this.shouldFire`
      Simply flags the fireIt variable `true`
    */


    DomChange.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };

    /*
      ## `this.periodicCheck`
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaERvbUNoYW5nZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoRG9tQ2hhbmdlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLEdBQUE7O0NBQUEsQ0FhTTtDQUVKOzs7Q0FBQTtDQUdhLEVBQUEsQ0FBQSxlQUFBO0NBRVgsR0FBQSxNQUFBO0NBQUEsRUFBTyxDQUFQLEVBQUE7Q0FBQSxFQUVjLENBQVYsQ0FGSixDQUVBO0NBRkEsQ0FLcUMsRUFBckMsRUFBQSxJQUFBLFVBQUE7Q0FMQSxHQVFJLEVBQUosT0FBQTtDQWJGLElBR2E7O0NBWWI7Ozs7Q0FmQTs7Q0FBQSxFQW1CWSxNQUFDLENBQWI7Q0FDTyxFQUFTLENBQVYsRUFBSixPQUFBO0NBcEJGLElBbUJZOztDQUdaOzs7OztDQXRCQTs7Q0FBQSxFQTJCZSxNQUFBLElBQWY7Q0FDYyxFQUFBLE1BQUEsRUFBWixFQUFBO0NBQ0UsR0FBRyxFQUFILEVBQUE7Q0FDRSxLQUFNLENBQU4sR0FBQSxDQUFBO0NBQ0ssRUFBUyxDQUFWLEVBQUosV0FBQTtVQUhRO0NBQVosQ0FJRSxFQUpGLEdBQVk7Q0E1QmQsSUEyQmU7O0NBM0JmOztDQWZGOztDQUFBLENBa0RBLENBQWdCLENBQWlCLEVBQTNCOztBQUNhLENBbkRuQixDQW1EQSxDQUFtQixHQUFiLEdBQU47Q0FuREEifQ==