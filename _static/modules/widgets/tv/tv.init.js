
/*
   * TV Widget init
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuaW5pdC5qcyIsInNvdXJjZXMiOlsidHYuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFRQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLFlBQUYsQ0FSTixDQUFBOztBQVdBLEVBQUEsSUFBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQWhCO0FBRUUsSUFBQSxPQUFBLENBQVEsQ0FDTiwyQkFETSxFQUVOLDBDQUZNLENBQVIsRUFFK0MsU0FBQyxFQUFELEdBQUE7YUFFN0MsR0FBRyxDQUFDLElBQUosQ0FBUyxTQUFBLEdBQUE7ZUFDSCxJQUFBLEVBQUEsQ0FBRyxJQUFILEVBREc7TUFBQSxDQUFULEVBRjZDO0lBQUEsQ0FGL0MsQ0FBQSxDQUZGO0dBWEE7QUFBQSJ9