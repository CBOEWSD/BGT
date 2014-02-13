(function() {
  var $el;

  $el = $('article.content table');

  if ($el.length > 0) {
    /*
     ## Load
     Load depedencies and module for tables
    */

    window.loadCss('/ui/libs/ReStable/jquery.restable.css');
    require(['restable', '/modules/widgets/content/tables.js'], function(restable, tables) {
      var ct;
      return ct = new tables($el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVzLmluaXQuanMiLCJzb3VyY2VzIjpbInRhYmxlcy5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQUFBLENBQUEsb0JBQU07O0NBRU4sQ0FBQSxDQUFNLENBQUgsRUFBQTtDQUNEOzs7O0NBQUE7Q0FBQSxHQUlBLEVBQU0sQ0FBTixnQ0FBQTtDQUpBLENBS3FCLENBQXVDLENBQTVELEVBQTRELENBQTVELENBQTRELENBQUMsQ0FBckQsMEJBQUE7Q0FDTixDQUFBLFFBQUE7Q0FBZ0IsQ0FBaEIsQ0FBUyxDQUFBLEVBQUEsT0FBVDtDQURGLElBQTREO0lBUjlEO0NBQUEifQ==