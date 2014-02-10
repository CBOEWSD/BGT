(function() {
  this.LogHandler = (function() {
    function LogHandler(module) {
      window.log = window.log || {};
      this.debug = true;
      this.module = module || 'Application';
    }

    LogHandler.prototype.add = function(type, message, extended) {
      var object;
      object = {
        message: message,
        extended: extended
      };
      type = type !== 'error' && type !== 'warning' && type !== 'notification' ? 'notification' : type;
      if (window.debug) {
        window.log[this.module] = window.log[this.module] || {};
        window.log[this.module][type] = window.log[this.module][type] || [];
        window.log[this.module][type].push(object);
        if (type === 'error' || type === 'warning') {
          return console.log(this.module, type, object);
        }
      }
    };

    return LogHandler;

  })();

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nSGFuZGxlci5pbml0LmpzIiwic291cmNlcyI6WyJsb2dIYW5kbGVyLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0NBQUEsQ0FBTSxFQUFDO0NBQ1EsRUFBQSxDQUFBLEVBQUEsY0FBQztDQUNaLENBQUEsQ0FBQSxDQUEyQixFQUEzQjtDQUFBLEVBR1MsQ0FBUixDQUFELENBQUE7Q0FIQSxFQU1VLENBQVQsRUFBRCxPQU5BO0NBREYsSUFBYTs7Q0FBYixDQVdZLENBQVosQ0FBSyxHQUFBLENBQUEsQ0FBQztDQUNKLEtBQUEsSUFBQTtDQUFBLEVBQVMsR0FBVDtDQUFTLENBQ0UsS0FBVCxDQUFBO0NBRE8sQ0FFRyxNQUFWO0NBRkYsT0FBQTtDQUFBLEVBT1UsQ0FBVixDQUFrQixDQUFsQixDQUFVLEVBQUEsS0FBSDtDQUVQLEdBQUcsQ0FBSCxDQUFBO0NBR0UsQ0FBQSxDQUFXLENBQUMsRUFBTixFQUFOO0NBQUEsQ0FBQSxDQUNXLENBQUMsRUFBTixFQUFOO0NBREEsRUFFVyxDQUFDLEVBQU4sRUFBTjtDQUdBLEdBQUcsQ0FBUSxFQUFSLENBQUgsQ0FBQTtDQUFxRCxDQUFhLENBQXJCLENBQWEsRUFBYixDQUFPLFVBQVA7VUFSL0M7UUFWRztDQVhMLElBV0s7O0NBWEw7O0NBREY7Q0FBQSJ9