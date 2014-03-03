/*
  # Snapshot Graph
  This module will have `toggle` type functionality to view
  each index's graph on hover/touch events.
*/


(function() {
  var Snapshot;

  Snapshot = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
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
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    Snapshot.prototype.log = new LogHandler('WidgetHero');

    /*
      ## this.loaded
      Fired as part of the constructor to remove loading
      view and trigger showing of first item.
    */


    Snapshot.prototype.loaded = function() {
      self.$el.addClass('loaded');
      return self.$index.first().trigger('click');
    };

    /*
      ## this.bind
      Bind up events to change index.
    */


    Snapshot.prototype.bind = function() {
      return self.$index.bind('click', self.indexChange);
    };

    /*
      ## this.indexChange
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
    ## Define
    Define our module for AMD.
  */


  define(function() {
    return Snapshot;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QuanMiLCJzb3VyY2VzIjpbInNuYXBzaG90LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLEVBQUE7O0NBQUEsQ0FNTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLGNBQUM7Q0FDWixFQUFPLENBQVAsRUFBQTtDQUFBLEVBR0EsQ0FBQyxFQUFEO0NBSEEsQ0FJK0IsQ0FBcEIsQ0FBVixFQUFELFVBQVc7Q0FKWCxDQUtnQyxDQUFwQixDQUFYLEVBQUQsQ0FBQSxTQUFZO0NBTFosQ0FReUIsQ0FBckIsQ0FBSCxFQUFELFFBQUEsU0FBQTtDQVJBLEdBV0MsRUFBRDtDQVhBLEdBWUMsRUFBRDtDQWxCRixJQUthOztDQWViOzs7Ozs7Q0FwQkE7O0NBQUEsRUEwQkEsQ0FBUyxNQUFBLEVBQUE7O0NBRVQ7Ozs7O0NBNUJBOztDQUFBLEVBaUNRLEdBQVIsR0FBUTtDQUNOLEVBQVEsQ0FBSixFQUFKLEVBQUE7Q0FDSyxHQUFELENBQUosQ0FBVyxDQUFYLE1BQUE7Q0FuQ0YsSUFpQ1E7O0NBSVI7Ozs7Q0FyQ0E7O0NBQUEsRUF5Q00sQ0FBTixLQUFNO0NBQ0MsQ0FBcUIsRUFBdEIsRUFBTyxDQUFYLElBQUEsRUFBQTtDQTFDRixJQXlDTTs7Q0FHTjs7OztDQTVDQTs7Q0FBQSxFQWdEYSxNQUFDLEVBQWQ7Q0FDRSxTQUFBLElBQUE7Q0FBQSxLQUFBLFFBQUE7Q0FBQSxDQUc2QixDQUFyQixDQUFKLEVBQUosUUFBQSxhQUFBO0NBSEEsR0FNSSxFQUFKLEVBQUEsR0FBQTtDQU5BLEdBT0ksRUFBSixDQUFZLENBQVosR0FBQTtDQVBBLEVBU1EsQ0FBQSxDQUFSLENBQUE7Q0FUQSxFQVVVLENBQWUsQ0FBSyxDQUE5QixDQUFBLENBQXlCLElBQWI7Q0FFWixFQUFvQixDQUFqQixFQUFILENBQVU7Q0FDUixJQUFLLEdBQUw7Q0FDUSxNQUFELENBQVAsT0FBQTtNQUZGLEVBQUE7Q0FJTyxDQUFpQixDQUFkLENBQUosQ0FBSixFQUFBLFFBQUEsU0FBQTtRQWpCUztDQWhEYixJQWdEYTs7Q0FoRGI7O0NBUEY7O0NBMEVBOzs7O0NBMUVBOztDQUFBLENBOEVBLENBQU8sR0FBUCxHQUFPO0NBQ0wsT0FBQSxHQUFPO0NBRFQsRUFBTztDQTlFUCJ9