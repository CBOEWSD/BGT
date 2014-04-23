(function() {
  var Accordion;

  Accordion = (function() {
    var self;

    self = {};


    /*
       *# Constructor
     */

    function Accordion($, el) {
      self = this;
      self.$el = $(el);
      self.$el.$dt = $('>dt', this.$el);
      this.listen();
      return this;
    }


    /*
       *# this.listen
      Listen bindings for events, such as `click`, in order to
      show/hide the following `dd` node.
     */

    Accordion.prototype.listen = function() {
      return self.$el.$dt.bind('click', self.toggle);
    };


    /*
       *# this.toggle
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
       *# this.show
      Will add the `expanded` class before showing the next `dd` node.
     */

    Accordion.prototype.show = function(e, $this) {
      $this.addClass('expanded');
      return $this.next('dd').slideDown();
    };


    /*
       *# this.hide
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlcyI6WyJhY2NvcmRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxTQUFBOztBQUFBLEVBQU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxtQkFBQyxDQUFELEVBQUksRUFBSixHQUFBO0FBRVgsTUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsR0FBTCxHQUFXLENBQUEsQ0FBRSxFQUFGLENBSFgsQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULEdBQWUsQ0FBQSxDQUFFLEtBQUYsRUFBUyxJQUFDLENBQUMsR0FBWCxDQUpmLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxNQUFGLENBQUEsQ0FOQSxDQUFBO0FBUUEsYUFBTyxJQUFQLENBVlc7SUFBQSxDQUxiOztBQWlCQTtBQUFBOzs7O09BakJBOztBQUFBLHdCQXNCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO2FBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBYixDQUFrQixPQUFsQixFQUEyQixJQUFJLENBQUMsTUFBaEMsRUFETTtJQUFBLENBdEJSLENBQUE7O0FBeUJBO0FBQUE7Ozs7O09BekJBOztBQUFBLHdCQStCQSxNQUFBLEdBQVEsU0FBQyxDQUFELEdBQUE7QUFDTixNQUFBLElBQUcsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLFFBQUwsQ0FBYyxVQUFkLENBQUg7ZUFDRSxJQUFJLENBQUMsSUFBTCxDQUFVLENBQVYsRUFBYSxDQUFBLENBQUUsSUFBRixDQUFiLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBSSxDQUFDLElBQUwsQ0FBVSxDQUFWLEVBQWEsQ0FBQSxDQUFFLElBQUYsQ0FBYixFQUhGO09BRE07SUFBQSxDQS9CUixDQUFBOztBQXFDQTtBQUFBOzs7T0FyQ0E7O0FBQUEsd0JBeUNBLElBQUEsR0FBTSxTQUFDLENBQUQsRUFBSSxLQUFKLEdBQUE7QUFDSixNQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsVUFBZixDQUFBLENBQUE7YUFDQSxLQUFLLENBQUMsSUFBTixDQUFXLElBQVgsQ0FBZ0IsQ0FBQyxTQUFqQixDQUFBLEVBRkk7SUFBQSxDQXpDTixDQUFBOztBQTZDQTtBQUFBOzs7T0E3Q0E7O0FBQUEsd0JBaURBLElBQUEsR0FBTSxTQUFDLENBQUQsRUFBSSxLQUFKLEdBQUE7QUFDSixNQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLFVBQWxCLENBQUEsQ0FBQTthQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBWCxDQUFnQixDQUFDLE9BQWpCLENBQUEsRUFGSTtJQUFBLENBakROLENBQUE7O3FCQUFBOztNQURGLENBQUE7O0FBQUEsRUF3REEsTUFBQSxDQUFPLFNBQUEsR0FBQTtBQUNMLFdBQU8sU0FBUCxDQURLO0VBQUEsQ0FBUCxDQXhEQSxDQUFBO0FBQUEifQ==