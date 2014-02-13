/*
  # console.log
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5pbml0LmpzIiwic291cmNlcyI6WyJjb25zb2xlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLENBT0EsQ0FBQSxNQUFBO0NBRUUsT0FBQSx3Q0FBQTtDQUFBLEVBQU8sQ0FBUCxLQUFPO0NBQVAsQ0FFWSxDQURGLENBQVYsQ0FBVSxDQUFBLENBQVYsQ0FBVSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtDQURWLEVBT1MsQ0FBVCxFQUFBLENBQWdCO0NBUGhCLENBVVUsQ0FBQSxDQUFWLEVBQWlCLENBQWpCO0NBR0E7QUFBTSxFQUFOLENBQUEsR0FBTSxNQUFBO0NBQ0osRUFBUyxHQUFULENBQWlCO0FBSWIsQ0FBSixHQUFHLEVBQUgsQ0FBWTtDQUNWLEVBQWtCLEdBQVYsQ0FBQTtNQURWLEVBQUE7Q0FBQTtRQUxGO0NBQUEsSUFBQTtxQkFmRjtDQUFBLEVBQUE7Q0FQQSJ9