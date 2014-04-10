###
  # NumericColor Class
  Utilizes data-NumericColor attribute which should equal
  a numeric value. For example:
  ```
  <span ... data-numericcolor="{{Price.change}}" ... />
  ```
###

class NumericColor
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el) ->
    @.$el = $ el
    @.value = @.$el.data('numericcolor')

    # Check if value exists
    return false unless @.value?

    @.value = @.clean( @.value )

    # Check if numeric
    return false unless @.value

    @.check()

    return self = @

  ###
    ## Clean
    Will take a value and convert to its numeric counterpart.
    Will return `NaN` if the value is no good.
  ###
  clean: (value) ->
    value = String(value)
    return parseFloat(value.replace(',', ''))

  ###
    ## Check
    Check if the value is positive or negative.
  ###
  check: () ->
    if @.value >= 0
      @.positive()
    else
      @.negative()

  ###
    ## Positive
    Add class and trigger an event from the node.
  ###
  positive: ->
    @.$el.addClass('numeric-positive')
    @.$el.trigger('numeric', true)

  ###
    ## Positive
    Add class and trigger an event from the node.
  ###
  negative: ->
    @.$el.addClass('numeric-negative')
    @.$el.trigger('numeric', false)

###
  ## Init
  Call directly
###
$el = $ '[data-numericcolor]'
$el.each ->
  new NumericColor this