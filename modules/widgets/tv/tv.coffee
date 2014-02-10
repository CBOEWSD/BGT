###
  # WidgetTV
  This is main code behind the TV widget module. The module will make
  use of the global LogHandler class.
###

class WidgetTV
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el) ->
    # Add this/that
    self = @

    # Bind up some base objects
    self.$el = el
    self.$options = $ '.options a', el

    @log.add 'notification', 'Widget module constructed.', @

    # Bind up clicks
    self.binds()

    # Init limelight on all players
    self.initPlayers()

  ###
    ## this.log
    Add local instance of logging to this module.
    Can be called with:
    ``` @log.add 'notification', 'message...', @ ```
  ###
  log: new LogHandler 'WidgetTV'

  ###
    ## this.binds()
    Binds click events to thumbnail icons.
  ###
  binds: ->
    @.$options.bind 'click', self.changePrime
    # Subscribe to global resize tracker
    PubSub.subscribe 'resize', self.resizeEvent

  ###
    ## this.changePrime()
    Fired on click or touch event of thumbnail selector.
    Changes prime video based on data set embedurl.
  ###
  changePrime: (e) ->
    e.preventDefault()

    # Grab Embed URL from clicked element
    url = $(@).data('embedurl')
    $placeholder = $ '.prime', $(@).closest('.widget-tv')
    $embed = $('.embed', $placeholder)

    # Grab embed element type
    type = $embed.prop('tagName').toLowerCase()

    # Check embed type
    if type == 'iframe'
      $embed.attr 'src', url
      self.log.add 'notification', 'Prime video changed.', $embed
    if type == 'object'
      # Grab to dynamic params
      $param = $ 'param[name="flashVars"]', $embed
      # Split the params into an object
      # Before placing reinserting the new value attribute
      value = window.query2object($param.attr('value'))
      value.mediaId = url
      value = decodeURIComponent($.param(value))
      $param.attr 'value', value

      # To reload the object we remove from DOM and replace
      $embed.detach()
      $placeholder.append $embed

      # Init limelight
      self.limeLightInit($embed.attr('id'))
    else
      self.log.add 'error', 'Embed element type not accounted for.', $embed

  ###
    ## this.initPlayers()
    Called by the constructor to set the initial view for
    mobile and tablet devices and other such requirements for player.
  ###
  initPlayers: ->
    $players = $ 'object', self.$el

    $players.each ->
      self.setDimensions($(@))
      self.limeLightInit $(@).attr('id')

  ###
    ## this.setDimensions()
    Sets the width and height of the object placeholder
    for the limelight plugin to resolve.
  ###
  setDimensions: ($obj) ->
    $parent = $obj.parent('.prime')
    newWidth = $parent.width()
    newHeight = $parent.innerHeight()
    $obj.attr('width', newWidth)
    .attr('height', newHeight)
    .css('width', newWidth)
    .css('height', newHeight)

  ###
    ## this.limeLightInit()
    Initialized the embed plugin for mobile embedding.
  ###
  limeLightInit: (id) ->
    return false unless id?
    # log
    self.log.add 'notification', 'Limelight player initialized.', id

    # init limelight
    LimelightPlayerUtil.initEmbed(id)

  ###
    ## this.resizeEvent
    On viewport resize event we check if the limelight wrapper is active
    for each we resize to the new appropriate size.
  ###
  resizeEvent: (e) ->
    $footprint = $('.limelight-player-footprint', self.$el)

    # Check we have at least one
    return false if $footprint.length < 1

    # log
    self.log.add 'notification', 'Resize event: modifying limelight footprint.', $footprint

    # for each resize
    $footprint.each ->
      self.setDimensions $(@)

###
  ## Module definition
  Called by require.
###
define ->
  return WidgetTV