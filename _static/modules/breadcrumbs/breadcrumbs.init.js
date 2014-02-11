/*
  # Breadcrumbs
  Breadcrumbs module with hover/click view state for sub
  pages. This script is currently loaded as an init for
  a couple of reasons:
    * Size does not justify AMD
    * It will be on almost all pages
*/


(function() {
  var $el, Breadcrumbs, bc;

  Breadcrumbs = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function Breadcrumbs(el) {
      self = this;
      this.$el = $(el);
      this.bind();
    }

    /*
      ## this.bind
      Binds up events to show/hide menu
    */


    Breadcrumbs.prototype.bind = function() {
      self.$menus = $('li>ul', self.$el).parent('li');
      self.$menus.bind('click', self.click);
      self.$menus.bind('mouseenter', self.mouseenter);
      return $(document).bind('click', self.close);
    };

    /*
      ## this.close
      Called to close any shown menus by removing `show` class
    */


    Breadcrumbs.prototype.close = function() {
      return self.$menus.removeClass('show');
    };

    /*
      ## this.click
      Handles click events on top menu items (li).
      On click a `show` class will be added to that element
      whilst also being removed from any other items currently
      with the class `show`.
    */


    Breadcrumbs.prototype.click = function(e) {
      var $this;
      e.preventDefault();
      e.stopPropagation();
      $this = $(this);
      if ($this.hasClass('show')) {
        return self.close();
      } else {
        self.close();
        return $this.addClass('show');
      }
    };

    /*
      ## this.mouseenter
      Handles mouse entry event on top menu items (li)
      Will remove `show` class from any currently shown item to avoid
      conflict.
    */


    Breadcrumbs.prototype.mouseenter = function(e) {
      var $this;
      $this = $(this);
      if ($this.hasClass('show')) {
        return false;
      }
      return self.close();
    };

    return Breadcrumbs;

  })();

  /*
    ## Init
    if there is at least one node on the page, initialize.
  */


  $el = $('.breadcrumbs');

  if ($el.length > 0) {
    bc = new Breadcrumbs($el);
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuaW5pdC5qcyIsInNvdXJjZXMiOlsiYnJlYWRjcnVtYnMuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0NBQUE7Q0FBQTtDQUFBO0NBQUEsS0FBQSxjQUFBOztDQUFBLENBU007Q0FDSixHQUFBLElBQUE7O0NBQUEsRUFBTyxDQUFQLEVBQUE7O0NBRUE7OztDQUZBOztDQUthLENBQUEsQ0FBQSxDQUFBLGlCQUFDO0NBRVosRUFBTyxDQUFQLEVBQUE7Q0FBQSxDQUdRLENBQVIsQ0FBQyxFQUFEO0NBSEEsR0FLQyxFQUFEO0NBWkYsSUFLYTs7Q0FTYjs7OztDQWRBOztDQUFBLEVBa0JNLENBQU4sS0FBTTtDQUNKLENBQXlCLENBQVgsQ0FBVixFQUFKLENBQWM7Q0FBZCxDQUUwQixFQUF0QixDQUFKLENBQUEsQ0FBQTtDQUZBLENBRytCLEVBQTNCLEVBQUosSUFBQSxFQUFBO0NBQ0EsQ0FBMEIsRUFBMUIsQ0FBQSxFQUFBLENBQUEsS0FBQTtDQXZCRixJQWtCTTs7Q0FPTjs7OztDQXpCQTs7Q0FBQSxFQTZCTyxFQUFQLElBQU87Q0FDQSxHQUFELEVBQU8sS0FBWCxFQUFBO0NBOUJGLElBNkJPOztDQUdQOzs7Ozs7O0NBaENBOztDQUFBLEVBdUNPLEVBQVAsSUFBUTtDQUNOLElBQUEsS0FBQTtDQUFBLEtBQUEsUUFBQTtDQUFBLEtBQ0EsU0FBQTtDQURBLEVBR1EsQ0FBQSxDQUFSLENBQUE7Q0FFQSxHQUFHLENBQUssQ0FBUixFQUFHO0NBQ0ksR0FBRCxDQUFKLFVBQUE7TUFERixFQUFBO0NBR0UsR0FBSSxDQUFKLEdBQUE7Q0FDTSxJQUFELENBQUwsRUFBQSxPQUFBO1FBVkc7Q0F2Q1AsSUF1Q087O0NBWVA7Ozs7OztDQW5EQTs7Q0FBQSxFQXlEWSxNQUFDLENBQWI7Q0FDRSxJQUFBLEtBQUE7Q0FBQSxFQUFRLENBQUEsQ0FBUixDQUFBO0NBRUEsR0FBZ0IsQ0FBSyxDQUFyQixFQUFnQjtDQUFoQixJQUFBLFVBQU87UUFGUDtDQUlLLEdBQUQsQ0FBSixRQUFBO0NBOURGLElBeURZOztDQXpEWjs7Q0FWRjs7Q0EyRUE7Ozs7Q0EzRUE7O0NBQUEsQ0ErRUEsQ0FBQSxXQUFNOztDQUNOLENBQUEsQ0FBTSxDQUFILEVBQUE7Q0FDRCxDQUFBLENBQVMsQ0FBVCxPQUFTO0lBakZYO0NBQUEifQ==