(function() {
  var $el;

  $el = $('article.content table');

  if ($el.length > 0) {

    /*
      *# Load
     Load depedencies and module for tables
     */
    window.loadCss('/ui/libs/ReStable/jquery.restable.css');
    require(['restable', '/modules/widgets/content/tables.js'], function(restable, tables) {
      var ct;
      return ct = new tables($el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVzLmluaXQuanMiLCJzb3VyY2VzIjpbInRhYmxlcy5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsdUJBQUYsQ0FBTixDQUFBOztBQUVBLEVBQUEsSUFBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQWhCO0FBQ0U7QUFBQTs7O09BQUE7QUFBQSxJQUlBLE1BQU0sQ0FBQyxPQUFQLENBQWUsdUNBQWYsQ0FKQSxDQUFBO0FBQUEsSUFLQSxPQUFBLENBQVEsQ0FBQyxVQUFELEVBQWEsb0NBQWIsQ0FBUixFQUE0RCxTQUFDLFFBQUQsRUFBVyxNQUFYLEdBQUE7QUFDMUQsVUFBQSxFQUFBO2FBQUEsRUFBQSxHQUFTLElBQUEsTUFBQSxDQUFPLEdBQVAsRUFEaUQ7SUFBQSxDQUE1RCxDQUxBLENBREY7R0FGQTtBQUFBIn0=