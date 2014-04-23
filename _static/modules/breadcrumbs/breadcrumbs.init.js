
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuaW5pdC5qcyIsInNvdXJjZXMiOlsiYnJlYWRjcnVtYnMuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsb0JBQUE7O0FBQUEsRUFTTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxNQUFQLENBQUE7O0FBRUE7QUFBQTs7T0FGQTs7QUFLYSxJQUFBLHFCQUFDLEVBQUQsR0FBQTtBQUVYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFDLEdBQUYsR0FBUSxDQUFBLENBQUUsRUFBRixDQUhSLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQSxDQUFFLE9BQUYsRUFBVyxJQUFJLENBQUMsR0FBaEIsQ0FBb0IsQ0FBQyxNQUFyQixDQUE0QixJQUE1QixDQUpYLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxJQUFGLENBQUEsQ0FOQSxDQUZXO0lBQUEsQ0FMYjs7QUFlQTtBQUFBOzs7T0FmQTs7QUFBQSwwQkFtQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFaLENBQWlCLE9BQWpCLEVBQTBCLElBQUksQ0FBQyxLQUEvQixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBWixDQUFpQixZQUFqQixFQUErQixJQUFJLENBQUMsVUFBcEMsQ0FEQSxDQUFBO0FBQUEsTUFFQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsSUFBWixDQUFpQixPQUFqQixFQUEwQixJQUFJLENBQUMsS0FBL0IsQ0FGQSxDQUFBO0FBQUEsTUFJQSxNQUFNLENBQUMsU0FBUCxDQUFpQixXQUFqQixFQUE4QixJQUFJLENBQUMsV0FBbkMsQ0FKQSxDQUFBO2FBS0EsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLElBQVosQ0FBaUIsWUFBakIs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