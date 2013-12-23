q = require 'q'
PageRender = require './pageRender.coffee'

# # Page router
exports.index = (req, res) ->
  return q(new PageRender(req, res)).then (content) ->
    res.locals = content
    res.render (if (typeof (content.view) isnt 'undefined') then content.view else 'index'),
      {
        helpers:
          renderScripts: renderScripts
          renderStyles: renderStyles
          isProd: ->
            # We return the string to the view which renders
            # as a boolean and not a string
            return if isProd then 'false' else 'true'
      }