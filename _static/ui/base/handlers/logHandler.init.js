
/*
   * Application LogHandler
  Can be called in each module if a log is required
  simply by adding `log: new LogHandler 'moduleName'`
 */

(function() {
  this.LogHandler = (function() {

    /*
       *# Constructor
     */
    function LogHandler(module) {
      window.log = window.log || {};
      this.debug = true;
      this.module = module || 'Application';
    }


    /*
       *# Add new log
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nSGFuZGxlci5pbml0LmpzIiwic291cmNlcyI6WyJsb2dIYW5kbGVyLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxFQUtNLElBQUMsQ0FBQTtBQUNMO0FBQUE7O09BQUE7QUFHYSxJQUFBLG9CQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsTUFBTSxDQUFDLEdBQVAsR0FBYSxNQUFNLENBQUMsR0FBUCxJQUFjLEVBQTNCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFIVCxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQUEsSUFBVSxhQU5wQixDQURXO0lBQUEsQ0FIYjs7QUFZQTtBQUFBOzs7T0FaQTs7QUFBQSx5QkFnQkEsR0FBQSxHQUFLLFNBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsUUFBaEIsR0FBQTtBQUNILFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTO0FBQUEsUUFDUCxPQUFBLEVBQVMsT0FERjtBQUFBLFFBRVAsUUFBQSxFQUFVLFFBRkg7T0FBVCxDQUFBO0FBQUEsTUFPQSxJQUFBLEdBQVUsSUFBQSxLQUFRLE9BQVIsSUFBb0IsSUFBQSxLQUFRLFNBQTVCLElBQTBDLElBQUEsS0FBUSxjQUFyRCxHQUF5RSxjQUF6RSxHQUE2RixJQVBwRyxDQUFBO0FBU0EsTUFBQSxJQUFHLE1BQU0sQ0FBQyxLQUFWO0FBR0UsUUFBQSxNQUFNLENBQUMsR0FBSSxDQUFBLElBQUMsQ0FBQSxNQUFELENBQVgsR0FBc0IsTUFBTSxDQUFDLEdBQUksQ0FBQSxJQUFDLENBQUEsTUFBRCxDQUFYLElBQXVCLEVBQTdDLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxHQUFJLENBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBUyxDQUFBLElBQUEsQ0FBcEIsR0FBNEIsTUFBTSxDQUFDLEdBQUksQ0FBQSxJQUFDLENBQUEsTUFBRCxDQUFTLENBQUEsSUFBQSxDQUFwQixJQUE2QixFQUR6RCxDQUFBO0FBQUEsUUFFQSxNQUFNLENBQUMsR0FBSSxDQUFBLElBQUMsQ0FBQSxNQUFELENBQVMsQ0FBQSxJQUFBLENBQUssQ0FBQyxJQUExQixDQUErQixNQUEvQixDQUZBLENBQUE7QUFLQSxRQUFBLElBQUcsSUFBQSxLQUFRLE9BQVIsSUFBbUIsSUFBQSxLQUFRLFNBQTlCO2lCQUE2QyxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxNQUFiLEVBQXFCLElBQXJCLEVBQTJCLE1BQTNCLEVBQTdDO1NBUkY7T0FWRztJQUFBLENBaEJMLENBQUE7O3NCQUFBOztNQU5GLENBQUE7QUFBQSJ9