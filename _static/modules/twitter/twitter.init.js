(function() {
  var $el;

  $el = $('.twitter .api');

  if ($el.length > 0) {
    require(['jquery', 'socketio', 'templates', '/modules/twitter/twitter.model.js', '/modules/twitter/twitter.view.js'], function($, io, tpl, twitterModel, twitterView) {
      var me;
      me = new twitterModel($, io);
      return $el.each(function() {
        var limit;
        limit = typeof $(this).data('limit') === 'number' ? $(this).data('limit') : 3;
        return me = new twitterView(this);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5pbml0LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0NBQUEsRUFBQSxHQUFBOztDQUFBLENBQUEsQ0FBQSxZQUFNOztDQUdOLENBQUEsQ0FBTSxDQUFILEVBQUE7Q0FFRCxDQUVFLENBSUcsQ0FOTCxHQUFBLENBQVEsQ0FNRixDQU5FLENBQUEsQ0FNSCxzQkFORyxDQUFBO0NBU04sQ0FBQSxRQUFBO0NBQUEsQ0FBQSxDQUFTLENBQUEsRUFBVCxNQUFTO0NBR0wsRUFBRCxDQUFILEtBQVMsSUFBVDtDQUNFLElBQUEsT0FBQTtBQUFXLENBQVgsRUFBVyxDQUFPLENBQWxCLENBQVcsQ0FBTyxDQUFsQjtDQUVxQixDQUFyQixDQUFTLENBQUEsT0FBQSxJQUFUO0NBSEYsTUFBUztDQVpYLElBTUs7SUFYUDtDQUFBIn0=