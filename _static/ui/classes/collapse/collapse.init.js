
/*
   * Collapse Class
  This class allows for an element to be collapsed down
  to only show a `expander` button on mobile.
  This is useful for saving valuable viewport real estate.
 */

(function() {
  $(function() {
    var $el;
    $el = $('.collapse');
    $el.each(function() {
      return $(this).append($('<div class="expander">Expand</div>'));
    });
    return $('.expander', $el).click(function() {
      var $parent;
      $parent = $(this).parent('.collapse');
      $parent.toggleClass('open');
      if ($(this).text() === 'Expand') {
        return $(this).text('Close');
      } else {
        return $(this).text('Expand');
      }
    });
  });

}).call(this);
