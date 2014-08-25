/*
  # Hero Widget Init
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
*/


(function() {
  var $el;

  $el = $('.widget-hero');

  if ($el.length > 0) {
    require(['jquery', '/modules/widgets/hero/hero.js'], function($, hero) {
      return $el.each(function() {
        var me;
        return me = new hero($, this, 6000);
      });
    });
  }

}).call(this);
