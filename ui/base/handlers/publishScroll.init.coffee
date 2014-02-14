###
  # PublishScroll
  Allows for modules or classes to subscribe for a window
  scroll event to be fired.

  **Note:** We are also listening for `touchmove`. This is related to
  iOS and how it handles scroll. In iOS scroll events fire on the release
  of the users finger from the screen and not during physical scroll.
###

class PublishScroll

  ###
    ## Constructor
  ###
  constructor: ->
    # This/That
    self = @
    # Will be set true on event
    self.fireIt = false

    # Listen for scroll
    $(document).bind 'scroll', self.shouldFire
    $(document).bind 'touchmove', self.shouldFire
    $(document).bind 'gesturechange', self.shouldFire

    # Check if flag has bee set
    self.periodicCheck()

  ###
    ## `this.shouldFire`
    Scroll event fired immediately. Scroll is usually heavily
    dependant upon timing so we have no delay in this event.
  ###
  shouldFire: (e) ->
    self.fireIt = true

  ###
    ## `this.periodicCheck`
    Will check every second to see
    if the event should be published.
  ###
  periodicCheck: ->
    setInterval ->
      if self.fireIt
        PubSub.publish 'scroll'
        $(document).trigger 'contScroll'
        self.fireIt = false
    , 50

# Add an events object to global
window.events = window.events or {}
events.scroll = new PublishScroll