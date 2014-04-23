
/*
   * Tabs Class
 */

(function() {
  var Tabs;

  Tabs = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function Tabs(el) {
      this.$el = $(el);
      this.$tabs = $('.tabs-bar .tab', this.$el);
      this.$content = $('.tabs-content .tab', this.$el);
      this.bind();
      return self = this;
    }


    /*
       *# bind
      Called to bind up events leading to tab change.
     */

    Tabs.prototype.bind = function() {
      return this.$tabs.bind('click', (function(_this) {
        return function(e) {
          return _this.tabClick(e);
        };
      })(this));
    };


    /*
       *# tabClick
      Called on event of tab being clicked. Will change active
      tab and active content.
     */

    Tabs.prototype.tabClick = function(e) {
      var $this;
      e.preventDefault();
      e.stopImmediatePropagation();
      $this = $(e.currentTarget);
      this.$content.removeClass('active');
      this.$tabs.removeClass('active');
      $('[data-tabid="' + $this.data('tabid') + '"]', this.$el).addClass('active');
      return $this.addClass('active');
    };

    return Tabs;

  })();


  /*
     *# Define
    Return module for AMD.
   */

  define(function() {
    return Tabs;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZXMiOlsidGFicy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFJTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxNQUFQLENBQUE7O0FBRUE7QUFBQTs7T0FGQTs7QUFLYSxJQUFBLGNBQUMsRUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUMsR0FBRixHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFDLEtBQUYsR0FBVSxDQUFBLENBQUUsZ0JBQUYsRUFBb0IsSUFBQyxDQUFDLEdBQXRCLENBRFYsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLFFBQUYsR0FBYSxDQUFBLENBQUUsb0JBQUYsRUFBd0IsSUFBQyxDQUFDLEdBQTFCLENBRmIsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFDLElBQUYsQ0FBQSxDQUpBLENBQUE7QUFNQSxhQUFPLElBQUEsR0FBTyxJQUFkLENBUFc7SUFBQSxDQUxiOztBQWNBO0FBQUE7OztPQWRBOztBQUFBLG1CQWtCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQWEsT0FBYixFQUFzQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7aUJBQ3BCLEtBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBWCxFQURvQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBREk7SUFBQSxDQWxCTixDQUFBOztBQXNCQTtBQUFBOzs7O09BdEJBOztBQUFBLG1CQTJCQSxRQUFBLEdBQVUsU0FBQyxDQUFELEdBQUE7QUFDUixVQUFBLEtBQUE7QUFBQSxNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsd0JBQUYsQ0FBQSxDQURBLENBQUE7QUFBQSxNQUdBLEtBQUEsR0FBUSxDQUFBLENBQUUsQ0FBQyxDQUFDLGFBQUosQ0FIUixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUMsUUFBUSxDQUFDLFdBQVgsQ0FBdUIsUUFBdkIsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUMsS0FBSyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEIsQ0FOQSxDQUFBO0FBQUEsTUFRQSxDQUFBLENBQUUsZUFBQSxHQUFrQixLQUFLLENBQUMsSUFBTixDQUFXLE9BQVgsQ0FBbEIsR0FBd0MsSUFBMUMsRUFBZ0QsSUFBQyxDQUFDLEdBQWxELENBQXNELENBQUMsUUFBdkQsQ0FBZ0UsUUFBaEUsQ0FSQSxDQUFBO2FBU0EsS0FBSyxDQUFDLFFBQU4sQ0FBZSxRQUFmLEVBVlE7SUFBQSxDQTNCVixDQUFBOztnQkFBQTs7TUFMRixDQUFBOztBQTZDQTtBQUFBOzs7S0E3Q0E7O0FBQUEsRUFpREEsTUFBQSxDQUFPLFNBQUEsR0FBQTtBQUNMLFdBQU8sSUFBUCxDQURLO0VBQUEsQ0FBUCxDQWpEQSxDQUFBO0FBQUEifQ==