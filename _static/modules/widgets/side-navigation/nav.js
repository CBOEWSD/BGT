/*
  # Side Navigation
  The sidebar navigation module will collapse on mobile down to just a expandable title.
  This class will control expansion / collapse of the module on mobile.
*/


(function() {
  var SideNavigation;

  SideNavigation = (function() {
    var self;

    self = {};

    /*
      ## Constructor
      Called on initializing (new)
    */


    function SideNavigation(el) {
      self = this;
      self.$el = $(el);
      self.offset = 50;
      self.params = {};
      self.params.fromTop = self.$el.offset().top;
      self.bind();
    }

    /*
      ## this.bind
      Binds the top level click/touch event to expand/collapse the menu
    */


    SideNavigation.prototype.bind = function() {
      self.$topAnchors = $('>ul>li>a', self.$el);
      self.$topAnchors.bind('click touchstart', self.toggleMenu);
      $(document).scroll(self.scrollEvent);
      return PubSub.subscribe('DomChange', self.scrollEvent);
    };

    /*
      ## this.toggleMenu
      Toggles a clicked menu open/closed
    */


    SideNavigation.prototype.toggleMenu = function(e) {
      e.preventDefault();
      return $(this).parent('li').toggleClass('expanded');
    };

    /*
      ## this.scrollEvent
      Fired on document scroll. We will prevent any further action on
      mobile viewports as this feature is not required.
    */


    SideNavigation.prototype.scrollEvent = function(e) {
      if (Response.viewportW() < 768) {
        return self.stickyOff();
      }
      self.getParams();
      return self.checkSticky(e);
    };

    /*
      ## this.getParams
      This method will fetch all required information needed
      to calculate if and how the element should be set.
    */


    SideNavigation.prototype.getParams = function() {
      var $parent;
      $parent = self.$el.parent();
      self.params.width = $parent.width();
      self.params.height = self.$el.height();
      self.params.pHeight = $parent.height();
      self.params.pTop = $parent.offset().top;
      return self.params.scrollTop = $(document).scrollTop();
    };

    /*
      ## this.checkSticky
      Check if element should be set to sticky or not
    */


    SideNavigation.prototype.checkSticky = function(e) {
      var difference, position;
      if (self.params.scrollTop + self.offset > self.params.pTop) {
        position = self.params.scrollTop - self.params.pTop + self.params.height;
        if (self.params.pHeight - self.offset < position) {
          difference = self.params.pHeight - position;
        }
        return self.stickyOn(difference);
      } else {
        return self.stickyOff();
      }
    };

    /*
      ## this.stickyOn
      In the event that `this.checkSticky` passes to stickyOn
      the element will be fixed using params from `this.getParams`.
      If the difference variable is set we will apply that as the top
      attribute; preventing the element moving outside of the column.
    */


    SideNavigation.prototype.stickyOn = function(difference) {
      return self.$el.css('position', 'fixed').css('top', difference != null ? difference : self.offset).css('width', self.params.width);
    };

    /*
      ## this.stickOff
      Removes anything applied by `this.stickyOff`.
    */


    SideNavigation.prototype.stickyOff = function() {
      return self.$el.css('position', '').css('top', '').css('width', '');
    };

    return SideNavigation;

  })();

  define(function() {
    return SideNavigation;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlcyI6WyJuYXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsUUFBQTs7Q0FBQSxDQU1NO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUVBOzs7O0NBRkE7O0NBTWEsQ0FBQSxDQUFBLENBQUEsb0JBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBR1csQ0FBWCxDQUFJLEVBQUo7Q0FIQSxDQUFBLENBSWMsQ0FBVixFQUFKO0NBSkEsQ0FBQSxDQUtjLENBQVYsRUFBSjtDQUxBLEVBTXNCLENBQWxCLEVBQUosQ0FBQTtDQU5BLEdBUUksRUFBSjtDQWhCRixJQU1hOztDQVliOzs7O0NBbEJBOztDQUFBLEVBc0JNLENBQU4sS0FBTTtDQUNKLENBQWlDLENBQWQsQ0FBZixFQUFKLElBQW1CLENBQW5CO0NBQUEsQ0FFMEMsRUFBdEMsRUFBSixJQUFBLENBQWdCLE9BQWhCO0NBRkEsR0FJdUIsRUFBdkIsRUFBQSxHQUFBO0NBQ08sQ0FBdUIsRUFBSSxFQUE1QixHQUFOLEVBQUEsRUFBQTtDQTVCRixJQXNCTTs7Q0FRTjs7OztDQTlCQTs7Q0FBQSxFQWtDWSxNQUFDLENBQWI7Q0FDRSxLQUFBLFFBQUE7Q0FFQSxHQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUE7Q0FyQ0YsSUFrQ1k7O0NBS1o7Ozs7O0NBdkNBOztDQUFBLEVBNENhLE1BQUMsRUFBZDtDQUNFLEVBQWtELENBQXZCLEVBQTNCLEVBQW1DLENBQVI7Q0FBM0IsR0FBVyxLQUFKLE1BQUE7UUFBUDtDQUFBLEdBQ0ksRUFBSixHQUFBO0NBQ0ssR0FBRCxPQUFKLEVBQUE7Q0EvQ0YsSUE0Q2E7O0NBS2I7Ozs7O0NBakRBOztDQUFBLEVBc0RXLE1BQVg7Q0FDRSxNQUFBLEdBQUE7Q0FBQSxFQUFVLENBQUksRUFBZCxDQUFBO0NBQUEsRUFDb0IsQ0FBaEIsQ0FBSixDQUFBLENBQTJCO0NBRDNCLEVBRXFCLENBQWpCLEVBQUo7Q0FGQSxFQUdzQixDQUFsQixFQUFKLENBQUE7Q0FIQSxFQUltQixDQUFmLEVBQUosQ0FBMEI7Q0FDckIsRUFBbUIsQ0FBcEIsRUFBTyxFQUFhLENBQXhCLElBQUE7Q0E1REYsSUFzRFc7O0NBUVg7Ozs7Q0E5REE7O0NBQUEsRUFrRWEsTUFBQyxFQUFkO0NBQ0UsU0FBQSxVQUFBO0NBQUEsRUFBMkIsQ0FBeEIsRUFBSCxHQUFHO0NBQ0QsRUFBVyxDQUFJLEVBQU8sRUFBdEIsQ0FBVztDQUVYLEVBQXlCLENBQXRCLEVBQVcsQ0FBWCxDQUFIO0NBQ0UsRUFBYSxDQUFJLEVBQU8sQ0FBWCxDQUFiLEVBQUE7VUFIRjtDQUtLLEdBQUQsSUFBSixFQUFBLEtBQUE7TUFORixFQUFBO0NBUU8sR0FBRCxLQUFKLE1BQUE7UUFUUztDQWxFYixJQWtFYTs7Q0FXYjs7Ozs7OztDQTdFQTs7Q0FBQSxFQW9GVSxLQUFWLENBQVcsQ0FBRDtDQUNILENBQ1ksQ0FBakIsQ0FESSxDQUFKLENBQUEsQ0FBQSxHQUFBLEdBQUEsS0FFWTtDQXZGZCxJQW9GVTs7Q0FNVjs7OztDQTFGQTs7Q0FBQSxFQThGVyxNQUFYO0NBQ08sQ0FDWSxDQUFqQixDQURJLENBQUosRUFBQSxHQUFBLEdBQUE7Q0EvRkYsSUE4Rlc7O0NBOUZYOztDQVBGOztDQUFBLENBNkdBLENBQU8sR0FBUCxHQUFPO0NBQ0wsVUFBTyxHQUFQO0NBREYsRUFBTztDQTdHUCJ9