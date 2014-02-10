###
  # ScrollOverflow
  Provides the ability to set scrollbars within certain elements
###

# Define module
$el = $('.scrolloverflow')

# Viewport constraints
minvp = 767

# Loaded catch to prevent loop
loaded = false

###
  Load class callable method
  We only need this class called for desktop
  or when device hits correct viewport.
###
load = ->
  return false if loaded

  # Flag we have loaded this class
  loaded = true

  # Load TSE CSS
  window.loadCss '/ui/libs/trackpad-scroll-emulator/css/trackpad-scroll-emulator.css'

  # Load module
  require [
    '/ui/classes/scrolloverflow/scrolloverflow.js'
    '/ui/libs/trackpad-scroll-emulator/jquery.trackpad-scroll-emulator.js'
    ], (so, tse) ->

    new so $, $el, minvp

# Check if at least 1 instance of module
if $el.length > 0 and Response.viewportW() > minvp
  load()
else if $el.length > 0
  # Subscribe to resize event to load in the event
  # We hit large enough viewport
  PubSub.subscribe 'resize', ->
    if Response.viewportW() > minvp
      load()