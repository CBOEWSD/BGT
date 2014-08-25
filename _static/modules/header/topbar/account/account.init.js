/*
  # Account Dropdown
  Account dropdown component; child node to topbar component.
*/


(function() {
  var $el, AccountDropdown;

  AccountDropdown = (function() {
    /*
      ## Constructor
    */

    function AccountDropdown(el) {
      this.$el = $(el);
      this.$top = $('>li', el);
      this.$button = $('>li>a', el);
      this.bind();
      return this;
    }

    /*
      ## this.bind
      Bind up events needed to open/close menu
    */


    AccountDropdown.prototype.bind = function() {
      var _this = this;
      this.$button.bind('click', function(e) {
        return _this.toggleExpand(e);
      });
      return $(document).bind('click touchend', function(e) {
        if (_this.$el.has(e.target).length > 0) {
          return true;
        }
        if (_this.$el.is(e.target)) {
          return true;
        }
        return _this.$top.removeClass('open');
      });
    };

    /*
      ## this.toggleExpand
      Event handler
    */


    AccountDropdown.prototype.toggleExpand = function(event) {
      event.preventDefault();
      return this.$top.toggleClass('open');
    };

    return AccountDropdown;

  })();

  /*
    ## Init
  */


  $el = $('.account-dropdown');

  $el.each(function() {
    return new AccountDropdown(this);
  });

}).call(this);
