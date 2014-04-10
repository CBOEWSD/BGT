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

    console.log @

    return false unless @.value?

    @.value = @.clean( @.value )

    @.check()

    return self = @

  clean: (value) ->
    value = String(value)
    return parseFloat(value.replace(',', ''))

  check: () ->
    if @.value >= 0
      @.positive()
    else
      @.negative()

  positive: ->
    @.$el.addClass('numeric-positive')
    @.$el.trigger('numeric-positive')

  negative: ->
    @.$el.addClass('numeric-negative')
    @.$el.trigger('numeric-positive')



###
  ## Init
  Call directly
###
$el = $ '[data-numericcolor]'
$el.each ->
  new NumericColor this