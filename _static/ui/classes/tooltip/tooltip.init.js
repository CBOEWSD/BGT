
/*
   * ToolTips Class
  Calls in dependencies if tabs class exists on page

  Available data attributes:
  ```
    data-tooltip="Markup/text can be placed in here for tooltip contents"
    data-tooltip-onload="true"
    data-tooltip-position-my="bottom middle"
    data-tooltip-position-at="top middle"
    data-tooltip-show-event="click"
    data-tooltip-hide-event="click"
    data-tooltip-show-for="6000"
  ```
 */

(function() {
  var $el;

  $el = $('.tooltip');

  if ($el.length > 0) {
    loadCss('/ui/libs/qtip2/jquery.qtip.css');
    require(['/ui/libs/qtip2/jquery.qtip.js'], function() {
      return $el.each(function() {
        var $this;
        $this = $(this);
        return $this.qtip({
          content: {
            attr: 'data-tooltip',
            title: {
              text: $this.data('tooltip-title') ? $this.data('tooltip-title') : ' ',
              button: 'Close'
            }
          },
          style: {
            classes: 'qtip-bootstrap'
          },
          show: {
            event: $this.data('tooltip-show-event') ? $this.data('tooltip-show-event') : 'mouseenter',
            ready: $this.data('tooltip-onload') ? true : false
          },
          hide: {
            event: $this.data('tooltip-hide-event') ? $this.data('tooltip-hide-event') : 'mouseleave',
            inactive: $this.data('tooltip-show-for') ? $this.data('tooltip-show-for') : false
          },
          position: {
            my: $this.data('tooltip-position-my') ? $this.data('tooltip-position-my') : 'top left',
            at: $this.data('tooltip-position-at') ? $this.data('tooltip-position-at') : 'bottom left',
            target: $this,
            adjust: {
              scroll: true,
              mouse: false,
              resize: true
            }
          }
        });
      });
    });
  }

}).call(this);
