/*
  # Tabs class init
  Calls in dependencies if tabs class exists on page
*/


(function() {
  var $el;

  $el = $('.tabs-wrapper');

  if ($el.length > 0) {
    require(['/ui/classes/tabs/tabs.js'], function(tabs) {
      return $el.each(function() {
        return new tabs(this);
      });
    });
  }

}).call(this);
