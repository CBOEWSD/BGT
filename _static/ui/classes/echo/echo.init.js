/*
  # Echo Class
  Makes use of the [echojs](https://github.com/toddmotto/echo)
  library to only load images when they are in the viewport
  ## Example:
  ```
  <img src="/ui/assets/images/placeholders/blank.gif" data-echo="{{src}}">
  ```
*/


(function() {
  Echo.init({
    offset: 200,
    throttle: 300
  });

  /*
    In the event of a resize we trigger Echo to poll images for inview.
    We need this due to Echo's default listener only being from `scroll`
    events on the window. Scroll is not fired on resize.
  */


  PubSub.subscribe('resize', function() {
    return Echo.render();
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby5pbml0LmpzIiwic291cmNlcyI6WyJlY2hvLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxDQVdBLEVBQUk7Q0FBTSxDQUVBLENBRkEsQ0FFUixFQUFBO0NBRlEsQ0FLRSxDQUxGLENBS1IsSUFBQTtDQWhCRixHQVdBOztDQVFBOzs7OztDQW5CQTs7Q0FBQSxDQXdCQSxDQUEyQixHQUFyQixFQUFOLENBQUE7Q0FDTyxHQUFELEVBQUosS0FBQTtDQURGLEVBQTJCO0NBeEIzQiJ9