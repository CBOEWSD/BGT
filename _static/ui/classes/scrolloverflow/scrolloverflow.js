
/*
   * ScrollOverflow Class
  Alows for content to be placed within another block of a certain height
  and not overflow or push content but instead add a scrollbar.
  This code will poll for DOM changes and adjust the element if so.
  Note: we do not adjust immediately, we are polling each change but
  we will only execute an adjustment every second if needed.
 */

(function() {
  var ScrollOverflow;

  ScrollOverflow = (function() {
    var self;

    self = {};


    /*
       *# Constructor
     */

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


    /*
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` self.log.add 'notification', 'message...', @ ```
     */

    ScrollOverflow.prototype.log = new LogHandler('ScrollOverflow');


    /*
       *# `this.addTSE`
      Add TSE related classes and init
     */

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


    /*
       *# `this.destroy`
      Removes all bindings and setup, this allows for collapse to mobile.
     */

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


    /*
       *# `this.setHeight`
      For each instance of the class we will detect the
      height without the inner content and adjust the inner
      content element appropriately.
     */

    ScrollOverflow.prototype.setHeight = function() {
      return self.$el.each(function() {
        var $inside, $this, newHeight, newWidth;
        $this = $(this);
        $inside = $('.tse-scrollable', $this);
        self.log.add('notification', 'setHeight method called on.', $this);
        $inside.removeClass('shown');
        newHeight = $this.height();
        newWidth = $this.width();
        if (newHeight === 0) {
          newHeight = '';
        }
        $inside.height(newHeight);
        $inside.width(newWidth);
        $inside.addClass('shown');
        return $inside.TrackpadScrollEmulator('recalculate');
      });
    };


    /*
       *# `this.bindUp`
      We set a listen for the DOM change event and also start our interval
      checking for if a DOM event has changed something in the last second.
     */

    ScrollOverflow.prototype.bindUp = function() {
      PubSub.subscribe('DomChange', self.changeEvent);
      PubSub.subscribe('GlobalScroll', self.changeEvent);
      self.log.add('notification', 'bindUp method called, listening for DOMSubtreeModified.', 'body');

      /*
        This interval prevents us from firing multiple instances of
        `this.setHeight` in quick succession. We will only ever fire
        once in any given second if at all.
       */
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


    /*
       *# `this.changeEvent`
      Set `this.shouldI` to `true` for the next interval check
      to adjust the element heights.
     */

    ScrollOverflow.prototype.changeEvent = function(e) {
      return self.shouldI = true;
    };

    return ScrollOverflow;

  })();

  define(function() {
    return ScrollOverflow;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuanMiLCJzb3VyY2VzIjpbInNjcm9sbG92ZXJmbG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBU007QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSx3QkFBQyxDQUFELEVBQUksR0FBSixFQUFTLFdBQVQsR0FBQTtBQUVYLE1BQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxHQUFMLENBQVMsY0FBVCxFQUF5QixjQUF6QixFQUF5QyxJQUF6QyxDQUFBLENBQUE7QUFBQSxNQUdBLElBQUEsR0FBTyxJQUhQLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxHQUFMLEdBQVcsR0FOWCxDQUFBO0FBQUEsTUFPQSxJQUFJLENBQUMsT0FBTCxHQUFlLEtBUGYsQ0FBQTtBQUFBLE1BUUEsSUFBSSxDQUFDLEtBQUwsR0FBYSxXQVJiLENBQUE7QUFBQSxNQVNBLElBQUksQ0FBQyxNQUFMLEdBQWMsS0FUZCxDQUFBO0FBQUEsTUFZQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBWkEsQ0FBQTtBQUFBLE1BZUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQWZBLENBQUE7QUFBQSxNQWdCQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBaEJBLENBRlc7SUFBQSxDQUxiOztBQXlCQTtBQUFBOzs7OztPQXpCQTs7QUFBQSw2QkErQkEsR0FBQSxHQUFTLElBQUEsVUFBQSxDQUFXLGdCQUFYLENBL0JULENBQUE7O0FBaUNBO0FBQUE7OztPQWpDQTs7QUFBQSw2QkFxQ0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBZ0IsSUFBSSxDQUFDLE1BQXJCO0FBQUEsZUFBTyxLQUFQLENBQUE7T0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLE1BQUwsR0FBYyxJQUhkLENBQUE7YUFNQSxJ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