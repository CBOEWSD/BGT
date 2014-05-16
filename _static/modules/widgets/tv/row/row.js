
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
