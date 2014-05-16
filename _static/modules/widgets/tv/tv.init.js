
/*
   * TV Widget init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.widget-tv');

  if ($el.length > 0) {
    require(['/modules/widgets/tv/tv.js', '/modules/widgets/tv/embed-1.5.4/embed.js'], function(tv) {
      return $el.each(function() {
        return new tv(this);
      });
    });
  }

}).call(this);
