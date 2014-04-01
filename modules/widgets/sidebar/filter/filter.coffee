class Filter
  self = {}

  ###
    ## Constructor
  ###
  constructor: (el) ->
    # this/that
    self = @

    # Extend self
    self.$el = $(el)
    self.$toplevel = $('.toplevel', el)

    # Init
    @.bind()

    return self

  ###
    ## this.bind
    Bind up event listeners.
  ###
  bind: () ->
    self.$toplevel.bind('click', @.eventHandler)

  ###
    ## this.eventHandler
    Handles our show/hide event (ex: `click`)
  ###
  eventHandler: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    $this = $(@)

    if $this.parent('li').hasClass('expanded')
      self.hideMenu(e, $this)
    else
      self.showMenu(e, $this)

  ###
    ## this.showMenu
    Show sub menu on click event and add `expander` class.
  ###
  showMenu: (e, el) ->
    $this = $(el)
    $parentLi = $this.parent('li')

    $parentLi.addClass('expanded')

  ###
    ## this.hideMenu
    Show sub menu on click event and add `expander` class.
  ###
  hideMenu: (e, el) ->
    $this = $(el)
    $parentLi = $this.parent('li')

    $parentLi.removeClass('expanded')


# Define called in require
define ->
  return Filter