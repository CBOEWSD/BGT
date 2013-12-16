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
    $embed = $('.prime .embed', $(@).closest('.widget-tv'))

    # Grab embed element type
    type = $embed.prop('tagName').toLowerCase()

    # Check embed type
    if type == 'iframe'
      $embed.attr 'src', url
      self.log.add 'notification', 'Prime video changed.', $embed
    else
      self.log.add 'error', 'Embed element type not accounted for.', $embed

# ## Module definition
# Called by require.
define ->
  return WidgetTV