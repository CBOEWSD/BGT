/*
  # ToolTips Class
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

  $el = $('[data-tooltip]');

  if ($el.length > 0) {
    loadCss('/ui/libs/qtip2/jquery.qtip.css');
    require(['/ui/libs/qtip2/jquery.qtip.js'], function() {
      return $el.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data();
        return $this.qtip({
          content: {
            attr: 'data-tooltip',
            title: {
              text: data.tooltipTitle ? data.tooltipTitle : ' ',
              button: 'Close'
            }
          },
          style: {
            classes: 'qtip-bootstrap'
          },
          show: {
            event: data.tooltipShowEvent ? data.tooltipShowEvent : 'mouseenter',
            ready: data.tooltipOnload ? true : false
          },
          hide: {
            event: data.tooltipHideEvent ? data.tooltipHideEvent : 'mouseleave',
            inactive: data.tooltipShowFor ? data.tooltipShowFor : false
          },
          position: {
            my: data.tooltipPositionMy ? data.tooltipPositionMy : 'top left',
            at: data.tooltipPositionAt ? data.tooltipPositionAt : 'bottom left',
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
