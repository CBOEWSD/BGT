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
