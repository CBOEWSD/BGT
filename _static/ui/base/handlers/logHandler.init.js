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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nSGFuZGxlci5pbml0LmpzIiwic291cmNlcyI6WyJsb2dIYW5kbGVyLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLENBS00sRUFBQztDQUNMOzs7Q0FBQTtDQUdhLEVBQUEsQ0FBQSxFQUFBLGNBQUM7Q0FDWixDQUFBLENBQUEsQ0FBMkIsRUFBM0I7Q0FBQSxFQUdTLENBQVIsQ0FBRCxDQUFBO0NBSEEsRUFNVSxDQUFULEVBQUQsT0FOQTtDQUpGLElBR2E7O0NBU2I7Ozs7Q0FaQTs7Q0FBQSxDQWdCWSxDQUFaLENBQUssR0FBQSxDQUFBLENBQUM7Q0FDSixLQUFBLElBQUE7Q0FBQSxFQUFTLEdBQVQ7Q0FBUyxDQUNFLEtBQVQsQ0FBQTtDQURPLENBRUcsTUFBVjtDQUZGLE9BQUE7Q0FBQSxFQU9VLENBQVYsQ0FBa0IsQ0FBbEIsQ0FBVSxFQUFBLEtBQUg7Q0FFUCxHQUFHLENBQUgsQ0FBQTtDQUdFLENBQUEsQ0FBVyxDQUFDLEVBQU4sRUFBTjtDQUFBLENBQUEsQ0FDVyxDQUFDLEVBQU4sRUFBTjtDQURBLEVBRVcsQ0FBQyxFQUFOLEVBQU47Q0FHQSxHQUFHLENBQVEsRUFBUixDQUFILENBQUE7Q0FBcUQsQ0FBYSxDQUFyQixDQUFhLEVBQWIsQ0FBTyxVQUFQO1VBUi9DO1FBVkc7Q0FoQkwsSUFnQks7O0NBaEJMOztDQU5GO0NBQUEifQ==