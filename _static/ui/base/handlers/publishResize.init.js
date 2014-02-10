(function() {
  var PublishResize;

  PublishResize = (function() {
    function PublishResize() {
      var self;
      self = this;
      self.fireIt = false;
      $(window).resize(self.shouldFire);
      self.periodicCheck();
    }

    PublishResize.prototype.shouldFire = function(e) {
      return self.fireIt = true;
    };

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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaFJlc2l6ZS5pbml0LmpzIiwic291cmNlcyI6WyJwdWJsaXNoUmVzaXplLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBO0NBQUEsS0FBQSxPQUFBOztDQUFBLENBQU07Q0FFUyxFQUFBLENBQUEsbUJBQUE7Q0FFWCxHQUFBLE1BQUE7Q0FBQSxFQUFPLENBQVAsRUFBQTtDQUFBLEVBRWMsQ0FBVixDQUZKLENBRUE7Q0FGQSxHQUt1QixFQUF2QixJQUFBO0NBTEEsR0FRSSxFQUFKLE9BQUE7Q0FWRixJQUFhOztDQUFiLEVBY1ksTUFBQyxDQUFiO0NBQ08sRUFBUyxDQUFWLEVBQUosT0FBQTtDQWZGLElBY1k7O0NBZFosRUFvQmUsTUFBQSxJQUFmO0NBQ2MsRUFBQSxNQUFBLEVBQVosRUFBQTtDQUNFLEdBQUcsRUFBSCxFQUFBO0NBQ0UsS0FBTSxDQUFOLENBQUEsRUFBQTtDQUNLLEVBQVMsQ0FBVixFQUFKLFdBQUE7VUFIUTtDQUFaLENBSUUsRUFKRixHQUFZO0NBckJkLElBb0JlOztDQXBCZjs7Q0FGRjs7Q0FBQSxDQThCQSxDQUFnQixDQUFpQixFQUEzQjs7QUFDVSxDQS9CaEIsQ0ErQkEsQ0FBZ0IsR0FBVixPQS9CTjtDQUFBIn0=