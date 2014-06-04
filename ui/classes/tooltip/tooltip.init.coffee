###
  # ToolTips Class
  Calls in dependencies if tabs class exists on page
###

# Define module
$el = $('.tooltip')

# Check if at least 1 instance of module
if $el.length > 0

  # Load module
  require ['/ui/libs/qtip2/jquery.qtip.js'], () ->

    $el.each ->
      $this = $(@)

      $this.qtip
        prerender: true
        content:
          attr: 'data-tooltip'
        position:
          target: 'mouse'
          adjust:
            mouse: false
        style:
          classes: 'qtip-bootstrap'
        show:
          event: if $this.data('tooltip-show-event') then $this.data('tooltip-show-event') else 'mouseenter'
          ready: if $this.data('tooltip-onload') then true else false
        hide:
          event: if $this.data('tooltip-hide-event') then $this.data('tooltip-hide-event') else 'mouseleave'
        position:
          my: if $this.data('tooltip-position-my') then $this.data('tooltip-position-my') else 'top left'
          at: if $this.data('tooltip-position-at') then $this.data('tooltip-position-at') else 'bottom left'

