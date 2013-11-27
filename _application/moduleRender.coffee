q = require 'q'
_ = require 'lodash'
hbs = require('express3-handlebars').create()

# ## ModuleRender Class
# Gathers the corresponding modules needed for each page
# by looking at the config.modules properties
# and precomipling the needed modules for each page variable
class ModuleRender
  md = {}
  content = undefined
  sections = undefined
  deferred = undefined
  locals = {}

  # ### Construct Class
  # Passes this to a that working around
  # namespace issues with this. Sets the variable
  # for content based on the content from the
  # json file passed and sets the initial promise
  # step in the process.
  constructor: (data)->
    md = @
    content = data

    deferred = q.defer()

    return md.processModules()

  # ### processModules
  # Checks if we need to load modules and cycles
  # through each section creating an array
  # with the content needed based on modules.
  # The methods sets a promise which gets
  # resolved once all sections have been processed
  processModules: ->
    if(typeof(content.modules) == 'undefined')
      deferred.reject() # Log error for no modules.
    else
      results = []
      _.each content.modules, (modules, section) ->
        locals[section] = ''
        processDeferred = q.defer()
        q(md.loadModules modules).then (data) ->
          _.each data, (item) ->
            if item.state == 'fulfilled'
              locals[section] += item.value
            else
              console.log 'Error getting the module'
          processDeferred.resolve data

        results.push processDeferred.promise

      q.all(results).then () ->
        deferred.resolve locals

    deferred.promise

  # ### loadModules
  # Cycles through each module for the section
  # and proceeds to load it if found.
  # The methods sets a promise which gets
  # resolved once all modules have been processed
  loadModules: (modules, callback) ->
    results = []
    content = ''
    _.each modules, (module) ->
      moduleDeferred = q.defer()
      name =  _.keys module
      modulePath = './modules/' + name[0] + '/' + name[0] + '.handlebars' # what if the modules doesn't have the same name as the folder?
      fs.exists modulePath, (bool) ->
        if bool
          q(md.loadModule modulePath).then (content) ->
            moduleDeferred.resolve content
        else
          console.log 'Can\'t locate module'

      results.push moduleDeferred.promise

    q.allSettled(results)

  # ### loadModule
  # Calls the hbs render method to render the needed
  # module as html. The method sets a promise which gets
  # resolved once the partial has been rendered
  loadModule: (module) ->
    loaded = q.defer()
    hbs.render module, (err, partial) -># Rendering the module without content for now
      # TODO add error handler
      # TODO process content for the partial
      loaded.resolve partial

    loaded.promise

module.exports = ModuleRender