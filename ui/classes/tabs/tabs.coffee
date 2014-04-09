###
  # Tabs Class
###

class Tabs
  self = undefined

  constructor: (el) ->
    @.$el = $ el
    @.$tabs = $ '.tabs-bar .tab', @.$el
    @.$content = $ '.tabs-content .tab', @.$el

    @.bind()

    return self = @

  bind: ->
    @.$tabs.bind 'click', (e) =>
      @.tabClick e

  tabClick: (e) ->
    e.preventDefault()
    e.stopImmediatePropagation()

    $this = $(e.currentTarget)

    @.$content.removeClass('active')
    @.$tabs.removeClass('active')

    $('[data-tabid="' + $this.data('tabid') + '"]', @.$el).addClass('active')
    $this.addClass('active')

define ->
  return Tabs