(function() {
  var $el;

  $el = $('article.content table');

  if ($el.length > 0) {

    /*
      *# Load
     Load depedencies and module for tables
     */
    window.loadCss('/ui/libs/ReStable/jquery.restable.css');
    require(['restable', '/modules/widgets/content/tables.js'], function(restable, tables) {
      var ct;
      return ct = new tables($el);
    });
  }

}).call(this);
