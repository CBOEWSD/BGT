/*
  # PublishResize
  Allows for modules or classes to subscribe for a window
  resize event to be fired. This does a number of things.
  Primarily, it allows for periodic checking and firing
  as opposed to continuous firing.
  The event that subscriberrs are listening for will only happen
  once a second and prevent a performance issue for
  repeated adustments.
*/


(function() {
  var PublishResize;

  PublishResize = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function PublishResize() {
      self = this;
      self.fireIt = false;
      $(window).bind('resize', self.shouldFire);
      self.periodicCheck();
    }

    /*
      ## `this.shouldFire`
      Simply flags the fireIt variable `true`
    */


    PublishResize.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };

    /*
      ## `this.periodicCheck`
      Will check every second to see
      if the event should be published.
    */


    PublishResize.prototype.periodicCheck = function() {
      return setInterval(function() {
        if (self.fireIt) {
          PubSub.publish('resize');
          return self.fireIt = false;
        }
      }, 1000);
    };

    return PublishResize;

  })();

  window.events = window.events || {};

  events.resize = new PublishResize;

}).call(this);
