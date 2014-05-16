(function() {
  var Accordion;

  Accordion = (function() {
    var self;

    self = {};


    /*
       *# Constructor
     */

    function Accordion($, el) {
      self = this;
      self.$el = $(el);
      self.$el.$dt = $('>dt', this.$el);
      this.listen();
      return this;
    }


    /*
       *# this.listen
      Listen bindings for events, such as `click`, in order to
      show/hide the following `dd` node.
     */

    Accordion.prototype.listen = function() {
      return self.$el.$dt.bind('click', self.toggle);
    };


    /*
       *# this.toggle
      Called on event to show or hide the follow `dd` node. We
      will check if the node has the `expanded` class to determine
      next steps.
     */

    Accordion.prototype.toggle = function(e) {
      if ($(this).hasClass('expanded')) {
        return self.hide(e, $(this));
      } else {
        return self.show(e, $(this));
      }
    };


    /*
       *# this.show
      Will add the `expanded` class before showing the next `dd` node.
     */

    Accordion.prototype.show = function(e, $this) {
      $this.addClass('expanded');
      return $this.next('dd').slideDown();
    };


    /*
       *# this.hide
      Will remove the `expanded` class before hiding the next `dd` node.
     */

    Accordion.prototype.hide = function(e, $this) {
      $this.removeClass('expanded');
      return $this.next('dd').slideUp();
    };

    return Accordion;

  })();

  define(function() {
    return Accordion;
  });

}).call(this);
