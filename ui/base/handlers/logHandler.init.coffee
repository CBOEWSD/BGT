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

    if window.debug
      # Log level data can be accessed
      # via `log.moduleName` in console
      window.log[@module] = window.log[@module] or {}
      window.log[@module][type] = window.log[@module][type] or []
      window.log[@module][type].push object

      # Console log if in debug mode
      if type == 'error' or type == 'warning' then console.log @module, type, object
