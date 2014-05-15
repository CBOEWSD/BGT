
/*
   * RowTV
  This adds functionality to the row subcomponent of the TV widget.

  NOTE:
    This file contains purely superficial functionality. At this time there
    is no interaction with a service. This code should be taken as guidance
    for UX interaction and not as the basis for application code.
 */

(function() {
  var RowTV;

  RowTV = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function RowTV(el) {
      self = this;
      this.$el = $(el);
      this.$items = $('.items', el);
      this.$item = $('.item', this.$items);
      this.$showWithAll = $('.showWithAll', el);
      this.subscribe = this.$el.data('subscribe') || void 0;
      this.$allOtherRows = $('.widget-tv.row').not(el);
      this.$publishers = $("[data-publish='" + this.subscribe + "']");
      this.$resetPublishers = $("[data-publish='resetRows']");
      this.$resetPublishers.addClass('shown');
      this.$pagination = $('.pagination a', el);
      this.bindShowAll();
      return this;
    }


    /*
       *# this.bindShowAll
      Binds show all type actions with their appropriate methods.
     */

    RowTV.prototype.bindShowAll = function() {
      this.$viewAll = $('.viewall', this.$el);
      this.$total = $('.total', this.$el);
      this.$viewAll.bind('click', (function(_this) {
        return function(e) {
          return _this.actionToggleMe(e);
        };
      })(this));
      if (this.subscribe) {
        PubSub.subscribe(this.subscribe, (function(_this) {
          return function(event, from) {
            return _this.actionToggleAll();
          };
        })(this));
      }
      PubSub.subscribe('resetRows', (function(_this) {
        return function() {
          return _this.$el.trigger('reset');
        };
      })(this));
      this.$el.bind('reset', (function(_this) {
        return function() {
          _this.$el.slideDown();
          _this.$resetPublishers.addClass('shown');
          return _this.actionHideAll(false);
        };
      })(this));
      this.$el.bind('resetfilter', (function(_this) {
        return function() {
          return _this.actionHideAll(false);
        };
      })(this));
      this.$pagination.bind('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.actionPagination(e.currentTarget);
        };
      })(this));
      if (this.$el.data('activestates')) {
        this.$item.bind('click', (function(_this) {
          return function(e) {
            e.preventDefault();
            return PubSub.publish('row-active-item', e.currentTarget);
          };
        })(this));
        PubSub.subscribe('row-active-item', (function(_this) {
          return function(e, item) {
            return _this.actionActiveItem(e, item);
          };
        })(this));
        return PubSub.subscribe('row-active-item-reset', (function(_this) {
          return function(e, item) {
            return _this.resetActiveItem(e, item);
          };
        })(this));
      }
    };


    /*
       *# this.actionToggleAll
      Called when all should be revealed or hidden for a certain category.
     */

    RowTV.prototype.actionToggleAll = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$el.hasClass('shown') && this.$el.is(':visible')) {
        return this.actionHideAll(true);
      } else {
        return this.actionShowAll();
      }
    };


    /*
       *# this.actionShowAll
      Called from `this.actionToggleAll` to show only this row and all
      sub videos/pagination.
     */

    RowTV.prototype.actionShowAll = function() {
      this.$viewAll.hide();
      this.actionShowMe();
      this.showJustMe();
      this.$el.addClass('shown');
      this.$publishers.addClass('shown');
      this.$resetPublishers.removeClass('shown');
      return this.$allOtherRows.trigger('resetfilter');
    };


    /*
       *# this.actionHideAll
      Called from `this.actionToggleAll` to hide only this row and all
      sub videos/pagination.
     */

    RowTV.prototype.actionHideAll = function(trigger) {
      this.$viewAll.show();
      this.actionHideMe();
      this.$el.removeClass('shown');
      this.$publishers.removeClass('shown');
      if (trigger) {
        return this.$allOtherRows.trigger('reset');
      }
    };


    /*
       *# this.actionToggleMe
      Called to expand/collapse this row, without collapsing others.
     */

    RowTV.prototype.actionToggleMe = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$viewAll.hasClass('shown') && this.$el.is(':visible')) {
        return this.actionHideMe();
      } else {
        return this.actionShowMe();
      }
    };


    /*
       *# this.actionShowMe
      Called by `this.actionToggleMe` to expand this given row and add
      appropriate classes.
     */

    RowTV.prototype.actionShowMe = function() {
      $('.item:hidden:first', this.$items).nextAll().andSelf().fadeIn();
      this.$showWithAll.fadeIn();
      this.$viewAll.addClass('shown red');
      return this.$items.addClass('expanded');
    };


    /*
       *# this.actionShowMe
      Called by `this.actionToggleMe` to collapse this given row and remove
      appropriate classes.
     */

    RowTV.prototype.actionHideMe = function() {
      $('.item:nth-child(n+5)', this.$items).fadeOut();
      this.$showWithAll.fadeOut();
      this.$items.removeClass('expanded');
      return this.$viewAll.removeClass('shown red');
    };


    /*
       *# this.showJustMe
      This method will hide all other `.widget-tv.row` other than `this.$el`
     */

    RowTV.prototype.showJustMe = function() {
      this.$allOtherRows.slideUp(500, function() {
        return PubSub.publish('LazyLoadPoll');
      });
      this.$el.slideDown(500, function() {
        return PubSub.publish('LazyLoadPoll');
      });
      this.dontResetMe = true;
      return PubSub.publish('tv-rows-reset');
    };


    /*
       *# this.showEveryone
      This method is called to reset `this.$allOtherRows` by at least showing them.
     */

    RowTV.prototype.showEveryone = function() {
      return this.$allOtherRows.slideDown(500, function() {
        return PubSub.publish('LazyLoadPoll');
      });
    };


    /*
       *# this.actionActiveItem
      On player click this will add an active item state to the selected video
      whilst also publishing a `reset` event to all other items except the selected.
     */

    RowTV.prototype.actionActiveItem = function(e, item) {
      if (this.$el.has(item).length < 1) {
        return true;
      }
      PubSub.publish('row-active-item-reset', item);
      $(item).addClass('active');
      return $('html, body').animate({
        scrollTop: $('.player').offset().top
      });
    };


    /*
       *# this.resetActiveItem
      Will reset any `active` state videos excluding the video now being
      selected to play. PubSub event: `row-active-item-reset`.
    
      Call with:
      ```
      PubSub.publish('row-active-item-reset', {{optional item}});
      ```
     */

    RowTV.prototype.resetActiveItem = function(e, item) {
      return this.$item.not(item).removeClass('active');
    };

    RowTV.prototype.actionPagination = function(item) {
      var $current, $currentA, $item, $next, $prev;
      $item = $(item);

      /*
        Interface interaction could be here. Recomendation is abstraction
        via MVC framework to fetch and rerender view based on updated
        collection data. See backbone or angular JavaScript frameworks.
       */
      if ($item.hasClass('icon-css-arrows')) {
        $current = this.$pagination.filter('.active').parent('li');
        $currentA = $('a', $current);
        if ($item.parent('li').hasClass('next')) {
          if ($current.next().length < 1) {
            return false;
          }
          $next = $('a', $current.next());
          if ($next.length < 1) {
            $next = this.movePagination($current);
          }
          $currentA.removeClass('active');
          $next.addClass('active');
        } else if ($item.parent('li').hasClass('prev')) {
          if ($current.prev().length < 1) {
            return false;
          }
          $prev = $('a', $current.prev());
          $currentA.removeClass('active');
          $prev.addClass('active');
        }
      } else {
        this.$pagination.removeClass('active');
        $item.addClass('active');
      }
      this.$items.stop();
      return this.$items.fadeOut().fadeIn();
    };


    /*
       *# this.movePagination
      This method can be used to demo how pagination may work
      when reaching the end or `...`.
     */

    RowTV.prototype.movePagination = function($active) {
      var $last, $previous, current, last;
      $last = $active.next().next();
      last = Number($('a', $last).text());
      current = Number($active.text());
      if (last && current) {
        if (current + 1 === last) {
          console.log('highlist last', current + 1, last);
          return $('a', $last);
        } else {
          if (current + 1 === last - 1) {
            console.log('get rid of ...');
            $active.next().remove();
          }
          $previous = $('a', $active.prevAll().andSelf());
          $previous.each(function() {
            return $(this).text(Number($(this).text()) + 1);
          });
          return $('a', $active);
        }
      } else {
        console.log('NaN?', last, current);
        return $('a', $active);
      }
      console.log('reached end');
      return $('a', $active.next());
    };

    return RowTV;

  })();


  /*
     *# Module definition
    Called by require.
   */

  define(function() {
    return RowTV;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlcyI6WyJyb3cuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxLQUFBOztBQUFBLEVBVU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxlQUFDLEVBQUQsR0FBQTtBQUNYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLEdBQUYsR0FBUSxDQUFBLENBQUUsRUFBRixDQUZSLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQSxDQUFFLFFBQUYsRUFBWSxFQUFaLENBSFgsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFDLEtBQUYsR0FBVSxDQUFBLENBQUUsT0FBRixFQUFXLElBQUMsQ0FBQyxNQUFiLENBSlYsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFDLFlBQUYsR0FBaUIsQ0FBQSxDQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FMakIsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFDLFNBQUYsR0FBYyxJQUFDLENBQUMsR0FBRyxDQUFDLElBQU4sQ0FBVyxXQUFYLENBQUEsSUFBMkIsTUFOekMsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFDLGFBQUYsR0FBa0IsQ0FBQSxDQUFFLGdCQUFGLENBQW1CLENBQUMsR0FBcEIsQ0FBd0IsRUFBeEIsQ0FQbEIsQ0FBQTtBQUFBLE1BUUEsSUFBQyxDQUFDLFdBQUYsR0FBZ0IsQ0FBQSxDQUFHLGlCQUFBLEdBQWdCLElBQUMsQ0FBQyxTQUFsQixHQUE2QixJQUFoQyxDQVJoQixDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUMsZ0JBQUYsR0FBcUIsQ0FBQSxDQUFFLDRCQUFGLENBVHJCLENBQUE7QUFBQSxNQVVBLElBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFuQixDQUE0QixPQUE1QixDQVZBLENB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