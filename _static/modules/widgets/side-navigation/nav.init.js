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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmluaXQuanMiLCJzb3VyY2VzIjpbIm5hdi5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQUFBLENBQUEsZUFBTTs7Q0FHTixDQUFBLENBQU0sQ0FBSCxFQUFBO0NBRUQsQ0FBcUQsQ0FBQSxDQUFyRCxHQUFBLEVBQXNELGdDQUE5QztDQUVOLENBQUEsUUFBQTtDQUFpQixDQUFqQixDQUFTLENBQUEsR0FBQSxNQUFUO0NBRkYsSUFBcUQ7SUFMdkQ7Q0FBQSJ9