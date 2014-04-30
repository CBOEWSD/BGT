
/*
   * TV Row init
  The init for this module will check if an instance of the module
  exists on the page. If so, it will load the module and any dependencies
  before initializing for each instance of the module.
 */

(function() {
  var $el;

  $el = $('.widget-tv.row');

  if ($el.length > 0) {
    require(['/modules/widgets/tv/row/row.js'], function(row) {
      return $el.each(function() {
        return new row(this);
      });
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmluaXQuanMiLCJzb3VyY2VzIjpbInJvdy5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsR0FBQTs7QUFBQSxFQVFBLEdBQUEsR0FBTSxDQUFBLENBQUUsZ0JBQUYsQ0FSTixDQUFBOztBQVdBLEVBQUEsSUFBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQWhCO0FBRUUsSUFBQSxPQUFBLENBQVEsQ0FDTixnQ0FETSxDQUFSLEVBQ3FDLFNBQUMsR0FBRCxHQUFBO2FBRW5DLEdBQUcsQ0FBQyxJQUFKLENBQVMsU0FBQSxHQUFBO2VBQ0gsSUFBQSxHQUFBLENBQUksSUFBSixFQURHO01BQUEsQ0FBVCxFQUZtQztJQUFBLENBRHJDLENBQUEsQ0FGRjtHQVhBO0FBQUEifQ==