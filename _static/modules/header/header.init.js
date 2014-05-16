
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
