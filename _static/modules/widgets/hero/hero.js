(function() {
  var WidgetHero;

  WidgetHero = (function() {
    var self;

    self = {};

    /*
      ## Constructor
    */


    function WidgetHero($, el, timer) {
      this.$el = $(el);
      self = this;
      this.$wrapper = $('.slides', this.$el);
      this.$slides = $('.slide', this.$wrapper);
      this.count = this.$slides.length;
      this.createControls();
      this.showSlide(0, self.$el);
      this.automate(timer);
      this.log.add('notification', 'Widget constructed.', this);
    }

    /*
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    WidgetHero.prototype.log = new LogHandler('WidgetHero');

    /*
      ## this.createControls
      Method is called on initialization to create control
      elements - a list based menu - and bind up click events
    */


    WidgetHero.prototype.createControls = function() {
      var x, _i, _ref;
      this.$controls = $('<ul />').addClass('controls');
      for (x = _i = 0, _ref = this.count; _i < _ref; x = _i += 1) {
        this.$controls.append($('<li />'));
      }
      this.$wrapper.append(this.$controls);
      this.$controls.$ind = $('li', this.$controls);
      this.log.add('notification', 'Slide controls created.', this.$controls);
      this.$controls.$ind.bind('click', this.controlClick);
      if (this.count < 2) {
        return this.$controls.hide();
      }
    };

    /*
      ## this.controlClick
      Called on click of an individual control item
      from the `this.$controls.$ind` group.
      Method will grab the index of clicked item and
      pass that through to the `this.showSlide` method.
    */


    WidgetHero.prototype.controlClick = function(e) {
      var $parent;
      self.log.add('notification', 'Slide control clicked.', this);
      $parent = $(this).parents('.widget-hero');
      e.preventDefault();
      return self.showSlide($('li', $('.controls', $parent)).index(this), $parent);
    };

    /*
      ## this.showSlide
      Given an index this method will disable any currently
      active slide by removing `active` class and enable the
      given index slide.
    */


    WidgetHero.prototype.showSlide = function(index, $parent) {
      var $controls, $next, $nextControl, $slides;
      $slides = $('.slide', $parent);
      $controls = $('.controls li', $parent);
      $next = $($slides.get(index));
      $nextControl = $($controls.get(index));
      self.log.add('notification', 'Slide activated', $next);
      $slides.removeClass('active');
      $controls.removeClass('active');
      $next.addClass('active');
      return $nextControl.addClass('active');
    };

    /*
      ## this.nextSlide
      Finds next slide element to be shown in order of index.
      If currently at last element then returns to start.
      Returns slide index.
    */


    WidgetHero.prototype.nextSlide = function($me) {
      var $slides, index;
      $slides = $('.slide', $me);
      index = {
        current: $slides.filter('.active').index(),
        last: $slides.length - 1
      };
      if (index.current === -1) {
        self.log.add('warning', 'nextSlide: The index of the next slide return -1, reset to 0. This is not expected.', index);
        index.current = 0;
      }
      index.next = index.current < index.last ? index.current + 1 : 0;
      return index.next;
    };

    /*
      ## this.automate
      A timeout triggered event switching to the next slide.
    */


    WidgetHero.prototype.automate = function(time) {
      self.time = typeof time === 'number' ? time : false;
      self.time = time || 4000;
      self.startTimer(null, self.$el);
      self.$el.mouseover(self.pauseTimer);
      return self.$el.mouseout(self.playTimer);
    };

    /*
      ## this.startTimer
      Called on construction and on mouseout events.
    */


    WidgetHero.prototype.startTimer = function(e, el) {
      var $me;
      $me = el || $(this);
      return setInterval(function() {
        if (!$me.hasClass('paused')) {
          return self.showSlide(self.nextSlide($me), $me);
        }
      }, self.time);
    };

    /*
      ## this.pauseTimer
      Pauses timer on hover (mouseover) events.
    */


    WidgetHero.prototype.pauseTimer = function(e, el) {
      var $me;
      $me = el || $(this);
      return $me.addClass('paused');
    };

    /*
      ## this.playTimer
      Plays timer on mouseout events.
    */


    WidgetHero.prototype.playTimer = function(e, el) {
      var $me;
      $me = el || $(this);
      return $me.removeClass('paused');
    };

    return WidgetHero;

  })();

  define(function() {
    return WidgetHero;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5qcyIsInNvdXJjZXMiOlsiaGVyby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FBQSxLQUFBLElBQUE7O0NBQUEsQ0FBTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBSSxDQUFKLENBQUEsQ0FBQSxlQUFDO0NBQ1osQ0FBUSxDQUFSLENBQUMsRUFBRDtDQUFBLEVBR08sQ0FBUCxFQUFBO0NBSEEsQ0FNMEIsQ0FBYixDQUFaLEVBQUQsRUFBQSxDQUFhO0NBTmIsQ0FPd0IsQ0FBWixDQUFYLEVBQUQsQ0FBQSxDQUFZO0NBUFosRUFVVSxDQUFULENBQUQsQ0FBQSxDQUFtQjtDQVZuQixHQWFDLEVBQUQsUUFBQTtDQWJBLENBZ0JlLENBQWYsQ0FBQyxFQUFELEdBQUE7Q0FoQkEsR0FtQkMsQ0FBRCxDQUFBLEVBQUE7Q0FuQkEsQ0FxQnlCLENBQXJCLENBQUgsRUFBRCxRQUFBLE9BQUE7Q0EzQkYsSUFLYTs7Q0F3QmI7Ozs7OztDQTdCQTs7Q0FBQSxFQW1DQSxDQUFTLE1BQUEsRUFBQTs7Q0FFVDs7Ozs7Q0FyQ0E7O0NBQUEsRUEwQ2dCLE1BQUEsS0FBaEI7Q0FFRSxTQUFBLENBQUE7Q0FBQSxFQUFjLENBQWIsRUFBRCxFQUFjLENBQWQsQ0FBYztBQUdkLENBQUEsRUFBQSxRQUFTLDBDQUFUO0NBQ0UsR0FBQyxFQUFELEVBQUEsQ0FBVztDQURiLE1BSEE7Q0FBQSxHQU9DLEVBQUQsRUFBVSxDQUFWO0NBUEEsQ0FVMkIsQ0FBUixDQUFsQixFQUFELEdBQVc7Q0FWWCxDQWEwQixDQUFyQixDQUFKLEVBQUQsR0FBQSxLQUFBLFdBQUE7Q0FiQSxDQWdCK0IsRUFBOUIsRUFBRCxDQUFBLEVBQVcsR0FBWDtDQUVBLEVBQWdDLENBQVYsQ0FBQSxDQUF0QjtDQUFFLEdBQUQsS0FBVSxNQUFYO1FBcEJjO0NBMUNoQixJQTBDZ0I7O0NBc0JoQjs7Ozs7OztDQWhFQTs7Q0FBQSxFQXVFYyxN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