/*
  # PublishResize
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
      ## Constructor
    */


    function PublishResize() {
      self = this;
      self.fireIt = false;
      $(window).bind('resize', self.shouldFire);
      self.periodicCheck();
    }

    /*
      ## `this.shouldFire`
      Simply flags the fireIt variable `true`
    */


    PublishResize.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };

    /*
      ## `this.periodicCheck`
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFJlc2l6ZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoUmVzaXplLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0NBQUE7Q0FBQTtDQUFBO0NBQUEsS0FBQSxPQUFBOztDQUFBLENBV007Q0FDSixHQUFBLElBQUE7O0NBQUEsRUFBTyxDQUFQLEVBQUE7O0NBRUE7OztDQUZBOztDQUthLEVBQUEsQ0FBQSxtQkFBQTtDQUVYLEVBQU8sQ0FBUCxFQUFBO0NBQUEsRUFFYyxDQUFWLENBRkosQ0FFQTtDQUZBLENBSzJCLEVBQTNCLEVBQUEsRUFBQSxFQUFBO0NBTEEsR0FRSSxFQUFKLE9BQUE7Q0FmRixJQUthOztDQVliOzs7O0NBakJBOztDQUFBLEVBcUJZLE1BQUMsQ0FBYjtDQUNPLEVBQVMsQ0FBVixFQUFKLE9BQUE7Q0F0QkYsSUFxQlk7O0NBR1o7Ozs7O0NBeEJBOztDQUFBLEVBNkJlLE1BQUEsSUFBZjtDQUNjLEVBQUEsTUFBQSxFQUFaLEVBQUE7Q0FDRSxHQUFHLEVBQUgsRUFBQTtDQUNFLEtBQU0sQ0FBTixDQUFBLEVBQUE7Q0FDSyxFQUFTLENBQVYsRUFBSixXQUFBO1VBSFE7Q0FBWixDQUlFLEVBSkYsR0FBWTtDQTlCZCxJQTZCZTs7Q0E3QmY7O0NBWkY7O0NBQUEsQ0FpREEsQ0FBZ0IsQ0FBaUIsRUFBM0I7O0FBQ1UsQ0FsRGhCLENBa0RBLENBQWdCLEdBQVYsT0FsRE47Q0FBQSJ9