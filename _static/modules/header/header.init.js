
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImhlYWRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBTU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxnQkFBQSxHQUFBO0FBRVgsTUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxjQUFULEVBQXlCLGNBQXpCLEVBQXlDLElBQXpDLENBQUEsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLElBSFAsQ0FBQTtBQUFBLE1BTUEsSUFBSSxDQUFDLGtCQUFMLEdBQTBCLENBQUEsQ0FBRSx3QkFBRixDQU4xQixDQUFBO0FBQUEsTUFPQSxJQUFJLENBQUMsVUFBTCxHQUFrQixDQUFBLENBQUUsc0JBQUYsQ0FQbEIsQ0FBQTtBQUFBLE1BVUEsSUFBQyxDQUFDLGtCQUFrQixDQUFDLEtBQXJCLENBQTJCLElBQUMsQ0FBQyxlQUE3QixDQVZBLENBRlc7SUFBQSxDQUxiOztBQW1CQTtBQUFBOzs7OztPQW5CQTs7QUFBQSxxQkF5QkEsR0FBQSxHQUFTLElBQUEsVUFBQSxDQUFXLFFBQVgsQ0F6QlQsQ0FBQTs7QUFBQSxxQkE2QkEsZUFBQSxHQUFpQixTQUFDLENBQUQsR0FBQTtBQUNmLE1BQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBaEIsQ0FBNEIsTUFBNUIsQ0FEQSxDQUFBO2FBSUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFULENBQWEsY0FBYixFQUE2QixxQkFBN0IsRUFBb0QsSUFBSSxDQUFDLFVBQXpELEVBTGU7SUFBQSxDQTdCakIsQ0FBQTs7a0JBQUE7O01BUEYsQ0FBQTs7QUEyQ0E7QUFBQTs7S0EzQ0E7O0FBQUEsRUE4Q0EsTUFBQSxHQUFTLEdBQUEsQ0FBQSxNQTlDVCxDQUFBO0FBQUEifQ==