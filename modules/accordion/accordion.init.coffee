###
  # Accordion init
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
###

# Define module
$el = $('.accordion')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['/modules/accordion/accordion.js'], (ac) ->
    # (jQuery, element(s) object)
    me = new ac $, $el