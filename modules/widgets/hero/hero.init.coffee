# # Hero Widget Init
# The init for this module will check if an instance of the module exists on the page. If so, it will load the module and any dependencies before initializing for each instance of the module.

# Define module
$el = $('.widget-hero')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['jquery', '/modules/widgets/hero/hero.js'], ($, hero) ->
    # Initialize for each
    $el.each ->
      # (jQuery, this, AutoTime)
      me = new hero $, @, 6000