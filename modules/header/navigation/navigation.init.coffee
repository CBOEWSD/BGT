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

    # Clicks, for mobile submenus
    @.$topLis.click @.mobileTopLi

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

    $closeButton = $ '.mobileclose', self.$el
    # If the close button does not exist, we add it
    if $closeButton.length < 1
      $closeButton = $ '<div class="mobileclose" />'
      $closeButton.text 'Close'
      $closeButton.click self.mobileToggle
      self.$topLis.first().before $closeButton

    $mobileMainTitle = $ '.mobileMainTitle', self.$el
    # If the main title does not exist, we add it
    if $mobileMainTitle.length < 1
      $mobileMainTitle = $ '<div class="mobileMainTitle mobileCategory" />'
      $mobileMainTitle.text 'Main Menu'
      $mobileMainTitle.click self.mobileToggle
      $closeButton.before $mobileMainTitle

    $closeOverlay = $ '.mobileNavOverlay'
    # If the close overlay does not exist, we add it
    # This is overlayed on the body so clicks to the right will close nav
    if $closeOverlay.length < 1
      $closeOverlay = $ '<div class="mobileNavOverlay" />'
      $closeOverlay.text 'Close'
      $closeOverlay.click self.mobileToggle
      $('body').prepend $closeOverlay

    $('body')
      .toggleClass('showMobileMenu')
    $('body, html')
      .toggleClass('preventscroll')

  # ## `this.mobileTopLi`
  # Tracks clicks/touch events on top li elements to display submenus
  mobileTopLi: (e) ->
    # If we're in desktop ignore this event
    return false if Response.viewportW() > 767

    # Get submenu object if it exists
    $subUl = $('>ul', @)

    # If we have no submenu ignore event
    return true if $subUl.length < 1

    # If the menu is already shown we assume continue to next page.
    # This event likely came from a child element bubbling up
    # to the parent LI (where we are listening)
    if $subUl.hasClass('mobileShow')
      return true

    # Prevent link click
    e.preventDefault()

    # Show menu
    self.mobileShowSubUl $subUl

  # ## `this.mobileShowSubUl`
  # Show submenu on mobile.
  mobileShowSubUl: ($subUl) ->
    $back = $ '.mobileback', $subUl

    # If the back button does not exist, we add it
    if $back.length < 1
      $back = $ '<div class="mobileback" />'
      $back.text 'Back'
      $back.click ->
        self.mobileHideSubUl $(@).parent('.mobileShow')
      $subUl.prepend $back

    $mobileCategory = $ '.mobileCategory', $subUl
    # If the category title does not exist, we add it
    if $mobileCategory.length < 1
      $mobileCategory = $ '<div class="mobileCategory mobileCategory" />'
      $mobileCategory.html $subUl.parent('li').children('a').first()[0].outerHTML
      $back.before $mobileCategory

    $subUl.addClass('mobileShow')

    # Bind swipes to this element
    # $subUl.bind('touchstart', self.swipeLeft)
    $subUl.swipe {
      swipeStatus: self.swipeSubUl
      fingers: 'all'
      excludedElements: 'button'
    }

  # ## `this.mobileHideSubUl`
  # Hide submenu on mobile.
  mobileHideSubUl: ($subUl) ->
    setTimeout ->
      $subUl.removeClass('mobileShow')
    , 100

  # ## `this.swipeSubUl`
  # On touch start begin moving the selected element
  swipeSubUl: (e, phase, direction, distance, duration, fingerCount) ->
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
          setTimeout ->
            $el.removeClass('mobileShow removetrans').css('margin-left', '')

            # Remove bindings
            $el.swipe 'destroy'
          , 50
        else
          $el.removeClass('removetrans').css('margin-left', '')
    else
      $el.removeClass('removetrans').css('margin-left', '')




# Init our class
navigation = new Navigation $('.navigation')