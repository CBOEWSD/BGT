
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5pbml0LmpzIiwic291cmNlcyI6WyJ0d2l0dGVyLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQVNBLEdBQUEsR0FBTSxDQUFBLENBQUUsZUFBRixDQVROLENBQUE7O0FBWUEsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFFRSxJQUFBLE9BQUEsQ0FBUSxDQUNOLFFBRE0sRUFFTixVQUZNLEVBR04sV0FITSxFQUlOLG1DQUpNLEVBS04sa0NBTE0sQ0FBUixFQU1LLFNBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxHQUFSLEVBQWEsWUFBYixFQUEyQixXQUEzQixHQUFBO0FBR0gsVUFBQSxFQUFBO0FBQUEsTUFBQSxFQUFBLEdBQVMsSUFBQSxZQUFBLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFULENBQUE7YUFHQSxHQUFHLENBQUMsSUFBSixDQUFTLFNBQUEsR0FBQTtBQUNQLFlBQUEsS0FBQTtBQUFBLFFBQUEsS0FBQSxHQUFXLE1BQUEsQ0FBQSxDQUFPLENBQUUsSUFBRixDQUFJLENBQUMsSUFBTCxDQUFVLE9BQVYsQ0FBUCxLQUE2QixRQUFoQyxHQUE4QyxDQUFBLENBQUUsSUFBRixDQUFJLENBQUMsSUFBTCxDQUFVLE9BQVYsQ0FBOUMsR0FBc0UsQ0FBOUUsQ0FBQTtlQUVBLEVBQUEsR0FBUyxJQUFBLFdBQUEsQ0FBWSxJQUFaLEVBSEY7TUFBQSxDQUFULEVBTkc7SUFBQSxDQU5MLENBQUEsQ0FGRjtHQVpBO0FBQUEifQ==