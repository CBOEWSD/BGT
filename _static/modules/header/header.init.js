/*
# Header
Contains basic bindings for header module.
Simple bindings such as the top search binding on mobile.
*/


(function() {
  var Header, header;

  Header = (function() {
    var self;

    self = {};

    /*
    ## Constructor
    */


    function Header() {
      this.log.add('notification', 'Constructed.', this);
      self = this;
      self.$topSearchExpander = $('.mobileExpandTopSearch');
      self.$topSearch = $('.header .quicksearch');
      this.$topSearchExpander.click(this.toggleTopSearch);
    }

    /*
    ## this.log
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
  ## Init
  */


  header = new Header;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImhlYWRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLFFBQUE7O0NBQUEsQ0FNTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxDQUFBLENBQU8sQ0FBUDs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLFlBQUE7Q0FFWCxDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQTtDQUFBLEVBR08sQ0FBUCxFQUFBO0NBSEEsRUFNMEIsQ0FBdEIsRUFBSixZQUFBLE1BQTBCO0NBTjFCLEVBT2tCLENBQWQsRUFBSixJQUFBLFlBQWtCO0NBUGxCLEdBVUMsQ0FBRCxDQUFBLFNBQUEsR0FBb0I7Q0FqQnRCLElBS2E7O0NBY2I7Ozs7OztDQW5CQTs7Q0FBQSxFQXlCQSxDQUFTLElBQUEsRUFBQTs7Q0F6QlQsRUE2QmlCLE1BQUMsTUFBbEI7Q0FDRSxLQUFBLFFBQUE7Q0FBQSxHQUNJLEVBQUosSUFBZSxDQUFmO0NBR0ssQ0FBd0IsQ0FBckIsQ0FBSixNQUFKLEdBQUEsQ0FBQSxPQUFBO0NBbENGLElBNkJpQjs7Q0E3QmpCOztDQVBGOztDQTJDQTs7O0NBM0NBOztBQThDUyxDQTlDVCxDQThDQSxDQUFTLEdBQVQ7Q0E5Q0EifQ==