/*
  # Side Nav Init
  Calls in dependencies if side navigation module exists on page.
*/


(function() {
  var $el;

  $el = $('.side-navigation');

  if ($el.length > 0) {
    require(['/modules/widgets/side-navigation/nav.js'], function(sideNav) {
      var me;
      return me = new sideNav($el);
    });
  }

}).call(this);
