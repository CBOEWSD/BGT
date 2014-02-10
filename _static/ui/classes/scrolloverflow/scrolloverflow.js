(function() {
  var ScrollOverflow;

  ScrollOverflow = (function() {
    var self;

    self = {};

    function ScrollOverflow($, $el, minviewport) {
      this.log.add('notification', 'Constructed.', this);
      self = this;
      self.$el = $el;
      self.shouldI = false;
      self.minvp = minviewport;
      self.active = false;
      this.addTSE();
      this.setHeight();
      this.bindUp();
    }

    ScrollOverflow.prototype.log = new LogHandler('ScrollOverflow');

    ScrollOverflow.prototype.addTSE = function() {
      if (self.active) {
        return false;
      }
      self.active = true;
      return self.$el.each(function() {
        var $inside, $this;
        $this = $(this);
        $inside = $('.scrolloverflow-inside', $this);
        $this.wrapInner('<div class="tse-scrollable"/>');
        $inside.addClass('tse-content');
        $inside.addClass('vertical');
        self.log.add('notification', 'addTSE method called.', $this);
        return $('.tse-scrollable', $this).TrackpadScrollEmulator();
      });
    };

    ScrollOverflow.prototype.destroy = function() {
      if (!self.active) {
        return false;
      }
      self.active = false;
      return self.$el.each(function() {
        var $inside, $this, $wrap;
        $this = $(this);
        $inside = $('.scrolloverflow-inside', $this);
        $wrap = $('.tse-scrollable', $this);
        $wrap.TrackpadScrollEmulator('destroy');
        self.log.add('notification', 'destroy method called.', $this);
        if ($wrap.length > 0) {
          $inside.unwrap();
          $wrap.removeClass('tse-scrollable');
          $inside.css('height', '');
          $inside.css('overflow-y', '');
        }
        $inside.removeClass('tse-content');
        return $inside.removeClass('vertical');
      });
    };

    ScrollOverflow.prototype.setHeight = function() {
      return self.$el.each(function() {
        var $inside, $paddingHoriz, $paddingVert, $this, newHeight, newWidth;
        $this = $(this);
        $inside = $('.tse-scrollable', $this);
        self.log.add('notification', 'setHeight method called on.', $this);
        $inside.removeClass('shown');
        $paddingVert = parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'));
        newHeight = $this.innerHeight() - $paddingVert;
        $paddingHoriz = parseInt($this.css('padding-right')) + parseInt($this.css('padding-left'));
        newWidth = $this.innerWidth() - $paddingHoriz;
        if (newHeight === 0) {
          newHeight = '';
        }
        $inside.height(newHeight);
        $inside.width(newWidth);
        $inside.addClass('shown');
        return $inside.TrackpadScrollEmulator('recalculate');
      });
    };

    ScrollOverflow.prototype.bindUp = function() {
      $('body').bind('DOMSubtreeModified', self.changeEvent);
      self.log.add('notification', 'bindUp method called, listening for DOMSubtreeModified.', 'body');
      setInterval(function() {
        if (self.shouldI) {
          self.setHeight();
          return self.shouldI = false;
        }
      }, 3000);
      return PubSub.subscribe('resize', function() {
        if (Response.viewportW() <= self.minvp) {
          return self.destroy();
        } else {
          return self.addTSE();
        }
      });
    };

    ScrollOverflow.prototype.changeEvent = function(e) {
      return self.shouldI = true;
    };

    return ScrollOverflow;

  })();

  define(function() {
    return ScrollOverflow;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuanMiLCJzb3VyY2VzIjpbInNjcm9sbG92ZXJmbG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTtDQUFBLEtBQUEsUUFBQTs7Q0FBQSxDQUFNO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUdhLENBQUksQ0FBSixDQUFBLE9BQUEsYUFBQztDQUVaLENBQXlCLENBQXJCLENBQUgsRUFBRCxRQUFBO0NBQUEsRUFHTyxDQUFQLEVBQUE7Q0FIQSxFQU1BLENBQUksRUFBSjtDQU5BLEVBT2UsQ0FBWCxDQVBKLENBT0EsQ0FBQTtDQVBBLEVBUWEsQ0FBVCxDQUFKLENBQUEsS0FSQTtDQUFBLEVBU2MsQ0FBVixDQVRKLENBU0E7Q0FUQSxHQVlDLEVBQUQ7Q0FaQSxHQWVDLEVBQUQsR0FBQTtDQWZBLEdBZ0JDLEVBQUQ7Q0FyQkYsSUFHYTs7Q0FIYixFQTJCQSxDQUFTLE1BQUEsTUFBQTs7Q0EzQlQsRUErQlEsR0FBUixHQUFRO0NBQ04sR0FBZ0IsRUFBaEI7Q0FBQSxJQUFBLFVBQU87UUFBUDtDQUFBLEVBR2MsQ0FBVixFQUFKO0NBR0ssRUFBRyxDQUFKLEtBQVUsSUFBZDtDQUNFLFdBQUEsRUFBQTtDQUFBLEVBQVEsQ0FBQSxDQUFSLEdBQUE7Q0FBQSxDQUNzQyxDQUE1QixFQUFBLEVBQVYsQ0FBQSxnQkFBVTtDQURWLElBR0ssR0FBTCxDQUFBLHNCQUFBO0NBSEEsTUFJTyxDQUFQLEtBQUE7Q0FKQSxNQUtPLENBQVAsRUFBQTtDQUxBLENBUTZCLENBQXJCLENBQUosQ0FBSixHQUFBLE1BQUEsU0FBQTtDQUVBLENBQXFCLEdBQXJCLFVBQUEsRUFBQSxLQUFBO0NBWEYsTUFBYztDQXRDaEIsSUErQlE7O0NBL0JSLEVBcURTLElBQVQsRUFBUztBQUNVLENBQWpCLEdBQWdCLEVBQWhCO0NBQUEsSUFBQSxVQUFPO1FBQVA7Q0FBQSxFQUdjLENBQVYsQ0FISixDQUdBO0NBR0ssRUFBRyxDQUFKLEtBQVUsSUFBZDtDQUNFLFdBQUEsU0FBQTtDQUFBLEVBQVEsQ0FBQSxDQUFSLEdBQUE7Q0FBQSxDQUNzQyxDQUE1QixFQUFBLEVBQVYsQ0FBQSxnQkFBVTtDQURWLENBRTZCLENBQXJCLEVBQVIsR0FBQSxTQUFRO0NBRlIsSUFJSyxHQUFMLENBQUEsYUFBQTtDQUpBLENBTzZCLENBQXJCLENBQUosQ0FBSixHQUFBLE1BQUEsVUFBQTtDQUVBLEVBQWtCLENBQWYsQ0FBSyxDQUFMLEVBQUg7Q0FDRSxLQUFBLENBQU8sR0FBUDtDQUFBLElBQ0ssS0FBTCxDQUFBLEtBQUE7Q0FEQSxDQUVzQixDQUF0QixJQUFPLENBQVAsRUFBQTtDQUZBLENBRzBCLENBQTFCLElBQU8sR0FBUCxFQUFBO1VBYkY7Q0FBQSxNQWVPLENBQVAsR0FBQSxFQUFBO0NBQ1EsTUFBRCxHQUFQLENBQUEsSUFBQTtDQWpCRixNQUFjO0NBNURoQixJQXFEUzs7Q0FyRFQsRUFrRlcsTUFBWDtDQUNPLEVBQUcsQ0FBSixLQUFVLElBQWQ7Q0FDRSxXQUFBLG9EQUFBO0NBQUEsRUFBUSxDQUFBLENBQVIsR0FBQTtDQUFBLENBQytCLENBQXJCLEVBQUEsRUFBVixDQUFBLFNBQVU7Q0FEVixDQU02QixDQUFyQixDQUFKLENBQUosR0FBQSxNQUFBLGVBQUE7Q0FOQSxNQVNPLENBQVAsR0FBQTtDQVRBLEVBWWUsRUFBYyxHQUE3QixJQUFBLENBQXdCLEdBQXFDO0NBWjdELEVBYVksRUFBSyxHQUFqQixDQUFBLEVBQVksQ0FiWjtDQUFBLEVBY2dCLEVBQWMsR0FBOUIsS0FBQSxDQUFnRSxDQUF2QztDQWR6QixFQWVXLEVBQUssR0FBaEIsRUFBVyxHQWZYO0NBa0JBLEdBQUcsQ0FBYSxHQUFoQixDQUFHO0NBQ0QsQ0FBQSxDQUFZLE1BQVosQ0FBQTtVQW5CRjtDQUFBLEtBc0JBLENBQU8sQ0FBUCxDQUFBO0NBdEJBLElBdUJBLEVBQU8sQ0FBUDtDQXZCQSxNQXdCTyxDQUFQO0NBQ1EsTUFBRCxNQUFQLEVBQUEsT0FBQTtDQTFCRixNQUFjO0NBbkZoQixJQWtGVzs7Q0FsRlgsRUFrSFEsR0FBUixHQUFRO0NBQ04sQ0FBcUMsRUFBckMsRUFBQSxLQUFBLFNBQUE7Q0FBQSxDQUc2QixDQUFyQixDQUFKLEVBQUosUUFBQSwyQ0FBQTtDQUhBLEVBUVksR0FBWixHQUFZLEVBQVo7Q0FDRSxHQUFHLEdBQUgsQ0FBQTtDQUNFLEdBQUksS0FBSixDQUFBO0NBQ0ssRUFBVSxDQUFYLEdBQUosVUFBQTtVQUhRO0NBQVosQ0FJRSxFQUpGLEdBQVk7Q0FPTCxDQUFvQixDQUFBLEdBQXJCLEVBQU4sQ0FBQSxJQUFBO0NBR0UsR0FBRyxDQUFILEdBQUEsQ0FBRztDQUNJLEdBQUQsR0FBSixVQUFBO01BREYsSUFBQTtDQUdPLEdBQUQsRUFBSixXQUFBO1VBTnVCO0NBQTNCLE1BQTJCO0NBbEk3QixJQWtIUTs7Q0FsSFIsRUE2SWEsTUFBQyxFQUFkO0NBQ08sRUFBVSxDQUFYLEdBQUosTUFBQTtDQTlJRixJQTZJYTs7Q0E3SWI7O0NBREY7O0NBQUEsQ0FrSkEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxVQUFPLEdBQVA7Q0FERixFQUFPO0NBbEpQIn0=