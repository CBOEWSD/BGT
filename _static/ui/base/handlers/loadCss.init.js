
/*
   * LoadCss
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENzcy5pbml0LmpzIiwic291cmNlcyI6WyJsb2FkQ3NzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLE9BQUE7O0FBQUEsRUFTQSxPQUFBLEdBQVUsU0FBQyxHQUFELEdBQUE7QUFDUixRQUFBLElBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQUFQLENBQUE7QUFBQSxJQUNBLElBQUksQ0FBQyxJQUFMLEdBQVksVUFEWixDQUFBO0FBQUEsSUFFQSxJQUFJLENBQUMsR0FBTCxHQUFXLFlBRlgsQ0FBQTtBQUFBLElBR0EsSUFBSSxDQUFDLElBQUwsR0FBWSxHQUhaLENBQUE7QUFBQSxJQU1BLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixNQUE5QixDQUFzQyxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQXpDLENBQXFELElBQXJELENBTkEsQ0FBQTtBQVNBLFdBQU8sSUFBUCxDQVZRO0VBQUEsQ0FUVixDQUFBOztBQUFBLEVBc0JBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BdEJqQixDQUFBO0FBQUEifQ==