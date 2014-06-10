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

      $this.qtip
        content:
          attr: 'data-tooltip'
        style:
          classes: 'qtip-bootstrap'
        show:
          event: if $this.data('tooltip-show-event')
          then $this.data('tooltip-show-event')
          else 'mouseenter'

          ready: if $this.data('tooltip-onload')
          then true
          else false

        hide:
          event: if $this.data('tooltip-hide-event')
          then $this.data('tooltip-hide-event')
          else 'mouseleave'
          inactive: if $this.data('tooltip-show-for')
          then $this.data('tooltip-show-for')
          else false

        position:
          my: if $this.data('tooltip-position-my')
          then $this.data('tooltip-position-my')
          else 'top left'

          at: if $this.data('tooltip-position-at')
          then $this.data('tooltip-position-at')
          else 'bottom left'

          target: $this

          adjust:
            scroll: true
            mouse: false
            resize: true

