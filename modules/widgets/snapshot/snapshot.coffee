# # Snapshot Graph
# This module will have `toggle` type functionality to view
# each index's graph on hover/touch events.

class Snapshot
  self = undefined

  constructor: ($el) ->
    self = @

    # Globals
    @.$el = $el
    @.$index = $ '.siderail li a', @.$el
    @.$images = $ '.images .image', @.$el

    console.log 'hello world', @

    # On load methods
    @.bind()
    @.loaded()

  loaded: ->
    self.$el.addClass 'loaded'
    self.$index.first().trigger 'click'

  bind: ->
    self.$index.bind 'click', self.indexChange

  indexChange: (e) ->
    e.preventDefault()

    self.$index.removeClass 'active'
    self.$images.removeClass 'active'

    $this = $(@)
    $target = $ '[data-id="'+$this.data('target')+'"]'



    $this.addClass 'active'
    $target.addClass 'active'


define ->
  return Snapshot