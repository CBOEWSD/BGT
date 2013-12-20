# # Base.coffee
# This file is the initial entry point into our application.
# It defines our dependency paths and loads the next step.

# ## Configure require base settings
# These are predefined library locations, meaning each
# module can simple call `libname` instead of paths.
requirejs.config {
  paths:
    jquery: '/ui/libs/jquery/jquery'
    echojs: '/ui/libs/echojs/dist/echo'
    pubsub: '/ui/libs/pubsub-js/src/pubsub'
    templates: '/ui/templates/templates'
    socketio: '/socket.io/socket.io'
}

# ## Declare Application Class
# [CoffeeScript Classes](http://arcturo.github.io/library/coffeescript/03_classes.html)
# Please see that link for further information on Classes
class @Base



# ## Application LogHandler
# Can be called in each module if a log is required
# simply by adding `log: new LogHandler 'moduleName'`
class @LogHandler
  constructor: (module) ->
    window.log = window.log or {}

    # Default setting to disable console logs
    @debug = true

    # Set default module name to be the app
    @module = module || 'Application'

  # ### Add new log
  # Passing in variable data to be pushed into log
  add: (type, message, extended) ->
    object = {
      message: message
      extended: extended
    }

    # Check if type is set and one of the available.
    # If not it will be set as `notification`.
    type = if type != 'error' and type != 'warning' and type != 'notification' then 'notification' else type

    # Log level data can be accessed
    # via `log.moduleName` in console
    window.log[@module] = window.log[@module] or {}
    window.log[@module][type] = window.log[@module][type] or []
    window.log[@module][type].push object

    # Console log if in debug mode
    if type == 'error' or type == 'warning' then console.log @module, type, object
