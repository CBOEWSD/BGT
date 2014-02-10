/*
  # ScrollOverflow
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuaW5pdC5qcyIsInNvdXJjZXMiOlsic2Nyb2xsb3ZlcmZsb3cuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLGtCQUFBOztDQUFBLENBTUEsQ0FBQSxjQUFNOztDQU5OLENBU0EsQ0FBUSxFQUFSOztDQVRBLENBWUEsQ0FBUyxFQVpULENBWUE7O0NBRUE7Ozs7O0NBZEE7O0NBQUEsQ0FtQkEsQ0FBTyxDQUFQLEtBQU87Q0FDTCxHQUFBLEVBQUE7Q0FBQSxJQUFBLFFBQU87TUFBUDtDQUFBLEVBR1MsQ0FBVCxFQUFBO0NBSEEsR0FNQSxFQUFNLENBQU4sNkRBQUE7Q0FHUSxDQUVOLENBQ0csSUFITCxFQUdNLEVBSE4sbUNBQVEsd0JBQUE7Q0FLQyxDQUFILENBQUEsQ0FBQSxDQUFBLFFBQUE7Q0FMTixJQUdLO0NBaENQLEVBbUJPOztDQWtCUCxDQUFBLENBQU0sQ0FBSCxDQUFILENBQUcsRUFBMkIsQ0FBUjtDQUNwQixHQUFBO0NBQ1UsRUFBRCxDQUZYLEVBQUE7Q0FLRSxDQUEyQixDQUFBLENBQTNCLEVBQU0sRUFBTixDQUFBO0NBQ0UsRUFBMEIsQ0FBdkIsQ0FBSCxDQUFBLEVBQVcsQ0FBUjtDQUNELEdBQUEsV0FBQTtRQUZ1QjtDQUEzQixJQUEyQjtJQTFDN0I7Q0FBQSJ9