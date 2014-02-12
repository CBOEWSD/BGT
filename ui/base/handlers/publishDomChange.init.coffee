###
  # Publish DomChange
  Allows for modules or classes to subscribe for the body
  `DOMSubtreeModified` event to be fired periodically.
  This will fire when any DOM node is change in the body.
  A good example of this is when an image is loaded using EchoJS. 
  This does a number of things.  Primarily, it allows for 
  periodic checking and firing as opposed to continuous firing.
  The event that subscriberrs are listening for will only happen
  once a second and prevent a performance issue for
  repeated adustments.
###

class DomChange

  ###
    ## Constructor
  ###
  constructor: ->
    # This/That
    self = @
    # Will be set true on event
    self.fireIt = false

    # Listen for `DOMSubtreeModified` on `body`
    $('body').bind 'DOMSubtreeModified', self.shouldFire

    # Check if flag has bee set
    self.periodicCheck()

  ###
    ## `this.shouldFire`
    Simply flags the fireIt variable `true`
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
        PubSub.publish 'DomChange'
        self.fireIt = false
    , 1000

# Add an events object to global
window.events = window.events or {}
events.domChange = new DomChange