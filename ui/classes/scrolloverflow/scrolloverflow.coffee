# ScrollOverflow Class
# Alows for content to be placed within another block of a certain height
# and not overflow or push content but instead add a scrollbar.
# This code will poll for DOM changes and adjust the element if so.
# Note: we do not adjust immediately, we are polling each change but
# we will only execute an adjustment every second if needed.

class ScrollOverflow
  self = {}

  # ## Constructor
  constructor: ($, $el)->
    # This/that
    self = @

    # Set variables/objects
    self.$el = $el
    self.shouldI = false

    # Add TSE lib
    @addTSE()

    # Init and bind events
    @setHeight()
    @bindUp()

  addTSE: ->
    self.$el.each ->
      $this = $(this)
      $inside = $ '.scrolloverflow-inside', $this

      $this.wrapInner '<div class="tse-scrollable"/>'
      $inside.addClass 'tse-content'
      $inside.addClass 'vertical'

      $('.tse-scrollable', $this).TrackpadScrollEmulator()

  # ## `this.setHeight`
  # For each instance of the class we will detect the height without the inner content
  # and adjust the inner content element appropriately.
  setHeight: ->
    self.$el.each ->
      $this = $(this)
      $inside = $ '.tse-scrollable', $this

      # Hide to calc height
      $inside.removeClass('shown')

      # Get numbers
      $paddingVert = parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'))
      newHeight = $this.innerHeight() - $paddingVert
      $paddingHoriz = parseInt($this.css('padding-right')) + parseInt($this.css('padding-left'))
      newWidth = $this.innerWidth() - $paddingHoriz

      # Set new height and show element if not displayed
      $inside.height newHeight
      $inside.width newWidth
      $inside.addClass('shown')
      $inside.TrackpadScrollEmulator('recalculate')

  # ## `this.bindUp`
  # We set a listen for the DOM change event and also start our interval
  # checking for if a DOM event has changed something in the last second.
  bindUp: ->
    $('body').bind 'DOMSubtreeModified', self.changeEvent

    # This interval prevents us from firing multiple instances of
    # `this.setHeight` in quick succession. We will only ever fire
    # once in any given second if at all.
    setInterval ->
      if self.shouldI
        self.setHeight()
        self.shouldI = false
    , 3000

  # ## `this.changeEvent`
  # Set `this.shouldI` to `true` for the next interval check
  # to adjust the element heights.
  changeEvent: (e) ->
    self.shouldI = true

# Define called in require
define ->
  return ScrollOverflow