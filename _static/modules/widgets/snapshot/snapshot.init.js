/*
  # Snapshot init
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QuaW5pdC5qcyIsInNvdXJjZXMiOlsic25hcHNob3QuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLEVBQUEsR0FBQTs7Q0FBQSxDQVFBLENBQUEsUUFBTTs7Q0FHTixDQUFBLENBQU0sQ0FBSCxFQUFBO0NBRUQsQ0FDNEMsQ0FBQSxDQUQ1QyxHQUFBLENBQzRDLENBQUMsOEJBRHJDO0NBR04sQ0FBQSxRQUFBO0NBQWtCLENBQWxCLENBQVMsQ0FBQSxJQUFBLEtBQVQ7Q0FIRixJQUM0QztJQWQ5QztDQUFBIn0=