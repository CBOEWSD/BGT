$ = jQuery

$.fn.extend

  widgetHero: (options) ->
    self = $.fn.widgetHero

    opts = $.extend {}, self.settings, options

    return $(this).each (i, el) ->
      self.init el, opts


$.extend $.fn.widgetHero,
  # Default settings
  settings:
    timer: 3000

  self = undefined

  init: (el) ->
    @.$el = $ el
    self = @

    # Add objects to global
    @.$wrapper = $ '.slides', @.$el
    @.$slides = $ '.slide', @.$wrapper

    # Number of slides
    @.count = @.$slides.length

    # Create controls
    @.createControls()

    # Show first slide
    @.showSlide 0

    # Start automation
    @.automate @.settings.timer

    @.log.add 'notification', 'Widget constructed.', @

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
    console.log @
    self.log.add 'notification', 'Slide control clicked.', @

    # Prevent default actions / bubble up
    e.preventDefault()

    # Pass index to showSlide method
    self.showSlide $('li', self.$controls).index(@)

  ###
    ## this.showSlide
    Given an index this method will disable any currently
    active slide by removing `active` class and enable the
    given index slide.
  ###
  showSlide: (index) ->
    $next = $(@.$slides.get(index))
    $nextControl = $(@.$controls.$ind.get(index))

    # log
    @.log.add 'notification', 'Slide activated', $next

    # Disable currently active slide
    @.$slides.removeClass 'active'
    @.$controls.$ind.removeClass 'active'
    # Activate next slide
    $next.addClass 'active'
    $nextControl.addClass 'active'

  ###
    ## this.nextSlide
    Finds next slide element to be shown in order of index.
    If currently at last element then returns to start.
    Returns slide index.
  ###
  nextSlide: ->
    index = {
      current: $slides.filter('.active').index()
      last: $slides.length - 1
    }

    # Check if no active item was found
    if index.current == -1
      # log
      log.add 'warning', 'nextSlide: The index of the next slide return -1, reset to 0. This is not expected.', index
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
    @.time = if typeof time == 'number' then time else false
    @.time = time or 4000

    # Start timer
    @.startTimer

    # Bind up mouse i/o action
    @.$el.mouseover @.pauseTimer
    @.$el.mouseout @.startTimer

  ###
    ## this.startTimer
    Called on construction and on mouseout events.
  ###
  startTimer: () ->
    # Rotate slides based on `time` setting
    @.timer = setInterval ->
      # Show slide index returned by nextSlide method.
      self.showSlide self.nextSlide()
    , @.time

  ###
    ## this.pauseTimer
    Pauses timer on hover (mouseover) events.
  ###
  pauseTimer: () ->
    window.clearInterval @.timer