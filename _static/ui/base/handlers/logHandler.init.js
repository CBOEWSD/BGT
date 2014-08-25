/*
  # Application LogHandler
  Can be called in each module if a log is required
  simply by adding `log: new LogHandler 'moduleName'`
*/


(function() {
  this.LogHandler = (function() {
    /*
      ## Constructor
    */

    function LogHandler(module) {
      window.log = window.log || {};
      this.debug = true;
      this.module = module || 'Application';
    }

    /*
      ## Add new log
      Passing in variable data to be pushed into log
    */


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
