fs = require('fs')
mkdirp = require 'mkdirp'

self = {}

module.exports = (root) ->
  self.root = root

  mkdirp(root, (err) -> throw err if err)

  return exports

exports.file = (data, path) ->
  path = self.root + path
  file = path + '/index.html'

  mkdirp path, (err) ->
    throw err if err

    #fs.writeFile file, data, (err) ->
      #throw err if err