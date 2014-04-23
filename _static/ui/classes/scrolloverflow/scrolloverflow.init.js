
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuaW5pdC5qcyIsInNvdXJjZXMiOlsic2Nyb2xsb3ZlcmZsb3cuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSx3QkFBQTs7QUFBQSxFQU1BLEdBQUEsR0FBTSxDQUFBLENBQUUsaUJBQUYsQ0FOTixDQUFBOztBQUFBLEVBU0EsS0FBQSxHQUFRLEdBVFIsQ0FBQTs7QUFBQSxFQVlBLE1BQUEsR0FBUyxLQVpULENBQUE7O0FBY0E7QUFBQTs7OztLQWRBOztBQUFBLEVBbUJBLElBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTCxJQUFBLElBQWdCLE1BQWhCO0FBQUEsYUFBTyxLQUFQLENBQUE7S0FBQTtBQUFBLElBR0EsTUFBQSxHQUFTLElBSFQsQ0FBQTtBQUFBLElBTUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxvRUFBZixDQU5BLENBQUE7V0FTQSxPQUFBLENBQVEsQ0FDTiw4Q0FETSxFQUVOLHNFQUZNLENBQVIsRUFHSyxTQUFDLEVBQUQsRUFBSyxHQUFMLEdBQUE7YUFFQyxJQUFBLEVBQUEsQ0FBRyxDQUFILEVBQU0sR0FBTixFQUFXLEtBQVgsRUFGRDtJQUFBLENBSEwsRUFWSztFQUFBLENBbkJQLENBQUE7O0FBcUNBLEVBQUEsSUFBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQWIsSUFBbUIsUUFBUSxDQUFDLFNBQVQsQ0FBQSxDQUFBLEdBQXVCLEtBQTdDO0FBQ0UsSUFBQSxJQUFBLENBQUEsQ0FBQSxDQURGO0dBQUEsTUFFSyxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFHSCxJQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLEVBQTJCLFNBQUEsR0FBQTtBQUN6QixNQUFBLElBQUcsUUFBUSxDQUFDLFNBQVQsQ0FBQSxDQUFBLEdBQXVCLEtBQTFCO2VBQ0UsSUFBQSxDQUFBLEVBREY7T0FEeUI7SUFBQSxDQUEzQixDQUFBLENBSEc7R0F2Q0w7QUFBQSJ9