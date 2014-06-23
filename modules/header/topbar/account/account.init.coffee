###
  # Account Dropdown
  Account dropdown component; child node to topbar component.
###

class AccountDropdown
  ###
    ## Constructor
  ###
  constructor: (el) ->
    @.$el = $ el
    @.$top = $ '>li', el
    @.$button = $ '>li>a', el

    @.bind()

    return @

  ###
    ## this.bind
    Bind up events needed to open/close menu
  ###
  bind: () ->
    @.$button.bind 'click', (e) =>
      @.toggleExpand(e)

    $(document).bind 'click', (e) =>
      return true if @.$el.has(e.target).length > 0
      return true if @.$el.is(e.target)
      @.$top.removeClass('open')

  ###
    ## this.toggleExpand
    Event handler
  ###
  toggleExpand: (event) ->
    event.preventDefault()
    @.$top.toggleClass('open')

###
  ## Init
###
$el = $ '.account-dropdown'

$el.each ->
  new AccountDropdown(this)