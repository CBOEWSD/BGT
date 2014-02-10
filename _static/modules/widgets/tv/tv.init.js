/*
  # TV Widget init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
*/


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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuaW5pdC5qcyIsInNvdXJjZXMiOlsidHYuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQVFBLENBQUEsU0FBTTs7Q0FHTixDQUFBLENBQU0sQ0FBSCxFQUFBO0NBRUQsQ0FFRSxDQUE2QyxDQUYvQyxHQUFBLEVBRWdELGtCQUZ4QyxlQUFBO0NBSUYsRUFBRCxDQUFILEtBQVMsSUFBVDtDQUNTLENBQUgsRUFBQSxXQUFBO0NBRE4sTUFBUztDQUpYLElBRStDO0lBZmpEO0NBQUEifQ==