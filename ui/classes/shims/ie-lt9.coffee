###
  # LT IE9
  This file will only be loaded when the page is loaded
  by an IE borwser less than version 9. Here we will load
  any further shims/fixes required for those browsers to support
  certains features or functions.
###

$ ->

  # Adds a last-child support class that can be used
  # to support certain features on IE8 when the pseudo
  # :last-child is not an option.
  $('body *:last-child').each ->

    $(this).addClass('last-child')