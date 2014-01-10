
class Header
  self = {}

  constructor: () ->
    # this/that
    self = @

    self.$topSearchExpander = $('.mobileExpandTopSearch')
    self.$topSearch = $('.header .quicksearch')

    # Bind mobile toggle
    @.$topSearchExpander.click @.toggleTopSearch

  toggleTopSearch: (e) ->
    e.preventDefault()
    self.$topSearch.toggleClass('open')



header = new Header