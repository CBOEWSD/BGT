
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
  window.images = new Vimg({
    selector: '[data-echo]',
    interval: 1000,
    offset: 500,
    srcAttr: 'data-echo'
  });

  PubSub.subscribe('LazyLoadPoll', function() {
    return images.poll();
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS5pbml0LmpzIiwic291cmNlcyI6WyJsYXp5LmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsRUFVQSxNQUFNLENBQUMsTUFBUCxHQUFvQixJQUFBLElBQUEsQ0FBSztBQUFBLElBQ3ZCLFFBQUEsRUFBVSxhQURhO0FBQUEsSUFFckIsUUFBQSxFQUFVLElBRlc7QUFBQSxJQUdyQixNQUFBLEVBQVEsR0FIYTtBQUFBLElBSXJCLE9BQUEsRUFBUyxXQUpZO0dBQUwsQ0FWcEIsQ0FBQTs7QUFBQSxFQWlCQSxNQUFNLENBQUMsU0FBUCxDQUFpQixjQUFqQixFQUFpQyxTQUFBLEdBQUE7V0FDL0IsTUFBTSxDQUFDLElBQVAsQ0FBQSxFQUQrQjtFQUFBLENBQWpDLENBakJBLENBQUE7QUFBQSJ9