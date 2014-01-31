# # PublishResize
# Allows for modules or classes to subscribe for a window
# resize event to be fired. This does a number of things.
# Primarily, it allows for periodic checking and firing
# as opposed to continuous firing.
# The event that subscriberrs are listening for will only happen
# once a second and prevent a performance issue for
# repeated adustments.

class PublishResize

  constructor: ->
    # This/That
    self = @
    # Will be set true on event
    self.fireIt = false

    # Listen for resize
    $( window ).resize(self.shouldFire)

    # Check if flag has bee set
    self.periodicCheck()

  # ## `this.shouldFire`
  # Simply flags the fireIt variable `true`
  shouldFire: (e) ->
    self.fireIt = true

  # ## `this.periodicCheck`
  # Will check every second to see
  #if the event should be published.
  periodicCheck: ->
    setInterval ->
      if self.fireIt
        PubSub.publish 'resize'
        self.fireIt = false
    , 1000

# Add an events object to global
window.events = window.events or {}
events.resize = new PublishResize