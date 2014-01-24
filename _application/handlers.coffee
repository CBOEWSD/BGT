# handlers.coffee
# This file contians simple file handlers for pre-manipulation
# This is useful for returning the rendered version of a
# pseudo-language.
sass = require 'node-sass'
coffee = require 'coffee-script'
uglify = require 'uglify-js'
path = require 'path'

# ## sassRenderer
# Render css from Sass files.
exports.sassRenderer = (file, abpath, index, isLast, callback) ->
  # Get file name from path
  filename = path.basename abpath
  # Test file name for being scss and not being an import
  if (/\.scss/.test filename) and (filename.indexOf('_') != 0)
    console.log "Compiling #{abpath}"
    # Render and call callback
    callback sass.renderSync {
      file: abpath
      debug: true
      importPath: ['./']
    }
  else if (/\.css/.test filename)
    # Is it already css? Pass contents straight through
    callback file
  else
    # Pass empty string to callback if criteria not met
    callback ''

# ## coffeeRenderer
# Render the JS version of CoffeeScript files.
exports.coffeeRenderer = (file, abpath, index, isLast, callback) ->
  # Check is coffee file
  if /\.coffee/.test abpath
    console.log "Compiling #{abpath}"
    # Render and call callback
    callback uglify.minify(coffee.compile(file), {fromString: true}).code
  else
    # Not coffee? Pass file contents on, could be a .js file.
    callback uglify.minify(file, {fromString: true}).code