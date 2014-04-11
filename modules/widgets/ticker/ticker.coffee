###
  # Ticker
###

class Ticker
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el) ->
    @.$el = $(el)
    @.$bar = $('.bar', el)
    @.$inner = $('.bar .inner', el)
    @.$left = $('.control.left', el)
    @.$right = $('.control.right', el)

    @.getParams()
    @.bind()

    @.$el.addClass('loaded')

    console.log @
    return @

  bind: ->
    @.$left.bind 'click', (e) =>
      e.preventDefault()
      @.moveLeft()

    @.$right.bind 'click', (e) =>
      e.preventDefault()
      @.moveRight()

    @.$el.bind 'touchmove touchend', (e) =>
      @.scrollEvent(e)

    PubSub.subscribe 'resize', (e) =>
      @.getParams()
      @.scrollEvent(e)

    @.$el.trigger 'touchmove'

  moveLeft: ->
    @.getParams()
    scroll = @.$bar.scrollLeft() - @.params.width

    @.scrollTo(scroll)

  moveRight: ->
    @.getParams()
    scroll = @.$bar.scrollLeft() + @.params.width

    @.scrollTo(scroll)

  scrollTo: (position) ->
    @.$bar.animate {
      scrollLeft: position
    }, 1000, =>
      @.scrollEvent()

  getParams: ->
    @.params = {
      width: @.$bar.width()
      innerWidth: @.$inner.width()
    }

  scrollEvent: (e) ->
    scrolled = @.$bar.scrollLeft() + @.params.width

    if scrolled == @.params.width
      @.$left.addClass 'disabled'
      @.$right.removeClass 'disabled'
    else if scrolled >= @.params.innerWidth
      @.$right.addClass 'disabled'
      @.$left.removeClass 'disabled'
    else
      @.$left.removeClass 'disabled'
      @.$right.removeClass 'disabled'

###
  ## Define
###
define ->
  return Ticker