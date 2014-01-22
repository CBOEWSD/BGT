# # LT IE10
# This file will only be loaded when the page is loaded
# by an IE borwser less than version 10. Here we will load
# any further shims/fixes required for those browsers to support
# certains features or functions.
$ ->
  require ['/ui/libs/jquery-placeholder/jquery.placeholder.js'], (ph) ->
    $('input, textarea').placeholder()