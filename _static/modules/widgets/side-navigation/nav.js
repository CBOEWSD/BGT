(function() {
  var SideNavigation;

  SideNavigation = (function() {
    var self;

    self = {};

    function SideNavigation(el) {
      self = this;
      self.$el = $(el);
      self.bind();
    }

    SideNavigation.prototype.bind = function() {
      self.$topAnchors = $('>ul>li>a', self.$el);
      return self.$topAnchors.bind('click touchstart', self.toggleMenu);
    };

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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlcyI6WyJuYXYuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0NBQUEsS0FBQSxRQUFBOztDQUFBLENBQU07Q0FDSixHQUFBLElBQUE7O0NBQUEsQ0FBQSxDQUFPLENBQVA7O0NBSWEsQ0FBQSxDQUFBLENBQUEsb0JBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBR1csQ0FBWCxDQUFJLEVBQUo7Q0FIQSxHQUtJLEVBQUo7Q0FYRixJQUlhOztDQUpiLEVBZU0sQ0FBTixLQUFNO0NBQ0osQ0FBaUMsQ0FBZCxDQUFmLEVBQUosSUFBbUIsQ0FBbkI7Q0FFSyxDQUFxQyxFQUF0QyxNQUFKLENBQWdCLEVBQWhCLEtBQUE7Q0FsQkYsSUFlTTs7Q0FmTixFQXNCWSxNQUFDLENBQWI7Q0FDRSxLQUFBLFFBQUE7Q0FFQSxHQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUE7Q0F6QkYsSUFzQlk7O0NBdEJaOztDQURGOztDQUFBLENBOEJBLENBQU8sR0FBUCxHQUFPO0NBQ0wsVUFBTyxHQUFQO0NBREYsRUFBTztDQTlCUCJ9