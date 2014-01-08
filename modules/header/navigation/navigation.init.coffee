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
    @.$subUls = $ '> ul', @.$topLi

    # this/that
    self = @

    # Bind up events with methods
    @.bind()

  # ## `this.bind`
  # Bind up events with actions.
  bind: ->
    # Bind hover (mousein and out) event
    @.$topLis.hover @.hoverTopLi

  # ## `this.hoverTopLi`
  # Fired on hover in/out of top level LI elements.
  hoverTopLi: (e) ->
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


# Init our class
navigation = new Navigation $('.navigation')