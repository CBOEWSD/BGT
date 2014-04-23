
/*
   * Filter widget init
 */

(function() {
  var $el;

  $el = $('.filter');

  if ($el.length > 0) {
    require(['/modules/widgets/sidebar/filter/filter.js'], function(filter) {
      return new filter($el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImZpbHRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQU1BLEdBQUEsR0FBTSxDQUFBLENBQUUsU0FBRixDQU5OLENBQUE7O0FBU0EsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFFRSxJQUFBLE9BQUEsQ0FBUSxDQUFDLDJDQUFELENBQVIsRUFBdUQsU0FBQyxNQUFELEdBQUE7YUFDakQsSUFBQSxNQUFBLENBQU8sR0FBUCxFQURpRDtJQUFBLENBQXZELENBQUEsQ0FGRjtHQVRBO0FBQUEifQ==