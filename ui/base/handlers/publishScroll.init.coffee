###
  # PublishScroll
  Allows for modules or classes to subscribe for a window
  scroll event to be fired.

  **Note:** We are also listening for `touchmove`. This is related to
  iOS and how it handles scroll. In iOS scroll events fire on the release
  of the users finger from the screen and not during physical scroll.
###

class PublishScroll
  self = undefined

  ###
    ## Constructor
  ###
  constructor: ->
    # This/That
    self = @
    # Will be set true on event
    self.fireIt = false

    # Listen for scroll
    $(window).on 'scroll', self.shouldFire
    $(document).on 'touchmove', self.shouldFire
    $(document).on 'tochend', self.shouldFire
    $(document).on 'gesturechange', self.shouldFire

    # Periodic check
    self.periodicCheck()

  ###
    ## `this.shouldFire`
    Scroll event fired immediately. Scroll is usually heavily
    dependant upon timing so we have no delay in this event.
  ###
  shouldFire: (e) ->
    # This event is a single continous event and will fire each and every
    # time there is some kind of scroll or touch event.
    $(document).trigger 'contScroll'

    # This will trigger will fire less often scroll events as we
    # do not always need to track every scroll type event.
    self.fireIt = true

  ###
    ## `this.periodicCheck`
    Will check every second to see
    if the event should be published.
  ###
  periodicCheck: ->
    setInterval ->
      if self.fireIt
        PubSub.publish 'GlobalScroll'
        self.fireIt = false
    , 3000

# Add an events object to global
window.events = window.events or {}
events.scroll = new PublishScroll