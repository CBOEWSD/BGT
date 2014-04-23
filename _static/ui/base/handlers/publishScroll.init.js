
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFNjcm9sbC5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoU2Nyb2xsLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBVU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSx1QkFBQSxHQUFBO0FBRVgsTUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsTUFBTCxHQUFjLEtBRmQsQ0FBQTtBQUFBLE1BS0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLElBQUksQ0FBQyxVQUE1QixDQUxBLENBQUE7QUFBQSxNQU1BLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxFQUFaLENBQWUsV0FBZixFQUE0QixJQUFJLENBQUMsVUFBakMsQ0FOQSxDQUFBO0FBQUEsTUFPQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsRUFBWixDQUFlLFNBQWYsRUFBMEIsSUFBSSxDQUFDLFVBQS9CLENBUEEsQ0FBQTtBQUFBLE1BUUEsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEVBQVosQ0FBZSxlQUFmLEVBQWdDLElBQUksQ0FBQyxVQUFyQyxDQVJBLENBQUE7QUFBQSxNQVdBLElBQUksQ0FBQyxhQUFMLENBQUEsQ0FYQSxDQUZXO0lBQUEsQ0FMYjs7QUFvQkE7QUFBQTs7OztPQXBCQTs7QUFBQSw0QkF5QkEsVUFBQSxHQUFZLFNBQUMsQ0FBRCxHQUFBO0FBR1YsTUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsT0FBWixDQUFvQixZQUFwQixDQUFBLENBQUE7YUFJQSxJQUFJLENBQUMsTUFBTCxHQUFjLEtBUEo7SUFBQSxDQXpCWixDQUFBOztBQWtDQTtBQUFBOzs7O09BbENBOztBQUFBLDRCQXVDQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsV0FBQSxDQUFZLFNBQUEsR0FBQTtBQUNWLFFBQUEsSUFBRyxJQUFJLENBQUMsTUFBUjtBQUNFLFVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxjQUFmLENBQUEsQ0FBQTtpQkFDQSxJQUFJLENBQUMsTUFBTCxHQUFjLE1BRmhCO1NBRFU7TUFBQSxDQUFaLEVBSUUsSUFKRixFQURhO0lBQUEsQ0F2Q2YsQ0FBQTs7eUJBQUE7O01BWEYsQ0FBQTs7QUFBQSxFQTBEQSxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUMsTUFBUCxJQUFpQixFQTFEakMsQ0FBQTs7QUFBQSxFQTJEQSxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFBLENBQUEsYUEzRGhCLENBQUE7QUFBQSJ9