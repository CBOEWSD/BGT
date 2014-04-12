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
      this.$menus = $('li>ul', self.$el).parent('li');
      this.bind();
    }

    /*
      ## this.bind
      Binds up events to show/hide menu
    */


    Breadcrumbs.prototype.bind = function() {
      self.$menus.bind('click', self.click);
      self.$menus.bind('mouseenter', self.mouseenter);
      $(document).bind('click', self.close);
      PubSub.subscribe('DomChange', self.scrollEvent);
      return $(document).bind('contScroll', self.scrollEvent);
    };

    /*
      ## this.scrollEven
      Fired on `document` scroll event. This method will update the
      `params` object before checking if the module should be fixed.
    */


    Breadcrumbs.prototype.scrollEvent = function(e) {
      if (Response.viewportW() < 768) {
        return true;
      }
      self.getParams();
      if (self.params.scrolled > self.params.fromTop) {
        return self.fixMenu();
      } else {
        return self.unFixMenu();
      }
    };

    /*
      ## this.fixMenu
      This method will fix the menu to the top of the viewport
      whilst also ensuring the parent element does not collapse entirely.
    */


    Breadcrumbs.prototype.fixMenu = function() {
      if (self.$el.hasClass('fixed')) {
        return true;
      }
      self.$el.parent().css('height', self.$el.parent().height());
      return self.$el.addClass('fixed');
    };

    /*
      ## this.unFixMenu
      Will remove any attributes set by `this.fixMenu`
    */


    Breadcrumbs.prototype.unFixMenu = function() {
      self.$el.removeClass('fixed');
      return self.$el.parent().css('height', '');
    };

    /*
      ## this.getParams
      Parameters required to calculate if and how the module should be fixed.
    */


    Breadcrumbs.prototype.getParams = function() {
      self.params = {};
      self.params.fromTop = self.$el.parent().offset().top;
      return self.params.scrolled = $(document).scrollTop();
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
      if (!$(e.target).parent('li').hasClass('parent')) {
        return true;
      }
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuaW5pdC5qcyIsInNvdXJjZXMiOlsiYnJlYWRjcnVtYnMuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0NBQUE7Q0FBQTtDQUFBO0NBQUEsS0FBQSxjQUFBOztDQUFBLENBU007Q0FDSixHQUFBLElBQUE7O0NBQUEsRUFBTyxDQUFQLEVBQUE7O0NBRUE7OztDQUZBOztDQUthLENBQUEsQ0FBQSxDQUFBLGlCQUFDO0NBRVosRUFBTyxDQUFQLEVBQUE7Q0FBQSxDQUdRLENBQVIsQ0FBQyxFQUFEO0NBSEEsQ0FJc0IsQ0FBWCxDQUFWLEVBQUQsQ0FBVztDQUpYLEdBTUMsRUFBRDtDQWJGLElBS2E7O0NBVWI7Ozs7Q0FmQTs7Q0FBQSxFQW1CTSxDQUFOLEtBQU07Q0FDSixDQUEwQixFQUF0QixDQUFKLENBQUEsQ0FBQTtDQUFBLENBQytCLEVBQTNCLEVBQUosSUFBQSxFQUFBO0NBREEsQ0FFMEIsRUFBMUIsQ0FBQSxDQUFBLENBQUEsQ0FBQTtDQUZBLENBSThCLEVBQUksRUFBbEMsR0FBQSxFQUFBO0NBQ0EsQ0FBK0IsRUFBL0IsSUFBQSxHQUFBLENBQUEsQ0FBQTtDQXpCRixJQW1CTTs7Q0FRTjs7Ozs7Q0EzQkE7O0NBQUEsRUFnQ2EsTUFBQyxFQUFkO0NBQ0UsRUFBc0MsQ0FBdkIsRUFBZixFQUF1QixDQUFSO0NBQWYsR0FBQSxXQUFPO1FBQVA7Q0FBQSxHQUNJLEVBQUosR0FBQTtDQUVBLEVBQTBCLENBQXZCLEVBQUgsQ0FBQSxDQUFHO0NBQ0ksR0FBRCxHQUFKLFFBQUE7TUFERixFQUFBO0NBR08sR0FBRCxLQUFKLE1BQUE7UUFQUztDQWhDYixJQWdDYTs7Q0FTYjs7Ozs7Q0F6Q0E7O0NBQUEsRUE4Q1MsSUFBVCxFQUFTO0NBQ1AsRUFBdUIsQ0FBUixFQUFmLENBQWUsQ0FBQTtDQUFmLEdBQUEsV0FBTztRQUFQO0NBQUEsQ0FFZ0MsQ0FBeEIsQ0FBSixFQUFKLEVBQUE7Q0FDSyxFQUFHLENBQUosR0FBSixDQUFBLEtBQUE7Q0FsREYsSUE4Q1M7O0NBTVQ7Ozs7Q0FwREE7O0NBQUEsRUF3RFcsTUFBWDtDQUNFLEVBQVEsQ0FBSixFQUFKLENBQUEsSUFBQTtDQUNLLENBQTJCLENBQXhCLENBQUosRUFBSixFQUFBLEtBQUE7Q0ExREYsSUF3RFc7O0NBSVg7Ozs7Q0E1REE7O0NBQUEsRUFnRVcsTUFBWDtDQUNFLENBQUEsQ0FBYyxDQUFWLEVBQUo7Q0FBQSxFQUNzQixDQUFsQixFQUFKLENBQUE7Q0FDSyxFQUFrQixDQUFuQixFQUFPLEVBQVgsQ0FBdUIsSUFBdkI7Q0FuRUYsSUFnRVc7O0NBS1g7Ozs7Q0FyRUE7O0NBQUEsRUF5RU8sRUFBUCxJQUFPO0NBQ0EsR0FBRCxFQUFPLEtBQVgsRUFBQTtDQTFFRixJQXlFTzs7Q0FHUDs7Ozs7OztDQTVFQTs7Q0FBQSxFQW1GTyxFQUFQLElBQVE7Q0FDTixJQUFBLEtBQUE7QUFBbUIsQ0FBbkIsR0FBQSxFQUFBLEVBQW1CO0NBQW5CLEdBQUEsV0FBTztRQUFQO0NBQUEsS0FFQSxRQUFBO0NBRkEsS0FHQSxTQUFBO0NBSEEsRUFLUSxDQUFBLENBQVIsQ0FBQTtDQUVBLEdBQUcsQ0FBSyxDQUFSLEVBQUc7Q0FDSSxHQUFELENBQUosVUFBQTtNQURGLEVBQUE7Q0FHRSxHQUFJLENBQUosR0FBQTtDQUNNLElBQUQsQ0FBTCxFQUFBLE9BQUE7UUFaRztDQW5GUCxJQW1GTzs7Q0FjUDs7Ozs7O0NBakdBOztDQUFBLEVBdUdZLE1BQUMsQ0FBYjtDQUNFLElBQUEsS0FBQTtDQUFBLEVBQVEsQ0FBQSxDQUFSLENBQUE7Q0FFQSxHQUFnQixDQUFLLENBQXJCLEVBQWdCO0NBQWhCLElBQUEsVUFBTztRQUZQO0NBSUssR0FBRCxDQUFKLFFBQUE7Q0E1R0YsSUF1R1k7O0NBdkdaOztDQVZGOztDQXlIQTs7OztDQXpIQTs7Q0FBQSxDQTZIQSxDQUFBLFdBQU07O0NBQ04sQ0FBQSxDQUFNLENBQUgsRUFBQTtDQUNELENBQUEsQ0FBUyxDQUFULE9BQVM7SUEvSFg7Q0FBQSJ9