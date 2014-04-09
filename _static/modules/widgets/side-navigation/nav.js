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
      PubSub.subscribe('DomChange', self.scrollEvent);
      return $(document).bind('contScroll', self.scrollEvent);
    };

    /*
      ## this.toggleMenu
      Toggles a clicked menu open/closed
    */


    SideNavigation.prototype.toggleMenu = function(e) {
      if (Response.viewportW() > 767) {
        return true;
      }
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
      self.params.marginLeft = self.$el.css('margin-left').replace('px', '');
      self.params.width = $parent.width() - self.params.marginLeft;
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
      var position;
      if (self.params.scrollTop + self.offset > self.params.pTop) {
        position = self.params.scrollTop - self.params.pTop + self.params.height;
        if (self.params.pHeight - self.offset < position) {
          return self.stickyOn(self.params.pTop + self.params.pHeight - self.params.height);
        } else {
          return self.stickyOn();
        }
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
      self.$el.css('position', difference != null ? 'absolute' : 'fixed').css('top', difference != null ? difference : self.offset).css('width', self.params.width);
      return self.$el.next().css('margin-top', self.params.height);
    };

    /*
      ## this.stickOff
      Removes anything applied by `this.stickyOff`.
    */


    SideNavigation.prototype.stickyOff = function() {
      self.$el.css('position', '').css('top', '').css('width', '');
      return self.$el.next().css('margin-top', '');
    };

    return SideNavigation;

  })();

  define(function() {
    return SideNavigation;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlcyI6WyJuYXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsUUFBQTs7Q0FBQSxDQU1NO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUVBOzs7O0NBRkE7O0NBTWEsQ0FBQSxDQUFBLENBQUEsb0JBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBR1csQ0FBWCxDQUFJLEVBQUo7Q0FIQSxDQUFBLENBSWMsQ0FBVixFQUFKO0NBSkEsQ0FBQSxDQUtjLENBQVYsRUFBSjtDQUxBLEVBTXNCLENBQWxCLEVBQUosQ0FBQTtDQU5BLEdBUUksRUFBSjtDQWhCRixJQU1hOztDQVliOzs7O0NBbEJBOztDQUFBLEVBc0JNLENBQU4sS0FBTTtDQUNKLENBQWlDLENBQWQsQ0FBZixFQUFKLElBQW1CLENBQW5CO0NBQUEsQ0FFMEMsRUFBdEMsRUFBSixJQUFBLENBQWdCLE9BQWhCO0NBRkEsQ0FJOEIsRUFBSSxFQUFsQyxHQUFBLEVBQUE7Q0FDQSxDQUErQixFQUEvQixJQUFBLEdBQUEsQ0FBQSxDQUFBO0NBNUJGLElBc0JNOztDQVFOOzs7O0NBOUJBOztDQUFBLEVBa0NZLE1BQUMsQ0FBYjtDQUNFLEVBQXNDLENBQXZCLEVBQWYsRUFBdUIsQ0FBUjtDQUFmLEdBQUEsV0FBTztRQUFQO0NBQUEsS0FDQSxRQUFBO0NBRUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxFQUFBO0NBdENGLElBa0NZOztDQU1aOzs7OztDQXhDQTs7Q0FBQSxFQTZDYSxNQUFDLEVBQWQ7Q0FDRSxFQUFrRCxDQUF2QixFQUEzQixFQUFtQyxDQUFSO0NBQTNCLEdBQVcsS0FBSixNQUFBO1FBQVA7Q0FBQSxHQUNJLEVBQUosR0FBQTtDQUNLLEdBQUQsT0FBSixFQUFBO0NBaERGLElBNkNhOztDQUtiOzs7OztDQWxEQTs7Q0FBQSxFQXVEVyxNQUFYO0NBQ0UsTUFBQSxHQUFBO0NBQUEsRUFBVSxDQUFJLEVBQWQsQ0FBQTtDQUFBLENBQ21FLENBQTFDLENBQXJCLEVBQUosQ0FBeUIsR0FBekIsR0FBeUI7Q0FEekIsRUFFb0IsQ0FBaEIsQ0FBSixDQUFBLENBQTJCLEdBRjNCO0NBQUEsRUFHcUIsQ0FBakIsRUFBSjtDQUhBLEVBSXNCLENBQWxCLEVBQUosQ0FBQTtDQUpBLEVBS21CLENBQWYsRUFBSixDQUEwQjtDQUNyQixFQUFtQixDQUFwQixFQUFPLEVBQWEsQ0FBeEIsSUFBQTtDQTlERixJQXVEVzs7Q0FTWDs7OztDQWhFQTs7Q0FBQSxFQW9FYSxNQUFDLEVBQWQ7Q0FDRSxPQUFBLEVBQUE7Q0FBQSxFQUEyQixDQUF4QixFQUFILEdBQUc7Q0FDRCxFQUFXLENBQUksRUFBTyxFQUF0QixDQUFXO0NBRVgsRUFBeUIsQ0FBdEIsRUFBVyxDQUFYLENBQUg7Q0FDTyxFQUE0QixDQUE3QixFQUFxQixDQUFYLENBQWQsU0FBQTtNQURGLElBQUE7Q0FHTyxHQUFELElBQUosU0FBQTtVQU5KO01BQUEsRUFBQTtDQVFPLEdBQUQsS0FBSixNQUFBO1FBVFM7Q0FwRWIsSUFvRWE7O0NBV2I7Ozs7Ozs7Q0EvRUE7O0NBQUEsRUFzRlUsS0FBVixDQUFXLENBQUQ7Q0FDUixDQUNvQixDQUFwQixDQURJLENBQUosQ0FBQSxDQUFBLEdBQUEsUUFDaUI7Q0FJWixDQUE2QixDQUExQixDQUFKLEVBQXlDLE1BQTdDLENBQUE7Q0E1RkYsSUFzRlU7O0NBUVY7Ozs7Q0E5RkE7O0NBQUEsRUFrR1csTUFBWDtDQUNFLENBQ2lCLENBQWpCLENBREksQ0FBSixDQUFBLENBQUEsR0FBQTtDQUtLLENBQTZCLENBQTFCLENBQUosUUFBSixDQUFBO0NBeEdGLElBa0dXOztDQWxHWDs7Q0FQRjs7Q0FBQSxDQW1IQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU8sR0FBUDtDQURGLEVBQU87Q0FuSFAifQ==