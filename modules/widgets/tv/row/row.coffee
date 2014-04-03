###
  # RowTV
  This adds functionality to the row subcomponent of the TV widget.
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

    @.removeAnchors()

    @.listen()

    console.log @

    return @

  removeAnchors: () ->
    $anchors = $ 'a', @.$items

    $anchors.each ->
      $(@).replaceWith('<span data-href="' + $(@).attr('href') + '">' + this.innerHTML + '</span>');



  listen: () ->
    console.log @.$el

    @.$items.swipe {
      swipe: self.swipeEvent
      fingers: 'all'
      threshold: 1
      allowPageScroll: 'horizontal'
      tap: self.clickTap
      swipeStatus: self.swipeStatus
    }

  swipeEvent: (e) =>
    console.log e

  swipeStatus: (event, phase, direction, distance, fingers) =>
    #

  clickTap: (e) =>
    console.log 'click tap!!!'


###
  ## Module definition
  Called by require.
###
define ->
  return RowTV