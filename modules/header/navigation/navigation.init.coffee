# # Navigation
# Controls the display of the navigation
# menu trhough desktop and tablet.

class Navigation
  self = undefined

  # ## Constructor
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
      swipeStatus: @.swipeTopUl
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

  # ## this.log
  # Add local instance of logging to this module.
  # Can be called with:
  # ``` @log.add 'notification', 'message...', @ ```
  log: new LogHandler 'Navigation'

  # ## this.bind
  # Bind up events with actions.
  bind: ->
    # Log: method called.
    @log.add 'notification', 'Bind method called.', @

    # Mobile expand
    @.$navIcon.click @.mobileToggle

    # Prevent a default anchor link action
    # when clicked if the parent haas a sub menu
    $('a', @.$topLis).on 'click', (e) ->
      # If we're in desktop ignore this event
      if Response.viewportW() > 767
        self.clickTopLi(e, @)
      else
        e.preventDefault()
        # Log: Natural click prevented
        self.log.add 'notification', 'Prevented click event, defered to tap (touchSwipe lib).', @

    # Bind swipe for mobile menu
    @.$el.swipe @.swipeSettings

  # ## this.clickTap
  # A catch all method for click and touch/tap events
  # directed out of the swipe library.
  clickTap: (e, target) ->
    # If we're in desktop ignore this event
    return true if Response.viewportW() > 767

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

      # Triggger close method if close button clicked
      return self.mobileToggle(e) if $target.hasClass('mobileclose')

      return self.mobileHideSubUl($target.parent('.mobileShow')) if $target.hasClass('mobileback')

    # Check for parent LI
    $parentLi = $target.parent('li')

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

    if $target.is('a') and $target.attr('href')?
      # Log: Method called
      self.log.add 'notification', 'Link clicked, directing user to page.', @

      # Redirect page to URL
      window.location = $target.attr('href')

  # ## this.hasSub
  # Adds a class to list items that have
  # a sub menu to them.
  hasSub: ($uls) ->
    $uls.parents('li').addClass('hasSubMenu')

  # ## this.expanderControls
  # Adds the navigation (desktop) controls for the expander
  # based navigation. [left/right/close]
  expanderControls:
    # ### this.expanderControls.setup
    # This method is initially called to add the controls
    # on DOM ready.
    setup: () ->
      self.$controls = $('<div/>').addClass('controls')
      self.$controls.$left = $('<div/>').addClass('icon-arrows left').text('Left')
      self.$controls.$right = $('<div/>').addClass('icon-arrows right').text('Right')
      self.$controls.$close = $('<div/>').addClass('close').text('Close')

      self.log.add 'notice', 'expanderControls.setup: Created controls', self.$controls

      # Bind click events
      self.$controls.$left.bind 'click', this.left
      self.$controls.$right.bind 'click', this.right
      self.$controls.$close.bind 'click', this.close

      self.$controls.append(self.$controls.$left, self.$controls.$right, self.$controls.$close)
      self.$expander.append(self.$controls)

    # ### this.expanderControls.left
    left: (e) ->
      $menus = self.$topLis.siblings('.hasSubMenu')
      $active = $menus.siblings('.shown')
      count = $menus.length-1
      index = $menus.index $active
      next = if index-1 < 0 then count else index-1

      # Select the previous item and pass it to the `this.clickTopLi` method
      self.clickTopLi e, $menus.eq(next).children('a')

    # ### this.expanderControls.right
    right: (e) ->
      $menus = self.$topLis.siblings('.hasSubMenu')
      $active = $menus.siblings('.shown')
      count = $menus.length-1
      index = $menus.index $active
      next = if index+1 > count then 0 else index+1

      # Select the next item and pass it to the `this.clickTopLi` method
      self.clickTopLi e, $menus.eq(next).children('a')

    # ### this.expanderControls.close
    close: (e) ->
      $active = self.$topLis.siblings('.shown')
      self.clickTopLi e, $active.children('a')

  # ## this.clickTopLi
  # Desktop interaction with top menu item, this will expand
  # the navigation pushing the page down.
  clickTopLi: (e, target) ->
    # If we're in mobile ignore this event
    return false if Response.viewportW() < 768

    # Grab Submenu, if it doesn't exist do nothing more
    $parentLi = $(target).parent('li')
    $subUl = $('> ul', $parentLi)
    return true unless $subUl.length > 0
    e.preventDefault()

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

  # ## this.adjustExpander
  # This method adjusts the height of the expander element
  # which reveals the submenu on desktop.
  adjustExpander: (height) ->
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
    self.$expander.css 'height', height

    # On first time subscribe to resize event to change height of
    # expander on viewport change.
    if !self.expResize?
      self.expResize = PubSub.subscribe 'resize', self.adjustExpander

  # ## this.mobileToggle
  # Expands and collapses the mobile navigataion.
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
      settings.allowPageScroll = 'none'
      $closeOverlay.swipe settings

      # Log: Creation event
      self.log.add 'notification', 'Close overlay created, this is created only once.', $closeOverlay

    setTimeout ->
      $('body')
        .toggleClass('showMobileMenu')
    , 50

  # ## this.mobileShowSubUl
  # Show submenu on mobile.
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
    settings.swipeStatus = self.swipeSubUl
    settings.tap = @.clickTap
    $subUl.swipe settings

  # ## this.mobileHideSubUl
  # Hide submenu on mobile.
  mobileHideSubUl: ($subUl) ->
    setTimeout ->
      $subUl.removeClass('mobileShow')
    , 100

  # ## this.swipeTopUl
  # On touch start begin moving the selected element
  swipeTopUl: (e, phase, direction, distance, duration, fingerCount) ->
    # If we're in desktop ignore this event
    return false if Response.viewportW() > 767

    # Prevent bubble
    e.stopPropagation()

    # Scope current element
    $el = self.$el

    # only do work if we're going left
    # we may need to expand this action later to account for
    # left to down swipes or other such cases. Testing will reveal
    # any quirks with direction.
    if direction == 'left'

      $el.addClass('removetrans')
      $el.css 'transform', "translateX(-#{distance}px)"

      if phase == 'end'
        if distance > 50
          # Log: Menu closed
          self.log.add 'notification', 'Mobile menu closed with swipe.', $el

          # If we swiped we stop the event
          # this prevents links firing and other such events
          e.preventDefault()

          # Wait short release before removing
          setTimeout ->
            $el.removeClass('removetrans').css('transform', '')
            $('body').removeClass('showMobileMenu')

          , 50
        else
          self.swipeTopUlReset($el)
    else
      self.swipeTopUlReset($el)

  # ## this.swipeTopUlReset
  # A reset method called at several points within the
  # swipe method. Abstraction method.
  swipeTopUlReset: ($el) ->
    $el.removeClass('removetrans').css('transform', '')

  # ## this.swipeSubUl
  # On touch start begin moving the selected element
  # Unfortunately we cannot use the same method as the top
  # menu as we need to change different properties.
  swipeSubUl: (e, phase, direction, distance, duration, fingerCount) ->
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

      $el.addClass('removetrans')
      $el.css 'margin-left', -distance

      if phase == 'end'
        if distance > 50
          # Log: Menu closed
          self.log.add 'notification', 'Sub menu closed with swipe.', $el

          # If we swiped we stop the event
          # this prevents links firing and other such events
          e.preventDefault()

          # Wait short release before removing
          setTimeout ->
            $el.removeClass('mobileShow removetrans').css('margin-left', '')

            # Remove bindings
            $el.swipe 'destroy'
          , 50
        else
          self.swipeSubUlReset($el)
    else
      self.swipeSubUlReset($el)

  # ## this.swipeSubUlReset
  # A reset method called at several points within the
  # swipe method. Abstraction method.
  swipeSubUlReset: ($el) ->
    $el.removeClass('removetrans').css('margin-left', '')



# ### Init
navigation = new Navigation $('.navigation')