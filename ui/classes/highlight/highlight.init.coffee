###
  # Highlight Class
  This class allows you to add the `data-highlight` attribute
  to elements passing in an array of keywords which will then be
  wrapped in a span with the class `highlight-word`. There is a
  default styling for this class but can be overwritten at a
  component level if need be.
###

$el = $('[data-highlight]')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require [
    '/ui/classes/highlight/highlight.js'], (highlight) ->

    $el.each ->
      new highlight(@)