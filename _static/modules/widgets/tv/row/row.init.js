
/*
   * TV Row init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.widget-tv.row');

  if ($el.length > 0) {
    require(['/modules/widgets/tv/row/row.js'], function(row) {
      return $el.each(function() {
        return new row(this);
      });
    });
  }

}).call(this);
