(function() {
  var Filter;

  Filter = (function() {
    var self;

    self = {};

    /*
      ## Constructor
    */


    function Filter(el) {
      self = this;
      self.$el = $(el);
      self.$toplevel = $('.toplevel', el);
      this.bind();
      return self;
    }

    /*
      ## this.bind
      Bind up event listeners.
    */


    Filter.prototype.bind = function() {
      return self.$toplevel.bind('click', this.eventHandler);
    };

    /*
      ## this.eventHandler
      Handles our show/hide event (ex: `click`)
    */


    Filter.prototype.eventHandler = function(e) {
      var $this;
      e.preventDefault();
      e.stopImmediatePropagation();
      $this = $(this);
      if ($this.parent('li').hasClass('expanded')) {
        return self.hideMenu(e, $this);
      } else {
        return self.showMenu(e, $this);
      }
    };

    /*
      ## this.showMenu
      Show sub menu on click event and add `expander` class.
    */


    Filter.prototype.showMenu = function(e, el) {
      var $parentLi, $this;
      $this = $(el);
      $parentLi = $this.parent('li');
      return $parentLi.addClass('expanded');
    };

    /*
      ## this.hideMenu
      Show sub menu on click event and add `expander` class.
    */


    Filter.prototype.hideMenu = function(e, el) {
      var $parentLi, $this;
      $this = $(el);
      $parentLi = $this.parent('li');
      return $parentLi.removeClass('expanded');
    };

    return Filter;

  })();

  define(function() {
    return Filter;
  });

}).call(this);
