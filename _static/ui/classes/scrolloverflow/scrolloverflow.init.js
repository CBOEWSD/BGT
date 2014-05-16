
/*
   * ScrollOverflow
  Provides the ability to set scrollbars within certain elements
 */

(function() {
  var $el, load, loaded, minvp;

  $el = $('.scrolloverflow');

  minvp = 767;

  loaded = false;


  /*
    Load class callable method
    We only need this class called for desktop
    or when device hits correct viewport.
   */

  load = function() {
    if (loaded) {
      return false;
    }
    loaded = true;
    window.loadCss('/ui/libs/trackpad-scroll-emulator/css/trackpad-scroll-emulator.css');
    return require(['/ui/classes/scrolloverflow/scrolloverflow.js', '/ui/libs/trackpad-scroll-emulator/jquery.trackpad-scroll-emulator.js'], function(so, tse) {
      return new so($, $el, minvp);
    });
  };

  if ($el.length > 0 && Response.viewportW() > minvp) {
    load();
  } else if ($el.length > 0) {
    PubSub.subscribe('resize', function() {
      if (Response.viewportW() > minvp) {
        return load();
      }
    });
  }

}).call(this);
