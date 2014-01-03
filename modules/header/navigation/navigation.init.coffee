class Navigation
  self = undefined

  constructor: ($el) ->
    # Objects
    @.$el = $el
    @.$topLis = $ '.menu > li', $el
    @.$subUls = $ '> ul', @.$topLi

    # this/that
    self = @

    @.bind()

  bind: ->
    console.log @

    @.$topLis.hover @.hoverTopLi

  hoverTopLi: (e) ->
    # Grab Submenu, if it doesn't exist do nothing more
    $subUl = $('> ul', @)
    return false unless $subUl.length > 0

    # Show? or hide...
    if e.type == 'mouseenter'
      self.showSubUl @, $subUl
    else
      self.hideSubUl @, $subUl

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
    console.log specs

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
      else
        left = fullWidth - specs.viewport + 20
        $subUl.css('left', specs.parent.position.left - left)

  hideSubUl: (el, $subUl) ->
    $subUl.removeAttr('style')




navigation = new Navigation $('.navigation')