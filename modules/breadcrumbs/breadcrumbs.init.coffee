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

    PubSub.subscribe 'DomChange', self.scrollEvent
    PubSub.subscribe 'scroll', self.scrollEvent
    $(document).bind 'touchmove', self.scrollEvent

  ###
    ## this.scrollEven
    Fired on `document` scroll event. This method will update the
    `params` object before checking if the module should be fixed.
  ###
  scrollEvent: (e) ->
    return true if Response.viewportW < 768
    self.getParams()

    if self.params.scrolled > self.params.fromTop
      self.fixMenu()
    else
      self.unFixMenu()

  ###
    ## this.fixMenu
    This method will fix the menu to the top of the viewport
    whilst also ensuring the parent element does not collapse entirely.
  ###
  fixMenu: ->
    return true if self.$el.hasClass 'fixed'

    self.$el.parent().css 'height', self.$el.parent().height()
    self.$el.addClass 'fixed'

  ###
    ## this.unFixMenu
    Will remove any attributes set by `this.fixMenu`
  ###
  unFixMenu: ->
    self.$el.removeClass 'fixed'
    self.$el.parent().css 'height', ''

  ###
    ## this.getParams
    Parameters required to calculate if and how the module should be fixed.
  ###
  getParams: ->
    self.params = {}
    self.params.fromTop = self.$el.parent().offset().top
    self.params.scrolled = $(document).scrollTop()

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