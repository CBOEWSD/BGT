
/*
   * Anchors
  Move to given anchors on page but buffer by X
  pixels from top of page.
 */

(function() {
  $(function() {

    /*
      Capture anchor element clicks
     */
    var $el, $target, hash, scrollAction;
    $el = $('a[href*=#]');
    $el.click(function(e) {
      var $target, $this, hash;
      $this = $(this);
      hash = $this.attr('href');
      $target = $(hash);
      if ($target.length < 1) {
        $target = $("[name='" + (hash.replace('#', '')) + "']");
      }
      if ($target.length > 0) {
        e.preventDefault();
        window.location.hash = hash;
        return scrollAction($target);
      }
    });

    /*
      Capture on load with hash
     */
    hash = window.location.hash;
    if (hash) {
      $target = $(hash);
      if ($target.length < 1) {
        $target = $("[name='" + (hash.replace('#', '')) + "']");
      }
      if ($target.length > 0) {
        setTimeout((function(_this) {
          return function() {
            return scrollAction($target);
          };
        })(this), 200);
      }
    }

    /*
      Move to element on page
     */
    return scrollAction = function($target) {
      var $body;
      $body = $('html, body');
      return $body.scrollTop($target.offset().top - 70);
    };
  });

}).call(this);
