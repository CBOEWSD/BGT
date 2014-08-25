/*
  # Ticker
*/


(function() {
  var Ticker;

  Ticker = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function Ticker(el) {
      this.$el = $(el);
      this.$bar = $('.bar', el);
      this.$inner = $('.bar .inner', el);
      this.$left = $('.control.left', el);
      this.$right = $('.control.right', el);
      this.$items = $('.ticker-item', el);
      this.getParams();
      this.bind();
      this.$el.addClass('loaded');
      return this;
    }

    /*
      ## Bind
      Bind up to events such as scroll (touch) and global viewport resize
    */


    Ticker.prototype.bind = function() {
      var _this = this;
      this.$left.bind('click', function(e) {
        e.preventDefault();
        return _this.moveLeft();
      });
      this.$right.bind('click', function(e) {
        e.preventDefault();
        return _this.moveRight();
      });
      this.$el.bind('touchmove touchend', function(e) {
        return _this.scrollEvent(e);
      });
      PubSub.subscribe('resize', function(e) {
        _this.getParams();
        return _this.scrollEvent(e);
      });
      return this.$el.trigger('touchmove');
    };

    /*
      ## moveLeft
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
      ## moveRight
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
      ## scrollTo
      Provided a position will scroll component to given position
    */


    Ticker.prototype.scrollTo = function(position) {
      var _this = this;
      return this.$bar.animate({
        scrollLeft: position
      }, 1000, function() {
        return _this.scrollEvent();
      });
    };

    /*
      ## getParams
      Gets necessary params shared across class.
    */


    Ticker.prototype.getParams = function() {
      return this.params = {
        width: this.$bar.width(),
        innerWidth: this.$inner.width()
      };
    };

    /*
      ## scrollEvent
      Called from multiple event types.
      Will check if we have reached the end (left or right) and disable
      controls as appropriate.
    */


    Ticker.prototype.scrollEvent = function(e) {
      var scrolled;
      scrolled = this.$bar.scrollLeft() + this.params.width;
      console.log(this);
      this.inView(scrolled);
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

    /*
      ## inView
      Called after scroll to trigger an event that can be used to
      load ads that are now in view.
    */


    Ticker.prototype.inView = function(scrolled) {
      var $triggerItems, itemWidth, outOfView, startFrom, toShow, viewWidth;
      itemWidth = this.$items.eq(2).outerWidth();
      viewWidth = this.params.width;
      toShow = Math.ceil(viewWidth / itemWidth);
      outOfView = scrolled - viewWidth;
      startFrom = Math.ceil(outOfView / itemWidth);
      $triggerItems = this.$items.slice(startFrom, toShow + startFrom).not('.adtriggered');
      return $triggerItems.trigger('ad-in-view').addClass('adtriggered');
    };

    return Ticker;

  })();

  /*
    ## Define
  */


  define(function() {
    return Ticker;
  });

}).call(this);
