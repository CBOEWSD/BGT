(function() {
  var Navigation, navigation;

  Navigation = (function() {
    var self;

    self = void 0;

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

    Navigation.prototype.log = new LogHandler('Navigation');

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

    Navigation.prototype.hasSub = function($uls) {
      return $uls.parents('li').addClass('hasSubMenu');
    };

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
        settings.allowPageScroll = 'none';
        $closeOverlay.swipe(settings);
        self.log.add('notification', 'Close overlay created, this is created only once.', $closeOverlay);
      }
      return setTimeout(function() {
        return $('body').toggleClass('showMobileMenu');
      }, 50);
    };

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

    Navigation.prototype.mobileHideSubUl = function($subUl) {
      return setTimeout(function() {
        return $subUl.removeClass('mobileShow');
      }, 100);
    };

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
              return $('body').removeClass('showMobileMenu');
            }, 50);
          } else {
            return self.swipeTopUlReset($el);
          }
        }
      } else {
        return self.swipeTopUlReset($el);
      }
    };

    Navigation.prototype.swipeTopUlReset = function($el) {
      return $el.removeClass('removetrans').css('transform', '');
    };

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

    Navigation.prototype.swipeSubUlReset = function($el) {
      return $el.removeClass('removetrans').css('margin-left', '');
    };

    return Navigation;

  })();

  navigation = new Navigation($('.navigation'));

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5pbml0LmpzIiwic291cmNlcyI6WyJuYXZpZ2F0aW9uLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0NBQUEsS0FBQSxnQkFBQTs7Q0FBQSxDQUFNO0NBQ0osR0FBQSxJQUFBOztDQUFBLEVBQU8sQ0FBUCxFQUFBOztDQUdhLEVBQUEsQ0FBQSxnQkFBQztDQUVaLENBQXlCLENBQXJCLENBQUgsRUFBRCxRQUFBO0NBQUEsRUFHQSxDQUFDLEVBQUQ7Q0FIQSxDQUk0QixDQUFoQixDQUFYLEVBQUQsQ0FBQSxLQUFZO0NBSlosQ0FLc0IsQ0FBVixDQUFYLEVBQUQsQ0FBQTtDQUxBLEVBTWEsQ0FBWixFQUFELEVBQUEsVUFBYTtDQU5iLEVBT2MsQ0FBYixFQUFELEdBQUEsU0FBYztDQVBkLEVBVWtCLENBQWpCLEVBQUQsT0FBQTtDQUFrQixDQUNILEVBQUMsSUFBZCxFQURnQixDQUNoQjtDQURnQixDQUVQLEdBRk8sRUFFaEIsQ0FBQTtDQUZnQixDQUdFLE1BQWxCLFFBQUE7Q0FIZ0IsQ0FJWCxDQUFMLENBQU0sSUFBTjtDQUpnQixDQUtMLE1BQVgsQ0FBQTtDQUxnQixDQU1DLE1BQWpCLEVBTmdCLEtBTWhCO0NBaEJGLE9BQUE7Q0FBQSxFQW9CTyxDQUFQLEVBQUE7Q0FwQkEsR0F1QkMsRUFBRDtDQXZCQSxHQTBCQyxFQUFELENBQUE7Q0ExQkEsR0E2QkMsQ0FBRCxDQUFBLFVBQWtCO0NBbENwQixJQUdhOztDQUhiLEVBd0NBLENBQVMsTUFBQSxFQUFBOztDQXhDVCxFQTRDTSxDQUFOLEtBQU07Q0FFSixDQUF5QixDQUFyQixDQUFILEVBQUQsUUFBQSxPQUFBO0NBQUEsR0FHQyxDQUFELENBQUEsRUFBVSxJQUFWO0NBSEEsQ0FPTyxDQUFQLENBQVEsRUFBUixDQUFBLEVBQXdDLE9BQXhDO0NBRUUsRUFBMEIsQ0FBdkIsSUFBSCxDQUFHO0NBQ0ksQ0FBYyxFQUFmLE1BQUosT0FBQTtNQURGLElBQUE7Q0FHRSxTQUFBLElB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