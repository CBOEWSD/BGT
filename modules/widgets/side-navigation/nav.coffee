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

    self.bind()

  ###
    ## this.bind
    Binds the top level click/touch event to expand/collapse the menu
  ###
  bind: () ->
    self.$topAnchors = $ '>ul>li>a', self.$el

    self.$topAnchors.bind 'click touchstart', self.toggleMenu

  ###
    ## this.toggleMenu
    Toggles a clicked menu open/closed
  ###
  toggleMenu: (e) ->
    e.preventDefault();

    $(@).parent('li').toggleClass 'expanded'


# Define module for requirejs
define ->
  return SideNavigation