###
  # Snapshot Graph
  This module will have `toggle` type functionality to view
  each index's graph on hover/touch events.
###

class Snapshot
  self = undefined

  ###
    ## Constructor
  ###
  constructor: ($el) ->
    self = @

    # Globals
    @.$el = $el
    @.$index = $ '.siderail li a', @.$el
    @.$images = $ '.images .image', @.$el

    # Log init
    @log.add 'notification', 'Snapshot constructed.', @

    # On load methods
    @.bind()
    @.loaded()

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'WidgetHero'

  ###
    ## this.loaded
    Fired as part of the constructor to remove loading
    view and trigger showing of first item.
  ###
  loaded: ->
    self.$el.addClass 'loaded'
    self.$index.first().trigger 'click'
    PubSub.publish('LazyLoadPoll')

    console.log(self.$el.width())

  ###
    ## this.bind
    Bind up events to change index.
  ###
  bind: ->
    self.$index.bind 'click', self.indexChange

  ###
    ## this.indexChange
    Fired from `this.bind` method to show selected index image.
  ###
  indexChange: (e) ->
    e.preventDefault()

    # Log index change
    self.log.add 'notification', 'indexChange method fired.', e

    # Remove active class
    self.$index.removeClass 'active'
    self.$images.removeClass 'active'

    $this = $(@)
    $target = $ '[data-id="'+$this.data('target')+'"]'

    if $target.length > 0
      $this.addClass 'active'
      $target.addClass 'active'
    else
      self.log.add 'error', 'Failed to find target.', $this

###
  ## Define
  Define our module for AMD.
###
define ->
  return Snapshot