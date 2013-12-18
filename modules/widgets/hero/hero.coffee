class WidgetHero
  self = {}

  constructor: ($, el, timer) ->
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

    # Start automation
    self.automate timer

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

  # ## this.nextSlide
  # Finds next slide element to be shown in order of index.
  # If currently at last element then returns to start.
  # Returns slide index.
  nextSlide: ->
    index = {
      current: self.$slides.filter('.active').index()
      last: self.$slides.length - 1
    }

    # Check if no active item was found
    if index.current == -1
      # log
      self.log.add 'warning', 'nextSlide: The index of the next slide return -1, reset to 0. This is not expected.', index
      # Set to first
      index.current = 0

    # Expect next
    index.next = if (index.current < index.last) then index.current + 1 else 0

    return index.next

  # ## this.automate
  # A timeout triggered event switching to the next slide.
  automate: (time) ->
    # Check if timeout set, if not default to 4s
    self.time = if typeof time == 'number' then time else false
    self.time = time or 4000

    # Start timer
    self.startTimer self.time

    # Bind up mouse i/o action
    self.$el.mouseover self.pauseTimer
    self.$el.mouseout self.startTimer

  # ## this.startTimer
  # Called on construction and on mouseout events.
  startTimer: () ->
    # Rotate slides based on `time` setting
    self.timer = setInterval ->
      # Show slide index returned by nextSlide method.
      self.showSlide self.nextSlide()
    , self.time

  # ## this.pauseTimer
  # Pauses timer on hover (mouseover) events.
  pauseTimer: () ->
    window.clearInterval self.timer

# Define called in require
define ->
  return WidgetHero