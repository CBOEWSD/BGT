/*
  # LoadCss
  This class allows for async loading of stylesheet assets.
  Unfortunately due to the nature of async loading of in
  certain browsers no clear event is fired for when the asset
  has finished loading (unlike JS assets which do).
  This limits the use of this method to only certain circumstances.
*/


(function() {
  var loadCss;

  loadCss = function(url) {
    var link;
    link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
    return link;
  };

  window.loadCss = loadCss;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENzcy5pbml0LmpzIiwic291cmNlcyI6WyJsb2FkQ3NzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEtBQUEsQ0FBQTs7Q0FBQSxDQVNBLENBQVUsSUFBVixFQUFXO0NBQ1QsR0FBQSxJQUFBO0NBQUEsRUFBTyxDQUFQLEVBQU8sRUFBUSxLQUFSO0NBQVAsRUFDWSxDQUFaLE1BREE7Q0FBQSxFQUVBLENBQUEsUUFGQTtDQUFBLEVBR1ksQ0FBWjtDQUhBLEdBTUEsRUFBQSxFQUFRLEdBQVIsU0FBQTtDQUdBLEdBQUEsT0FBTztDQW5CVCxFQVNVOztDQVRWLENBc0JBLENBQWlCLEdBQVgsQ0FBTjtDQXRCQSJ9