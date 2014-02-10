(function() {
  var Header, header;

  Header = (function() {
    var self;

    self = {};

    function Header() {
      this.log.add('notification', 'Constructed.', this);
      self = this;
      self.$topSearchExpander = $('.mobileExpandTopSearch');
      self.$topSearch = $('.header .quicksearch');
      this.$topSearchExpander.click(this.toggleTopSearch);
    }

    Header.prototype.log = new LogHandler('Header');

    Header.prototype.toggleTopSearch = function(e) {
      e.preventDefault();
      self.$topSearch.toggleClass('open');
      return self.log.add('notification', 'Top search toggled.', self.$topSearch);
    };

    return Header;

  })();

  header = new Header;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmluaXQuanMiLCJzb3VyY2VzIjpbImhlYWRlci5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtDQUFBLEtBQUEsUUFBQTs7Q0FBQSxDQUFNO0NBQ0osR0FBQSxJQUFBOztDQUFBLENBQUEsQ0FBTyxDQUFQOztDQUdhLEVBQUEsQ0FBQSxZQUFBO0NBRVgsQ0FBeUIsQ0FBckIsQ0FBSCxFQUFELFFBQUE7Q0FBQSxFQUdPLENBQVAsRUFBQTtDQUhBLEVBTTBCLENBQXRCLEVBQUosWUFBQSxNQUEwQjtDQU4xQixFQU9rQixDQUFkLEVBQUosSUFBQSxZQUFrQjtDQVBsQixHQVVDLENBQUQsQ0FBQSxTQUFBLEdBQW9CO0NBZnRCLElBR2E7O0NBSGIsRUFxQkEsQ0FBUyxJQUFBLEVBQUE7O0NBckJULEVBeUJpQixNQUFDLE1BQWxCO0NBQ0UsS0FBQSxRQUFBO0NBQUEsR0FDSSxFQUFKLElBQWUsQ0FBZjtDQUdLLENBQXdCLENBQXJCLENBQUosTUFBSixHQUFBLENBQUEsT0FBQTtDQTlCRixJQXlCaUI7O0NBekJqQjs7Q0FERjs7QUFrQ1MsQ0FsQ1QsQ0FrQ0EsQ0FBUyxHQUFUO0NBbENBIn0=