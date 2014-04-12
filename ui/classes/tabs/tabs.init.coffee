###
  # Tabs class init
  Calls in dependencies if tabs class exists on page
###

# Define module
$el = $('.tabs-wrapper')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['/ui/classes/tabs/tabs.js'], (tabs) ->

    $el.each ->
      # (jQuery, this, AutoTime)
      new tabs this