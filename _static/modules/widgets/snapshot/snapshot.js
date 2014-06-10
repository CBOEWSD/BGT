
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
      PubSub.publish('LazyLoadPoll');
      return console.log(self.$el.width());
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
