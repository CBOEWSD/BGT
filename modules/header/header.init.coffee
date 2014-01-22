# # Header
# Contains basic bindings for header module.
# Simple bindings such as the top search binding on mobile.

class Header
  self = {}

  # ## Constructor
  constructor: () ->
    # this/that
    self = @

    # Top search elements for binding and view
    self.$topSearchExpander = $('.mobileExpandTopSearch')
    self.$topSearch = $('.header .quicksearch')

    # Bind mobile toggle
    @.$topSearchExpander.click @.toggleTopSearch

  # ## this.toggleTopSearch
  # Called on click (tap) of mobile search icon
  toggleTopSearch: (e) ->
    e.preventDefault()
    self.$topSearch.toggleClass('open')

# ### Init
header = new Header