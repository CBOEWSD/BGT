
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
      this.$showWithAll = $('.items .showWithAll', el);
      this.subscribe = this.$el.data('subscribe') || void 0;
      this.$allOtherRows = $('.widget-tv.row').not(el);
      this.$publishers = $("[data-publish='" + this.subscribe + "']");
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
          return _this.actionToggleAll(e);
        };
      })(this));
      this.$total.bind('click', (function(_this) {
        return function(e) {
          return _this.actionToggleAll(e);
        };
      })(this));
      if (this.subscribe) {
        PubSub.subscribe(this.subscribe, (function(_this) {
          return function(event, from) {
            return _this.actionToggleAll();
          };
        })(this));
      }
      this.$el.bind('reset', (function(_this) {
        return function() {
          _this.$el.slideDown();
          return _this.actionHideAll(false);
        };
      })(this));
      return this.$el.bind('resetfilter', (function(_this) {
        return function() {
          return _this.actionHideAll(false);
        };
      })(this));
    };


    /*
     *# this.actionToggleAll
    Called when all should be revealed or hidden for a certain category.
     */

    RowTV.prototype.actionToggleAll = function(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$viewAll.hasClass('shown') && this.$el.is(':visible')) {
        return this.actionHideAll(true);
      } else {
        return this.actionShowAll();
      }
    };

    RowTV.prototype.actionShowAll = function() {
      $('.item:hidden:first', this.$items).nextAll().andSelf().fadeIn();
      this.$showWithAll.fadeIn();
      this.showJustMe();
      this.$viewAll.addClass('shown');
      this.$publishers.addClass('shown');
      return this.$allOtherRows.trigger('resetfilter');
    };

    RowTV.prototype.actionHideAll = function(trigger) {
      $('.item:nth-child(n+5)', this.$items).fadeOut();
      this.$showWithAll.fadeOut();
      this.$viewAll.removeClass('shown');
      this.$publishers.removeClass('shown');
      if (trigger) {
        return this.$allOtherRows.trigger('reset');
      }
    };


    /*
     *# this.actionNextFour
    Can show only 4 new items for a given category.
     */

    RowTV.prototype.actionNextFour = function(e) {
      e.preventDefault();
      return $('.item:hidden:first', this.$items).nextAll(".item:lt(3)").andSelf().fadeIn();
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

    RowTV.prototype.showEveryone = function() {
      return this.$allOtherRows.slideDown(500, function() {
        return PubSub.publish('LazyLoadPoll');
      });
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlcyI6WyJyb3cuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxLQUFBOztBQUFBLEVBVU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxlQUFDLEVBQUQsR0FBQTtBQUNYLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFDLEdBQUYsR0FBUSxDQUFBLENBQUUsRUFBRixDQUZSLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQSxDQUFFLFFBQUYsRUFBWSxFQUFaLENBSFgsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFDLFlBQUYsR0FBaUIsQ0FBQSxDQUFFLHFCQUFGLEVBQXlCLEVBQXpCLENBSmpCLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQyxTQUFGLEdBQWMsSUFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFOLENBQVcsV0FBWCxDQUFBLElBQTJCLE1BTHpDLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxhQUFGLEdBQWtCLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLEdBQXBCLENBQXdCLEVBQXhCLENBTmxCLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQyxXQUFGLEdBQWdCLENBQUEsQ0FBRyxpQkFBQSxHQUFnQixJQUFDLENBQUMsU0FBbEIsR0FBNkIsSUFBaEMsQ0FQaEIsQ0FBQTtBQUFBLE1BU0EsSUFBQyxDQUFDLFdBQUYsQ0FBQSxDQVRBLENBQUE7QUFZQSxhQUFPLElBQVAsQ0FiVztJQUFBLENBTGI7O0FBb0JBO0FBQUE7OztPQXBCQTs7QUFBQSxvQkF3QkEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFDLFFBQUYsR0FBYSxDQUFBLENBQUUsVUFBRixFQUFjLElBQUMsQ0FBQyxHQUFoQixD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