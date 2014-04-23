(function() {
  var WidgetHero;

  WidgetHero = (function() {
    var self;

    self = {};


    /*
       *# Constructor
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
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    WidgetHero.prototype.log = new LogHandler('WidgetHero');


    /*
       *# this.createControls
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
       *# this.controlClick
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
       *# this.showSlide
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
       *# this.nextSlide
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
       *# this.automate
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
       *# this.startTimer
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
       *# this.pauseTimer
      Pauses timer on hover (mouseover) events.
     */

    WidgetHero.prototype.pauseTimer = function(e, el) {
      var $me;
      $me = el || $(this);
      return $me.addClass('paused');
    };


    /*
       *# this.playTimer
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5qcyIsInNvdXJjZXMiOlsiaGVyby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxFQUFQLENBQUE7O0FBRUE7QUFBQTs7T0FGQTs7QUFLYSxJQUFBLG9CQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsS0FBUixHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUMsR0FBRixHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLElBSFAsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFDLFFBQUYsR0FBYSxDQUFBLENBQUUsU0FBRixFQUFhLElBQUMsQ0FBQyxHQUFmLENBTmIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFDLE9BQUYsR0FBWSxDQUFBLENBQUUsUUFBRixFQUFZLElBQUMsQ0FBQyxRQUFkLENBUFosQ0FBQTtBQUFBLE1BVUEsSUFBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUMsT0FBTyxDQUFDLE1BVnBCLENBQUE7QUFBQSxNQWFBLElBQUMsQ0FBQyxjQUFGLENBQUEsQ0FiQSxDQUFBO0FBQUEsTUFnQkEsSUFBQyxDQUFDLFNBQUYsQ0FBWSxDQUFaLEVBQWUsSUFBSSxDQUFDLEdBQXBCLENBaEJBLENBQUE7QUFBQSxNQW1CQSxJQUFDLENBQUMsUUFBRixDQUFXLEtBQVgsQ0FuQkEsQ0FBQTtBQUFBLE1BcUJBLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLGNBQVQsRUFBeUIscUJBQXpCLEVBQWdELElBQWhELENBckJBLENBRFc7SUFBQSxDQUxiOztBQTZCQTtBQUFBOzs7OztPQTdCQTs7QUFBQSx5QkFtQ0EsR0FBQSxHQUFTLElBQUEsVUFBQSxDQUFXLFlBQVgsQ0FuQ1QsQ0FBQTs7QUFxQ0E7QUFBQTs7OztPQXJDQTs7QUFBQSx5QkEwQ0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFFZCxV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