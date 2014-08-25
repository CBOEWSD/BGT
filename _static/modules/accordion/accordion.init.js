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
