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
