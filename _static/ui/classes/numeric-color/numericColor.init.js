
/*
   * NumericColor Class
  Utilizes data-NumericColor attribute which should equal
  a numeric value. For example:
  ```
  <span ... data-numericcolor="{{Price.change}}" ... />
  ```
 */

(function() {
  var $el, NumericColor;

  NumericColor = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function NumericColor(el) {
      this.$el = $(el);
      this.value = this.$el.data('numericcolor');
      if (this.value == null) {
        return false;
      }
      this.value = this.clean(this.value);
      if (!this.value) {
        return false;
      }
      this.check();
      return self = this;
    }


    /*
       *# Clean
      Will take a value and convert to its numeric counterpart.
      Will return `NaN` if the value is no good.
     */

    NumericColor.prototype.clean = function(value) {
      value = String(value);
      return parseFloat(value.replace(',', ''));
    };


    /*
       *# Check
      Check if the value is positive or negative.
     */

    NumericColor.prototype.check = function() {
      if (this.value >= 0) {
        return this.positive();
      } else {
        return this.negative();
      }
    };


    /*
       *# Positive
      Add class and trigger an event from the node.
     */

    NumericColor.prototype.positive = function() {
      this.$el.addClass('numeric-positive');
      return this.$el.trigger('numeric', true);
    };


    /*
       *# Positive
      Add class and trigger an event from the node.
     */

    NumericColor.prototype.negative = function() {
      this.$el.addClass('numeric-negative');
      return this.$el.trigger('numeric', false);
    };

    return NumericColor;

  })();


  /*
     *# Init
    Call directly
   */

  $el = $('[data-numericcolor]');

  $el.each(function() {
    return new NumericColor(this);
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY0NvbG9yLmluaXQuanMiLCJzb3VyY2VzIjpbIm51bWVyaWNDb2xvci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxpQkFBQTs7QUFBQSxFQVNNO0FBQ0osUUFBQSxJQUFBOztBQUFBLElBQUEsSUFBQSxHQUFPLE1BQVAsQ0FBQTs7QUFFQTtBQUFBOztPQUZBOztBQUthLElBQUEsc0JBQUMsRUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUMsR0FBRixHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUMsR0FBRyxDQUFDLElBQU4sQ0FBVyxjQUFYLENBRFYsQ0FBQTtBQUlBLE1BQUEsSUFBb0Isa0JBQXBCO0FBQUEsZUFBTyxLQUFQLENBQUE7T0FKQTtBQUFBLE1BTUEsSUFBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUMsS0FBRixDQUFTLElBQUMsQ0FBQyxLQUFYLENBTlYsQ0FBQTtBQVNBLE1BQUEsSUFBQSxDQUFBLElBQXFCLENBQUMsS0FBdEI7QUFBQSxlQUFPLEtBQVAsQ0FBQTtPQVRBO0FBQUEsTUFXQSxJQUFDLENBQUMsS0FBRixDQUFBLENBWEEsQ0FBQTtBQWFBLGFBQU8sSUFBQSxHQUFPLElBQWQsQ0FkVztJQUFBLENBTGI7O0FBcUJBO0FBQUE7Ozs7T0FyQkE7O0FBQUEsMkJBMEJBLEtBQUEsR0FBTyxTQUFDLEtBQUQsR0FBQTtBQUNMLE1BQUEsS0FBQSxHQUFRLE1BQUEsQ0FBTyxLQUFQLENBQVIsQ0FBQTtBQUNBLGFBQU8sVUFBQSxDQUFXLEtBQUssQ0FBQyxPQUFOLENBQWMsR0FBZCxFQUFtQixFQUFuQixDQUFYLENBQVAsQ0FGSztJQUFBLENBMUJQLENBQUE7O0FBOEJBO0FBQUE7OztPQTlCQTs7QUFBQSwyQkFrQ0EsS0FBQSxHQUFPLFNBQUEsR0FBQTtBQUNMLE1BQUEsSUFBRyxJQUFDLENBQUMsS0FBRixJQUFXLENBQWQ7ZUFDRSxJQUFDLENBQUMsUUFBRixDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFDLFFBQUYsQ0FBQSxFQUhGO09BREs7SUFBQSxDQWxDUCxDQUFBOztBQXdDQTtBQUFBOzs7T0F4Q0E7O0FBQUEsMkJBNENBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQyxHQUFHLENBQUMsUUFBTixDQUFlLGtCQUFmLENBQUEsQ0FBQTthQUVBLElBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTixDQUFjLFNBQWQsRUFBeUIsSUFBekIsRUFIUTtJQUFBLENBNUNWLENBQUE7O0FBaURBO0FBQUE7OztPQWpEQTs7QUFBQSwyQkFxREEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFDLEdBQUcsQ0FBQyxRQUFOLENBQWUsa0JBQWYsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFDLEdBQUcsQ0FBQyxPQUFOLENBQWMsU0FBZCxFQUF5QixLQUF6QixFQUZRO0lBQUEsQ0FyRFYsQ0FBQTs7d0JBQUE7O01BVkYsQ0FBQTs7QUFtRUE7QUFBQTs7O0tBbkVBOztBQUFBLEVBdUVBLEdBQUEsR0FBTSxDQUFBLENBQUUscUJBQUYsQ0F2RU4sQ0FBQTs7QUFBQSxFQXdFQSxHQUFHLENBQUMsSUFBSixDQUFTLFNBQUEsR0FBQTtXQUNILElBQUEsWUFBQSxDQUFhLElBQWIsRUFERztFQUFBLENBQVQsQ0F4RUEsQ0FBQTtBQUFBIn0=