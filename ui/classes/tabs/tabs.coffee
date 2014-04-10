###
  # Tabs Class
###

class Tabs
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el) ->
    @.$el = $ el
    @.$tabs = $ '.tabs-bar .tab', @.$el
    @.$content = $ '.tabs-content .tab', @.$el

    @.bind()

    return self = @

  ###
    ## bind
    Called to bind up events leading to tab change.
  ###
  bind: ->
    @.$tabs.bind 'click', (e) =>
      @.tabClick e

  ###
    ## tabClick
    Called on event of tab being clicked. Will change active
    tab and active content.
  ###
  tabClick: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    $this = $(e.currentTarget)

    @.$content.removeClass('active')
    @.$tabs.removeClass('active')

    $('[data-tabid="' + $this.data('tabid') + '"]', @.$el).addClass('active')
    $this.addClass('active')


###
  ## Define
  Return module for AMD.
###
define ->
  return Tabs