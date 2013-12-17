class WidgetHero
  self = {}

  constructor: ($, el) ->
    @.$el = $ el

    # Declare this/that
    self = @

    # Add objects to global
    self.$wrapper = $ '.slides', self.$el
    self.$slides = $ '.slide', self.$wrapper

    # Number of slides
    self.count = self.$slides.length

    # Show first slide
    self.showSlide 0

    @log.add 'notification', 'Widget constructed.', @

  # ## this.log
  # Add local instance of logging to this module.
  # Can be called with:
  # ``` @log.add 'notification', 'message...', @ ```
  log: new LogHandler 'WidgetHero'

  createControls: ->
    # Create controls element
    self.$controls = $('<ul />').addClass 'controls'

    # For each slide add a control to controls
    for x in [0...self.count] by 1
      self.$controls.append $('<li />')

    # Append controls to wrapper
    self.$wrapper.append self.$controls

    # Set binds
    self.$controls.bind 'click', self.controlClick

  controlClick: (e) ->
    e.preventDefault()

    console.log $('li', self.$controls).index(@)

  showSlide: (index) ->
    $(self.$slides.get(index)).addClass 'active'


define ->
  return WidgetHero