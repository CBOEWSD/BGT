
/*
   * Rows
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93cy5pbml0LmpzIiwic291cmNlcyI6WyJyb3dzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxDQUFBLENBQUUsU0FBQSxHQUFBO1dBQ0EsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsRUFBMkIsU0FBQSxHQUFBO0FBRXpCLE1BQUEsSUFBRyxRQUFRLENBQUMsU0FBVCxDQUFBLENBQUEsR0FBdUIsR0FBdkIsSUFBOEIsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFFBQVYsQ0FBbUIsUUFBbkIsQ0FBakM7QUFDRSxlQUFPLEtBQVAsQ0FERjtPQUFBO0FBQUEsTUFHQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFNBQWQsRUFBeUIsT0FBekIsQ0FIQSxDQUFBO2FBS0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUNULENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQWMsU0FBZCxFQUF5QixFQUF6QixFQURTO01BQUEsQ0FBWCxFQUVFLEVBRkYsRUFQeUI7SUFBQSxDQUEzQixFQURBO0VBQUEsQ0FBRixDQVBBLENBQUE7QUFBQSJ9