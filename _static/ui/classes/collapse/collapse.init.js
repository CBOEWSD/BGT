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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuaW5pdC5qcyIsInNvdXJjZXMiOlsiY29sbGFwc2UuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7Q0FBQSxDQUFBLENBQUUsTUFBQTtDQUVBLEVBQUEsS0FBQTtDQUFBLEVBQUEsQ0FBQSxPQUFNO0NBQU4sRUFHRyxDQUFILEtBQVM7Q0FDUCxHQUFBLEVBQUEsT0FBQSx1QkFBWTtDQURkLElBQVM7Q0FNVCxDQUFlLENBQWYsRUFBQSxJQUEwQixFQUExQjtDQUNFLE1BQUEsR0FBQTtDQUFBLEVBQVUsQ0FBQSxFQUFWLENBQUEsSUFBVTtDQUFWLEtBQ0EsQ0FBTyxJQUFQO0NBQ0EsR0FBRyxDQUFlLENBQWxCLEVBQUE7Q0FDRSxHQUFBLEdBQUEsUUFBQTtNQURGLEVBQUE7Q0FHRSxHQUFBLElBQUEsT0FBQTtRQU5zQjtDQUExQixJQUEwQjtDQVg1QixFQUFFO0NBQUYifQ==