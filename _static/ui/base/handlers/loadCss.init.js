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
