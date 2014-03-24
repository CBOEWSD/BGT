class WidgetHero
  self = {}

  ###
    ## Constructor
  ###
  constructor: ($, el, timer) ->
    @.$el = $ el

    # Declare this/that
    self = @

    # Add objects to global
    @.$wrapper = $ '.slides', @.$el
    @.$slides = $ '.slide', @.$wrapper

    # Number of slides
    @.count = @.$slides.length

    # Create controls
    @.createControls()

    # Show first slide
    @.showSlide 0, self.$el

    # Start automation
    @.automate timer

    @log.add 'notification', 'Widget constructed.', @

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'WidgetHero'

  ###
    ## this.createControls
    Method is called on initialization to create control
    elements - a list based menu - and bind up click events
  ###
  createControls: ->
    # Create controls element
    @.$controls = $('<ul />').addClass 'controls'

    # For each slide add a control to controls
    for x in [0...@.count] by 1
      @.$controls.append $('<li />')

    # Append controls to wrapper
    @.$wrapper.append @.$controls

    # Add list group to controls object
    @.$controls.$ind = $ 'li', @.$controls

    # Log
    @.log.add 'notification', 'Slide controls created.', @.$controls

    # Set binds
    @.$controls.$ind.bind 'click', @.controlClick

    @.$controls.hide() if @.count < 2

  ###
    ## this.controlClick
    Called on click of an individual control item
    from the `this.$controls.$ind` group.
    Method will grab the index of clicked item and
    pass that through to the `this.showSlide` method.
  ###
  controlClick: (e) ->
    self.log.add 'notification', 'Slide control clicked.', @

    $parent = $(@).parents('.widget-hero')

    # Prevent default actions / bubble up
    e.preventDefault()

    # Pass index to showSlide method
    self.showSlide $('li', $('.controls', $parent)).index(@), $parent

  ###
    ## this.showSlide
    Given an index this method will disable any currently
    active slide by removing `active` class and enable the
    given index slide.
  ###
  showSlide: (index,  $parent) ->
    $slides = $('.slide', $parent)
    $controls = $('.controls li', $parent)
    $next = $($slides.get(index))
    $nextControl = $($controls.get(index))

    # log
    self.log.add 'notification', 'Slide activated', $next

    # Disable currently active slide
    $slides.removeClass 'active'
    $controls.removeClass 'active'
    # Activate next slide
    $next.addClass 'active'
    $nextControl.addClass 'active'

  ###
    ## this.nextSlide
    Finds next slide element to be shown in order of index.
    If currently at last element then returns to start.
    Returns slide index.
  ###
  nextSlide: ($me) ->
    $slides = $('.slide', $me)

    index = {
      current: $slides.filter('.active').index()
      last: $slides.length - 1
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

  ###
    ## this.automate
    A timeout triggered event switching to the next slide.
  ###
  automate: (time) ->
    # Check if timeout set, if not default to 4s
    self.time = if typeof time == 'number' then time else false
    self.time = time or 4000

    # Start timer
    self.startTimer null, self.$el

    # Bind up mouse i/o action
    self.$el.mouseover self.pauseTimer
    self.$el.mouseout self.playTimer

  ###
    ## this.startTimer
    Called on construction and on mouseout events.
  ###
  startTimer: (e, el) ->
    $me = el or $(@)

    # Rotate slides based on `time` setting
    setInterval ->
      if !$me.hasClass('paused')
        # Show slide index returned by nextSlide method.
        self.showSlide self.nextSlide($me), $me
    , self.time

  ###
    ## this.pauseTimer
    Pauses timer on hover (mouseover) events.
  ###
  pauseTimer: (e, el) ->
    $me = el or $(@)

    $me.addClass 'paused'

  ###
    ## this.playTimer
    Plays timer on mouseout events.
  ###
  playTimer: (e, el) ->
    $me = el or $(@)

    $me.removeClass 'paused'

# Define called in require
define ->
  return WidgetHero