
/*
   * Snapshot Graph
  This module will have `toggle` type functionality to view
  each index's graph on hover/touch events.
 */

(function() {
  var Snapshot;

  Snapshot = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function Snapshot($el) {
      self = this;
      this.$el = $el;
      this.$index = $('.siderail li a', this.$el);
      this.$images = $('.images .image', this.$el);
      this.log.add('notification', 'Snapshot constructed.', this);
      this.bind();
      this.loaded();
    }


    /*
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    Snapshot.prototype.log = new LogHandler('WidgetHero');


    /*
       *# this.loaded
      Fired as part of the constructor to remove loading
      view and trigger showing of first item.
     */

    Snapshot.prototype.loaded = function() {
      self.$el.addClass('loaded');
      self.$index.first().trigger('click');
      return PubSub.publish('LazyLoadPoll');
    };


    /*
       *# this.bind
      Bind up events to change index.
     */

    Snapshot.prototype.bind = function() {
      return self.$index.bind('click', self.indexChange);
    };


    /*
       *# this.indexChange
      Fired from `this.bind` method to show selected index image.
     */

    Snapshot.prototype.indexChange = function(e) {
      var $target, $this;
      e.preventDefault();
      self.log.add('notification', 'indexChange method fired.', e);
      self.$index.removeClass('active');
      self.$images.removeClass('active');
      $this = $(this);
      $target = $('[data-id="' + $this.data('target') + '"]');
      if ($target.length > 0) {
        $this.addClass('active');
        return $target.addClass('active');
      } else {
        return self.log.add('error', 'Failed to find target.', $this);
      }
    };

    return Snapshot;

  })();


  /*
     *# Define
    Define our module for AMD.
   */

  define(function() {
    return Snapshot;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QuanMiLCJzb3VyY2VzIjpbInNuYXBzaG90LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxRQUFBOztBQUFBLEVBTU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxrQkFBQyxHQUFELEdBQUE7QUFDWCxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQyxHQUFGLEdBQVEsR0FIUixDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUMsTUFBRixHQUFXLENBQUEsQ0FBRSxnQkFBRixFQUFvQixJQUFDLENBQUMsR0FBdEIsQ0FKWCxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUMsT0FBRixHQUFZLENBQUEsQ0FBRSxnQkFBRixFQUFvQixJQUFDLENBQUMsR0FBdEIsQ0FMWixDQUFBO0FBQUEsTUFRQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxjQUFULEVBQXlCLHVCQUF6QixFQUFrRCxJQUFsRCxDQVJBLENBQUE7QUFBQSxNQVdBLElBQUMsQ0FBQyxJQUFGLENBQUEsQ0FYQSxDQUFBO0FBQUEsTUFZQSxJQUFDLENBQUMsTUFBRixDQUFBLENBWkEsQ0FEVztJQUFBLENBTGI7O0FBb0JBO0FBQUE7Ozs7O09BcEJBOztBQUFBLHVCQTBCQSxHQUFBLEdBQVMsSUFBQSxVQUFBLENBQVcsWUFBWCxDQTFCVCxDQUFBOztBQTRCQTtBQUFBOzs7O09BNUJBOztBQUFBLHVCQWlDQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQVosQ0FBQSxDQUFtQixDQUFDLE9BQXBCLENBQTRCLE9BQTVCLENBREEsQ0FBQTthQUVBLE1BQU0sQ0FBQyxPQUFQLENBQWUsY0FBZixFQUhNO0lBQUEsQ0FqQ1IsQ0FBQTs7QUFzQ0E7QUFBQTs7O09BdENBOztBQUFBLHVCQTBDQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFaLENBQWlCLE9BQWpCLEVBQTBCLElBQUksQ0FBQyxXQUEvQixFQURJO0lBQUEsQ0ExQ04sQ0FBQTs7QUE2Q0E7QUFBQTs7O09BN0NBOztBQUFBLHVCQWlEQSxXQUFBLEdBQWEsU0FBQyxDQUFELEdBQUE7QUFDWCxVQUFBLGNBQUE7QUFBQSxNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQVQsQ0FBYSxjQUFiLEVBQTZCLDJCQUE3QixFQUEwRCxDQUExRCxDQUhBLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3QixRQUF4QixDQU5BLENBQUE7QUFBQSxNQU9BLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBYixDQUF5QixRQUF6QixDQVBBLENBQUE7QUFBQSxNQVNBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRixDQVRSLENBQUE7QUFBQSxNQVVBLE9BQUEsR0FBVSxDQUFBLENBQUUsWUFBQSxHQUFhLEtBQUssQ0FBQyxJQUFOLENBQVcsUUFBWCxDQUFiLEdBQWtDLElBQXBDLENBVlYsQ0FBQTtBQVlBLE1BQUEsSUFBRyxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFwQjtBQUNFLFFBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxRQUFmLENBQUEsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFFBQWpCLEVBRkY7T0FBQSxNQUFBO2VBSUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULENBQWEsT0FBYixFQUFzQix3QkFBdEIsRUFBZ0QsS0FBaEQsRUFKRjtPQWJXO0lBQUEsQ0FqRGIsQ0FBQTs7b0JBQUE7O01BUEYsQ0FBQTs7QUEyRUE7QUFBQTs7O0tBM0VBOztBQUFBLEVBK0VBLE1BQUEsQ0FBTyxTQUFBLEdBQUE7QUFDTCxXQUFPLFFBQVAsQ0FESztFQUFBLENBQVAsQ0EvRUEsQ0FBQTtBQUFBIn0=