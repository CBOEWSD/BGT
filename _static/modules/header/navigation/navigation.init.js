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
      this.topLiClicked = false;
      $('>a', this.$topLis).on('click touchend', function(e) {
        if (self.topLiClicked) {
          return false;
        }
        self.topLiClicked = true;
        setTimeout(function() {
          return self.topLiClicked = false;
        }, 400);
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
      if (Response.viewportW() > 766) {
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
      leftClicked: false,
      rightClicked: false,
      closeClicked: false,
      setup: function() {
        this.swipe();
        return this.create();
      },
      swipe: function(e, direction, distance, duration, fingerCount) {
        if (distance > 50) {
          if (direction === 'left') {
            return self.$controls.$right.trigger('click');
          } else if (direction === 'right') {
            return self.$controls.$left.trigger('click');
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
        if (self.expanderControls.leftClicked) {
          return false;
        }
        self.expanderControls.leftClicked = true;
        setTimeout(function() {
          return self.expanderControls.leftClicked = false;
        }, 400);
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
        if (self.expanderControls.rightClicked) {
          return false;
        }
        self.expanderControls.rightClicked = true;
        setTimeout(function() {
          return self.expanderControls.rightClicked = false;
        }, 400);
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
        if (self.expanderControls.closeClicked) {
          return false;
        }
        self.expanderControls.closeClicked = true;
        setTimeout(function() {
          return self.expanderControls.closeClicked = false;
        }, 400);
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
      var $activeLi,
        _this = this;
      if (height === 'resize') {
        if ($('html').hasClass('lt-ie9')) {
          return false;
        }
        setTimeout(function() {
          return self.adjustExpander('delayedResize');
        }, 2000);
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
        return self.expanderControls.swipe(e, direction, distance, duration, fingerCount);
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
