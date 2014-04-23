
/*
   * Side Nav Init
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmluaXQuanMiLCJzb3VyY2VzIjpbIm5hdi5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFNQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGtCQUFGLENBTk4sQ0FBQTs7QUFTQSxFQUFBLElBQUcsR0FBRyxDQUFDLE1BQUosR0FBYSxDQUFoQjtBQUVFLElBQUEsT0FBQSxDQUFRLENBQUMseUNBQUQsQ0FBUixFQUFxRCxTQUFDLE9BQUQsR0FBQTtBQUVuRCxVQUFBLEVBQUE7YUFBQSxFQUFBLEdBQVMsSUFBQSxPQUFBLENBQVEsR0FBUixFQUYwQztJQUFBLENBQXJELENBQUEsQ0FGRjtHQVRBO0FBQUEifQ==