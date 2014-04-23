
/*
   * console.log
  Fix for browsers with lack of support for
  the console object.
 */

(function() {
  (function() {
    var console, length, method, methods, noop, _results;
    noop = function() {};
    methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    length = methods.length;
    console = (window.console = window.console || {});
    _results = [];
    while (length--) {
      method = methods[length];
      if (!console[method]) {
        _results.push(console[method] = noop);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5pbml0LmpzIiwic291cmNlcyI6WyJjb25zb2xlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLENBQUEsU0FBQSxHQUFBO0FBRUUsUUFBQSxnREFBQTtBQUFBLElBQUEsSUFBQSxHQUFPLFNBQUEsR0FBQSxDQUFQLENBQUE7QUFBQSxJQUNBLE9BQUEsR0FBVSxDQUNSLFFBRFEsRUFDRSxPQURGLEVBQ1csT0FEWCxFQUNvQixPQURwQixFQUM2QixLQUQ3QixFQUNvQyxRQURwQyxFQUM4QyxPQUQ5QyxFQUVSLFdBRlEsRUFFSyxPQUZMLEVBRWMsZ0JBRmQsRUFFZ0MsVUFGaEMsRUFFNEMsTUFGNUMsRUFFb0QsS0FGcEQsRUFHUixjQUhRLEVBR1EsU0FIUixFQUdtQixZQUhuQixFQUdpQyxPQUhqQyxFQUcwQyxNQUgxQyxFQUdrRCxTQUhsRCxFQUlSLFdBSlEsRUFJSyxPQUpMLEVBSWMsTUFKZCxDQURWLENBQUE7QUFBQSxJQU9BLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFQakIsQ0FBQTtBQUFBLElBVUEsT0FBQSxHQUFVLENBQUMsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFBTSxDQUFDLE9BQVAsSUFBa0IsRUFBcEMsQ0FWVixDQUFBO0FBYUE7V0FBTSxNQUFBLEVBQU4sR0FBQTtBQUNFLE1BQUEsTUFBQSxHQUFTLE9BQVEsQ0FBQSxNQUFBLENBQWpCLENBQUE7QUFJQSxNQUFBLElBQUcsQ0FBQSxPQUFTLENBQUEsTUFBQSxDQUFaO3NCQUNFLE9BQVEsQ0FBQSxNQUFBLENBQVIsR0FBa0IsTUFEcEI7T0FBQSxNQUFBOzhCQUFBO09BTEY7SUFBQSxDQUFBO29CQWZGO0VBQUEsQ0FBQSxDQVBBLENBQUE7QUFBQSJ9