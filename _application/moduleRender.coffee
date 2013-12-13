q = require 'q'
_ = require 'lodash'
hbs = require('express3-handlebars').create({
  partialsDir: [
        './modules/'
    ]
  })

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
  path = undefined

  # ### Construct Class
  # Passes this to a that working around
  # namespace issues with this. Sets the variable
  # for content based on the content from the
  # json file passed and sets the initial promise
  # step in the process.
  constructor: (data, folder)->
    md = @
    content = data
    path = folder + '/content/'

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
        locals[section] = []
        processDeferred = q.defer()
        q(md.loadModules modules).then (data) ->
          _.each data, (item) ->
            if item.state == 'fulfilled'
              locals[section].push item.value
            else
              console.error 'Error getting the module', item.state
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
      data =  _.values module
      modulePath = './modules/' + name[0] + '.handlebars'
      fs.exists modulePath, (bool) ->
        if bool
          q(md.loadModule modulePath, data[0]).then (content) ->
            moduleDeferred.resolve content
        else
          console.error 'Can\'t locate module', modulePath

      results.push moduleDeferred.promise

    q.allSettled(results)

  # ### loadModule
  # Calls the hbs render method to render the needed
  # module as html. The method sets a promise which gets
  # resolved once the partial has been rendered
  loadModule: (module, contentFile) ->
    loaded = q.defer()
    content = md.loadContent(contentFile)

    hbs.render module, content, (err, partial) ->
      return console.error(err) if err
      # TODO add error handler
      # TODO process content for the partial
      loaded.resolve partial

    loaded.promise

  # ### loadContent
  # Uses node-fs to check for content file
  # and load if it exists. Currently only supports
  # json but will be extended to support markdown.
  loadContent: (contentFile) ->
    data = path + contentFile

    if (fs.existsSync(data))
      #fs.writeFileSync(data, 'initial', 'utf8')
      return JSON.parse fs.readFileSync(data, 'utf8')
    else
      console.log "Count not load: #{data} [Returned empty object to module]"
      return {}

module.exports = ModuleRender