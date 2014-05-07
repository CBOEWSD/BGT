
/*
 * Header
Contains basic bindings for header module.
Simple bindings such as the top search binding on mobile.
 */

(function() {
  var Header, header;

  Header = (function() {
    var self;

    self = {};


    /*
     *# Constructor
     */

    function Header() {
      this.log.add('notification', 'Constructed.', this);
      self = this;
      self.$topSearchExpander = $('.mobileExpandTopSearch');
      self.$topSearch = $('.header .quicksearch');
      this.$topSearchExpander.click(this.toggleTopSearch);
      $(document).bind('click', (function(_this) {
        return function(e) {
          if (_this.$topSearchExpander.has(e.target)) {
            return true;
          }
          if (_this.$topSearchExpander.is(e.target)) {
            return true;
          }
          return _this.$topSearch.removeClass('open');
        };
      })(this));
    }


    /*
     *# this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
     */

    Header.prototype.log = new LogHandler('Header');

    Header.prototype.toggleTopSearch = function(e) {
      e.preventDefault();
      self.$topSearch.toggleClass('open');
      return self.log.add('notification', 'Top search toggled.', self.$topSearch);
    };

    return Header;

  })();


  /*
   *# Init
   */

  header = new Header;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImhlYWRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBTU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxnQkFBQSxHQUFBO0FBRVgsTUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxjQUFULEVBQXlCLGNBQXpCLEVBQXlDLElBQXpDLENBQUEsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLElBSFAsQ0FBQTtBQUFBLE1BTUEsSUFBSSxDQUFDLGtCQUFMLEdBQTBCLENBQUEsQ0FBRSx3QkFBRixDQU4xQixDQUFBO0FBQUEsTUFPQSxJQUFJLENBQUMsVUFBTCxHQUFrQixDQUFBLENBQUUsc0JBQUYsQ0FQbEIsQ0FBQTtBQUFBLE1BVUEsSUFBQyxDQUFDLGtCQUFrQixDQUFDLEtBQXJCLENBQTJCLElBQUMsQ0FBQyxlQUE3QixDQVZBLENBQUE7QUFBQSxNQWFBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLE9BQWpCLEVBQTBCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtBQUN4QixVQUFBLElBQWUsS0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQXJCLENBQXlCLENBQUMsQ0FBQyxNQUEzQixDQUFmO0FBQUEsbUJBQU8sSUFBUCxDQUFBO1dBQUE7QUFDQSxVQUFBLElBQWUsS0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQXJCLENBQXdCLENBQUMsQ0FBQyxNQUExQixDQUFmO0FBQUEsbUJBQU8sSUFBUCxDQUFBO1dBREE7aUJBRUEsS0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFiLENBQXlCLE1BQXpCLEVBSHdCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUIsQ0FiQSxDQUZXO0lBQUEsQ0FMYjs7QUF5QkE7QUFBQTs7Ozs7T0F6QkE7O0FBQUEscUJBK0JBLEdBQUEsR0FBUyxJQUFBLFVBQUEsQ0FBVyxRQUFYLENBL0JULENBQUE7O0FBQUEscUJBbUNBLGVBQUEsR0FBaUIsU0FBQyxDQUFELEdBQUE7QUFDZixNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQWhCLENBQTRCLE1BQTVCLENBREEsQ0FBQTthQUlBLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBVCxDQUFhLGNBQWIsRUFBNkIscUJBQTdCLEVBQW9ELElBQUksQ0FBQyxVQUF6RCxFQUxlO0lBQUEsQ0FuQ2pCLENBQUE7O2tCQUFBOztNQVBGLENBQUE7O0FBaURBO0FBQUE7O0tBakRBOztBQUFBLEVBb0RBLE1BQUEsR0FBUyxHQUFBLENBQUEsTUFwRFQsQ0FBQTtBQUFBIn0=