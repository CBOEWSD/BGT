
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tUHVibGlzaC5pbml0LmpzIiwic291cmNlcyI6WyJjdXN0b21QdWJsaXNoLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBa0JNO0FBQ0osUUFBQSxJQUFBOztBQUFBLElBQUEsSUFBQSxHQUFPLE1BQVAsQ0FBQTs7QUFFQTtBQUFBOztPQUZBOztBQUthLElBQUEsdUJBQUEsR0FBQTtBQUVYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLE1BQUYsR0FBVyxDQUFBLENBQUUsZ0JBQUYsQ0FGWCxDQUFBO0FBSUEsTUFBQSxJQUFHLElBQUMsQ0FBQyxNQUFNLENBQUMsTUFBVCxHQUFrQixDQUFyQjtBQUNFLFFBQUEsSUFBQyxDQUFDLFNBQUYsQ0FBQSxDQUFBLENBREY7T0FKQTtBQU9BLGFBQU8sSUFBUCxDQVRXO0lBQUEsQ0FMYjs7QUFnQkE7QUFBQTs7OztPQWhCQTs7QUFBQSw0QkFxQkEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQyxNQUFNLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsRUFBSSxFQUFKLEdBQUE7QUFDWixjQUFBLEtBQUE7QUFBQSxVQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsRUFBRixDQUFSLENBQUE7aUJBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVgsQ0FBQSxJQUF1QixPQUFsQyxFQUEyQyxTQUFDLENBQUQsR0FBQTttQkFDekMsS0FBQyxDQUFDLFlBQUYsQ0FBZSxDQUFBLENBQUUsQ0FBQyxDQUFDLGFBQUosQ0FBZixFQUR5QztVQUFBLENBQTNDLEVBRlk7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkLEVBRFM7SUFBQSxDQXJCWCxDQUFBOztBQTJCQTtBQUFBOzs7T0EzQkE7O0FBQUEsNEJBK0JBLFlBQUEsR0FBYyxTQUFDLElBQUQsR0FBQTthQUNaLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLENBQWYsRUFBcUMsSUFBckMsRUFEWTtJQUFBLENBL0JkLENBQUE7O3lCQUFBOztNQW5CRixDQUFBOztBQUFBLEVBdURBLGFBQUEsR0FBZ0IsR0FBQSxDQUFBLGFBdkRoQixDQUFBO0FBQUEifQ==