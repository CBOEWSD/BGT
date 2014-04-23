
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuaW5pdC5qcyIsInNvdXJjZXMiOlsiY29sbGFwc2UuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLENBQUEsQ0FBRSxTQUFBLEdBQUE7QUFFQSxRQUFBLEdBQUE7QUFBQSxJQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsV0FBRixDQUFOLENBQUE7QUFBQSxJQUdBLEdBQUcsQ0FBQyxJQUFKLENBQVMsU0FBQSxHQUFBO2FBQ1AsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLE1BQUwsQ0FBWSxDQUFBLENBQUUsb0NBQUYsQ0FBWixFQURPO0lBQUEsQ0FBVCxDQUhBLENBQUE7V0FTQSxDQUFBLENBQUUsV0FBRixFQUFlLEdBQWYsQ0FBbUIsQ0FBQyxLQUFwQixDQUEwQixTQUFBLEdBQUE7QUFDeEIsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLE1BQUwsQ0FBWSxXQUFaLENBQVYsQ0FBQTtBQUFBLE1BQ0EsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsTUFBcEIsQ0FEQSxDQUFBO0FBRUEsTUFBQSxJQUFHLENBQUEsQ0FBRSxJQUFGLENBQUksQ0FBQyxJQUFMLENBQUEsQ0FBQSxLQUFlLFFBQWxCO2VBQ0UsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLElBQUwsQ0FBVSxPQUFWLEVBREY7T0FBQSxNQUFBO2VBR0UsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLEVBSEY7T0FId0I7SUFBQSxDQUExQixFQVhBO0VBQUEsQ0FBRixDQVBBLENBQUE7QUFBQSJ9