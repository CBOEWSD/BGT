###
# Header
Contains basic bindings for header module.
Simple bindings such as the top search binding on mobile.
###

class Header
  self = {}

  ###
  ## Constructor
  ###
  constructor: () ->
    # Log: construction event
    @log.add 'notification', 'Constructed.', @

    # this/that
    self = @

    # Top search elements for binding and view
    self.$topSearchExpander = $('.mobileExpandTopSearch')
    self.$topSearch = $('.header .quicksearch')

    # Bind mobile toggle
    @.$topSearchExpander.click @.toggleTopSearch

    # Hide mobile toggle if shown
    $(document).bind 'click', (e) =>
      return true if @.$topSearchExpander.has(e.target)
      return true if @.$topSearchExpander.is(e.target)
      @.$topSearch.removeClass('open')

  ###
  ## this.log
  Add local instance of logging to this module.
  Can be called with:
  ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'Header'

  # ## this.toggleTopSearch
  # Called on click (tap) of mobile search icon
  toggleTopSearch: (e) ->
    e.preventDefault()
    self.$topSearch.toggleClass('open')

    # Log: Clicked event fired.
    self.log.add 'notification', 'Top search toggled.', self.$topSearch

###
## Init
###
header = new Header