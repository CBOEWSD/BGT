
/*
   * Side Navigation
  The sidebar navigation module will collapse on mobile down to just a expandable title.
  This class will control expansion / collapse of the module on mobile.
 */

(function() {
  var SideNavigation;

  SideNavigation = (function() {
    var self;

    self = {};


    /*
       *# Constructor
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
       *# this.bind
      Binds the top level click/touch event to expand/collapse the menu
     */

    SideNavigation.prototype.bind = function() {
      self.$topAnchors = $('>ul>li>a', self.$el);
      self.$topAnchors.bind('click touchstart', self.toggleMenu);
      PubSub.subscribe('DomChange', self.scrollEvent);
      return $(document).bind('contScroll', self.scrollEvent);
    };


    /*
       *# this.toggleMenu
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
       *# this.scrollEvent
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
       *# this.getParams
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
       *# this.checkSticky
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
       *# this.stickyOn
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
       *# this.stickOff
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlcyI6WyJuYXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFNTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxFQUFQLENBQUE7O0FBRUE7QUFBQTs7O09BRkE7O0FBTWEsSUFBQSx3QkFBQyxFQUFELEdBQUE7QUFFWCxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxHQUFMLEdBQVcsQ0FBQSxDQUFFLEVBQUYsQ0FIWCxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsTUFBTCxHQUFjLEVBSmQsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLE1BQUwsR0FBYyxFQUxkLENBQUE7QUFBQSxNQU1BLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixHQUFzQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQVQsQ0FBQSxDQUFpQixDQUFDLEdBTnhDLENBQUE7QUFBQSxNQVFBLElBQUksQ0FBQyxJQUFMLENBQUEsQ0FSQSxDQUZXO0lBQUEsQ0FOYjs7QUFrQkE7QUFBQTs7O09BbEJBOztBQUFBLDZCQXNCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osTUFBQSxJQUFJLENBQUMsV0FBTCxHQUFtQixDQUFBLENBQUUsVUFBRixFQUFjLElBQUksQ0FBQyxHQUFuQixDQUFuQixDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQWpCLENBQXNCLGtCQUF0QixFQUEwQyxJQUFJLENBQUMsVUFBL0MsQ0FGQSxDQUFBO0FBQUEsTUFJQSxNQUFNLENBQUMsU0FBUCxDQUFpQixXQUFqQixFQUE4QixJQUFJLENBQUMsV0FBbkMsQ0FKQSxDQUFBO2FBS0EsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLElBQVosQ0FBaUIsWUFBakIsRUFBK0IsSUFBSSxDQUFDLFdBQXBDLEVBTkk7SUFBQSxDQXRCTixDQUFB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