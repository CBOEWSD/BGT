(function() {
  var $el;

  $el = $('.widget-tv');

  if ($el.length > 0) {
    require(['/modules/widgets/tv/tv.js', '/modules/widgets/tv/embed-1.5.4/embed.js'], function(tv) {
      return $el.each(function() {
        return new tv(this);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuaW5pdC5qcyIsInNvdXJjZXMiOlsidHYuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Q0FBQSxFQUFBLEdBQUE7O0NBQUEsQ0FBQSxDQUFBLFNBQU07O0NBR04sQ0FBQSxDQUFNLENBQUgsRUFBQTtDQUVELENBRUUsQ0FBNkMsQ0FGL0MsR0FBQSxFQUVnRCxrQkFGeEMsZUFBQTtDQUlGLEVBQUQsQ0FBSCxLQUFTLElBQVQ7Q0FDUyxDQUFILEVBQUEsV0FBQTtDQUROLE1BQVM7Q0FKWCxJQUUrQztJQVBqRDtDQUFBIn0=