# # Twitter API Integrations
# The init for this module will check if an instance of the module exists on the page. If so, it will load the module and any dependencies before initializing for each instance of the module.

# Define module
$el = $('.twitter .api')

# Check if at least 1 instance of module
if $el.length > 0
  # Load module
  require [
    'jquery',
    'socketio',
    'pubsub',
    'handlebars',
    '/modules/twitter/twitter.model.js',
    '/modules/twitter/twitter.view.js',
    'hbs/handlebars'
    ], ($, io, pubsub, hbsgroup, twitterModel, twitterView, hbs) ->

    # if pubsub is not global make it so
    window.pubsub = window.pubsub or pubsub
    # if handlebars is not global make it so
    window.hbs = window.hbs or hbs

    # Init view (socket connection)
    me = new twitterModel $, io, hbs

    # Init a view for each
    $el.each ->
      limit = if typeof $(@).data('limit') == 'number' then $(@).data('limit') else 3
      # (jQuery, this, AutoTime)
      me = new twitterView @
