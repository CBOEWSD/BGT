(function() {
  var WidgetHero;

  WidgetHero = (function() {
    var self;

    self = {};

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

    WidgetHero.prototype.log = new LogHandler('WidgetHero');

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

    WidgetHero.prototype.controlClick = function(e) {
      self.log.add('notification', 'Slide control clicked.', this);
      e.preventDefault();
      return self.showSlide($('li', self.$controls).index(this));
    };

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

    WidgetHero.prototype.automate = function(time) {
      self.time = typeof time === 'number' ? time : false;
      self.time = time || 4000;
      self.startTimer(self.time);
      self.$el.mouseover(self.pauseTimer);
      return self.$el.mouseout(self.startTimer);
    };

    WidgetHero.prototype.startTimer = function() {
      return self.timer = setInterval(function() {
        return self.showSlide(self.nextSlide());
      }, self.time);
    };

    WidgetHero.prototype.pauseTimer = function() {
      return window.clearInterval(self.timer);
    };

    return WidgetHero;

  })();

  define(function() {
    return WidgetHero;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5qcyIsInNvdXJjZXMiOlsiaGVyby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FBQSxLQUFBLElBQUE7O0NBQUEsQ0FBTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFYSxDQUFJLENBQUosQ0FBQSxDQUFBLGVBQUM7Q0FDWixDQUFRLENBQVIsQ0FBQyxFQUFEO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxDQU02QixDQUFiLENBQVosRUFBSixFQUFBLENBQWdCO0NBTmhCLENBTzJCLENBQVosQ0FBWCxFQUFKLENBQUEsQ0FBZTtDQVBmLEVBVWEsQ0FBVCxDQUFKLENBQUEsQ0FBeUI7Q0FWekIsR0FhSSxFQUFKLFFBQUE7Q0FiQSxHQWdCSSxFQUFKLEdBQUE7Q0FoQkEsR0FtQkksQ0FBSixDQUFBLEVBQUE7Q0FuQkEsQ0FxQnlCLENBQXJCLENBQUgsRUFBRCxRQUFBLE9BQUE7Q0F4QkYsSUFFYTs7Q0FGYixFQThCQSxDQUFTLE1BQUEsRUFBQTs7Q0E5QlQsRUFtQ2dCLE1BQUEsS0FBaEI7Q0FFRSxTQUFBLENBQUE7Q0FBQSxFQUFpQixDQUFiLEVBQUosRUFBaUIsQ0FBakIsQ0FBaUI7QUFHakIsQ0FBQSxFQUFBLFFBQVMsMENBQVQ7Q0FDRSxHQUFJLEVBQUosRUFBQSxDQUFjO0NBRGhCLE1BSEE7Q0FBQSxHQU9JLEVBQUosRUFBYSxDQUFiO0NBUEEsQ0FVOEIsQ0FBUixDQUFsQixFQUFKLEdBQWM7Q0FWZCxDQWE2QixDQUFyQixDQUFKLEVBQUosR0FBQSxLQUFBLFdBQUE7Q0FHSyxDQUE2QixFQUE5QixHQUFKLEVBQWMsR0FBZCxDQUFBO0NBckRGLElBbUNnQjs7Q0FuQ2hCLEVBNERjLE1BQUMsR0FBZjtDQUNFLENBQTZCLENBQXJCLENBQUosRUFBSixRQUFBLFVBQUE7Q0FBQSxLQUdBLFFBQUE7Q0FHSyxDQUFrQixFQUFuQixDQUFXLElBQWYsSUFBQTtDQW5FRixJQTREYzs7Q0E1RGQsRUF5RVcsRUFBQSxJQUFYO0NBQ0UsU0FBQSxTQUFBO0NBQUEsRUFBUSxDQUFNLENBQWQsQ0FBQSxDQUFzQjtDQUF0QixFQUNlLENBQU0sQ0FBSixDQUFqQixHQUErQixHQUEvQjtDQURBLENBSTZCLENBQXJCLENBQUosQ0FBSixDQUFBLFFBQUEsR0FBQTtDQUpBLEdBT0ksRUFBSixDQUFZLENBQVosR0FBQTtDQVBBLEdBUUksRUFBSixFQUFBLENBQWMsRUFBZDtDQVJBLElBVUssQ0FBTCxFQUFBO0NBQ2EsT0FBYixJQUFZLENBQVo7Q0FyRkYsSUF5RVc7O0NBekVYLEVBMkZXLE1BQVg7Q0FDRSxJQUFBLEtBQUE7Q0FBQSxFQUFRLEVBQVIsQ0FBQTtDQUFRLENBQ0csRUFBSSxDQUFKLENBQUEsQ0FBVCxDQUFBLENBQVM7Q0FESCxDQUVBLENBQXNCLENBQTVCLEVBQU0sQ0FBWSxDQUFsQjtDQUZGLE9BQUE7QUFNcUIsQ0FBckIsR0FBRyxDQUFLLENBQVIsQ0FBRztDQUVELENBQXdCLENBQWhCLENBQUosQ0FBSixHQUFBLENBQUEsNEVBQUE7Q0FBQSxFQUVnQixFQUFYLEVBQUwsQ0FBQTtRQVZGO0NBQUEsRUFhaUIsQ0FBakIsQ0FBSyxDQUFMLENBQWlCO0NBRWpCLEdBQUEsQ0FBWSxRQUFMO0NBM0dULElBMkZXOztDQTNGWCxFQStHVSxDQUFBLElBQVYsQ0FBVztBQUVNLENBQWYsRUFBZSxDQUFYLENBQTBCLENBQTlCLEVBQVk7Q0FBWixFQUNZLENBQVIsRUFBSjtDQURBLEdBSUksRUFBSixJQUFBO0NBSkEsRUFPUSxDQUFKLEVBQUosR0FBQSxDQUFBO0NBQ0ssRUFBRyxDQUFKLElBQUosRUFBQSxHQUFBO0NBekhGLElBK0dVOztDQS9HVixFQTZIWSxNQUFBLENBQVo7Q0FFTyxFQUFRLENBQVQsQ0FBSixJQUF5QixFQUFaLEVBQWI7Q0FFTyxHQUFELEtBQUosTUFBQTtDQUZXLENBR1gsRUFBSSxHQUhtQjtDQS9IM0IsSUE2SFk7O0NBN0haLEVBc0lZLE1BQUEsQ0FBWjtDQUNTLEdBQWtCLENBQXpCLENBQU0sT0FBTjtDQXZJRixJQXNJWTs7Q0F0SVo7O0NBREY7O0NBQUEsQ0EySUEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxTQUFBLENBQU87Q0FEVCxFQUFPO0NBM0lQIn0=