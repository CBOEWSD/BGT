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
        swipeStatus: this.swipeTopUl,
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
      $('a', this.$topLis).on('click touchend', function(e) {
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
        self.$controls.$left.bind('click touchstart', this.left);
        self.$controls.$right.bind('click touchstart', this.right);
        self.$controls.$close.bind('click touchstart', this.close);
        self.$controls.append(self.$controls.$left, self.$controls.$right, self.$controls.$close);
        return self.$expander.append(self.$controls);
      },
      left: function(e) {
        var $active, $menus, count, index, next;
        $menus = self.$topLis.siblings('.hasSubMenu');
        $active = $menus.siblings('.shown');
        count = $menus.length - 1;
        index = $menus.index($active);
        next = index - 1 < 0 ? count : index - 1;
        return self.clickTopLi(e, $menus.eq(next).children('a'));
      },
      right: function(e) {
        var $active, $menus, count, index, next;
        $menus = self.$topLis.siblings('.hasSubMenu');
        $active = $menus.siblings('.shown');
        count = $menus.length - 1;
        index = $menus.index($active);
        next = index + 1 > count ? 0 : index + 1;
        return self.clickTopLi(e, $menus.eq(next).children('a'));
      },
      close: function(e) {
        var $active;
        $active = self.$topLis.siblings('.shown');
        return self.clickTopLi(e, $active.children('a'));
      }
    };

    /*
      ## this.clickTopLi
      Desktop interaction with top menu item, this will expand
      the navigation pushing the page down.
    */


    Navigation.prototype.clickTopLi = function(e, target) {
      var $parentLi, $subUl;
      if (Response.viewportW() < 768) {
        return false;
      }
      $parentLi = $(target).parent('li');
      $subUl = $('> ul', $parentLi);
      if (!($subUl.length > 0)) {
        return true;
      }
      e.preventDefault();
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
      settings.swipeStatus = self.swipeSubUl;
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


    Navigation.prototype.swipeTopUl = function(e, phase, direction, distance, duration, fingerCount) {
      var $el;
      if (Response.viewportW() > 767) {
        return self.expanderControls.swipe(e, phase, direction, distance, duration, fingerCount);
      }
      e.stopPropagation();
      $el = self.$el;
      if (direction === 'left') {
        $el.addClass('removetrans');
        $el.css('transform', "translateX(-" + distance + "px)");
        if (phase === 'end') {
          if (distance > 50) {
            self.log.add('notification', 'Mobile menu closed with swipe.', $el);
            e.preventDefault();
            return setTimeout(function() {
              $el.removeClass('removetrans').css('transform', '');
              return $('html').removeClass('showMobileMenu');
            }, 50);
          } else {
            return self.swipeTopUlReset($el);
          }
        }
      } else {
        return self.swipeTopUlReset($el);
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


    Navigation.prototype.swipeSubUl = function(e, phase, direction, distance, duration, fingerCount) {
      var $el;
      if (Response.viewportW() > 767) {
        return false;
      }
      e.stopPropagation();
      $el = $(this);
      if (direction === 'left') {
        $el.addClass('removetrans');
        $el.css('margin-left', -distance);
        if (phase === 'end') {
          if (distance > 50) {
            self.log.add('notification', 'Sub menu closed with swipe.', $el);
            e.preventDefault();
            return setTimeout(function() {
              $el.removeClass('mobileShow removetrans').css('margin-left', '');
              return $el.swipe('destroy');
            }, 50);
          } else {
            return self.swipeSubUlReset($el);
          }
        }
      } else {
        return self.swipeSubUlReset($el);
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5pbml0LmpzIiwic291cmNlcyI6WyJuYXZpZ2F0aW9uLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsZ0JBQUE7O0NBQUEsQ0FNTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLGdCQUFDO0NBRVosQ0FBeUIsQ0FBckIsQ0FBSCxFQUFELFFBQUE7Q0FBQSxFQUdBLENBQUMsRUFBRDtDQUhBLENBSTRCLENBQWhCLENBQVgsRUFBRCxDQUFBLEtBQVk7Q0FKWixDQUtzQixDQUFWLENBQVgsRUFBRCxDQUFBO0NBTEEsRUFNYSxDQUFaLEVBQUQsRUFBQSxVQUFhO0NBTmIsRUFPYyxDQUFiLEVBQUQsR0FBQSxTQUFjO0NBUGQsRUFVa0IsQ0FBakIsRUFBRCxPQUFBO0NBQWtCLENBQ0gsRUFBQyxJQUFkLEVBRGdCLENBQ2hCO0NBRGdCLENBRVAsR0FGTyxFQUVoQixDQUFBO0NBRmdCLENBR0UsTUFBbEIsUUFBQTtDQUhnQixDQUlYLENBQUwsQ0FBTSxJQUFOO0NBSmdCLENBS0wsTUFBWCxDQUFBO0NBTGdCLENBTUMsTUFBakIsRUFOZ0IsS0FNaEI7Q0FoQkYsT0FBQTtDQUFBLEVBb0JPLENBQVAsRUFBQTtDQXBCQSxHQXVCQyxFQUFEO0NBdkJBLEdBMEJDLEVBQUQsQ0FBQTtDQTFCQSxHQTZCQyxDQUFELENBQUEsVUFBa0I7Q0FwQ3BCLElBS2E7O0NBaUNiOzs7Ozs7Q0F0Q0E7O0NBQUEsRUE0Q0EsQ0FBUyxNQUFBLEVBQUE7O0NBRVQ7Ozs7Q0E5Q0E7O0NBQUEsRUFrRE0sQ0FBTixLQUFNO0NBRUosQ0FBeUIsQ0FBckIsQ0FBSCxFQUFELFFBQUEsT0FBQTtDQUFBLEdBR0MsQ0FBRCxDQUFBLEVBQVUsSUFBVjtDQUhBLENBT08sQ0FBUCxDQUFRLEVBQVIsQ0FBQSxFQUF3QyxPQUF4QztDQUVFLEVBQTBC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