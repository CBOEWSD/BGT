(function() {
  var Accordion;

  Accordion = (function() {
    var self;

    self = {};

    /*
      ## Constructor
    */


    function Accordion($, el) {
      self = this;
      self.$el = $(el);
      self.$el.$dt = $('>dt', this.$el);
      this.listen();
      return this;
    }

    /*
      ## this.listen
      Listen bindings for events, such as `click`, in order to
      show/hide the following `dd` node.
    */


    Accordion.prototype.listen = function() {
      return self.$el.$dt.bind('click', self.toggle);
    };

    /*
      ## this.toggle
      Called on event to show or hide the follow `dd` node. We
      will check if the node has the `expanded` class to determine
      next steps.
    */


    Accordion.prototype.toggle = function(e) {
      if ($(this).hasClass('expanded')) {
        return self.hide(e, $(this));
      } else {
        return self.show(e, $(this));
      }
    };

    /*
      ## this.show
      Will add the `expanded` class before showing the next `dd` node.
    */


    Accordion.prototype.show = function(e, $this) {
      $this.addClass('expanded');
      return $this.next('dd').slideDown();
    };

    /*
      ## this.hide
      Will remove the `expanded` class before hiding the next `dd` node.
    */


    Accordion.prototype.hide = function(e, $this) {
      $this.removeClass('expanded');
      return $this.next('dd').slideUp();
    };

    return Accordion;

  })();

  define(function() {
    return Accordion;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlcyI6WyJhY2NvcmRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQUEsS0FBQSxHQUFBOztDQUFBLENBQU07Q0FDSixHQUFBLElBQUE7O0NBQUEsQ0FBQSxDQUFPLENBQVA7O0NBRUE7OztDQUZBOztDQUthLENBQUksQ0FBSixDQUFBLGVBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBR1csQ0FBWCxDQUFJLEVBQUo7Q0FIQSxDQUl3QixDQUFoQixDQUFKLENBQVcsQ0FBZjtDQUpBLEdBTUMsRUFBRDtDQUVBLEdBQUEsU0FBTztDQWZULElBS2E7O0NBWWI7Ozs7O0NBakJBOztDQUFBLEVBc0JRLEdBQVIsR0FBUTtDQUNELENBQXNCLENBQW5CLENBQUosRUFBSixDQUFBLE1BQUE7Q0F2QkYsSUFzQlE7O0NBR1I7Ozs7OztDQXpCQTs7Q0FBQSxFQStCUSxHQUFSLEdBQVM7Q0FDUCxHQUFHLEVBQUgsRUFBRyxFQUFBO0NBQ0ksQ0FBUSxFQUFULFdBQUo7TUFERixFQUFBO0NBR08sQ0FBUSxFQUFULFdBQUo7UUFKSTtDQS9CUixJQStCUTs7Q0FNUjs7OztDQXJDQTs7Q0FBQSxDQXlDVSxDQUFKLENBQU4sQ0FBTSxJQUFDO0NBQ0wsSUFBSyxDQUFMLEVBQUEsRUFBQTtDQUNNLEdBQU4sQ0FBSyxJQUFMLElBQUE7Q0EzQ0YsSUF5Q007O0NBSU47Ozs7Q0E3Q0E7O0NBQUEsQ0FpRFUsQ0FBSixDQUFOLENBQU0sSUFBQztDQUNMLElBQUssQ0FBTCxJQUFBLENBQUE7Q0FDTSxHQUFOLENBQUssRUFBTCxNQUFBO0NBbkRGLElBaURNOztDQWpETjs7Q0FERjs7Q0FBQSxDQXdEQSxDQUFPLEdBQVAsR0FBTztDQUNMLFFBQUEsRUFBTztDQURULEVBQU87Q0F4RFAifQ==