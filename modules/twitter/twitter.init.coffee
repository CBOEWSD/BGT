###
  # Twitter API Integrations
  The init for this module will check if an instance of the
  module exists on the page. If so, it will load the module
  and any dependencies before initializing for each instance
  of the module.
###

# Define module
$el = $('.twitter .api')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require [
    'jquery'
    'socketio'
    'templates'
    '/modules/twitter/twitter.model.js'
    '/modules/twitter/twitter.view.js'
    ], ($, io, tpl, twitterModel, twitterView) ->

    # Init view (socket connection)
    me = new twitterModel $, io

    # Init a view for each
    $el.each ->
      limit = if typeof $(@).data('limit') == 'number' then $(@).data('limit') else 3
      # (jQuery, this, AutoTime)
      me = new twitterView @