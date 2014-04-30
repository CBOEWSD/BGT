###
  # RowTV
  This adds functionality to the row subcomponent of the TV widget.

  NOTE:
    This file contains purely superficial functionality. At this time there
    is no interaction with a service. This code should be taken as guidance
    for UX interaction and not as the basis for application code.
###

class RowTV
  self = undefined

  ###
  ## Constructor
  ###
  constructor: (el) ->
    self = @

    @.$el = $ el
    @.$items = $ '.items', el
    @.$showWithAll = $ '.items .showWithAll', el
    @.subscribe = @.$el.data('subscribe') || undefined;
    @.$allOtherRows = $('.widget-tv.row').not(el)
    @.$publishers = $("[data-publish='#{@.subscribe}']")

    @.bindShowAll()

    # console.log @
    return @

  ###
  ## this.bindShowAll
  Binds show all type actions with their appropriate methods.
  ###
  bindShowAll: () ->
    @.$viewAll = $ '.viewall', @.$el
    @.$total = $ '.total', @.$el

    @.$viewAll.bind 'click', (e) =>
      @.actionToggleAll(e)
    @.$total.bind 'click', (e) =>
      @.actionToggleAll(e)

    if @.subscribe
      PubSub.subscribe @.subscribe, (event, from) =>
        @.actionToggleAll()

    @.$el.bind 'reset', =>
      @.$el.slideDown()
      @.actionHideAll(false)

    @.$el.bind 'resetfilter', =>
      @.actionHideAll(false)

  ###
  ## this.actionToggleAll
  Called when all should be revealed or hidden for a certain category.
  ###
  actionToggleAll: (e) ->
    if e
      e.preventDefault()

    if (@.$viewAll.hasClass('shown') && @.$el.is(':visible'))
      @.actionHideAll(true)
    else
      @.actionShowAll()

  actionShowAll: () ->
    $('.item:hidden:first', @.$items)
      .nextAll()
      .andSelf()
      .fadeIn()

    @.$showWithAll.fadeIn()

    @.showJustMe()

    @.$viewAll.addClass('shown')
    @.$publishers.addClass('shown')

    @.$allOtherRows.trigger('resetfilter')

  actionHideAll: (trigger) ->
    $('.item:nth-child(n+5)', @.$items).fadeOut()
    @.$showWithAll.fadeOut()

    @.$viewAll.removeClass('shown')

    @.$publishers.removeClass('shown')

    if trigger
      @.$allOtherRows.trigger('reset')

  ###
  ## this.actionNextFour
  Can show only 4 new items for a given category.
  ###
  actionNextFour: (e) ->
    e.preventDefault()

    $('.item:hidden:first', @.$items)
      .nextAll(".item:lt(3)")
      .andSelf()
      .fadeIn()

  ###
  ## this.showJustMe
  This method will hide all other `.widget-tv.row` other than `this.$el`
  ###
  showJustMe: () ->
    @.$allOtherRows.slideUp(500, -> PubSub.publish('LazyLoadPoll') )
    @.$el.slideDown(500, -> PubSub.publish('LazyLoadPoll') )

    @.dontResetMe = true

    PubSub.publish('tv-rows-reset')

  showEveryone: () ->
    @.$allOtherRows.slideDown(500, -> PubSub.publish('LazyLoadPoll') )



###
  ## Module definition
  Called by require.
###
define ->
  return RowTV