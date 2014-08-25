/*
  # NumericColor Class
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
      ## Constructor
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
      ## Clean
      Will take a value and convert to its numeric counterpart.
      Will return `NaN` if the value is no good.
    */


    NumericColor.prototype.clean = function(value) {
      value = String(value);
      return parseFloat(value.replace(',', ''));
    };

    /*
      ## Check
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
      ## Positive
      Add class and trigger an event from the node.
    */


    NumericColor.prototype.positive = function() {
      this.$el.addClass('numeric-positive');
      return this.$el.trigger('numeric', true);
    };

    /*
      ## Positive
      Add class and trigger an event from the node.
    */


    NumericColor.prototype.negative = function() {
      this.$el.addClass('numeric-negative');
      return this.$el.trigger('numeric', false);
    };

    return NumericColor;

  })();

  /*
    ## Init
    Call directly
  */


  $el = $('[data-numericcolor]');

  $el.each(function() {
    return new NumericColor(this);
  });

}).call(this);
