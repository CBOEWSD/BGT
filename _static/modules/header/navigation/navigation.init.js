
/*
   * Navigation
  Controls the display of the navigation
  menu trhough desktop and tablet.
 */

(function() {
  var Navigation, navigation;

  Navigation = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function Navigation($el) {
      this.log.add('notification', 'Constructed.', this);
      this.$el = $el;
      this.$topLis = $('.menu > li', $el);
      this.$subUls = $('> ul', this.$topLis);
      this.$navIcon = $('.topbar .navicon');
      this.$expander = $('.desktopExpander');
      this.swipeSettings = {
        swipe: this.swipeTopUl,
        fingers: 'all',
        excludedElements: 'button',
        tap: this.clickTap,
        threshold: 10,
        allowPageScroll: 'vertical'
      };
      self = this;
      this.bind();
      this.hasSub(this.$subUls);
      this.expanderControls.setup();
    }


    /*
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    Navigation.prototype.log = new LogHandler('Navigation');


    /*
       *# this.bind
      Bind up events with actions.
     */

    Navigation.prototype.bind = function() {
      this.log.add('notification', 'Bind method called.', this);
      this.$navIcon.click(this.mobileToggle);
      $('a', this.$topLis).on('click', function(e) {
        if (Response.viewportW() > 767) {
          return self.clickTopLi(e, this);
        } else {
          e.preventDefault();
          return self.log.add('notification', 'Prevented click event, defered to tap (touchSwipe lib).', this);
        }
      });
      return this.$el.swipe(this.swipeSettings);
    };


    /*
       *# this.clickTap
      A catch all method for click and touch/tap events
      directed out of the swipe library.
     */

    Navigation.prototype.clickTap = function(e, target) {
      var $parentLi, $subUl, $target;
      if (Response.viewportW() > 767) {
        return true;
      }
      self.log.add('notification', 'clickTap method called.', this);
      $target = $(target);
      if ($target.hasClass('mobileclose') || $target.hasClass('mobileback')) {
        self.log.add('notification', 'Clicked element was a back/close element.', this);
        e.preventDefault();
        e.stopPropagation();
        if ($target.hasClass('mobileclose')) {
          return self.mobileToggle(e);
        }
        if ($target.hasClass('mobileback')) {
          return self.mobileHideSubUl($target.parent('.mobileShow'));
        }
      }
      $parentLi = $target.parent('li');
      if ($parentLi.length > 0) {
        $subUl = $('>ul', $parentLi);
        if ($subUl.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          return self.mobileShowSubUl($subUl);
        }
      }
      if ($target.is('a') && ($target.attr('href') != null)) {
        self.log.add('notification', 'Link clicked, directing user to page.', this);
        return window.location = $target.attr('href');
      }
    };


    /*
       *# this.hasSub
      Adds a class to list items that have
      a sub menu to them.
     */

    Navigation.prototype.hasSub = function($uls) {
      return $uls.parents('li').addClass('hasSubMenu');
    };


    /*
       *# this.expanderControls
      Adds the navigation (desktop) controls for the expander
      based navigation. [left/right/close]
     */

    Navigation.prototype.expanderControls = {
      setup: function() {
        this.swipe();
        return this.create();
      },
      swipe: function(e, phase, direction, distance, duration, fingerCount) {
        if (phase === 'end') {
          if (distance > 50) {
            if (direction === 'left') {
              return self.$controls.$right.trigger('click');
            } else if (direction === 'right') {
              return self.$controls.$left.trigger('click');
            }
          }
        }
      },
      create: function() {
        self.$controls = $('<div/>').addClass('controls');
        self.$controls.$left = $('<div/>').addClass('icon-arrows left').text('Left');
        self.$controls.$right = $('<div/>').addClass('icon-arrows right').text('Right');
        self.$controls.$close = $('<div/>').addClass('close').html('<span class="icon-smallarrows up">Close</span>');
        self.log.add('notice', 'expanderControls.setup: Created controls', self.$controls);
        self.$controls.$left.bind('click touchend', this.left);
        self.$controls.$right.bind('click touchend', this.right);
        self.$controls.$close.bind('click touchend', this.close);
        self.$controls.append(self.$controls.$left, self.$controls.$right, self.$controls.$close);
        return self.$expander.append(self.$controls);
      },
      left: function(e) {
        var $active, $menus, count, index, next;
        e.stopImmediatePropagation();
        $menus = self.$topLis.siblings('.hasSubMenu');
        $active = $menus.siblings('.shown');
        count = $menus.length - 1;
        index = $menus.index($active);
        next = index - 1 < 0 ? count : index - 1;
        return self.clickTopLi(e, $menus.eq(next).children('a'));
      },
      right: function(e) {
        var $active, $menus, count, index, next;
        e.stopImmediatePropagation();
        $menus = self.$topLis.siblings('.hasSubMenu');
        $active = $menus.siblings('.shown');
        count = $menus.length - 1;
        index = $menus.index($active);
        next = index + 1 > count ? 0 : index + 1;
        return self.clickTopLi(e, $menus.eq(next).children('a'));
      },
      close: function(e) {
        var $active, flag;
        e.stopImmediatePropagation();
        if (!flag) {
          flag = true;
          $active = self.$topLis.siblings('.shown');
          self.clickTopLi(e, $active.children('a'));
          return setTimeout(function() {
            return flag = false;
          }, 50);
        }
      }
    };


    /*
       *# this.clickTopLi
      Desktop interaction with top menu item, this will expand
      the navigation pushing the page down.
     */

    Navigation.prototype.clickTopLi = function(e, target) {
      var $parentLi, $subUl, _ref;
      if (Response.viewportW() < 768) {
        return false;
      }
      $parentLi = $(target).parent('li');
      $subUl = $('> ul', $parentLi);
      if (!($subUl.length > 0)) {
        return true;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      self.flag = (_ref = typeof self.flag === 'undefined') != null ? _ref : {
        "false": self.flag
      };
      if ($parentLi.hasClass('shown')) {
        self.adjustExpander(0);
        return setTimeout(function() {
          return $parentLi.removeClass('shown');
        }, 500);
      } else {
        self.$topLis.removeClass('shown');
        $parentLi.addClass('shown');
        return self.adjustExpander($subUl.outerHeight());
      }
    };


    /*
       *# this.adjustExpander
      This method adjusts the height of the expander element
      which reveals the submenu on desktop.
     */

    Navigation.prototype.adjustExpander = function(height) {
      var $activeLi;
      if (height === 'resize') {
        setTimeout(function() {
          return self.adjustExpander('delayedResize');
        }, 500);
        return false;
      }
      if (typeof height !== 'number') {
        $activeLi = self.$topLis.siblings('.shown');
        if ($activeLi.length > 0) {
          height = $('> ul', $activeLi).outerHeight();
        } else {
          self.log.add('error', 'adjustExpander: Height not a number', height);
          return false;
        }
      }
      if (height > 0) {
        height = height + 30;
      }
      self.$expander.animate({
        'height': 'height',
        height: height
      }, 500);
      if (self.expResize == null) {
        return self.expResize = PubSub.subscribe('resize', self.adjustExpander);
      }
    };


    /*
       *# this.mobileToggle
      Expands and collapses the mobile navigataion.
     */

    Navigation.prototype.mobileToggle = function(e) {
      var $closeOverlay, $mobileMainTitle, settings;
      e.preventDefault();
      self.log.add('notification', 'mobileToggle method called.', this);
      $mobileMainTitle = $('.mobileMainTitle', self.$el);
      if ($mobileMainTitle.length < 1) {
        $mobileMainTitle = $('<div class="mobileMainTitle mobileCategory mobileclose" />');
        $mobileMainTitle.text('Home');
        self.$topLis.first().before($mobileMainTitle);
        self.log.add('notification', 'Main title created, this is created only once.', $mobileMainTitle);
      }
      $closeOverlay = $('.mobileNavOverlay');
      if ($closeOverlay.length < 1) {
        $closeOverlay = $('<div class="mobileNavOverlay" />');
        $closeOverlay.text('Close');
        $('body').prepend($closeOverlay);
        settings = self.swipeSettings;
        settings.tap = self.mobileToggle;
        settings.allowPageScroll = 'vertical';
        $closeOverlay.swipe(settings);
        self.log.add('notification', 'Close overlay created, this is created only once.', $closeOverlay);
      }
      return setTimeout(function() {
        return $('html').toggleClass('showMobileMenu');
      }, 50);
    };


    /*
       *# this.mobileShowSubUl
      Show submenu on mobile.
     */

    Navigation.prototype.mobileShowSubUl = function($subUl) {
      var $landingPage, $mobileCategory, settings;
      self.log.add('notification', 'mobileShowSubUl method called.', $subUl);
      $landingPage = $('.landing', $subUl);
      if ($landingPage.length < 1) {
        $landingPage = $('<div class="landing" />');
        $landingPage.html($subUl.parent('li').children('a').first()[0].outerHTML);
        $('a', $landingPage).append(' Main');
        $subUl.prepend($landingPage);
        self.log.add('notification', 'Landing page (top level link) created, this is created only once.', $landingPage);
      }
      $mobileCategory = $('.mobileCategory', $subUl);
      if ($mobileCategory.length < 1) {
        $mobileCategory = $('<div class="mobileCategory mobileback" />');
        $mobileCategory.html($subUl.parent('li').children('a').text());
        $landingPage.before($mobileCategory);
        self.log.add('notification', 'Category item created, this is created only once.', $mobileCategory);
      }
      $subUl.addClass('mobileShow');
      settings = this.swipeSettings;
      settings.swipe = self.swipeSubUl;
      settings.tap = this.clickTap;
      return $subUl.swipe(settings);
    };


    /*
       *# this.mobileHideSubUl
      Hide submenu on mobile.
     */

    Navigation.prototype.mobileHideSubUl = function($subUl) {
      return setTimeout(function() {
        return $subUl.removeClass('mobileShow');
      }, 100);
    };


    /*
       *# this.swipeTopUl
      On touch start begin moving the selected element
     */

    Navigation.prototype.swipeTopUl = function(e, direction, distance, duration, fingerCount) {
      var $el;
      if (Response.viewportW() > 767) {
        return self.expanderControls.swipe(e, phase, direction, distance, duration, fingerCount);
      }
      e.stopPropagation();
      $el = self.$el;
      if (direction === 'left') {
        if (distance > 50) {
          self.log.add('notification', 'Mobile menu closed with swipe.', $el);
          e.preventDefault();
          return $('html').removeClass('showMobileMenu');
        }
      }
    };


    /*
       *# this.swipeTopUlReset
      A reset method called at several points within the
      swipe method. Abstraction method.
     */

    Navigation.prototype.swipeTopUlReset = function($el) {
      return $el.removeClass('removetrans').css('transform', '');
    };


    /*
       *# this.swipeSubUl
      On touch start begin moving the selected element
      Unfortunately we cannot use the same method as the top
      menu as we need to change different properties.
     */

    Navigation.prototype.swipeSubUl = function(e, direction, distance, duration, fingerCount) {
      var $el;
      if (Response.viewportW() > 767) {
        return false;
      }
      e.stopPropagation();
      $el = $(this);
      if (direction === 'left') {
        if (distance > 50) {
          self.log.add('notification', 'Sub menu closed with swipe.', $el);
          e.preventDefault();
          $el.removeClass('mobileShow').css('margin-left', '');
          return $el.swipe('destroy');
        }
      }
    };


    /*
       *# this.swipeSubUlReset
      A reset method called at several points within the
      swipe method. Abstraction method.
     */

    Navigation.prototype.swipeSubUlReset = function($el) {
      return $el.removeClass('removetrans').css('margin-left', '');
    };

    return Navigation;

  })();


  /*
   *# Init
   */

  navigation = new Navigation($('.navigation'));

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5pbml0LmpzIiwic291cmNlcyI6WyJuYXZpZ2F0aW9uLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBTU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxvQkFBQyxHQUFELEdBQUE7QUFFWCxNQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLGNBQVQsRUFBeUIsY0FBekIsRUFBeUMsSUFBekMsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUMsR0FBRixHQUFRLEdBSFIsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFDLE9BQUYsR0FBWSxDQUFBLENBQUUsWUFBRixFQUFnQixHQUFoQixDQUpaLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBQSxDQUFFLE1BQUYsRUFBVSxJQUFDLENBQUMsT0FBWixDQUxaLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBQSxDQUFFLGtCQUFGLENBTmIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFDLFNBQUYsR0FBYyxDQUFBLENBQUUsa0JBQUYsQ0FQZCxDQUFBO0FBQUEsTUFVQSxJQUFDLENBQUMsYUFBRixHQUFrQjtBQUFBLFFBQ2hCLEtBQUEsRUFBTyxJQUFDLENBQUMsVUFETztBQUFBLFFBRWhCLE9BQUEsRUFBUyxLQUZPO0FBQUEsUUFHaEIsZ0JBQUEsRUFBa0IsUUFIRjtBQUFBLFFBSWhCLEdBQUEsRUFBSyxJQUFDLENBQUMsUUFKUztBQUFBLFFBS2hCLFNBQUEsRUFBVyxFQUxLO0FBQUEsUUFNaEIsZUFBQSxFQUFpQixVQU5EO09BVmxCLENBQUE7QUFBQSxNQW9CQSxJQUFBLEdBQU8sSUFwQlAsQ0FBQTtBQUFBLE1BdUJBLElBQUMsQ0FBQyxJQUFGLENB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