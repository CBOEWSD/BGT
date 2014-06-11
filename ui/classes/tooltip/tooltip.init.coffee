###
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
###

# Define module
$el = $('.tooltip')

# Check if at least 1 instance of module
if $el.length > 0

  loadCss '/ui/libs/qtip2/jquery.qtip.css'

  # Load module
  require ['/ui/libs/qtip2/jquery.qtip.js'], () ->

    $el.each ->
      $this = $(@)
      data = $this.data()

      $this.qtip
        content:
          attr: 'data-tooltip'
          title:
            text: if data.tooltipTitle
            then data.tooltipTitle
            else ' '

            button: 'Close'
        style:
          classes: 'qtip-bootstrap'
        show:
          event: if data.tooltipShowEvent
          then data.tooltipShowEvent
          else 'mouseenter'

          ready: if data.tooltipOnload
          then true
          else false

        hide:
          event: if data.tooltipHideEvent
          then data.tooltipHideEvent
          else 'mouseleave'

          inactive: if data.tooltipShowFor
          then data.tooltipShowFor
          else false

        position:
          my: if data.tooltipPositionMy
          then data.tooltipPositionMy
          else 'top left'

          at: if data.tooltipPositionAt
          then data.tooltipPositionAt
          else 'bottom left'

          target: $this

          adjust:
            scroll: true
            mouse: false
            resize: true

