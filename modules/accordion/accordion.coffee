class Accordion
  self = {}

  ###
    ## Constructor
  ###
  constructor: ($, el) ->
    # this/that
    self = @

    # Set internals
    self.$el = $ el
    self.$el.$dt = $('>dt', @.$el)

    @.listen()

    return @

  ###
    ## this.listen
    Listen bindings for events, such as `click`, in order to
    show/hide the following `dd` node.
  ###
  listen: () ->
    self.$el.$dt.bind 'click', self.toggle

  ###
    ## this.toggle
    Called on event to show or hide the follow `dd` node. We
    will check if the node has the `expanded` class to determine
    next steps.
  ###
  toggle: (e) ->
    if $(@).hasClass 'expanded'
      self.hide e, $(@)
    else
      self.show e, $(@)

  ###
    ## this.show
    Will add the `expanded` class before showing the next `dd` node.
  ###
  show: (e, $this) ->
    $this.addClass 'expanded'
    $this.next('dd').slideDown()

  ###
    ## this.hide
    Will remove the `expanded` class before hiding the next `dd` node.
  ###
  hide: (e, $this) ->
    $this.removeClass 'expanded'
    $this.next('dd').slideUp()


# Define called in require
define ->
  return Accordion