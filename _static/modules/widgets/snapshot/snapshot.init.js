
/*
   * Snapshot init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.snapshot');

  if ($el.length > 0) {
    require(['/modules/widgets/snapshot/snapshot.js'], function(snapshot) {
      var ss;
      return ss = new snapshot($el);
    });
  }

}).call(this);
