###
  # Side Nav Init
  Calls in dependencies if side navigation module exists on page.
###

# Define module
$el = $('.side-navigation')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['/modules/widgets/side-navigation/nav.js'], (sideNav) ->
    # (jQuery, this, AutoTime)
    me = new sideNav $el