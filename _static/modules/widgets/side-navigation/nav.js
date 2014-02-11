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
      self.bind();
    }

    /*
      ## this.bind
      Binds the top level click/touch event to expand/collapse the menu
    */


    SideNavigation.prototype.bind = function() {
      self.$topAnchors = $('>ul>li>a', self.$el);
      return self.$topAnchors.bind('click touchstart', self.toggleMenu);
    };

    /*
      ## this.toggleMenu
      Toggles a clicked menu open/closed
    */


    SideNavigation.prototype.toggleMenu = function(e) {
      e.preventDefault();
      return $(this).parent('li').toggleClass('expanded');
    };

    return SideNavigation;

  })();

  define(function() {
    return SideNavigation;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlcyI6WyJuYXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsUUFBQTs7Q0FBQSxDQU1NO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUVBOzs7O0NBRkE7O0NBTWEsQ0FBQSxDQUFBLENBQUEsb0JBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBR1csQ0FBWCxDQUFJLEVBQUo7Q0FIQSxHQUtJLEVBQUo7Q0FiRixJQU1hOztDQVNiOzs7O0NBZkE7O0NBQUEsRUFtQk0sQ0FBTixLQUFNO0NBQ0osQ0FBaUMsQ0FBZCxDQUFmLEVBQUosSUFBbUIsQ0FBbkI7Q0FFSyxDQUFxQyxFQUF0QyxNQUFKLENBQWdCLEVBQWhCLEtBQUE7Q0F0QkYsSUFtQk07O0NBS047Ozs7Q0F4QkE7O0NBQUEsRUE0QlksTUFBQyxDQUFiO0NBQ0UsS0FBQSxRQUFBO0NBRUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxFQUFBO0NBL0JGLElBNEJZOztDQTVCWjs7Q0FQRjs7Q0FBQSxDQTBDQSxDQUFPLEdBQVAsR0FBTztDQUNMLFVBQU8sR0FBUDtDQURGLEVBQU87Q0ExQ1AifQ==