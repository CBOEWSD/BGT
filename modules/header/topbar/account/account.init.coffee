class AccountDropdown
  constructor: (el) ->
    @.$el = $ el
    @.$top = $ '>li', el
    @.$button = $ '>li>a', el

    @.bind()

    console.log @
    return @

  bind: () ->
    @.$button.bind 'click', (e) =>
      @.toggleExpand(e)

    $(document).bind 'click', (e) =>
      @.$top.removeClass('open')

  toggleExpand: (event) ->
    event.preventDefault()
    event.stopImmediatePropagation()
    @.$top.toggleClass('open')


$el = $ '.account-dropdown'

$el.each ->
  new AccountDropdown(this)

