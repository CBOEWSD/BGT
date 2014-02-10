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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93cy5pbml0LmpzIiwic291cmNlcyI6WyJyb3dzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxDQU9BLENBQUUsTUFBQTtDQUNPLENBQW9CLENBQUEsR0FBckIsRUFBTixDQUFBLEVBQUE7Q0FFRSxFQUEwQixDQUF2QixFQUFILEVBQVcsQ0FBUjtDQUNELElBQUEsVUFBTztRQURUO0NBQUEsQ0FHeUIsQ0FBekIsR0FBQSxDQUFBLEVBQUE7Q0FFVyxFQUFBLE1BQUEsQ0FBWCxHQUFBO0NBQ0UsQ0FBeUIsQ0FBekIsR0FBQSxHQUFBLE1BQUE7Q0FERixDQUVFLEtBRlM7Q0FQYixJQUEyQjtDQUQ3QixFQUFFO0NBUEYifQ==