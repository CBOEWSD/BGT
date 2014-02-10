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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93cy5pbml0LmpzIiwic291cmNlcyI6WyJyb3dzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0NBQUEsQ0FBQSxDQUFFLE1BQUE7Q0FDTyxDQUFvQixDQUFBLEdBQXJCLEVBQU4sQ0FBQSxFQUFBO0NBRUUsRUFBMEIsQ0FBdkIsRUFBSCxFQUFXLENBQVI7Q0FDRCxJQUFBLFVBQU87UUFEVDtDQUFBLENBR3lCLENBQXpCLEdBQUEsQ0FBQSxFQUFBO0NBRVcsRUFBQSxNQUFBLENBQVgsR0FBQTtDQUNFLENBQXlCLENBQXpCLEdBQUEsR0FBQSxNQUFBO0NBREYsQ0FFRSxLQUZTO0NBUGIsSUFBMkI7Q0FEN0IsRUFBRTtDQUFGIn0=