
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
