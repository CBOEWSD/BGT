class Highlight
  constructor: (el) ->
    @.$el = $ el

    @.keywords = @.getKeywords()

    @.highlight(@.keywords)

    console.log @

  getKeywords: ->
    data = @.$el.data('highlight')

    return false if data.length < 1

    if typeof data != 'object'
      data = [data]

    return data

  highlight: (keywords) ->
    return false unless keywords

    node = @.$el.data('highlight-target')

    if node
      $node = $(node)

    if $node.length < 1
      $node = @.$el

    $node.html (i, markup) =>

      for keyword in keywords
        regex = new RegExp("(#{keyword})", 'gi')
        markup = markup.replace(regex, '<span class="highlight-word">$1</span>')

      return markup


define ->
  return Highlight