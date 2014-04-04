/*
  # Filter widget init
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImZpbHRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0NBQUE7Q0FBQTtDQUFBO0NBQUEsRUFBQSxHQUFBOztDQUFBLENBTUEsQ0FBQSxNQUFNOztDQUdOLENBQUEsQ0FBTSxDQUFILEVBQUE7Q0FFRCxDQUF1RCxDQUFBLENBQXZELEVBQXVELENBQXZELEVBQXdELGtDQUFoRDtDQUNLLEVBQVAsQ0FBQSxFQUFBLE9BQUE7Q0FETixJQUF1RDtJQVh6RDtDQUFBIn0=