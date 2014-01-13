$ ->
  # Load deps
  require ['/ui/libs/jquery-placeholder/jquery.placeholder.js'], (ph) ->
    $('input, textarea').placeholder()