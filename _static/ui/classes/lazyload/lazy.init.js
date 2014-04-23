
/*
   * Echo Class
  Makes use of the [echojs](https://github.com/toddmotto/echo)
  library to only load images when they are in the viewport
   *# Example:
  ```
  <img src="/ui/assets/images/placeholders/blank.gif" data-echo="{{src}}">
  ```
 */

(function() {
  var images;

  images = new Vimg({
    selector: '[data-echo]',
    interval: 1000,
    offset: 500,
    srcAttr: 'data-echo'
  });

  PubSub.subscribe('LazyLoadPoll', function() {
    console.log('Polling yo...');
    return images.poll();
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS5pbml0LmpzIiwic291cmNlcyI6WyJsYXp5LmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxNQUFBOztBQUFBLEVBVUEsTUFBQSxHQUFhLElBQUEsSUFBQSxDQUFLO0FBQUEsSUFDaEIsUUFBQSxFQUFVLGFBRE07QUFBQSxJQUVkLFFBQUEsRUFBVSxJQUZJO0FBQUEsSUFHZCxNQUFBLEVBQVEsR0FITTtBQUFBLElBSWQsT0FBQSxFQUFTLFdBSks7R0FBTCxDQVZiLENBQUE7O0FBQUEsRUFpQkEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsY0FBakIsRUFBaUMsU0FBQSxHQUFBO0FBQy9CLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaLENBQUEsQ0FBQTtXQUNBLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFGK0I7RUFBQSxDQUFqQyxDQWpCQSxDQUFBO0FBQUEifQ==