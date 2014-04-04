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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlcyI6WyJmaWx0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQUEsS0FBQTs7Q0FBQSxDQUFNO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUVBOzs7Q0FGQTs7Q0FLYSxDQUFBLENBQUEsQ0FBQSxZQUFDO0NBRVosRUFBTyxDQUFQLEVBQUE7Q0FBQSxDQUdXLENBQVgsQ0FBSSxFQUFKO0NBSEEsQ0FJZ0MsQ0FBZixDQUFiLEVBQUosR0FBQSxFQUFpQjtDQUpqQixHQU9DLEVBQUQ7Q0FFQSxHQUFBLFNBQU87Q0FoQlQsSUFLYTs7Q0FhYjs7OztDQWxCQTs7Q0FBQSxFQXNCTSxDQUFOLEtBQU07Q0FDQyxDQUF3QixFQUF6QixHQUFKLEVBQWMsR0FBZCxDQUFBO0NBdkJGLElBc0JNOztDQUdOOzs7O0NBekJBOztDQUFBLEVBNkJjLE1BQUMsR0FBZjtDQUNFLElBQUEsS0FBQTtDQUFBLEtBQUEsUUFBQTtDQUFBLEtBQ0Esa0JBQUE7Q0FEQSxFQUdRLENBQUEsQ0FBUixDQUFBO0NBRUEsR0FBRyxDQUFLLENBQVIsRUFBRyxFQUFBO0NBQ0ksQ0FBWSxFQUFiLENBQUosR0FBQSxPQUFBO01BREYsRUFBQTtDQUdPLENBQVksRUFBYixDQUFKLEdBQUEsT0FBQTtRQVRVO0NBN0JkLElBNkJjOztDQVdkOzs7O0NBeENBOztDQUFBLENBNENjLENBQUosS0FBVixDQUFXO0NBQ1QsU0FBQSxNQUFBO0NBQUEsQ0FBUSxDQUFBLEVBQVIsQ0FBQTtDQUFBLEVBQ1ksQ0FBQSxDQUFLLENBQWpCLEdBQUE7Q0FFVSxPQUFWLENBQVMsQ0FBVCxHQUFBO0NBaERGLElBNENVOztDQU1WOzs7O0NBbERBOztDQUFBLENBc0RjLENBQUosS0FBVixDQUFXO0NBQ1QsU0FBQSxNQUFBO0NBQUEsQ0FBUSxDQUFBLEVBQVIsQ0FBQTtDQUFBLEVBQ1ksQ0FBQSxDQUFLLENBQWpCLEdBQUE7Q0FFVSxRQUFELENBQVQsQ0FBQSxFQUFBO0NBMURGLElBc0RVOztDQXREVjs7Q0FERjs7Q0FBQSxDQStEQSxDQUFPLEdBQVAsR0FBTztDQUNMLEtBQUEsS0FBTztDQURULEVBQU87Q0EvRFAifQ==