
/*
   * Publish DomChange
  Allows for modules or classes to subscribe for the body
  `DOMSubtreeModified` event to be fired periodically.
  This will fire when any DOM node is change in the body.
  A good example of this is when an image is loaded using EchoJS.
  This does a number of things.  Primarily, it allows for
  periodic checking and firing as opposed to continuous firing.
  The event that subscriberrs are listening for will only happen
  once a second and prevent a performance issue for
  repeated adustments.
 */

(function() {
  var DomChange;

  DomChange = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function DomChange() {
      self = this;
      self.fireIt = false;
      $('body').bind('DOMSubtreeModified', self.shouldFire);
      self.periodicCheck();
    }


    /*
       *# `this.shouldFire`
      Simply flags the fireIt variable `true`
     */

    DomChange.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };


    /*
       *# `this.periodicCheck`
      Will check every second to see
      if the event should be published.
     */

    DomChange.prototype.periodicCheck = function() {
      return setInterval(function() {
        if (self.fireIt) {
          PubSub.publish('DomChange');
          return self.fireIt = false;
        }
      }, 1000);
    };

    return DomChange;

  })();

  window.events = window.events || {};

  events.domChange = new DomChange;

}).call(this);
