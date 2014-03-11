/*
  # PublishScroll
  Allows for modules or classes to subscribe for a window
  scroll event to be fired.

  **Note:** We are also listening for `touchmove`. This is related to
  iOS and how it handles scroll. In iOS scroll events fire on the release
  of the users finger from the screen and not during physical scroll.
*/


(function() {
  var PublishScroll;

  PublishScroll = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function PublishScroll() {
      self = this;
      self.fireIt = false;
      $(window).on('scroll', self.shouldFire);
      $(document).on('touchmove', self.shouldFire);
      $(document).on('tochend', self.shouldFire);
      $(document).on('gesturechange', self.shouldFire);
      self.periodicCheck();
    }

    /*
      ## `this.shouldFire`
      Scroll event fired immediately. Scroll is usually heavily
      dependant upon timing so we have no delay in this event.
    */


    PublishScroll.prototype.shouldFire = function(e) {
      $(document).trigger('contScroll');
      return self.fireIt = true;
    };

    /*
      ## `this.periodicCheck`
      Will check every second to see
      if the event should be published.
    */


    PublishScroll.prototype.periodicCheck = function() {
      return setInterval(function() {
        if (self.fireIt) {
          PubSub.publish('GlobalScroll');
          return self.fireIt = false;
        }
      }, 3000);
    };

    return PublishScroll;

  })();

  window.events = window.events || {};

  events.scroll = new PublishScroll;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFNjcm9sbC5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoU2Nyb2xsLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLE9BQUE7O0NBQUEsQ0FVTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLG1CQUFBO0NBRVgsRUFBTyxDQUFQLEVBQUE7Q0FBQSxFQUVjLENBQVYsQ0FGSixDQUVBO0NBRkEsQ0FLQSxFQUEyQixFQUEzQixFQUFBLEVBQUE7Q0FMQSxDQU1BLEVBQWdDLEVBQWhDLEVBQUEsRUFBQSxDQUFBO0NBTkEsQ0FPQSxFQUE4QixFQUE5QixFQUFBLENBQUEsQ0FBQTtDQVBBLENBUUEsRUFBb0MsRUFBcEMsRUFBQSxFQUFBLEtBQUE7Q0FSQSxHQVdJLEVBQUosT0FBQTtDQWxCRixJQUthOztDQWViOzs7OztDQXBCQTs7Q0FBQSxFQXlCWSxNQUFDLENBQWI7Q0FHRSxLQUFBLENBQUEsQ0FBQSxJQUFBO0NBSUssRUFBUyxDQUFWLEVBQUosT0FBQTtDQWhDRixJQXlCWTs7Q0FTWjs7Ozs7Q0FsQ0E7O0NBQUEsRUF1Q2UsTUFBQSxJQUFmO0NBQ2MsRUFBQSxNQUFBLEVBQVosRUFBQTtDQUNFLEdBQUcsRUFBSCxFQUFBO0NBQ0UsS0FBTSxDQUFOLEdBQUEsSUFBQTtDQUNLLEVBQVMsQ0FBVixFQUFKLFdBQUE7VUFIUTtDQUFaLENBSUUsRUFKRixHQUFZO0NBeENkLElBdUNlOztDQXZDZjs7Q0FYRjs7Q0FBQSxDQTBEQSxDQUFnQixDQUFpQixFQUEzQjs7QUFDVSxDQTNEaEIsQ0EyREEsQ0FBZ0IsR0FBVixPQTNETjtDQUFBIn0=