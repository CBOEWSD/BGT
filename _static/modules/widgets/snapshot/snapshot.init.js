
/*
   * Snapshot init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.snapshot');

  if ($el.length > 0) {
    require(['/modules/widgets/snapshot/snapshot.js'], function(snapshot) {
      var ss;
      return ss = new snapshot($el);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QuaW5pdC5qcyIsInNvdXJjZXMiOlsic25hcHNob3QuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFRQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLFdBQUYsQ0FSTixDQUFBOztBQVdBLEVBQUEsSUFBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQWhCO0FBRUUsSUFBQSxPQUFBLENBQVEsQ0FDTix1Q0FETSxDQUFSLEVBQzRDLFNBQUMsUUFBRCxHQUFBO0FBRTFDLFVBQUEsRUFBQTthQUFBLEVBQUEsR0FBUyxJQUFBLFFBQUEsQ0FBUyxHQUFULEVBRmlDO0lBQUEsQ0FENUMsQ0FBQSxDQUZGO0dBWEE7QUFBQSJ9