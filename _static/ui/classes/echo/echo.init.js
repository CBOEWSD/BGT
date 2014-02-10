(function() {
  Echo.init({
    offset: 200,
    throttle: 300
  });

  PubSub.subscribe('resize', function() {
    return Echo.render();
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby5pbml0LmpzIiwic291cmNlcyI6WyJlY2hvLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBO0NBQUEsQ0FBQSxFQUFJO0NBQU0sQ0FFQSxDQUZBLENBRVIsRUFBQTtDQUZRLENBS0UsQ0FMRixDQUtSLElBQUE7Q0FMRixHQUFBOztDQUFBLENBV0EsQ0FBMkIsR0FBckIsRUFBTixDQUFBO0NBQ08sR0FBRCxFQUFKLEtBQUE7Q0FERixFQUEyQjtDQVgzQiJ9