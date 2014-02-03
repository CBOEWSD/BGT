# # Rows
# This method simply listens for resize events and switches
# the display mode briefly forcing a re-render of the page
# layout. This resolves scaling issues in certain browsers.

$ ->
  PubSub.subscribe 'resize', ->
    # Only do this above mobile viewport
    if Response.viewportW() < 768 or $('html').hasClass 'lt-ie9'
      return false

    $('.row').css('display', 'block')

    setTimeout ->
      $('.row').css('display', '')
    , 50