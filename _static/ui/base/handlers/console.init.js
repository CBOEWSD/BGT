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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5pbml0LmpzIiwic291cmNlcyI6WyJjb25zb2xlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0NBQUEsQ0FBQSxDQUFBLE1BQUE7Q0FFRSxPQUFBLHdDQUFBO0NBQUEsRUFBTyxDQUFQLEtBQU87Q0FBUCxDQUVZLENBREYsQ0FBVixDQUFVLENBQUEsQ0FBVixDQUFVLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBO0NBRFYsRUFPUyxDQUFULEVBQUEsQ0FBZ0I7Q0FQaEIsQ0FVVSxDQUFBLENBQVYsRUFBaUIsQ0FBakI7Q0FHQTtBQUFNLEVBQU4sQ0FBQSxHQUFNLE1BQUE7Q0FDSixFQUFTLEdBQVQsQ0FBaUI7QUFJYixDQUFKLEdBQUcsRUFBSCxDQUFZO0NBQ1YsRUFBa0IsR0FBVixDQUFBO01BRFYsRUFBQTtDQUFBO1FBTEY7Q0FBQSxJQUFBO3FCQWZGO0NBQUEsRUFBQTtDQUFBIn0=