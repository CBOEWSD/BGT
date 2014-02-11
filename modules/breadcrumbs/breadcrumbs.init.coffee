###
  # Breadcrumbs
  Breadcrumbs module with hover/click view state for sub
  pages. This script is currently loaded as an init for
  a couple of reasons:
    * Size does not justify AMD
    * It will be on almost all pages
###

class Breadcrumbs
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el)->
    # This/that
    self = @

    # Globals
    @.$el = $ el

    @.bind()

  ###
    ## this.bind
    Binds up events to show/hide menu
  ###
  bind: () ->
    self.$menus = $('li>ul', self.$el).parent('li')

    self.$menus.bind 'click', self.click
    self.$menus.bind 'mouseenter', self.mouseenter
    $(document).bind 'click', self.close

  ###
    ## this.close
    Called to close any shown menus by removing `show` class
  ###
  close: ->
    self.$menus.removeClass 'show'

  ###
    ## this.click
    Handles click events on top menu items (li).
    On click a `show` class will be added to that element
    whilst also being removed from any other items currently
    with the class `show`.
  ###
  click: (e) ->
    e.preventDefault()
    e.stopPropagation()

    $this = $(@)

    if $this.hasClass 'show'
      self.close()
    else
      self.close()
      $this.addClass 'show'

  ###
    ## this.mouseenter
    Handles mouse entry event on top menu items (li)
    Will remove `show` class from any currently shown item to avoid
    conflict.
  ###
  mouseenter: (e) ->
    $this = $(@)

    return false if $this.hasClass 'show'

    self.close()


###
  ## Init
  if there is at least one node on the page, initialize.
###
$el = $ '.breadcrumbs'
if $el.length > 0
  bc = new Breadcrumbs $el