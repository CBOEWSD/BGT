/*
  # ScrollOverflow Class
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
      ## Constructor
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
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` self.log.add 'notification', 'message...', @ ```
    */


    ScrollOverflow.prototype.log = new LogHandler('ScrollOverflow');

    /*
      ## `this.addTSE`
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
        if ($inside.length < 1) {
          $this.wrapInner($('<div class="scrolloverflow-inside" />'));
          $inside = $('.scrolloverflow-inside', $this);
        }
        $this.wrapInner('<div class="tse-scrollable"/>');
        $inside.addClass('tse-content');
        $inside.addClass('vertical');
        self.log.add('notification', 'addTSE method called.', $this);
        return $('.tse-scrollable', $this).TrackpadScrollEmulator();
      });
    };

    /*
      ## `this.destroy`
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
      ## `this.setHeight`
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
      ## `this.bindUp`
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
      ## `this.changeEvent`
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
