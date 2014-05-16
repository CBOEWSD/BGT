
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
