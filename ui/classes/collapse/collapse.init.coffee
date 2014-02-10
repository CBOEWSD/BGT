###
  # Collapse Class
  This class allows for an element to be collapsed down
  to only show a `expander` button on mobile.
  This is useful for saving valuable viewport real estate.
###

$ ->
  # Collection of elements with collapse class
  $el = $ '.collapse'

  # For each add the `expander` button
  $el.each ->
    $(@).append $('<div class="expander">Expand</div>')

  # Bind our newly created buttons. The click/tap event will
  # toggle the view/hide of the related contents.
  # The button will also be changed to close/expand as appropriate.
  $('.expander', $el).click ->
    $parent = $(@).parent('.collapse')
    $parent.toggleClass('open')
    if $(@).text() == 'Expand'
      $(@).text('Close')
    else
      $(@).text('Expand')
