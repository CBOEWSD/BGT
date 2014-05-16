
/*
   * PublishScroll
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
       *# Constructor
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
       *# `this.shouldFire`
      Scroll event fired immediately. Scroll is usually heavily
      dependant upon timing so we have no delay in this event.
     */

    PublishScroll.prototype.shouldFire = function(e) {
      $(document).trigger('contScroll');
      return self.fireIt = true;
    };


    /*
       *# `this.periodicCheck`
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
