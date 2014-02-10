(function() {
  var $el, load, loaded, minvp;

  $el = $('.scrolloverflow');

  minvp = 767;

  loaded = false;

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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsb3ZlcmZsb3cuaW5pdC5qcyIsInNvdXJjZXMiOlsic2Nyb2xsb3ZlcmZsb3cuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Q0FBQSxLQUFBLGtCQUFBOztDQUFBLENBQUEsQ0FBQSxjQUFNOztDQUFOLENBR0EsQ0FBUSxFQUFSOztDQUhBLENBTUEsQ0FBUyxFQU5ULENBTUE7O0NBTkEsQ0FXQSxDQUFPLENBQVAsS0FBTztDQUNMLEdBQUEsRUFBQTtDQUFBLElBQUEsUUFBTztNQUFQO0NBQUEsRUFHUyxDQUFULEVBQUE7Q0FIQSxHQU1BLEVBQU0sQ0FBTiw2REFBQTtDQUdRLENBRU4sQ0FDRyxJQUhMLEVBR00sRUFITixtQ0FBUSx3QkFBQTtDQUtDLENBQUgsQ0FBQSxDQUFBLENBQUEsUUFBQTtDQUxOLElBR0s7Q0F4QlAsRUFXTzs7Q0FrQlAsQ0FBQSxDQUFNLENBQUgsQ0FBSCxDQUFHLEVBQTJCLENBQVI7Q0FDcEIsR0FBQTtDQUNVLEVBQUQsQ0FGWCxFQUFBO0NBS0UsQ0FBMkIsQ0FBQSxDQUEzQixFQUFNLEVBQU4sQ0FBQTtDQUNFLEVBQTBCLENBQXZCLENBQUgsQ0FBQSxFQUFXLENBQVI7Q0FDRCxHQUFBLFdBQUE7UUFGdUI7Q0FBM0IsSUFBMkI7SUFsQzdCO0NBQUEifQ==