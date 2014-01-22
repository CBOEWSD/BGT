# # WidgetTV
# This is main code behind the TV widget module. The module will make use of the global LogHandler class.

class WidgetTV
  self = undefined

  constructor: (el) ->
    # Add this/that
    self = @

    # Bind up some base objects
    self.$el = el
    self.$options = $ '.options a', el

    @log.add 'notification', 'Widget module constructed.', @

    # Bind up clicks
    self.binds()

  # ## this.log
  # Add local instance of logging to this module.
  # Can be called with:
  # ``` @log.add 'notification', 'message...', @ ```
  log: new LogHandler 'WidgetTV'

  # ## this.binds()
  # Binds click events to thumbnail icons.
  binds: ->
    @.$options.bind 'click', self.changePrime

  # ## this.changePrime()
  # Fired on click or touch event of thumbnail selector.
  # Changes prime video based on data set embedurl.
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
    else
      self.log.add 'error', 'Embed element type not accounted for.', $embed

# ## Module definition
# Called by require.
define ->
  return WidgetTV