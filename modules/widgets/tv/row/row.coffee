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
    @.$item = $ '.item', @.$items
    @.$showWithAll = $ '.items .showWithAll', el
    @.subscribe = @.$el.data('subscribe') || undefined;
    @.$allOtherRows = $('.widget-tv.row').not(el)
    @.$publishers = $("[data-publish='#{@.subscribe}']")
    @.$resetPublishers = $("[data-publish='resetRows']")
    @.$resetPublishers.addClass('shown')

    @.bindShowAll()

    return @

  ###
    ## this.bindShowAll
    Binds show all type actions with their appropriate methods.
  ###
  bindShowAll: () ->
    @.$viewAll = $ '.viewall', @.$el
    @.$total = $ '.total', @.$el

    @.$viewAll.bind 'click', (e) =>
      @.actionToggleMe(e)

    if @.subscribe
      PubSub.subscribe @.subscribe, (event, from) =>
        @.actionToggleAll()

    PubSub.subscribe 'resetRows', => @.$el.trigger 'reset'

    @.$el.bind 'reset', =>
      @.$el.slideDown()
      @.$resetPublishers.addClass('shown')
      @.actionHideAll(false)

    @.$el.bind 'resetfilter', =>
      @.actionHideAll(false)

    if @.$el.data('activestates')
      @.$item.bind 'click', (e) =>
        e.preventDefault()
        PubSub.publish 'row-active-item', e.currentTarget

      PubSub.subscribe 'row-active-item', (e, item) =>
        @.actionActiveItem(e, item)
      PubSub.subscribe 'row-active-item-reset', (e, item) =>
        @.resetActiveItem(e, item)

  ###
    ## this.actionToggleAll
    Called when all should be revealed or hidden for a certain category.
  ###
  actionToggleAll: (e) ->
    if e
      e.preventDefault()

    if (@.$el.hasClass('shown') && @.$el.is(':visible'))
      @.actionHideAll(true)
    else
      @.actionShowAll()

  ###
    ## this.actionShowAll
    Called from `this.actionToggleAll` to show only this row and all
    sub videos/pagination.
  ###
  actionShowAll: () ->
    @.$viewAll.hide()
    @.actionShowMe()
    @.showJustMe()

    @.$el.addClass('shown')

    @.$publishers.addClass('shown')
    @.$resetPublishers.removeClass('shown')

    @.$allOtherRows.trigger('resetfilter')

  ###
    ## this.actionHideAll
    Called from `this.actionToggleAll` to hide only this row and all
    sub videos/pagination.
  ###
  actionHideAll: (trigger) ->
    @.$viewAll.show()
    @.actionHideMe()

    @.$el.removeClass('shown')

    @.$publishers.removeClass('shown')

    if trigger
      @.$allOtherRows.trigger('reset')

  ###
    ## this.actionToggleMe
    Called to expand/collapse this row, without collapsing others.
  ###
  actionToggleMe: (e) ->
    if e
      e.preventDefault()

    if (@.$viewAll.hasClass('shown') && @.$el.is(':visible'))
      @.actionHideMe()
    else
      @.actionShowMe()

  ###
    ## this.actionShowMe
    Called by `this.actionToggleMe` to expand this given row and add
    appropriate classes.
  ###
  actionShowMe: ->
    $('.item:hidden:first', @.$items)
      .nextAll()
      .andSelf()
      .fadeIn()

    @.$showWithAll.fadeIn()
    @.$viewAll.addClass('shown')
    @.$items.addClass('expanded')

  ###
    ## this.actionShowMe
    Called by `this.actionToggleMe` to collapse this given row and remove
    appropriate classes.
  ###
  actionHideMe: ->
    $('.item:nth-child(n+5)', @.$items).fadeOut()
    @.$showWithAll.fadeOut()
    @.$items.removeClass('expanded')

    @.$viewAll.removeClass('shown')

  ###
    ## this.showJustMe
    This method will hide all other `.widget-tv.row` other than `this.$el`
  ###
  showJustMe: () ->
    @.$allOtherRows.slideUp(500, -> PubSub.publish('LazyLoadPoll') )
    @.$el.slideDown(500, -> PubSub.publish('LazyLoadPoll') )

    @.dontResetMe = true

    PubSub.publish('tv-rows-reset')

  ###
    ## this.showEveryone
    This method is called to reset `this.$allOtherRows` by at least showing them.
  ###
  showEveryone: () ->
    @.$allOtherRows.slideDown(500, -> PubSub.publish('LazyLoadPoll') )

  ###
    ## this.actionActiveItem
    On player click this will add an active item state to the selected video
    whilst also publishing a `reset` event to all other items except the selected.
  ###
  actionActiveItem: (e, item) ->
    return true if (@.$el.has(item).length < 1)

    PubSub.publish('row-active-item-reset', item)

    $(item).addClass('active')

  ###
    ## this.resetActiveItem
    Will reset any `active` state videos excluding the video now being
    selected to play. PubSub event: `row-active-item-reset`.

    Call with:
    ```
    PubSub.publish('row-active-item-reset', /* optional item */);
    ```
  ###
  resetActiveItem: (e, item) ->
    @.$item.not(item).removeClass('active')

###
  ## Module definition
  Called by require.
###
define ->
  return RowTV