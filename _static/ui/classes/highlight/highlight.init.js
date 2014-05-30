
/*
   * Highlight Class
  This class allows you to add the `data-highlight` attribute
  to elements passing in an array of keywords which will then be
  wrapped in a span with the class `highlight-word`. There is a
  default styling for this class but can be overwritten at a
  component level if need be.
 */

(function() {
  var $el;

  $el = $('[data-highlight]');

  if ($el.length > 0) {
    require(['/ui/classes/highlight/highlight.js'], function(highlight) {
      return $el.each(function() {
        return new highlight(this);
      });
    });
  }

}).call(this);
