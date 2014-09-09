###
  # Navigation
  Controls the display of the navigation
  menu trhough desktop and tablet.
###

class Navigation
  self = undefined

  ###
    ## Constructor
  ###
  constructor: ($el) ->
    # Log: construction event
    @log.add 'notification', 'Constructed.', @

    # Objects
    @.$el = $el
    @.$topLis = $ '.menu > li', $el
    @.$subUls = $ '> ul', @.$topLis
    @.$navIcon = $ '.topbar .navicon'
    @.$expander = $ '.desktopExpander'

    # Swipe base settings
    @.swipeSettings = {
      swipe: @.swipeTopUl
      fingers: 'all'
      excludedElements: 'button'
      tap: @.clickTap
      threshold: 10
      allowPageScroll: 'vertical'
    }

    # this/that
    self = @

    # Bind up events with methods
    @.bind()

    # Add class for subUl parents
    @.hasSub(@.$subUls)

    # Add controls for expander (desktop)
    @.expanderControls.setup()

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'Navigation'

  ###
    ## this.bind
    Bind up events with actions.
  ###
  bind: ->
    # Log: method called.
    @log.add 'notification', 'Bind method called.', @

    # Mobile expand
    @.$navIcon.click @.mobileToggle

    # Prevent a default anchor link action
    # when clicked if the parent haas a sub menu
    @.topLiClicked = false
    $('>a', @.$topLis).on 'click touchend', (e) ->
      return false if self.topLiClicked
      self.topLiClicked = true
      setTimeout ->
        self.topLiClicked = false
      , 400
      # If we're in desktop ignore this event
      if Response.viewportW() > 767
        self.clickTopLi(e, @)
      else
        e.preventDefault()
        # Log: Natural click prevented
        self.log.add 'notification', 'Prevented click event, defered to tap (touchSwipe lib).', @

    # Bind swipe for mobile menu
    @.$el.swipe @.swipeSettings

  ###
    ## this.clickTap
    A catch all method for click and touch/tap events
    directed out of the swipe library.
  ###
  clickTap: (e, target) ->
    # If we're in desktop ignore this event
    if Response.viewportW() > 766
      console.log('working in right area');
      self.isLink($target, true)
      return true

    # Log: Method called
    self.log.add 'notification', 'clickTap method called.', @

    # Get target element and parent LI
    $target = $(target)

    # Catch if its a back button and trigger the click event appropriately
    if $target.hasClass('mobileclose') or $target.hasClass('mobileback')
      # Log: Is a back button
      self.log.add 'notification', 'Clicked element was a back/close element.', @

      # Prevent link click
      e.preventDefault()
      e.stopPropagation()

      # Trigger close method if close button clicked
      return self.mobileToggle(e) if $target.hasClass('mobileclose')

      return self.mobileHideSubUl($target.parent('.mobileShow')) if $target.hasClass('mobileback')

    # Check for parent LI
    $parentLi = $target.parent('li.hasSubMenu')

    if $parentLi.length > 0
      # Get submenu object if it exists
      $subUl = $('>ul', $parentLi)

      # If we have no submenu ignore event
      if $subUl.length > 0
        # Prevent link click
        e.preventDefault()
        e.stopPropagation()

        # Show menu
        return self.mobileShowSubUl $subUl

    return self.isLink($target, true)

  ###
    ## this.isLink
    If a target is a link it will return true.
    Can also be flagged to relocate window to said link if need be
  ###
  isLink: (target, forward) ->
    $target = $(target)
    if $target.is('a') and $target.attr('href')?
      if forward then window.location = $target.attr('href')
      return true
    else
      return false

  ###
    ## this.hasSub
    Adds a class to list items that have
    a sub menu to them.
  ###
  hasSub: ($uls) ->
    $uls.parents('li').addClass('hasSubMenu')

  ###
    ## this.expanderControls
    Adds the navigation (desktop) controls for the expander
    based navigation. [left/right/close]
  ###
  expanderControls:
    leftClicked: false
    rightClicked: false
    closeClicked: false
    # ### this.expanderControls.setup
    # This method is initially called to add the controls
    # on DOM ready.
    setup: () ->
      this.swipe()
      this.create()

    # ### this.expanderControls.swipe
    swipe: (e, direction, distance, duration, fingerCount) ->
      if distance > 50
        if direction == 'left'
          self.$controls.$right.trigger 'click'
        else if direction == 'right'
          self.$controls.$left.trigger 'click'

    # ### this.expanderControls.create
    create: () ->
      self.$controls = $('<div/>').addClass('controls')
      self.$controls.$left = $('<div/>').addClass('icon-arrows left').text('Left')
      self.$controls.$right = $('<div/>').addClass('icon-arrows right').text('Right')
      self.$controls.$close = $('<div/>').addClass('close').html('<span class="icon-smallarrows up">Close</span>')

      self.log.add 'notice', 'expanderControls.setup: Created controls', self.$controls

      # Bind click events
      self.$controls.$left.bind 'click touchend', this.left
      self.$controls.$right.bind 'click touchend', this.right
      self.$controls.$close.bind 'click touchend', this.close

      self.$controls.append(self.$controls.$left, self.$controls.$right, self.$controls.$close)
      self.$expander.append(self.$controls)

    # ### this.expanderControls.left
    left: (e) ->
      return false if self.expanderControls.leftClicked
      self.expanderControls.leftClicked = true
      setTimeout ->
        self.expanderControls.leftClicked = false
      , 400

      e.stopImmediatePropagation()
      $menus = self.$topLis.siblings('.hasSubMenu')
      $active = $menus.siblings('.shown')
      count = $menus.length-1
      index = $menus.index $active
      next = if index-1 < 0 then count else index-1

      # Select the previous item and pass it to the `this.clickTopLi` method
      self.clickTopLi e, $menus.eq(next).children('a')

    # ### this.expanderControls.right
    right: (e) ->
      return false if self.expanderControls.rightClicked
      self.expanderControls.rightClicked = true
      setTimeout ->
        self.expanderControls.rightClicked = false
      , 400

      e.stopImmediatePropagation()
      $menus = self.$topLis.siblings('.hasSubMenu')
      $active = $menus.siblings('.shown')
      count = $menus.length-1
      index = $menus.index $active
      next = if index+1 > count then 0 else index+1

      # Select the next item and pass it to the `this.clickTopLi` method
      self.clickTopLi e, $menus.eq(next).children('a')

    # ### this.expanderControls.close
    close: (e) ->
      return false if self.expanderControls.closeClicked
      self.expanderControls.closeClicked = true
      setTimeout ->
        self.expanderControls.closeClicked = false
      , 400

      e.stopImmediatePropagation()
      if !flag
        flag = true
        $active = self.$topLis.siblings('.shown')
        self.clickTopLi e, $active.children('a')

        setTimeout ->
          flag = false
        , 50

  ###
    ## this.clickTopLi
    Desktop interaction with top menu item, this will expand
    the navigation pushing the page down.
  ###
  clickTopLi: (e, target) ->
    # If we're in mobile ignore this event
    return false if Response.viewportW() < 768

    # Grab Submenu, if it doesn't exist do nothing more
    $parentLi = $(target).parent('li')
    $subUl = $('> ul', $parentLi)
    return true unless $subUl.length > 0
    e.preventDefault()
    e.stopImmediatePropagation()

    self.flag = typeof self.flag == 'undefined' ? false : self.flag

    # If click is the already shown nav we hide the expander
    if $parentLi.hasClass 'shown'
      self.adjustExpander 0
      # Allow time for the animation to finish before we
      # remove the shown state from this item
      setTimeout ->
        $parentLi.removeClass 'shown'
      , 500
    # Else we close the active item and show the next item
    else
      self.$topLis.removeClass 'shown'
      $parentLi.addClass 'shown'

      self.adjustExpander $subUl.outerHeight()

  ###
    ## this.adjustExpander
    This method adjusts the height of the expander element
    which reveals the submenu on desktop.
  ###
  adjustExpander: (height) ->

    # Ignore the resize event for now
    if height == 'resize'
      return false if $('html').hasClass('lt-ie9')
      setTimeout =>
        self.adjustExpander 'delayedResize'
      , 2000
      return false

    # If the height is not specified
    if typeof height != 'number'
      # Check for an existing active item
      $activeLi = self.$topLis.siblings('.shown');

      # If we have an active item set height to equal it
      if $activeLi.length > 0
        height = $('> ul', $activeLi).outerHeight()
      else
        self.log.add 'error', 'adjustExpander: Height not a number', height
        return false

    # If we are opening we will want to add some space at the bottom
    if height > 0
      height = height + 30

    # Set height for expander
    self.$expander.animate {'height', height}, 500

    # On first time subscribe to resize event to change height of
    # expander on viewport change.
    if !self.expResize?
      self.expResize = PubSub.subscribe 'resize', self.adjustExpander

  ###
    ## this.mobileToggle
    Expands and collapses the mobile navigataion.
  ###
  mobileToggle: (e) ->
    e.preventDefault()

    # Log: Method called
    self.log.add 'notification', 'mobileToggle method called.', @

    $mobileMainTitle = $ '.mobileMainTitle', self.$el
    # If the main title does not exist, we add it
    if $mobileMainTitle.length < 1
      $mobileMainTitle = $ '<div class="mobileMainTitle mobileCategory mobileclose" />'
      $mobileMainTitle.text 'Home'
      self.$topLis.first().before $mobileMainTitle

      # Log: Creation event
      self.log.add 'notification', 'Main title created, this is created only once.', $mobileMainTitle

    $closeOverlay = $ '.mobileNavOverlay'
    # If the close overlay does not exist, we add it
    # This is overlayed on the body so clicks to the right will close nav
    if $closeOverlay.length < 1
      $closeOverlay = $ '<div class="mobileNavOverlay" />'
      $closeOverlay.text 'Close'
      $('body').prepend $closeOverlay

      # Take the base swipe settings and modify for purpose
      settings = self.swipeSettings
      settings.tap = self.mobileToggle
      settings.allowPageScroll = 'vertical'
      $closeOverlay.swipe settings

      # Log: Creation event
      self.log.add 'notification', 'Close overlay created, this is created only once.', $closeOverlay

    setTimeout ->
      $('html')
        .toggleClass('showMobileMenu')
    , 50

  ###
    ## this.mobileShowSubUl
    Show submenu on mobile.
  ###
  mobileShowSubUl: ($subUl) ->
    # Log: Method called
    self.log.add 'notification', 'mobileShowSubUl method called.', $subUl

    # Baack element object
    $landingPage = $ '.landing', $subUl

    # Create landing page button
    if $landingPage.length < 1
      $landingPage = $ '<div class="landing" />'
      $landingPage.html $subUl.parent('li').children('a').first()[0].outerHTML
      $('a', $landingPage).append ' Main'
      $subUl.prepend $landingPage

      # Log: Creation event
      self.log.add 'notification', 'Landing page (top level link) created, this is created only once.', $landingPage

    $mobileCategory = $ '.mobileCategory', $subUl
    # If the category title does not exist, we add it
    if $mobileCategory.length < 1
      $mobileCategory = $ '<div class="mobileCategory mobileback" />'
      $mobileCategory.html $subUl.parent('li').children('a').text()
      $landingPage.before $mobileCategory

      # Log: Creation event
      self.log.add 'notification', 'Category item created, this is created only once.', $mobileCategory

    $subUl.addClass('mobileShow')

    # Bind swipes to this element
    # $subUl.bind('touchstart', self.swipeLeft)
    settings = @.swipeSettings
    settings.swipe = self.swipeSubUl
    settings.tap = @.clickTap
    $subUl.swipe settings

  ###
    ## this.mobileHideSubUl
    Hide submenu on mobile.
  ###
  mobileHideSubUl: ($subUl) ->
    setTimeout ->
      $subUl.removeClass('mobileShow')
    , 100

  ###
    ## this.swipeTopUl
    On touch start begin moving the selected element
  ###
  swipeTopUl: (e, direction, distance, duration, fingerCount) ->
    # If we're in desktop pass to expander controls
    if Response.viewportW() > 767
      return self.expanderControls.swipe(e, direction, distance, duration, fingerCount)

    # Prevent bubble
    e.stopPropagation()

    # Scope current element
    $el = self.$el

    if direction == 'left'
      if distance > 50
        # Log: Menu closed
        self.log.add 'notification', 'Mobile menu closed with swipe.', $el

        # If we swiped we stop the event
        # this prevents links firing and other such events
        e.preventDefault()

        $('html').removeClass('showMobileMenu')

  ###
    ## this.swipeTopUlReset
    A reset method called at several points within the
    swipe method. Abstraction method.
  ###
  swipeTopUlReset: ($el) ->
    $el.removeClass('removetrans').css('transform', '')

  ###
    ## this.swipeSubUl
    On touch start begin moving the selected element
    Unfortunately we cannot use the same method as the top
    menu as we need to change different properties.
  ###
  swipeSubUl: (e, direction, distance, duration, fingerCount) ->
    # If we're in desktop ignore this event
    return false if Response.viewportW() > 767

    # Prevent bubble
    e.stopPropagation()

    # Scope current element
    $el = $(@)

    # only do work if we're going left
    # we may need to expand this action later to account for
    # left to down swipes or other such cases. Testing will reveal
    # any quirks with direction.
    if direction == 'left'
      if distance > 50
        # Log: Menu closed
        self.log.add 'notification', 'Sub menu closed with swipe.', $el

        # If we swiped we stop the event
        # this prevents links firing and other such events
        e.preventDefault()

        $el.removeClass('mobileShow').css('margin-left', '')

        # Remove bindings
        $el.swipe 'destroy'

  ###
    ## this.swipeSubUlReset
    A reset method called at several points within the
    swipe method. Abstraction method.
  ###
  swipeSubUlReset: ($el) ->
    $el.removeClass('removetrans').css('margin-left', '')

###
## Init
###
navigation = new Navigation $('.navigation')