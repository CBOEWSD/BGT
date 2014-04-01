###
  # Filter widget init

###

# Define module
$el = $('.filter')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require ['/modules/widgets/sidebar/filter/filter.js'], (filter) ->
    new filter $el