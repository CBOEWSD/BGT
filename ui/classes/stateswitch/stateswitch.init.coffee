class StateSwitch
  self = undefined
  modules = undefined

  constructor: ->
    self = @

    # Add base objects
    modules = {}

  newModule: (name, params) ->
    # If the module is not set add an object
    modules[name] = modules[name] or {}

    # skip out if params empty
    if typeof params == 'undefined'
      return false

    # Add the options object if it exists.
    if typeof params.options == 'object'
      modules[name].options = params.options

    # Add our desktop/mobile objects
    if typeof params.desktop == 'object'
      modules[name].desktop = params.desktop
    if typeof params.mobile == 'object'
      modules[name].mobile = params.mobile

    console.log modules[name]

window.stateSwitch = new StateSwitch