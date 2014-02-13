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
    /*
      ## Constructor
    */

    function PublishResize() {
      var self;
      self = this;
      self.fireIt = false;
      $(window).resize(self.shouldFire);
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFJlc2l6ZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoUmVzaXplLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0NBQUE7Q0FBQTtDQUFBO0NBQUEsS0FBQSxPQUFBOztDQUFBLENBV007Q0FFSjs7O0NBQUE7Q0FHYSxFQUFBLENBQUEsbUJBQUE7Q0FFWCxHQUFBLE1BQUE7Q0FBQSxFQUFPLENBQVAsRUFBQTtDQUFBLEVBRWMsQ0FBVixDQUZKLENBRUE7Q0FGQSxHQUt1QixFQUF2QixJQUFBO0NBTEEsR0FRSSxFQUFKLE9BQUE7Q0FiRixJQUdhOztDQVliOzs7O0NBZkE7O0NBQUEsRUFtQlksTUFBQyxDQUFiO0NBQ08sRUFBUyxDQUFWLEVBQUosT0FBQTtDQXBCRixJQW1CWTs7Q0FHWjs7Ozs7Q0F0QkE7O0NBQUEsRUEyQmUsTUFBQSxJQUFmO0NBQ2MsRUFBQSxNQUFBLEVBQVosRUFBQTtDQUNFLEdBQUcsRUFBSCxFQUFBO0NBQ0UsS0FBTSxDQUFOLENBQUEsRUFBQTtDQUNLLEVBQVMsQ0FBVixFQUFKLFdBQUE7VUFIUTtDQUFaLENBSUUsRUFKRixHQUFZO0NBNUJkLElBMkJlOztDQTNCZjs7Q0FiRjs7Q0FBQSxDQWdEQSxDQUFnQixDQUFpQixFQUEzQjs7QUFDVSxDQWpEaEIsQ0FpREEsQ0FBZ0IsR0FBVixPQWpETjtDQUFBIn0=