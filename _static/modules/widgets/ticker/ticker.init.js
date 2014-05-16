
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
