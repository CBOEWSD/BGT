$ ->
  $el = $ '.collapse'

  $el.each ->
    $(@).append $('<div class="expander">Expand</div>')

  $('.expander', $el).click ->
    $parent = $(@).parent('.collapse')
    $parent.toggleClass('open')
    if $(@).text() == 'Expand'
      $(@).text('Close')
    else
      $(@).text('Expand')
