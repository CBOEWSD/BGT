
/*
   * Ticker
 */

(function() {
  var Ticker;

  Ticker = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function Ticker(el) {
      this.$el = $(el);
      this.$bar = $('.bar', el);
      this.$inner = $('.bar .inner', el);
      this.$left = $('.control.left', el);
      this.$right = $('.control.right', el);
      this.getParams();
      this.bind();
      this.$el.addClass('loaded');
      return this;
    }


    /*
       *# Bind
      Bind up to events such as scroll (touch) and global viewport resize
     */

    Ticker.prototype.bind = function() {
      this.$left.bind('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.moveLeft();
        };
      })(this));
      this.$right.bind('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.moveRight();
        };
      })(this));
      this.$el.bind('touchmove touchend', (function(_this) {
        return function(e) {
          return _this.scrollEvent(e);
        };
      })(this));
      PubSub.subscribe('resize', (function(_this) {
        return function(e) {
          _this.getParams();
          return _this.scrollEvent(e);
        };
      })(this));
      return this.$el.trigger('touchmove');
    };


    /*
       *# moveLeft
      Action will move the scroll position left by a pixel amount
      equal to the width of the inner element.
     */

    Ticker.prototype.moveLeft = function() {
      var scroll;
      this.getParams();
      scroll = this.$bar.scrollLeft() - this.params.width;
      return this.scrollTo(scroll);
    };


    /*
       *# moveRight
      Action will move the scroll position right by a pixel amount
      equal to the width of the inner element.
     */

    Ticker.prototype.moveRight = function() {
      var scroll;
      this.getParams();
      scroll = this.$bar.scrollLeft() + this.params.width;
      return this.scrollTo(scroll);
    };


    /*
       *# scrollTo
      Provided a position will scroll component to given position
     */

    Ticker.prototype.scrollTo = function(position) {
      return this.$bar.animate({
        scrollLeft: position
      }, 1000, (function(_this) {
        return function() {
          return _this.scrollEvent();
        };
      })(this));
    };


    /*
       *# getParams
      Gets necessary params shared across class.
     */

    Ticker.prototype.getParams = function() {
      return this.params = {
        width: this.$bar.width(),
        innerWidth: this.$inner.width()
      };
    };


    /*
       *# scrollEvent
      Called from multiple event types.
      Will check if we have reached the end (left or right) and disable
      controls as appropriate.
     */

    Ticker.prototype.scrollEvent = function(e) {
      var scrolled;
      scrolled = this.$bar.scrollLeft() + this.params.width;
      if (scrolled === this.params.width) {
        this.$left.addClass('disabled');
        return this.$right.removeClass('disabled');
      } else if (scrolled >= this.params.innerWidth) {
        this.$right.addClass('disabled');
        return this.$left.removeClass('disabled');
      } else {
        this.$left.removeClass('disabled');
        return this.$right.removeClass('disabled');
      }
    };

    return Ticker;

  })();


  /*
     *# Define
   */

  define(function() {
    return Ticker;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2VyLmpzIiwic291cmNlcyI6WyJ0aWNrZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxNQUFBOztBQUFBLEVBSU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxnQkFBQyxFQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQyxHQUFGLEdBQVEsQ0FBQSxDQUFFLEVBQUYsQ0FBUixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUMsSUFBRixHQUFTLENBQUEsQ0FBRSxNQUFGLEVBQVUsRUFBVixDQURULENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQSxDQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FGWCxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUMsS0FBRixHQUFVLENBQUEsQ0FBRSxlQUFGLEVBQW1CLEVBQW5CLENBSFYsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFDLE1BQUYsR0FBVyxDQUFBLENBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FKWCxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUMsU0FBRixDQUFBLENBTkEsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFDLElBQUYsQ0FBQSxDQVBBLENBQUE7QUFBQSxNQVNBLElBQUMsQ0FBQyxHQUFHLENBQUMsUUFBTixDQUFlLFFBQWYsQ0FUQSxDQUFBO0FBV0EsYUFBTyxJQUFQLENBWlc7SUFBQSxDQUxiOztBQW1CQTtBQUFBOzs7T0FuQkE7O0FBQUEscUJBdUJBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixNQUFBLElBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixDQUFhLE9BQWIsRUFBc0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsQ0FBRCxHQUFBO0FBQ3BCLFVBQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxDQUFBLENBQUE7aUJB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