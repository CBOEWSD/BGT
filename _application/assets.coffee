glob = require 'glob'

# ## AssetManager
# Asset manager takes a string or array of files or
# wildcard (*) to build out a collection of assets.
# Using the renderStyles or renderScripts will return
# these groups into our views.
class AssetManager
  patterns = {}
  bundles = {}
  am = {}

  # ### Constructor
  # Define this/that and add render methods to global scope for views
  constructor: ->
    am = @
    GLOBAL.renderScripts = @renderScripts
    GLOBAL.renderStyles = @renderStyles

  # ### addBundle
  # Adds a new bundle to the bundles object. On initial pull it
  # will also add files to the object.
  addBundle: (options) ->
    if typeof options != 'object'
      console.error 'Must pass options to addBundle'
      return false;
    patterns[options.name] = options.files
    bundles[options.name] = @getFiles options.files

  # ### updateBundle
  # Will add any new files to the existing bundles without
  # application restart.
  updateBundle: (name) ->
    return bundles[name] = @getFiles patterns[name]

  # ### getFiles
  # Leverages the `glob` module to take our string or array
  # and find associate files returning them as objects.
  getFiles: (files) ->
    if typeof files != 'object'
      files = [files]

    for file in files
      do (file) ->
        glob.sync file

  # ### renderScripts
  # Called in the view layer to render out scripts bundle(s)
  # in html markup form.
  renderScripts: (bundle) ->
    markup = ''
    am.updateBundle bundle
    for group in bundles[bundle]
      for file in group
        file = file.replace '.coffee', '.js'
        markup += "<script src='/#{file}'></script>"
    return markup

  # ### renderStyles
  # Called in the view layer to render out styles bundle(s)
  # in html markup form.
  renderStyles: (bundle) ->
    console.log app.get('env')
    if app.get('env') == 'production'
      return '<link href="/static/styles.css" media="all" rel="stylesheet" type="text/css">'
    else
      markup = ''
      am.updateBundle bundle
      for group in bundles[bundle]
        for file in group
          filenameindex = file.lastIndexOf('/') + 1
          filename = file.substr(filenameindex)
          if filename.indexOf('_') != 0
            file = file.replace('.scss', '.css')
            markup += "<link href='/#{file}' media='all' rel='stylesheet' type='text/css'>"
      return markup

  listFiles: (bundle) ->
    merged = []
    return merged.concat.apply(merged, bundles[bundle])

# ## Initialize
assetManager = new AssetManager

# ## Export module
module.exports = assetManager