
/*
   * Twitter API Integrations
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
 */

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
