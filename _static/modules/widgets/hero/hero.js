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
      self.$wrapper = $('.slides', self.$el);
      self.$slides = $('.slide', self.$wrapper);
      self.count = self.$slides.length;
      self.createControls();
      self.showSlide(0);
      self.automate(timer);
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
      self.$controls = $('<ul />').addClass('controls');
      for (x = _i = 0, _ref = self.count; _i < _ref; x = _i += 1) {
        self.$controls.append($('<li />'));
      }
      self.$wrapper.append(self.$controls);
      self.$controls.$ind = $('li', self.$controls);
      self.log.add('notification', 'Slide controls created.', self.$controls);
      return self.$controls.$ind.bind('click', self.controlClick);
    };

    /*
      ## this.controlClick
      Called on click of an individual control item
      from the `this.$controls.$ind` group.
      Method will grab the index of clicked item and
      pass that through to the `this.showSlide` method.
    */


    WidgetHero.prototype.controlClick = function(e) {
      self.log.add('notification', 'Slide control clicked.', this);
      e.preventDefault();
      return self.showSlide($('li', self.$controls).index(this));
    };

    /*
      ## this.showSlide
      Given an index this method will disable any currently
      active slide by removing `active` class and enable the
      given index slide.
    */


    WidgetHero.prototype.showSlide = function(index) {
      var $next, $nextControl;
      $next = $(self.$slides.get(index));
      $nextControl = $(self.$controls.$ind.get(index));
      self.log.add('notification', 'Slide activated', $next);
      self.$slides.removeClass('active');
      self.$controls.$ind.removeClass('active');
      $next.addClass('active');
      return $nextControl.addClass('active');
    };

    /*
      ## this.nextSlide
      Finds next slide element to be shown in order of index.
      If currently at last element then returns to start.
      Returns slide index.
    */


    WidgetHero.prototype.nextSlide = function() {
      var index;
      index = {
        current: self.$slides.filter('.active').index(),
        last: self.$slides.length - 1
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
      self.startTimer(self.time);
      self.$el.mouseover(self.pauseTimer);
      return self.$el.mouseout(self.startTimer);
    };

    /*
      ## this.startTimer
      Called on construction and on mouseout events.
    */


    WidgetHero.prototype.startTimer = function() {
      return self.timer = setInterval(function() {
        return self.showSlide(self.nextSlide());
      }, self.time);
    };

    /*
      ## this.pauseTimer
      Pauses timer on hover (mouseover) events.
    */


    WidgetHero.prototype.pauseTimer = function() {
      return window.clearInterval(self.timer);
    };

    return WidgetHero;

  })();

  define(function() {
    return WidgetHero;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5qcyIsInNvdXJjZXMiOlsiaGVyby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FBQSxLQUFBLElBQUE7O0NBQUEsQ0FBTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBSSxDQUFKLENBQUEsQ0FBQSxlQUFDO0NBQ1osQ0FBUSxDQUFSLENBQUMsRUFBRDtDQUFBLEVBR08sQ0FBUCxFQUFBO0NBSEEsQ0FNNkIsQ0FBYixDQUFaLEVBQUosRUFBQSxDQUFnQjtDQU5oQixDQU8yQixDQUFaLENBQVgsRUFBSixDQUFBLENBQWU7Q0FQZixFQVVhLENBQVQsQ0FBSixDQUFBLENBQXlCO0NBVnpCLEdBYUksRUFBSixRQUFBO0NBYkEsR0FnQkksRUFBSixHQUFBO0NBaEJBLEdBbUJJLENBQUosQ0FBQSxFQUFBO0NBbkJBLENBcUJ5QixDQUFyQixDQUFILEVBQUQsUUFBQSxPQUFBO0NBM0JGLElBS2E7O0NBd0JiOzs7Ozs7Q0E3QkE7O0NBQUEsRUFtQ0EsQ0FBUyxNQUFBLEVBQUE7O0NBRVQ7Ozs7O0NBckNBOztDQUFBLEVBMENnQixNQUFBLEtBQWhCO0NBRUUsU0FBQSxDQUFBO0NBQUEsRUFBaUIsQ0FBYixFQUFKLEVBQWlCLENBQWpCLENBQWlCO0FBR2pCLENBQUEsRUFBQSxRQUFTLDBDQUFUO0NBQ0UsR0FBSSxFQUFKLEVBQUEsQ0FBYztDQURoQixNQUhBO0NBQUEsR0FPSSxFQUFKLEVBQWEsQ0FBYjtDQVBBLENBVThCLENBQVIsQ0FBbEIsRUFBSixHQUFjO0NBVmQsQ0FhNkIsQ0FBckIsQ0FBSixFQUFKLEdBQUEsS0FBQSxXQUFBO0NBR0ssQ0FBNkIsRUFBOUIsR0FBSixFQUFjLEdBQWQsQ0FBQTtDQTVERixJQTBDZ0I7O0NBb0JoQjs7Ozs7OztDQTlEQTs7Q0FBQSxFQXFFYyxNQUFDLEdBQWY7Q0FDRSxDQUE2QixDQUFyQixDQUFKLEVBQUosUUFBQSxVQUFBO0NBQUEsS0FHQSxRQUFBO0NBR0ssQ0FBa0IsRUFBbkIsQ0FBVyxJQUFmLElBQUE7Q0E1RUYsSUFxRWM7O0NBU2Q7Ozs7OztDQTlFQTs7Q0FBQSxFQW9GVyxFQUFBLElBQVg7Q0FDRSxTQUFBLFNBQUE7Q0FBQSxFQUFRLENBQU0sQ0FBZCxDQUFBLENBQXNCO0NBQXRCLEVBQ2UsQ0FBTSxDQUFKLENBQWpCLEdBQStCLEdBQS9CO0NBREEsQ0FJNkIsQ0FBckIsQ0FBSixDQUFKLENBQUEsUUFBQSxHQUFBO0NBSkEsR0FPSSxFQUFKLENBQVksQ0FBWixHQUFBO0NBUEEsR0FRSSxFQUFKLEVBQUEsQ0FBYyxFQUFkO0NBUkEsSUFVSyxDQUFMLEVBQUE7Q0FDYSxPQUFiLElBQVksQ0FBWjtDQWhHRixJQW9GVzs7Q0FjWDs7Ozs7O0NBbEdBOztDQUFBLEVBd0dXLE1BQVg7Q0FDRSxJQUFBLEtBQUE7Q0FBQSxFQUFRLEVBQVIsQ0FBQTtDQUFRLENBQ0csRUFBSSxDQUFKLENBQUEsQ0FBVCxDQUFBLENBQVM7Q0FESCxDQUVBLENBQXNCLENBQTVCLEVBQU0sQ0FBWSxDQUFsQjtDQUZGLE9BQUE7QUFNcUIsQ0FBckIsR0FBRyxDQUFLLENBQVIsQ0FBRztDQUVELENBQXdCLENBQWhCLENBQUosQ0FBSixHQUFBLENBQUEsNEVBQUE7Q0FBQSxFQUVnQixFQUFYLEVBQUwsQ0FBQTtRQVZGO0NBQUEsRUFhaUIsQ0FBakIsQ0FBSyxDQUFMLENBQWlCO0NBRWpCLEdBQUEsQ0FBWSxRQUFMO0NBeEhULElBd0dXOztDQWtCWDs7OztDQTFIQTs7Q0FBQSxFQThIVSxDQUFBLElBQVYsQ0FBVztBQUVNLENBQWYsRUFBZSxDQUFYLENBQTBCLENBQTlCLEVBQVk7Q0FBWixFQUNZLENBQVIsRUFBSjtDQURBLEdBSUksRUFBSixJQUFBO0NBSkEsRUFPUSxDQUFKLEVBQUosR0FBQSxDQUFBO0NBQ0ssRUFBRyxDQUFKLElBQUosRUFBQSxHQUFBO0NBeElGLElBOEhVOztDQVlWOzs7O0NBMUlBOztDQUFBLEVBOElZLE1BQUEsQ0FBWjtDQUVPLEVBQVEsQ0FBVCxDQUFKLElBQXlCLEVBQVosRUFBYjtDQUVPLEdBQUQsS0FBSixNQUFBO0NBRlcsQ0FHWCxFQUFJLEdBSG1CO0NBaEozQixJQThJWTs7Q0FPWjs7OztDQXJKQTs7Q0FBQSxFQXlKWSxNQUFBLENBQVo7Q0FDUyxHQUFrQixDQUF6QixDQUFNLE9BQU47Q0ExSkYsSUF5Slk7O0NBekpaOztDQURGOztDQUFBLENBOEpBLENBQU8sR0FBUCxHQUFPO0NBQ0wsU0FBQSxDQUFPO0NBRFQsRUFBTztDQTlKUCJ9