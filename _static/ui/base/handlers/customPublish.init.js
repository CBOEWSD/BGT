
/*
   * Custom Publish
  Custom Publish allows you to use a DOM attribute to create
  a custom event for any anonymous subscribers listening out
  there. This can help modules communicate with each other
  without needing to care about the others actions or results.

  Example:
  ```
  <a ...
    data-publish="myevent"
    data-event="touchend">
  ```
  The data-event will default to `click` events and is
  therefore optional. You can now have your other module subscribe
  to this `myevent` and take whatever actions are necessary.
 */

(function() {
  var CustomPublish, customPublish;

  CustomPublish = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function CustomPublish() {
      self = this;
      this.$nodes = $('[data-publish]');
      if (this.$nodes.length > 0) {
        this.bindNodes();
      }
      return this;
    }


    /*
       *# this.bindNodes
      Bind each custom publish node with its event type
      or default to `click` events.
     */

    CustomPublish.prototype.bindNodes = function() {
      return this.$nodes.each((function(_this) {
        return function(i, el) {
          var $this;
          $this = $(el);
          return $this.bind($this.data('event') || 'click', function(e) {
            if ($this.data('preventDefault')) {
              e.preventDefault();
            }
            if ($this.data('stopImmediate')) {
              e.stopImmediatePropagation();
            }
            return _this.publishEvent($(e.currentTarget));
          });
        };
      })(this));
    };


    /*
       *# this.publishEvent
      Publish the custom event to anyone who cares.
     */

    CustomPublish.prototype.publishEvent = function(node) {
      return PubSub.publish(node.data('publish'), node);
    };

    return CustomPublish;

  })();

  customPublish = new CustomPublish;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tUHVibGlzaC5pbml0LmpzIiwic291cmNlcyI6WyJjdXN0b21QdWJsaXNoLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBa0JNO0FBQ0osUUFBQSxJQUFBOztBQUFBLElBQUEsSUFBQSxHQUFPLE1BQVAsQ0FBQTs7QUFFQTtBQUFBOztPQUZBOztBQUthLElBQUEsdUJBQUEsR0FBQTtBQUVYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLE1BQUYsR0FBVyxDQUFBLENBQUUsZ0JBQUYsQ0FGWCxDQUFBO0FBSUEsTUFBQSxJQUFHLElBQUMsQ0FBQyxNQUFNLENBQUMsTUFBVCxHQUFrQixDQUFyQjtBQUNFLFFBQUEsSUFBQyxDQUFDLFNBQUYsQ0FBQSxDQUFBLENBREY7T0FKQTtBQU9BLGFBQU8sSUFBUCxDQVRXO0lBQUEsQ0FMYjs7QUFnQkE7QUFBQTs7OztPQWhCQTs7QUFBQSw0QkFxQkEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQyxNQUFNLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsRUFBSSxFQUFKLEdBQUE7QUFDWixjQUFBLEtBQUE7QUFBQSxVQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsRUFBRixDQUFSLENBQUE7aUJBRUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVgsQ0FBQSxJQUF1QixPQUFsQyxFQUEyQyxTQUFDLENBQUQsR0FBQTtBQUN6QyxZQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxnQkFBWCxDQUFIO0FBQ0UsY0FBQSxDQUFDLENBQUMsY0FBRixDQUFBLENBQUEsQ0FERjthQUFBO0FBRUEsWUFBQSxJQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsZUFBWCxDQUFIO0FBQ0UsY0FBQSxDQUFDLENBQUMsd0JBQUYsQ0FBQSxDQUFBLENBREY7YUFGQTttQkFLQSxLQUFDLENBQUMsWUFBRixDQUFlLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSixDQUFmLEVBTnlDO1VBQUEsQ0FBM0MsRUFIWTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQsRUFEUztJQUFBLENBckJYLENBQUE7O0FBaUNBO0FBQUE7OztPQWpDQTs7QUFBQSw0QkFxQ0EsWUFBQSxHQUFjLFNBQUMsSUFBRCxHQUFBO2FBQ1osTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsQ0FBZixFQUFxQyxJQUFyQyxFQURZO0lBQUEsQ0FyQ2QsQ0FBQTs7eUJBQUE7O01BbkJGLENBQUE7O0FBQUEsRUE2REEsYUFBQSxHQUFnQixHQUFBLENBQUEsYUE3RGhCLENBQUE7QUFBQSJ9