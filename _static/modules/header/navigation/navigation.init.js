/*
  # Navigation
  Controls the display of the navigation
  menu trhough desktop and tablet.
*/


(function() {
  var Navigation, navigation;

  Navigation = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
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
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    Navigation.prototype.log = new LogHandler('Navigation');

    /*
      ## this.bind
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
      ## this.clickTap
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
      ## this.hasSub
      Adds a class to list items that have
      a sub menu to them.
    */


    Navigation.prototype.hasSub = function($uls) {
      return $uls.parents('li').addClass('hasSubMenu');
    };

    /*
      ## this.expanderControls
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
      ## this.clickTopLi
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
      ## this.adjustExpander
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
      ## this.mobileToggle
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
      ## this.mobileShowSubUl
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
      ## this.mobileHideSubUl
      Hide submenu on mobile.
    */


    Navigation.prototype.mobileHideSubUl = function($subUl) {
      return setTimeout(function() {
        return $subUl.removeClass('mobileShow');
      }, 100);
    };

    /*
      ## this.swipeTopUl
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
      ## this.swipeTopUlReset
      A reset method called at several points within the
      swipe method. Abstraction method.
    */


    Navigation.prototype.swipeTopUlReset = function($el) {
      return $el.removeClass('removetrans').css('transform', '');
    };

    /*
      ## this.swipeSubUl
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
      ## this.swipeSubUlReset
      A reset method called at several points within the
      swipe method. Abstraction method.
    */


    Navigation.prototype.swipeSubUlReset = function($el) {
      return $el.removeClass('removetrans').css('margin-left', '');
    };

    return Navigation;

  })();

  /*
  ## Init
  */


  navigation = new Navigation($('.navigation'));

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5pbml0LmpzIiwic291cmNlcyI6WyJuYXZpZ2F0aW9uLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsZ0JBQUE7O0NBQUEsQ0FNTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLGdCQUFDO0NBRVosQ0FBeUIsQ0FBckIsQ0FBSCxFQUFELFFBQUE7Q0FBQSxFQUdBLENBQUMsRUFBRDtDQUhBLENBSTRCLENBQWhCLENBQVgsRUFBRCxDQUFBLEtBQVk7Q0FKWixDQUtzQixDQUFWLENBQVgsRUFBRCxDQUFBO0NBTEEsRUFNYSxDQUFaLEVBQUQsRUFBQSxVQUFhO0NBTmIsRUFPYyxDQUFiLEVBQUQsR0FBQSxTQUFjO0NBUGQsRUFVa0IsQ0FBakIsRUFBRCxPQUFBO0NBQWtCLENBQ1QsRUFBQyxDQUFSLEdBQUEsRUFEZ0I7Q0FBQSxDQUVQLEdBRk8sRUFFaEIsQ0FBQTtDQUZnQixDQUdFLE1BQWxCLFFBQUE7Q0FIZ0IsQ0FJWCxDQUFMLENBQU0sSUFBTjtDQUpnQixDQUtMLE1BQVgsQ0FBQTtDQUxnQixDQU1DLE1BQWpCLEVBTmdCLEtBTWhCO0NBaEJGLE9BQUE7Q0FBQSxFQW9CTyxDQUFQLEVBQUE7Q0FwQkEsR0F1QkMsRUFBRDtDQXZCQSxHQTBCQyxFQUFELENBQUE7Q0ExQkEsR0E2QkMsQ0FBRCxDQUFBLFVBQWtCO0NBcENwQixJQUthOztDQWlDYjs7Ozs7O0NBdENBOztDQUFBLEVBNENBLENBQVMsTUFBQSxFQUFBOztDQUVUOzs7O0NBOUNBOztDQUFBLEVBa0RNLENBQU4sS0FBTTtDQUVKLENBQXlCLENBQXJCLENBQUgsRUFBRCxRQUFBLE9BQUE7Q0FBQSxHQUdDLENBQUQsQ0FBQSxFQUFVLElBQVY7Q0FIQSxDQU9PLENBQVAsQ0FBUSxFQUFSLENBQUEsRUFBK0I7Q0FFN0IsRUFBMEIsQ0FBdkIs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