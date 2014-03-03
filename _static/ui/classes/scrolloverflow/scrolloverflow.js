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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuanMiLCJzb3VyY2VzIjpbInNjcm9sbG92ZXJmbG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLFFBQUE7O0NBQUEsQ0FTTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBSSxDQUFKLENBQUEsT0FBQSxhQUFDO0NBRVosQ0FBeUIsQ0FBckIsQ0FBSCxFQUFELFFBQUE7Q0FBQSxFQUdPLENBQVAsRUFBQTtDQUhBLEVBTUEsQ0FBSSxFQUFKO0NBTkEsRUFPZSxDQUFYLENBUEosQ0FPQSxDQUFBO0NBUEEsRUFRYSxDQUFULENBQUosQ0FBQSxLQVJBO0NBQUEsRUFTYyxDQUFWLENBVEosQ0FTQTtDQVRBLEdBWUMsRUFBRDtDQVpBLEdBZUMsRUFBRCxHQUFBO0NBZkEsR0FnQkMsRUFBRDtDQXZCRixJQUthOztDQW9CYjs7Ozs7O0NBekJBOztDQUFBLEVBK0JBLENBQVMsTUFBQSxNQUFBOztDQUVUOzs7O0NBakNBOztDQUFBLEVBcUNRLEdBQVIsR0FBUTtDQUNOLEdBQWdCLEVBQWhCO0NBQUEsSUFBQSxVQUFPO1FBQVA7Q0FBQSxFQUdjLENBQVYsRUFBSjtDQUdLLEVBQUcsQ0FBSixLQUFVLElBQWQ7Q0FDRSxXQUFBLEVBQUE7Q0FBQSxFQUFRLENBQUEsQ0FBUixHQUFBO0NBQUEsQ0FDc0MsQ0FBNUIsRUFBQSxFQUFWLENBQUEsZ0JBQVU7Q0FEVixJQUdLLEdBQUwsQ0FBQSxzQkFBQTtDQUhBLE1BSU8sQ0FBUCxLQUFBO0NBSkEsTUFLTyxDQUFQLEVBQUE7Q0FMQSxDQVE2QixDQUFyQixDQUFKLENBQUosR0FBQSxNQUFBLFNBQUE7Q0FFQSxDQUFxQixHQUFyQixVQUFBLEVBQUEsS0FBQTtDQVhGLE1BQWM7Q0E1Q2hCLElBcUNROztDQW9CUjs7OztDQXpEQTs7Q0FBQSxFQTZEUyxJQUFULEVBQVM7QUFDVSxDQUFqQixHQUFnQixFQUFoQjtDQUFBLElBQUEsVUFBTztRQUFQO0NBQUEsRUFHYyxDQUFWLENBSEosQ0FHQTtDQUdLLEVBQUcsQ0FBSixLQUFVLElBQWQ7Q0FDRSxXQUFBLFNBQUE7Q0FBQSxFQUFRLENBQUEsQ0FBUixHQUFBO0NBQUEsQ0FDc0MsQ0FBNUIsRUFBQSxFQUFWLENBQUEsZ0JBQVU7Q0FEVixDQUU2QixDQUFyQixFQUFSLEdBQUEsU0FBUTtDQUZSLElBSUssR0FBTCxDQUFBLGFBQUE7Q0FKQSxDQU82QixDQUFyQixDQUFKLENBQUosR0FBQSxNQUFBLFVBQUE7Q0FFQSxFQUFrQixDQUFmLENBQUssQ0FBTCxFQUFIO0NBQ0UsS0FBQSxDQUFPLEdBQVA7Q0FBQSxJQUNLLEtBQUwsQ0FBQSxLQUFBO0NBREEsQ0FFc0IsQ0FBdEIsSUFBTyxDQUFQLEVBQUE7Q0FGQSxDQUcwQixDQUExQixJQUFPLEdBQVAsRUFBQTtVQWJGO0NBQUEsTUFlTyxDQUFQLEdBQUEsRUFBQTtDQUNRLE1BQUQsR0FBUCxDQUFBLElBQUE7Q0FqQkYsTUFBYztDQXBFaEIsSUE2RFM7O0NBMEJUOzs7Ozs7Q0F2RkE7O0NBQUEsRUE2RlcsTUFBWDtDQUNPLEVBQUcsQ0FBSixLQUFVLElBQWQ7Q0FDRSxXQUFBLHVCQUFBO0NBQUEsRUFBUSxDQUFBLENBQVIsR0FBQTtDQUFBLENBQytCLENBQXJCLEVBQUEsRUFBVixDQUFBLFNBQVU7Q0FEVixDQU02QixDQUFyQixDQUFKLENBQUosR0FBQSxNQUFBLGVBQUE7Q0FOQSxNQVNPLENBQVAsR0FBQTtDQVRBLEVBWVksRUFBSyxDQUFMLEVBQVosQ0FBQTtDQVpBLEVBYVcsRUFBSyxHQUFoQjtDQUdBLEdBQUcsQ0FBYSxHQUFoQixDQUFHO0NBQ0QsQ0FBQSxDQUFZLE1BQVosQ0FBQTtVQWpCRjtDQUFBLEtBb0JBLENBQU8sQ0FBUCxDQUFBO0NBcEJBLElBcUJBLEVBQU8sQ0FBUDtDQXJCQSxNQXNCTyxDQUFQO0NBQ1EsTUFBRCxNQUFQLEVBQUEsT0FBQTtDQXhCRixNQUFjO0NBOUZoQixJQTZGVzs7Q0EyQlg7Ozs7O0NBeEhBOztDQUFBLEVBNkhRLEdBQVIsR0FBUTtDQUNOLENBQThCLEVBQUksRUFBbEMsR0FBQSxFQUFBO0NBQUEsQ0FDaUMsRUFBSSxFQUFyQyxHQUFBLEVBQUEsR0FBQTtDQURBLENBSTZCLENBQXJCLENBQUosRUFBSixRQUFBLDJDQUFBO0NBRUE7Ozs7O0NBTkE7Q0FBQSxFQVdZLEdBQVosR0FBWSxFQUFaO0NBQ0UsR0FBRyxHQUFILENBQUE7Q0FDRSxHQUFJLEtBQUosQ0FBQTtDQUNLLEVBQVUsQ0FBWCxHQUFKLFVBQUE7VUFIUTtDQUFaLENBSUUsRUFKRixHQUFZO0NBT0wsQ0FBb0IsQ0FBQSxHQUFyQixFQUFOLENBQUEsSUFBQTtDQUdFLEdBQUcsQ0FBSCxHQUFBLENBQUc7Q0FDSSxHQUFELEdBQUosVUFBQTtNQURGLElBQUE7Q0FHTyxHQUFELEVBQUosV0FBQTtVQU51QjtDQUEzQixNQUEyQjtDQWhKN0IsSUE2SFE7O0NBMkJSOzs7OztDQXhKQTs7Q0FBQSxFQTZKYSxNQUFDLEVBQWQ7Q0FDTyxFQUFVLENBQVgsR0FBSixNQUFBO0NBOUpGLElBNkphOztDQTdKYjs7Q0FWRjs7Q0FBQSxDQTJLQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU8sR0FBUDtDQURGLEVBQU87Q0EzS1AifQ==