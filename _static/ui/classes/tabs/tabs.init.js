
/*
   * Tabs class init
  Calls in dependencies if tabs class exists on page
 */

(function() {
  var $el;

  $el = $('.tabs-wrapper');

  if ($el.length > 0) {
    require(['/ui/classes/tabs/tabs.js'], function(tabs) {
      return $el.each(function() {
        return new tabs(this);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5pbml0LmpzIiwic291cmNlcyI6WyJ0YWJzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQU1BLEdBQUEsR0FBTSxDQUFBLENBQUUsZUFBRixDQU5OLENBQUE7O0FBU0EsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFFRSxJQUFBLE9BQUEsQ0FBUSxDQUFDLDBCQUFELENBQVIsRUFBc0MsU0FBQyxJQUFELEdBQUE7YUFFcEMsR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFBLEdBQUE7ZUFFSCxJQUFBLElBQUEsQ0FBSyxJQUFMLEVBRkc7TUFBQSxDQUFULEVBRm9DO0lBQUEsQ0FBdEMsQ0FBQSxDQUZGO0dBVEE7QUFBQSJ9