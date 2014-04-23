
/*
   * Table
 */

(function() {
  var $el, Table;

  Table = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
     */

    function Table(el) {
      this.$el = $(el);
      this.$cols = $('colgroup col', el);
      this.$tr = $('tr', el);
      this.hideIndex = [];
      this.notMobile();
      this.$el.addClass('mobile-load');
      return this;
    }


    /*
       *# notMobile
      Find which columns should be hidden on mobile and pass
      their index to `hideColumn`.
     */

    Table.prototype.notMobile = function() {
      var $nope;
      $nope = this.$cols.filter('.nomobile');
      return $nope.each((function(_this) {
        return function(index, element) {
          index = _this.$cols.index(element);
          _this.hideIndex.push(index);
          return _this.hideColumn(index);
        };
      })(this));
    };


    /*
       *# hideColumn
      Given an index hide each column with that index on
      each given row.
     */

    Table.prototype.hideColumn = function(index) {
      return this.$tr.each((function(_this) {
        return function(i, element) {
          var $td;
          $td = $('td, th', element);
          return $td.eq(index).addClass('nomobile');
        };
      })(this));
    };

    return Table;

  })();


  /*
     *# Init
    Call for each `.table` on page.
   */

  $el = $('table.table');

  if ($el.length > 0) {
    $el.each(function() {
      return new Table(this);
    });
  }

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuaW5pdC5qcyIsInNvdXJjZXMiOlsidGFibGUuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFJTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxNQUFQLENBQUE7O0FBRUE7QUFBQTs7T0FGQTs7QUFLYSxJQUFBLGVBQUMsRUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUMsR0FBRixHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFDLEtBQUYsR0FBVSxDQUFBLENBQUUsY0FBRixFQUFrQixFQUFsQixDQURWLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQyxHQUFGLEdBQVEsQ0FBQSxDQUFFLElBQUYsRUFBUSxFQUFSLENBRlIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFDLFNBQUYsR0FBYyxFQUhkLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FOQSxDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUMsR0FBRyxDQUFDLFFBQU4sQ0FBZSxhQUFmLENBVEEsQ0FBQTtBQVdBLGFBQU8sSUFBUCxDQVpXO0lBQUEsQ0FMYjs7QUFtQkE7QUFBQTs7OztPQW5CQTs7QUFBQSxvQkF3QkEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsS0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLElBQUMsQ0FBQyxLQUFLLENBQUMsTUFBUixDQUFlLFdBQWYsQ0FBUixDQUFBO2FBRUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsT0FBUixHQUFBO0FBQ1QsVUFBQSxLQUFBLEdBQVEsS0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFSLENBQWMsT0FBZCxDQUFSLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQyxTQUFTLENBQUMsSUFBWixDQUFpQixLQUFqQixDQURBLENBQUE7aUJBRUEsS0FBQyxDQUFDLFVBQUYsQ0FBYSxLQUFiLEVBSFM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBSFM7SUFBQSxDQXhCWCxDQUFBOztBQWdDQTtBQUFBOzs7O09BaENBOztBQUFBLG9CQXFDQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7YUFDVixJQUFDLENBQUMsR0FBRyxDQUFDLElBQU4sQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEVBQUksT0FBSixHQUFBO0FBQ1QsY0FBQSxHQUFBO0FBQUEsVUFBQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLFFBQUYsRUFBWSxPQUFaLENBQU4sQ0FBQTtpQkFDQSxHQUFHLENBQUMsRUFBSixDQUFPLEtBQVAsQ0FBYSxDQUFDLFFBQWQsQ0FBdUIsVUFBdkIsRUFGUztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFEVTtJQUFBLENBckNaLENBQUE7O2lCQUFBOztNQUxGLENBQUE7O0FBK0NBO0FBQUE7OztLQS9DQTs7QUFBQSxFQW1EQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGFBQUYsQ0FuRE4sQ0FBQTs7QUFvREEsRUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBaEI7QUFDRSxJQUFBLEdBQUcsQ0FBQyxJQUFKLENBQVMsU0FBQSxHQUFBO2FBQ0gsSUFBQSxLQUFBLENBQU0sSUFBTixFQURHO0lBQUEsQ0FBVCxDQUFBLENBREY7R0FwREE7QUFBQSJ9