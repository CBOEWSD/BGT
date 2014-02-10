/*
  # Collapse Class
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuaW5pdC5qcyIsInNvdXJjZXMiOlsiY29sbGFwc2UuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztDQUFBO0NBQUE7Q0FBQTtDQUFBLENBT0EsQ0FBRSxNQUFBO0NBRUEsRUFBQSxLQUFBO0NBQUEsRUFBQSxDQUFBLE9BQU07Q0FBTixFQUdHLENBQUgsS0FBUztDQUNQLEdBQUEsRUFBQSxPQUFBLHVCQUFZO0NBRGQsSUFBUztDQU1ULENBQWUsQ0FBZixFQUFBLElBQTBCLEVBQTFCO0NBQ0UsTUFBQSxHQUFBO0NBQUEsRUFBVSxDQUFBLEVBQVYsQ0FBQSxJQUFVO0NBQVYsS0FDQSxDQUFPLElBQVA7Q0FDQSxHQUFHLENBQWUsQ0FBbEIsRUFBQTtDQUNFLEdBQUEsR0FBQSxRQUFBO01BREYsRUFBQTtDQUdFLEdBQUEsSUFBQSxPQUFBO1FBTnNCO0NBQTFCLElBQTBCO0NBWDVCLEVBQUU7Q0FQRiJ9