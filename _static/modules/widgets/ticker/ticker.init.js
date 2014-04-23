
/*
   * Ticker Widget Init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.ticker-bar');

  if ($el.length > 0) {
    require(['/modules/widgets/ticker/ticker.js'], function(ticker) {
      return $el.each(function() {
        return new ticker(this);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2VyLmluaXQuanMiLCJzb3VyY2VzIjpbInRpY2tlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQVFBLEdBQUEsR0FBTSxDQUFBLENBQUUsYUFBRixDQVJOLENBQUE7O0FBV0EsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFFRSxJQUFBLE9BQUEsQ0FBUSxDQUNOLG1DQURNLENBQVIsRUFDd0MsU0FBQyxNQUFELEdBQUE7YUFFdEMsR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFBLEdBQUE7ZUFDSCxJQUFBLE1BQUEsQ0FBTyxJQUFQLEVBREc7TUFBQSxDQUFULEVBRnNDO0lBQUEsQ0FEeEMsQ0FBQSxDQUZGO0dBWEE7QUFBQSJ9