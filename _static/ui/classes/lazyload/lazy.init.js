
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
