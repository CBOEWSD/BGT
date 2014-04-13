###
  # Table
###

class Table
  self = undefined

  ###
    ## Constructor
  ###
  constructor: (el) ->
    @.$el = $(el)
    @.$cols = $('colgroup col', el)
    @.$tr = $('tr', el)
    @.hideIndex = []

    # Check for columns that should be hidden
    @.notMobile()

    # Show on mobile
    @.$el.addClass('mobile-load')

    return @

  ###
    ## notMobile
    Find which columns should be hidden on mobile and pass
    their index to `hideColumn`.
  ###
  notMobile: ->
    $nope = @.$cols.filter('.nomobile')

    $nope.each (index, element) =>
      index = @.$cols.index(element)
      @.hideIndex.push(index)
      @.hideColumn(index)

  ###
    ## hideColumn
    Given an index hide each column with that index on
    each given row.
  ###
  hideColumn: (index) ->
    @.$tr.each (i, element) =>
      $td = $('td, th', element)
      $td.eq(index).addClass('nomobile')

###
  ## Init
  Call for each `.table` on page.
###
$el = $ 'table.table'
if $el.length > 0
  $el.each ->
    new Table @