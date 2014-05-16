
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
