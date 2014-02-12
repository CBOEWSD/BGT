###
  # Side Navigation
  The sidebar navigation module will collapse on mobile down to just a expandable title.
  This class will control expansion / collapse of the module on mobile.
###

class SideNavigation
  self = {}

  ###
    ## Constructor
    Called on initializing (new)
  ###
  constructor: (el) ->
    # this/that set
    self = @

    # Add globals
    self.$el = $ el
    self.offset = 20
    self.params = {}
    self.params.fromTop = self.$el.offset().top

    self.bind()

  ###
    ## this.bind
    Binds the top level click/touch event to expand/collapse the menu
  ###
  bind: () ->
    self.$topAnchors = $ '>ul>li>a', self.$el

    self.$topAnchors.bind 'click touchstart', self.toggleMenu

    $(document).scroll self.scrollEvent
    PubSub.subscribe 'DomChange', self.scrollEvent

  ###
    ## this.toggleMenu
    Toggles a clicked menu open/closed
  ###
  toggleMenu: (e) ->
    e.preventDefault();

    $(@).parent('li').toggleClass 'expanded'

  ###
    ## this.scrollEvent
    Fired on document scroll. We will prevent any further action on
    mobile viewports as this feature is not required.
  ###
  scrollEvent: (e) ->
    return true if Response.viewportW() < 768
    self.getParams()
    self.checkSticky(e)

  ###
    ## this.getParams
    This method will fetch all required information needed
    to calculate if and how the element should be set.
  ###
  getParams: () ->
    $parent = self.$el.parent()
    self.params.width = $parent.width()
    self.params.height = self.$el.height()
    self.params.pHeight = $parent.height()
    self.params.pTop = $parent.offset().top
    self.params.scrollTop = $(document).scrollTop()

  ###
    ## this.checkSticky
    Check if element should be set to sticky or not
  ###
  checkSticky: (e) ->
    if self.params.scrollTop + self.offset > self.params.pTop
      position = self.params.scrollTop - self.params.pTop + self.params.height

      if self.params.pHeight - self.offset < position
        difference = self.params.pHeight - position

      self.stickyOn(difference)
    else
      self.stickyOff()

  ###
    ## this.stickyOn
    In the event that `this.checkSticky` passes to stickyOn
    the element will be fixed using params from `this.getParams`.
    If the difference variable is set we will apply that as the top
    attribute; preventing the element moving outside of the column.
  ###
  stickyOn: (difference) ->
    self.$el
    .css('position', 'fixed')
    .css('top', if difference? then difference else self.offset)
    .css('width', self.params.width)

  ###
    ## this.stickOff
    Removes anything applied by `this.stickyOff`.
  ###
  stickyOff: () ->
    self.$el
    .css('position', '')
    .css('top', '')
    .css('width', '')


# Define module for requirejs
define ->
  return SideNavigation