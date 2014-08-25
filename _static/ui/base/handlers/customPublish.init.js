/*
  # Custom Publish
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
      ## Constructor
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
      ## this.bindNodes
      Bind each custom publish node with its event type
      or default to `click` events.
    */


    CustomPublish.prototype.bindNodes = function() {
      var _this = this;
      return this.$nodes.each(function(i, el) {
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
      });
    };

    /*
      ## this.publishEvent
      Publish the custom event to anyone who cares.
    */


    CustomPublish.prototype.publishEvent = function(node) {
      return PubSub.publish(node.data('publish'), node);
    };

    return CustomPublish;

  })();

  customPublish = new CustomPublish;

}).call(this);
