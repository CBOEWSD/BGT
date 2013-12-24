class ScrollOverflow
  self = {}

  constructor: ($, $el)->
    self = @
    self.$el = $el
    self.shouldI = false

    @setHeight()
    @bindUp()

  setHeight: ->
    self.$el.each ->
      $this = $(this)
      $inside = $ '.scrolloverflow-inside', $this

      # Hide to calc height
      $inside.removeClass('shown')

      # Get numbers
      $paddingVert = parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'))
      newHeight = $this.innerHeight() - $paddingVert

      # Set new height and show element if not displayed
      $inside.height newHeight
      $inside.addClass('shown')

  bindUp: ->
    $('body').bind 'DOMSubtreeModified', self.changeEvent

    setInterval ->
      if self.shouldI
        self.setHeight()
        self.shouldI = false
    , 1000

  changeEvent: (e) ->
    self.shouldI = true

# Define called in require
define ->
  return ScrollOverflow