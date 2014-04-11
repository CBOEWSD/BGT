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

  ###
    ## Bind
    Bind up to events such as scroll (touch) and global viewport resize
  ###
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

  ###
    ## moveLeft
    Action will move the scroll position left by a pixel amount
    equal to the width of the inner element.
  ###
  moveLeft: ->
    @.getParams()
    scroll = @.$bar.scrollLeft() - @.params.width

    @.scrollTo(scroll)

  ###
    ## moveRight
    Action will move the scroll position right by a pixel amount
    equal to the width of the inner element.
  ###
  moveRight: ->
    @.getParams()
    scroll = @.$bar.scrollLeft() + @.params.width

    @.scrollTo(scroll)

  ###
    ## scrollTo
    Provided a position will scroll component to given position
  ###
  scrollTo: (position) ->
    @.$bar.animate {
      scrollLeft: position
    }, 1000, =>
      @.scrollEvent()

  ###
    ## getParams
    Gets necessary params shared across class.
  ###
  getParams: ->
    @.params = {
      width: @.$bar.width()
      innerWidth: @.$inner.width()
    }

  ###
    ## scrollEvent
    Called from multiple event types.
    Will check if we have reached the end (left or right) and disable
    controls as appropriate.
  ###
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