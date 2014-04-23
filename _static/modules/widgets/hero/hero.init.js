
/*
   * Hero Widget Init
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
 */

(function() {
  var $el;

  $el = $('.widget-hero');

  if ($el.length > 0) {
    require(['jquery', '/modules/widgets/hero/hero.js'], function($, hero) {
      return $el.each(function() {
        var me;
        return me = new hero($, this, 6000);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5pbml0LmpzIiwic291cmNlcyI6WyJoZXJvLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQVNBLEdBQUEsR0FBTSxDQUFBLENBQUUsY0FBRixDQVROLENBQUE7O0FBWUEsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFFRSxJQUFBLE9BQUEsQ0FBUSxDQUFDLFFBQUQsRUFBVywrQkFBWCxDQUFSLEVBQXFELFNBQUMsQ0FBRCxFQUFJLElBQUosR0FBQTthQUVuRCxHQUFHLENBQUMsSUFBSixDQUFTLFNBQUEsR0FBQTtBQUVQLFlBQUEsRUFBQTtlQUFBLEVBQUEsR0FBUyxJQUFBLElBQUEsQ0FBSyxDQUFMLEVBQVEsSUFBUixFQUFXLElBQVgsRUFGRjtNQUFBLENBQVQsRUFGbUQ7SUFBQSxDQUFyRCxDQUFBLENBRkY7R0FaQTtBQUFBIn0=