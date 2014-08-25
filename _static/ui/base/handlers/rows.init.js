/*
  # Rows
  This method simply listens for resize events and switches
  the display mode briefly forcing a re-render of the page
  layout. This resolves scaling issues in certain browsers.
*/


(function() {
  $(function() {
    return PubSub.subscribe('resize', function() {
      if (Response.viewportW() < 768 || $('html').hasClass('lt-ie9')) {
        return false;
      }
      $('.row').css('display', 'block');
      return setTimeout(function() {
        return $('.row').css('display', '');
      }, 50);
    });
  });

}).call(this);
