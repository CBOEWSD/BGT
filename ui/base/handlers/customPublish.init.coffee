###
  # Custom Publish
  Custom Publish allows you to use a DOM attribute to create
  a custom event for any anonymous subscribers listening out
  there. This can help modules communicate with each other
  without needing to care about the others actions or results.

  Example:
  ```
  <a ...
    data-publish="myevent"
    data-event="touchend">
  ```
  The data-event will default to `click` events and is
  therefore optional. You can now have your other module subscribe
  to this `myevent` and take whatever actions are necessary.
###

class CustomPublish
  self = undefined

  ###
    ## Constructor
  ###
  constructor: ->
    # This/That
    self = @

    @.$nodes = $('[data-publish]')

    if @.$nodes.length > 0
      @.bindNodes()

    return @

  ###
    ## this.bindNodes
    Bind each custom publish node with its event type
    or default to `click` events.
  ###
  bindNodes: ->
    @.$nodes.each (i, el) =>
      $(el).bind $this.data('event') || 'click', (e) =>
        @.publishEvent($(e.currentTarget))

  ###
    ## this.publishEvent
    Publish the custom event to anyone who cares.
  ###
  publishEvent: (node) ->
    PubSub.publish node.data('publish')


# Init
customPublish = new CustomPublish