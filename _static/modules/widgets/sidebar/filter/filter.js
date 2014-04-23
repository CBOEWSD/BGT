(function() {
  var Filter;

  Filter = (function() {
    var self;

    self = {};


    /*
       *# Constructor
     */

    function Filter(el) {
      self = this;
      self.$el = $(el);
      self.$toplevel = $('.toplevel', el);
      this.bind();
      return self;
    }


    /*
       *# this.bind
      Bind up event listeners.
     */

    Filter.prototype.bind = function() {
      return self.$toplevel.bind('click', this.eventHandler);
    };


    /*
       *# this.eventHandler
      Handles our show/hide event (ex: `click`)
     */

    Filter.prototype.eventHandler = function(e) {
      var $this;
      e.preventDefault();
      e.stopImmediatePropagation();
      $this = $(this);
      if ($this.parent('li').hasClass('expanded')) {
        return self.hideMenu(e, $this);
      } else {
        return self.showMenu(e, $this);
      }
    };


    /*
       *# this.showMenu
      Show sub menu on click event and add `expander` class.
     */

    Filter.prototype.showMenu = function(e, el) {
      var $parentLi, $this;
      $this = $(el);
      $parentLi = $this.parent('li');
      return $parentLi.addClass('expanded');
    };


    /*
       *# this.hideMenu
      Show sub menu on click event and add `expander` class.
     */

    Filter.prototype.hideMenu = function(e, el) {
      var $parentLi, $this;
      $this = $(el);
      $parentLi = $this.parent('li');
      return $parentLi.removeClass('expanded');
    };

    return Filter;

  })();

  define(function() {
    return Filter;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlcyI6WyJmaWx0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxNQUFBOztBQUFBLEVBQU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxnQkFBQyxFQUFELEdBQUE7QUFFWCxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxHQUFMLEdBQVcsQ0FBQSxDQUFFLEVBQUYsQ0FIWCxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsU0FBTCxHQUFpQixDQUFBLENBQUUsV0FBRixFQUFlLEVBQWYsQ0FKakIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFDLElBQUYsQ0FBQSxDQVBBLENBQUE7QUFTQSxhQUFPLElBQVAsQ0FYVztJQUFBLENBTGI7O0FBa0JBO0FBQUE7OztPQWxCQTs7QUFBQSxxQkFzQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixPQUFwQixFQUE2QixJQUFDLENBQUMsWUFBL0IsRUFESTtJQUFBLENBdEJOLENBQUE7O0FBeUJBO0FBQUE7OztPQXpCQTs7QUFBQSxxQkE2QkEsWUFBQSxHQUFjLFNBQUMsQ0FBRCxHQUFBO0FBQ1osVUFBQSxLQUFBO0FBQUEsTUFBQSxDQUFDLENBQUMsY0FBRixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsQ0FBQyxDQUFDLHdCQUFGLENBQUEsQ0FEQSxDQUFBO0FBQUEsTUFHQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLElBQUYsQ0FIUixDQUFBO0FBS0EsTUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixDQUFrQixDQUFDLFFBQW5CLENBQTRCLFVBQTVCLENBQUg7ZUFDRSxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBakIsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBakIsRUFIRjtPQU5ZO0lBQUEsQ0E3QmQsQ0FBQTs7QUF3Q0E7QUFBQTs7O09BeENBOztBQUFBLHFCQTRDQSxRQUFBLEdBQVUsU0FBQyxDQUFELEVBQUksRUFBSixHQUFBO0FBQ1IsVUFBQSxnQkFBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixDQURaLENBQUE7YUFHQSxTQUFTLENBQUMsUUFBVixDQUFtQixVQUFuQixFQUpRO0lBQUEsQ0E1Q1YsQ0FBQTs7QUFrREE7QUFBQTs7O09BbERBOztBQUFBLHFCQXNEQSxRQUFBLEdBQVUsU0FBQyxDQUFELEVBQUksRUFBSixHQUFBO0FBQ1IsVUFBQSxnQkFBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixDQURaLENBQUE7YUFHQSxTQUFTLENBQUMsV0FBVixDQUFzQixVQUF0QixFQUpRO0lBQUEsQ0F0RFYsQ0FBQTs7a0JBQUE7O01BREYsQ0FBQTs7QUFBQSxFQStEQSxNQUFBLENBQU8sU0FBQSxHQUFBO0FBQ0wsV0FBTyxNQUFQLENBREs7RUFBQSxDQUFQLENBL0RBLENBQUE7QUFBQSJ9