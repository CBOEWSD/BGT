(function() {
  var $el;

  $el = $('.widget-hero');

  if ($el.length > 0) {
    require(['jquery', '/modules/widgets/hero/hero.js'], function($, hero) {
      return $el.each(function() {
        var me;
        return me = new hero($, this, 6000);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5pbml0LmpzIiwic291cmNlcyI6WyJoZXJvLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0NBQUEsRUFBQSxHQUFBOztDQUFBLENBQUEsQ0FBQSxXQUFNOztDQUdOLENBQUEsQ0FBTSxDQUFILEVBQUE7Q0FFRCxDQUFtQixDQUFrQyxDQUFyRCxHQUFBLENBQVEsQ0FBOEMsc0JBQTlDO0NBRUYsRUFBRCxDQUFILEtBQVMsSUFBVDtDQUVFLENBQUEsVUFBQTtDQUFjLENBQWQsQ0FBUyxDQUFBLFdBQVQ7Q0FGRixNQUFTO0NBRlgsSUFBcUQ7SUFMdkQ7Q0FBQSJ9