
/*
   * Content Tables
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
       *# Constructor
     */

    function ContentTables($el) {
      self = this;
      this.$el = $el;
      this.bind();
    }


    /*
       *# this.bind
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVzLmpzIiwic291cmNlcyI6WyJ0YWJsZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBT007QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSx1QkFBQyxHQUFELEdBQUE7QUFDWCxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQyxHQUFGLEdBQVEsR0FIUixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUMsSUFBRixDQUFBLENBTEEsQ0FEVztJQUFBLENBTGI7O0FBYUE7QUFBQTs7OztPQWJBOztBQUFBLDRCQWtCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFULENBQUEsRUFESTtJQUFBLENBbEJOLENBQUE7O3lCQUFBOztNQVJGLENBQUE7O0FBQUEsRUE2QkEsTUFBQSxDQUFPLFNBQUEsR0FBQTtBQUNMLFdBQU8sYUFBUCxDQURLO0VBQUEsQ0FBUCxDQTdCQSxDQUFBO0FBQUEifQ==