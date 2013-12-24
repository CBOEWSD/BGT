# # ScrollOverflow
# Provides the ability to set scrollbars within certain elements

# Define module
$el = $('.scrolloverflow')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['jquery', '/ui/classes/scrolloverflow/scrolloverflow.js'], ($, so) ->

    new so $, $el