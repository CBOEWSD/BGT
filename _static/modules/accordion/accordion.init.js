/*
  # Accordion init
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
*/


(function() {
  var $el;

  $el = $('.accordion');

  if ($el.length > 0) {
    require(['/modules/accordion/accordion.js'], function(ac) {
      var me;
      return me = new ac($, $el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmluaXQuanMiLCJzb3VyY2VzIjpbImFjY29yZGlvbi5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQVNBLENBQUEsU0FBTTs7Q0FHTixDQUFBLENBQU0sQ0FBSCxFQUFBO0NBRUQsQ0FBNkMsQ0FBQSxDQUE3QyxHQUFBLEVBQThDLHdCQUF0QztDQUVOLENBQUEsUUFBQTtDQUFZLENBQVosQ0FBUyxDQUFBLFNBQVQ7Q0FGRixJQUE2QztJQWQvQztDQUFBIn0=