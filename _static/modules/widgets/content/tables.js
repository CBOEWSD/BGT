/*
  # Content Tables
  This module will be loaded when tables exist within
  content on articles on the page. The interaction will
  render tables in a viewable manner on mobile viewports.
*/


(function() {
  var ContentTables;

  ContentTables = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function ContentTables($el) {
      self = this;
      this.$el = $el;
      this.bind();
    }

    /*
      ## this.bind
      Will call any library or methods required to render
      tables correctly across viewports.
    */


    ContentTables.prototype.bind = function() {
      return self.$el.ReStable();
    };

    return ContentTables;

  })();

  define(function() {
    return ContentTables;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVzLmpzIiwic291cmNlcyI6WyJ0YWJsZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLE9BQUE7O0NBQUEsQ0FPTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsRUFBQSxDQUFBLG1CQUFDO0NBQ1osRUFBTyxDQUFQLEVBQUE7Q0FBQSxFQUdBLENBQUMsRUFBRDtDQUhBLEdBS0MsRUFBRDtDQVhGLElBS2E7O0NBUWI7Ozs7O0NBYkE7O0NBQUEsRUFrQk0sQ0FBTixLQUFNO0NBQ0MsRUFBRyxDQUFKLElBQUosS0FBQTtDQW5CRixJQWtCTTs7Q0FsQk47O0NBUkY7O0NBQUEsQ0E2QkEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxVQUFPLEVBQVA7Q0FERixFQUFPO0NBN0JQIn0=