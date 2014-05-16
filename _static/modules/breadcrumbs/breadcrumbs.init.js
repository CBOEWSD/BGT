
/*
   * Breadcrumbs
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
       *# Constructor
     */

    function Breadcrumbs(el) {
      self = this;
      this.$el = $(el);
      this.$menus = $('li>ul', self.$el).parent('li');
      this.bind();
    }


    /*
       *# this.bind
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
       *# this.scrollEven
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
       *# this.fixMenu
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
       *# this.unFixMenu
      Will remove any attributes set by `this.fixMenu`
     */

    Breadcrumbs.prototype.unFixMenu = function() {
      self.$el.removeClass('fixed');
      return self.$el.parent().css('height', '');
    };


    /*
       *# this.getParams
      Parameters required to calculate if and how the module should be fixed.
     */

    Breadcrumbs.prototype.getParams = function() {
      self.params = {};
      self.params.fromTop = self.$el.parent().offset().top;
      return self.params.scrolled = $(document).scrollTop();
    };


    /*
       *# this.close
      Called to close any shown menus by removing `show` class
     */

    Breadcrumbs.prototype.close = function() {
      return self.$menus.removeClass('show');
    };


    /*
       *# this.click
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
       *# this.mouseenter
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
     *# Init
    if there is at least one node on the page, initialize.
   */

  $el = $('.breadcrumbs');

  if ($el.length > 0) {
    bc = new Breadcrumbs($el);
  }

}).call(this);
