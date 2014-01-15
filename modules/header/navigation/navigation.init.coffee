# # Navigation
# Controls the display of the navigation
# menu trhough desktop and tablet.

class Navigation
  self = undefined

  # ## Construcotr
  constructor: ($el) ->
    # Objects
    @.$el = $el
    @.$topLis = $ '.menu > li', $el
    @.$subUls = $ '> ul', @.$topLis
    @.$navIcon = $ '.topbar .navicon'

    # this/that
    self = @

    # Bind up events with methods
    @.bind()

    #Add class for subUl parents
    @.hasSub(@.$subUls)

  # ## `this.bind`
  # Bind up events with actions.
  bind: ->
    # Bind hover (mousein and out) event
    @.$topLis.hover @.hoverTopLi

    # Mobile expand
    @.$navIcon.click @.mobileToggle

    # Prevent a default anchor link action
    # when clicked if the parent haas a sub menu
    $('a', @.$topLis).click (e) ->
      # If we're in desktop ignore this event
      return true if Response.viewportW() > 767

      if $(this).parent('li').hasClass('hasSubMenu')
        e.preventDefault()

    # Bind swipe for mobile menu
    @.$el.swipe {
      swipeStatus: @.swipeTopUl
      fingers: 'all'
      excludedElements: 'button'
      tap: @.clickTap
      threshold: 10
      allowPageScroll: 'vertical'
    }

  # ## `this.clickTap`
  # A catch all method for click and touch/tap events
  # directed out of the swipe library.
  clickTap: (e, target) ->
    # If we're in desktop ignore this event
    return true if Response.viewportW() > 767

    # Get target element and parent LI
    $target = $(target)

    # Catch if its a back button and trigger the click event appropriately
    if $target.hasClass('mobileclose') or $target.hasClass('mobileback')
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
      return true if $subUl.length < 1

      # Prevent link click
      e.preventDefault()
      e.stopPropagation()

      # Show menu
      self.mobileShowSubUl $subUl

  # ##`this.hasSub`
  # Adds a class to list items that have
  # a sub menu to them.
  hasSub: ($uls) ->
    $uls.parents('li').addClass('hasSubMenu')

  # ## `this.hoverTopLi`
  # Fired on hover in/out of top level LI elements.
  hoverTopLi: (e) ->
    # If we're in mobile ignore this event
    return false if Response.viewportW() < 768

    # Grab Submenu, if it doesn't exist do nothing more
    $subUl = $('> ul', @)
    return false unless $subUl.length > 0

    # Show? or hide...
    if e.type == 'mouseenter'
      self.showSubUl @, $subUl
    else
      self.hideSubUl @, $subUl

  # ## `this.showSubUl`
  # Show sub menu element.
  # We use specs for the element and the viewport to position
  # correctly - we do not want the element to be outside
  # of our viewport on desktop or tablet.
  showSubUl: (el, $subUl) ->
    # Pull element object
    $el = $(el)

    # Specs
    specs = {
      viewport: Response.viewportW()
      offset: $subUl.offset()
      width: $subUl.width()
      parent:
        offset: $el.offset()
        # Offset from parent not viewport
        position: $el.position()
    }

    # If menu is wider than viewport
    if specs.viewport < specs.width
      # Make full width (viewport)
      $subUl.css('left', 0)
            .css('width', '100%')
    else
      fullWidth = specs.width + specs.parent.offset.left
      # Check if we can move the menu without going off viewport
      if fullWidth < specs.viewport
        $subUl.css('left', specs.parent.position.left)

      # if we're going to exit the viewporty
      else
        # Calculate how much we need to pull left to keep in viewport
        left = fullWidth - specs.viewport + 20
        $subUl.css('left', specs.parent.position.left - left)

  # ## `this.hideSubUl`
  # Strip sub menu of our applied styles.
  hideSubUl: (el, $subUl) ->
    $subUl.removeAttr('style')

  # ## `this.mobileToggle`
  # Expands and collapses the mobile navigataion.
  mobileToggle: (e) ->
    e.preventDefault()

    $mobileMainTitle = $ '.mobileMainTitle', self.$el
    # If the main title does not exist, we add it
    if $mobileMainTitle.length < 1
      $mobileMainTitle = $ '<div class="mobileMainTitle mobileCategory mobileclose" />'
      $mobileMainTitle.text 'Home'
      self.$topLis.first().before $mobileMainTitle

    $closeOverlay = $ '.mobileNavOverlay'
    # If the close overlay does not exist, we add it
    # This is overlayed on the body so clicks to the right will close nav
    if $closeOverlay.length < 1
      $closeOverlay = $ '<div class="mobileNavOverlay" />'
      $closeOverlay.text 'Close'
      $closeOverlay.click self.mobileToggle
      $('body').prepend $closeOverlay

    setTimeout ->
      $('body')
        .toggleClass('showMobileMenu')
      $('body, html')
        .toggleClass('preventscroll')
    , 50

  # ## `this.mobileShowSubUl`
  # Show submenu on mobile.
  mobileShowSubUl: ($subUl) ->

    # Baack element object
    $landingPage = $ '.landing', $subUl

    # Create landing page button
    if $landingPage.length < 1
      $landingPage = $ '<div class="landing" />'
      $landingPage.html $subUl.parent('li').children('a').first()[0].outerHTML
      $('a', $landingPage).append ' Main'
      $subUl.prepend $landingPage

    $mobileCategory = $ '.mobileCategory', $subUl
    # If the category title does not exist, we add it
    if $mobileCategory.length < 1
      $mobileCategory = $ '<div class="mobileCategory mobileback" />'
      $mobileCategory.html $subUl.parent('li').children('a').text()
      $landingPage.before $mobileCategory

    $subUl.addClass('mobileShow')

    # Bind swipes to this element
    # $subUl.bind('touchstart', self.swipeLeft)
    $subUl.swipe {
      swipeStatus: self.swipeSubUl
      fingers: 'all'
      excludedElements: 'button'
      tap: @.clickTap
      threshold: 10
      allowPageScroll: 'vertical'
    }

  # ## `this.mobileHideSubUl`
  # Hide submenu on mobile.
  mobileHideSubUl: ($subUl) ->
    setTimeout ->
      $subUl.removeClass('mobileShow')
    , 100

  # ## `this.swipeTopUl`
  # On touch start begin moving the selected element
  swipeTopUl: (e, phase, direction, distance, duration, fingerCount) ->
    # If we're in desktop ignore this event
    return false if Response.viewportW() > 767

    # Prevent Bubble
    e.stopPropagation()

    # Scope current element
    $el = $(@)
    $body = $('body')
    $topbar = $('body.showMobileMenu .topbar')

    # only do work if we're going left
    # we may need to expand this action later to account for
    # left to down swipes or other such cases. Testing will reveal
    # any quirks with direction.
    if direction == 'left'

      $el.addClass('removetrans')
      $body.addClass('removetrans')
      $topbar.addClass('removetrans')

      moveOthers = (Response.viewportW() * .7) - distance

      $el.css 'left', -distance
      $body.css 'left', moveOthers
      $topbar.css 'left', moveOthers

      if phase == 'end'
        if distance > 100
          # If we swiped we stop the event
          # this prevents links firing and other such events
          e.preventDefault()

          # Wait short release before removing
          setTimeout ->
            self.swipeTopUlReset($el, $body, $topbar)
            self.mobileToggle(e)
          , 50
        else
          self.swipeTopUlReset($el, $body, $topbar)
    else
      self.swipeTopUlReset($el, $body, $topbar)

  # ## `this.swipeTopUlReset`
  # A reset method called at several points within the
  # swipe method. Abstraction method.
  swipeTopUlReset: ($el, $body, $topbar) ->
    $el.removeClass('removetrans')
    $body.removeClass('removetrans')
    $topbar.removeClass('removetrans')
    $el.css 'left', ''
    $body.css 'left', ''
    $topbar.css 'left', ''

  # ## `this.swipeSubUl`
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
        if distance > 100
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

  # ## `this.swipeSubUlReset`
  # A reset method called at several points within the
  # swipe method. Abstraction method.
  swipeSubUlReset: ($el) ->
    $el.removeClass('removetrans').css('margin-left', '')




# Init our class
navigation = new Navigation $('.navigation')