# # TV Widget init
# The init for this module will check if an instance of the module exists on the page. If so, it will load the module and any dependencies before initializing for each instance of the module.

# Define module
$el = $('.widget-tv')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['/modules/widgets/tv/tv.js'], (tv) ->
    # Initialize for each
    $el.each ->
      new tv @