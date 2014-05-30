Glob = require('glob')
EventEmitter = require( "events" ).EventEmitter;

pages = new EventEmitter

pages.getFiles = (glob, strip) ->
  new Glob glob, (err, files) ->
    throw err if err

    output = []

    for file in files
      path = file

      for arg in strip
        regex = new RegExp(arg, 'g')
        path = path.replace(regex, '')

      output.push path

    pages.emit('done', output)

module.exports = pages