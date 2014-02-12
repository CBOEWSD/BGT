###
  # Content Tables
  This module will be loaded when tables exist within
  content on articles on the page. The interaction will
  render tables in a viewable manner on mobile viewports.
###

class ContentTables
  self = undefined

  ###
    ## Constructor
  ###
  constructor: ($el) ->
    self = @

    # Globals
    @.$el = $el

    @.bind()

  ###
    ## this.bind
    Will call any library or methods required to render
    tables correctly across viewports.
  ###
  bind: ->
    self.$el.ReStable();

define ->
  return ContentTables