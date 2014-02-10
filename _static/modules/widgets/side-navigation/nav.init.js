/*
  # Side Nav Init
  Calls in dependencies if side navigation module exists on page.
*/


(function() {
  var $el;

  $el = $('.side-navigation');

  if ($el.length > 0) {
    require(['/modules/widgets/side-navigation/nav.js'], function(sideNav) {
      var me;
      return me = new sideNav($el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmluaXQuanMiLCJzb3VyY2VzIjpbIm5hdi5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQU1BLENBQUEsZUFBTTs7Q0FHTixDQUFBLENBQU0sQ0FBSCxFQUFBO0NBRUQsQ0FBcUQsQ0FBQSxDQUFyRCxHQUFBLEVBQXNELGdDQUE5QztDQUVOLENBQUEsUUFBQTtDQUFpQixDQUFqQixDQUFTLENBQUEsR0FBQSxNQUFUO0NBRkYsSUFBcUQ7SUFYdkQ7Q0FBQSJ9