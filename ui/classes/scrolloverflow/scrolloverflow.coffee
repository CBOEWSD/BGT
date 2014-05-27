###
  # ScrollOverflow Class
  Alows for content to be placed within another block of a certain height
  and not overflow or push content but instead add a scrollbar.
  This code will poll for DOM changes and adjust the element if so.
  Note: we do not adjust immediately, we are polling each change but
  we will only execute an adjustment every second if needed.
###

class ScrollOverflow
  self = {}

  ###
    ## Constructor
  ###
  constructor: ($, $el, minviewport)->
    # Log: construction event
    @log.add 'notification', 'Constructed.', @

    # This/that
    self = @

    # Set variables/objects
    self.$el = $el
    self.shouldI = false
    self.minvp = minviewport
    self.active = false

    # Add TSE lib
    @addTSE()

    # Init and bind events
    @setHeight()
    @bindUp()

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` self.log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'ScrollOverflow'

  ###
    ## `this.addTSE`
    Add TSE related classes and init
  ###
  addTSE: ->
    return false if self.active

    # Flag that we have applied TSE
    self.active = true

    # Add TSE to each
    self.$el.each ->
      $this = $(@)
      $inside = $ '.scrolloverflow-inside', $this

      if $inside.length < 1
        $this.wrapInner $ '<div class="scrolloverflow-inside" />'
        $inside = $ '.scrolloverflow-inside', $this

      $this.wrapInner '<div class="tse-scrollable"/>'
      $inside.addClass 'tse-content'
      $inside.addClass 'vertical'

      # Log: method called
      self.log.add 'notification', 'addTSE method called.', $this

      $('.tse-scrollable', $this).TrackpadScrollEmulator()

  ###
    ## `this.destroy`
    Removes all bindings and setup, this allows for collapse to mobile.
  ###
  destroy: ->
    return false if !self.active

    # Flag that we have removed TSE
    self.active = false

    # Remove TSE from each
    self.$el.each ->
      $this = $(@)
      $inside = $ '.scrolloverflow-inside', $this
      $wrap = $ '.tse-scrollable', $this

      $wrap.TrackpadScrollEmulator('destroy')

      # Log: method called
      self.log.add 'notification', 'destroy method called.', $this

      if $wrap.length > 0
        $inside.unwrap()
        $wrap.removeClass 'tse-scrollable'
        $inside.css 'height', ''
        $inside.css 'overflow-y', ''

      $inside.removeClass 'tse-content'
      $inside.removeClass 'vertical'

  ###
    ## `this.setHeight`
    For each instance of the class we will detect the
    height without the inner content and adjust the inner
    content element appropriately.
  ###
  setHeight: ->
    self.$el.each ->
      $this = $(this)
      $inside = $ '.tse-scrollable', $this

      #return false if !$inside.hasClass 'tse-scrollable'

      # Log: method called
      self.log.add 'notification', 'setHeight method called on.', $this

      # Hide to calc height
      $inside.removeClass('shown')

      # Get numbers
      newHeight = $this.height()
      newWidth = $this.width()

      # If the returned result is 0 we'll not set a height param
      if newHeight == 0
        newHeight = ''

      # Set new height and show element if not displayed
      $inside.height newHeight
      $inside.width newWidth
      $inside.addClass('shown')
      $inside.TrackpadScrollEmulator('recalculate')

  ###
    ## `this.bindUp`
    We set a listen for the DOM change event and also start our interval
    checking for if a DOM event has changed something in the last second.
  ###
  bindUp: ->
    PubSub.subscribe 'DomChange', self.changeEvent
    PubSub.subscribe 'GlobalScroll', self.changeEvent

    # Log: method called
    self.log.add 'notification', 'bindUp method called, listening for DOMSubtreeModified.', 'body'

    ###
      This interval prevents us from firing multiple instances of
      `this.setHeight` in quick succession. We will only ever fire
      once in any given second if at all.
    ###
    setInterval ->
      if self.shouldI
        self.setHeight()
        self.shouldI = false
    , 3000

    # Window resize listener
    PubSub.subscribe 'resize', ->
      # Remove TSE if we drop below viewport range
      # Add it back if we go above again
      if Response.viewportW() <= self.minvp
        self.destroy()
      else
        self.addTSE()

  ###
    ## `this.changeEvent`
    Set `this.shouldI` to `true` for the next interval check
    to adjust the element heights.
  ###
  changeEvent: (e) ->
    self.shouldI = true

# Define called in require
define ->
  return ScrollOverflow