# # ScrollOverflow
# Provides the ability to set scrollbars within certain elements

# Define module
$el = $('.scrolloverflow')

# Check if at least 1 instance of module
if $el.length > 0
  # Load TSE CSS
  window.loadCss '/ui/libs/trackpad-scroll-emulator/css/trackpad-scroll-emulator.css'

  # Load module
  require [
    'jquery'
    '/ui/classes/scrolloverflow/scrolloverflow.js'
    '/ui/libs/trackpad-scroll-emulator/jquery.trackpad-scroll-emulator.js'
    ], ($, so, tse) ->

    new so $, $el