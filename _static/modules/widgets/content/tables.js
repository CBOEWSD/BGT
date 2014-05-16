
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
