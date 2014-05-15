
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
      this.onlyMobile();
      this.checkHilighted();
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
          return _this.hideColumn(index, 'nomobile');
        };
      })(this));
    };


    /*
       *# onlyMobile
      Find which columns should be hidden on mobile and pass
      their index to `hideColumn`.
     */

    Table.prototype.onlyMobile = function() {
      var $nope;
      $nope = this.$cols.filter('.onlymobile');
      return $nope.each((function(_this) {
        return function(index, element) {
          index = _this.$cols.index(element);
          _this.hideIndex.push(index);
          return _this.hideColumn(index, 'onlymobile');
        };
      })(this));
    };


    /*
       *# hideColumn
      Given an index hide each column with that index on
      each given row.
     */

    Table.prototype.hideColumn = function(index, className) {
      return this.$tr.each((function(_this) {
        return function(i, element) {
          var $td;
          $td = $('td, th', element);
          return $td.eq(index).addClass(className);
        };
      })(this));
    };


    /*
       *# checkHilighted
      Checks the cells on a row for the higlighted attribute
      and if found sets the higlighted class on the whole row.
      The attribute must be set on the first cell: data-higlighted="true"
     */

    Table.prototype.checkHilighted = function(index) {
      return this.$tr.each((function(_this) {
        return function(i, element) {
          var $td;
          $td = $('td, th', element);
          if ($td.data('higlighted')) {
            return $(element).addClass('higlighted');
          }
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuaW5pdC5qcyIsInNvdXJjZXMiOlsidGFibGUuaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7R0FBQTtBQUFBO0FBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFJTTtBQUNKLFFBQUEsSUFBQTs7QUFBQSxJQUFBLElBQUEsR0FBTyxNQUFQLENBQUE7O0FBRUE7QUFBQTs7T0FGQTs7QUFLYSxJQUFBLGVBQUMsRUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUMsR0FBRixHQUFRLENBQUEsQ0FBRSxFQUFGLENBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFDLEtBQUYsR0FBVSxDQUFBLENBQUUsY0FBRixFQUFrQixFQUFsQixDQURWLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQyxHQUFGLEdBQVEsQ0FBQSxDQUFFLElBQUYsRUFBUSxFQUFSLENBRlIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFDLFNBQUYsR0FBYyxFQUhkLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FOQSxDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUMsVUFBRixDQUFBLENBVEEsQ0FBQTtBQUFBLE1BWUEsSUFBQyxDQUFDLGNBQUYsQ0FBQSxDQVpBLENBQUE7QUFBQSxNQWVBLElBQUMsQ0FBQyxHQUFHLENBQUMsUUFBTixDQUFlLGFBQWYsQ0FmQSxDQUFBO0FBaUJBLGFBQU8sSUFBUCxDQWxCVztJQUFBLENBTGI7O0FBeUJBO0FBQUE7Ozs7T0F6QkE7O0FBQUEsb0JBOEJBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLEtBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxJQUFDLENBQUMsS0FBSyxDQUFDLE1BQVIsQ0FBZSxXQUFmLENBQVIsQ0FBQTthQUVBLEtBQUssQ0FBQyxJQUFOLENBQVcsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTtBQUNULFVBQUEsS0FBQSxHQUFRLEtBQUMs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