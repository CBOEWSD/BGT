# handlers.coffee
sass = require 'node-sass'
coffee = require 'coffee-script'
path = require 'path'

exports.sassRenderer = (file, abpath, index, isLast, callback) -> 
  filename = path.basename abpath
  if (/\.scss/.test filename) and (filename.indexOf('_') != 0)
    console.log "Compiling #{abpath}"
    callback sass.renderSync {
      file: abpath
      debug: true
      importPath: ['./']
    }
  else
    callback ''

exports.coffeeRenderer = (file, abpath, index, isLast, callback) ->
  if /\.coffee/.test abpath
    console.log "Compiling #{abpath}"
    callback coffee.compile(file)
  else
    callback file