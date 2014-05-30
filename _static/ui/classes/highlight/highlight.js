(function() {
  var Highlight;

  Highlight = (function() {
    function Highlight(el) {
      this.$el = $(el);
      this.keywords = this.getKeywords();
      this.highlight(this.keywords);
      console.log(this);
    }

    Highlight.prototype.getKeywords = function() {
      var data;
      data = this.$el.data('highlight');
      if (data.length < 1) {
        return false;
      }
      if (typeof data !== 'object') {
        data = [data];
      }
      return data;
    };

    Highlight.prototype.highlight = function(keywords) {
      var $node, node;
      if (!keywords) {
        return false;
      }
      node = this.$el.data('highlight-target');
      if (node) {
        $node = $(node);
      }
      if ($node.length < 1) {
        $node = this.$el;
      }
      return $node.html((function(_this) {
        return function(i, markup) {
          var keyword, regex, _i, _len;
          for (_i = 0, _len = keywords.length; _i < _len; _i++) {
            keyword = keywords[_i];
            regex = new RegExp("(" + keyword + ")", 'gi');
            markup = markup.replace(regex, '<span class="highlight-word">$1</span>');
          }
          return markup;
        };
      })(this));
    };

    return Highlight;

  })();

  define(function() {
    return Highlight;
  });

}).call(this);
