
/*
   * Account Dropdown
  Account dropdown component; child node to topbar component.
 */

(function() {
  var $el, AccountDropdown;

  AccountDropdown = (function() {

    /*
       *# Constructor
     */
    function AccountDropdown(el) {
      this.$el = $(el);
      this.$top = $('>li', el);
      this.$button = $('>li>a', el);
      this.bind();
      return this;
    }


    /*
       *# this.bind
      Bind up events needed to open/close menu
     */

    AccountDropdown.prototype.bind = function() {
      this.$button.bind('click', (function(_this) {
        return function(e) {
          return _this.toggleExpand(e);
        };
      })(this));
      return $(document).bind('click', (function(_this) {
        return function(e) {
          if (_this.$el.has(e.target)) {
            return true;
          }
          if (_this.$el.is(e.target)) {
            return true;
          }
          return _this.$top.removeClass('open');
        };
      })(this));
    };


    /*
       *# this.toggleExpand
      Event handler
     */

    AccountDropdown.prototype.toggleExpand = function(event) {
      event.preventDefault();
      return this.$top.toggleClass('open');
    };

    return AccountDropdown;

  })();


  /*
     *# Init
   */

  $el = $('.account-dropdown');

  $el.each(function() {
    return new AccountDropdown(this);
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5pbml0LmpzIiwic291cmNlcyI6WyJhY2NvdW50LmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsb0JBQUE7O0FBQUEsRUFLTTtBQUNKO0FBQUE7O09BQUE7QUFHYSxJQUFBLHlCQUFDLEVBQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFDLEdBQUYsR0FBUSxDQUFBLENBQUUsRUFBRixDQUFSLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQyxJQUFGLEdBQVMsQ0FBQSxDQUFFLEtBQUYsRUFBUyxFQUFULENBRFQsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLE9BQUYsR0FBWSxDQUFBLENBQUUsT0FBRixFQUFXLEVBQVgsQ0FGWixDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUMsSUFBRixDQUFBLENBSkEsQ0FBQTtBQU1BLGFBQU8sSUFBUCxDQVBXO0lBQUEsQ0FIYjs7QUFZQTtBQUFBOzs7T0FaQTs7QUFBQSw4QkFnQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsSUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFWLENBQWUsT0FBZixFQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7aUJBQ3RCLEtBQUMsQ0FBQyxZQUFGLENBQWUsQ0FBZixFQURzQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhCLENBQUEsQ0FBQTthQUdBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLE9BQWpCLEVBQTBCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtBQUN4QixVQUFBLElBQWUsS0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFOLENBQVUsQ0FBQyxDQUFDLE1BQVosQ0FBZjtBQUFBLG1CQUFPLElBQVAsQ0FBQTtXQUFBO0FBQ0EsVUFBQSxJQUFlLEtBQUMsQ0FBQyxHQUFHLENBQUMsRUFBTixDQUFTLENBQUMsQ0FBQyxNQUFYLENBQWY7QUFBQSxtQkFBTyxJQUFQLENBQUE7V0FEQTtpQkFFQSxLQUFDLENBQUMsSUFBSSxDQUFDLFdBQVAsQ0FBbUIsTUFBbkIsRUFId0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQixFQUpJO0lBQUEsQ0FoQk4sQ0FBQTs7QUF5QkE7QUFBQTs7O09BekJBOztBQUFBLDhCQTZCQSxZQUFBLEdBQWMsU0FBQyxLQUFELEdBQUE7QUFDWixNQUFBLEtBQUssQ0FBQyxjQUFOLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFDLElBQUksQ0FBQyxXQUFQLENBQW1CLE1BQW5CLEVBRlk7SUFBQSxDQTdCZCxDQUFBOzsyQkFBQTs7TUFORixDQUFBOztBQXVDQTtBQUFBOztLQXZDQTs7QUFBQSxFQTBDQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLG1CQUFGLENBMUNOLENBQUE7O0FBQUEsRUE0Q0EsR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFBLEdBQUE7V0FDSCxJQUFBLGVBQUEsQ0FBZ0IsSUFBaEIsRUFERztFQUFBLENBQVQsQ0E1Q0EsQ0FBQTtBQUFBIn0=