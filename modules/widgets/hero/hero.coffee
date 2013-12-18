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

    # Create controls
    self.createControls()

    # Show first slide
    self.showSlide 0

    @log.add 'notification', 'Widget constructed.', @

  # ## this.log
  # Add local instance of logging to this module.
  # Can be called with:
  # ``` @log.add 'notification', 'message...', @ ```
  log: new LogHandler 'WidgetHero'

  # ## this.createControls
  # Method is called on initialization to create control
  # elements - a list based menu - and bind up click events
  createControls: ->
    # Create controls element
    self.$controls = $('<ul />').addClass 'controls'

    # For each slide add a control to controls
    for x in [0...self.count] by 1
      self.$controls.append $('<li />')

    # Append controls to wrapper
    self.$wrapper.append self.$controls

    # Add list group to controls object
    self.$controls.$ind = $ 'li', self.$controls

    # Log
    self.log.add 'notification', 'Slide controls created.', self.$controls

    # Set binds
    self.$controls.$ind.bind 'click', self.controlClick

  # ## this.controlClick
  # Called on click of an individual control item
  # from the `this.$controls.$ind` group.
  # Method will grab the index of clicked item and
  # pass that through to the `this.showSlide` method.
  controlClick: (e) ->
    self.log.add 'notification', 'Slide control clicked.', @

    # Prevent default actions / bubble up
    e.preventDefault()

    # Pass index to showSlide method
    self.showSlide $('li', self.$controls).index(@)

  # ## this.showSlide
  # Given an index this method will disable any currently
  # active slide by removing `active` class and enable the
  # given index slide.
  showSlide: (index) ->
    $next = $(self.$slides.get(index))
    $nextControl = $(self.$controls.$ind.get(index))

    # log
    self.log.add 'notification', 'Slide activated', $next

    # Disable currently active slide
    self.$slides.removeClass 'active'
    self.$controls.$ind.removeClass 'active'
    # Activate next slide
    $next.addClass 'active'
    $nextControl.addClass 'active'

# Define called in require
define ->
  return WidgetHero