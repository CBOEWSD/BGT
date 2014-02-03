q = require 'q'
_ = require 'lodash'
path = require 'path'
marked = require 'marked'

# ## ModuleRender Class
# Gathers the corresponding modules needed for each page
# by looking at the config.modules properties
# and precomipling the needed modules for each page variable
class ModuleRender
  md = {}
  content = undefined
  sections = undefined
  deferred = undefined
  hbs = undefined
  moduleNames = undefined
  folder = undefined

  # ### Construct Class
  # Passes this to a that working around
  # namespace issues with this. Sets the variable
  # for content based on the content from the
  # json file passed and sets the initial promise
  # step in the process.
  constructor: (data, handlebars, modules, fd)->
    md = @
    content = data
    hbs = handlebars
    moduleNames = modules
    folder = fd + '/content/'
    deferred = q.defer()
    return md.processPlaceholders()

  # ### processModules
  # Checks if we need to load placeholders and cycles
  # through each section creating an array
  # with the content needed based on placeholders.
  # The methods sets a promise which gets
  # resolved once all sections have been processed
  processPlaceholders: ->
    if(typeof(content.placeholders) == 'undefined')
      deferred.reject() # Log error for no placeholders.
    else
      results = []
      locals = {}

      _.each content.placeholders, (modules, section) ->
        locals[section] = []
        processDeferred = q.defer()
        q(md.preprocessNode modules).then (result) ->
          #each section has an array of modules, we need to concatenate each item inside the section
          _.each result, (item)->
            locals[section].push item

          processDeferred.resolve result

        results.push processDeferred.promise
      q.all(results).then () ->
        deferred.resolve locals

    deferred.promise

  # ### loadModule
  # Calls the hbs render method to render the needed
  # module as html. The method sets a promise which gets
  # resolved once the partial has been rendered
  loadModule: (module, content) ->
    mDefer = q.defer()
    q(md.loadContent content).then (result) ->
      hbs.render module, result, (err, partial) -># Rendering the module without content for now
        # TODO add error handler
        # TODO process content for the partial
        mDefer.resolve partial

    mDefer.promise

  # ### loadContent
  # loads the appropiate content from the passed file (json or markdown)
  loadContent: (content) ->
    mDefer = q.defer()
    #check if content is a string and represents a json filename
    #if typeof content is "string" and md.endsWith content, '.json'
    if typeof content is "string" and path.extname(content) is '.json'
      if fs.existsSync folder+content
        #load the json file, and process the content, to see if inner modules need to be processed
        q(md.preprocessNode JSON.parse(fs.readFileSync(folder+content, 'utf8'))).then (result) ->
          mDefer.resolve result
      else
        #return empty object if not found
        mDefer.resolve {}
    else if typeof content is "string" and path.extname(content) is '.md'
      if fs.existsSync folder+content
        # process the markdown file and return the html contents
        q(md.renderMarkdown fs.readFileSync(folder+content, 'utf8')).then (result) ->
          mDefer.resolve
            "markdown": result
      else
        #return empty object if not found
        mDefer.resolve {}
    else
      #resolve to the json object received
      mDefer.resolve content
    mDefer.promise

  # ### renderMarkdown
  # Converts markdown to HTML
  renderMarkdown: (source) ->
    matchers =
      truncate: /\#{2}\!{2}truncate\s*[\n]?/,
      linkdef: /^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/

    tokens = marked.lexer source
    marked.parser tokens

  # ### preprocessNode
  # check the type of the node, and forwards the node to be processed by its correspondant function
  preprocessNode: (node) ->
    mDefer = q.defer()

    if node instanceof Array
      q(md.preprocessArray node).then (result) ->
        mDefer.resolve result
    else if node instanceof Object
      q(md.preprocessObject node).then (result) ->
        mDefer.resolve result
    else
      mDefer.resolve node

    mDefer.promise

  # ### preprocessArray
  # Goes through each item and return the processed value for each one inside an array
  preprocessArray:(array) ->
    results = [];
    mDefer = q.defer()
    _.each array, (item) ->
      itemDefer = q.defer()
      q(md.preprocessNode item).then (result) ->
        itemDefer.resolve result

      results.push itemDefer.promise

    q.all(results).then () ->
      resultsToReturn = []
      _.each results, (item) ->
        resultsToReturn.push item
      mDefer.resolve resultsToReturn

    mDefer.promise

  # ### preprocessObject
  # Check each property of the object, if one of the properties is a module,
  # ignores all the other properties and returns the html for that module.
  # Otherwise it returns the object with each property processed
  preprocessObject:(object) ->
    results = []
    moduleFound = false
    moduleKey = undefined
    # Check first if module represents a module
    _.each object, (value, key) ->
      if not moduleFound
        propDefer = q.defer()
        q(md.preprocessNode value).then (result) ->
          object[key] = result
          if md.isModule key
            moduleKey = key
            moduleFound = true
          propDefer.resolve result
        results.push(propDefer.promise);


    mDefer = q.defer()
    # Wait until all properties of the object have been preprocessed
    q.all(results).then () ->
      if moduleFound
        q(md.loadModule(md.getModulePath(moduleKey), object[moduleKey])).then (content) ->
          mDefer.resolve content
      else
        mDefer.resolve object

    mDefer.promise

  # ### getModulePath
  # Returns the module path by concatenating the name/name,
  # if another way locate the module is needed, this function
  # needs to be overriden or modified per project
  getModulePath: (name) ->
    # what if the modules doesn't have the same name as the folder?
    './modules/' + name + '.handlebars'

  # ### isModule
  # Check if the module is part of the partials loaded by handlebars
  isModule: (name) ->
    moduleName = name
    (_.indexOf moduleNames, moduleName) >= 0

module.exports = ModuleRender