###
  # Anchors
  Move to given anchors on page but buffer by X
  pixels from top of page.
###

$ ->

  ###
    Capture anchor element clicks
  ###
  $el = $('a[href*=#]')

  $el.click (e) ->
    $this = $(this)
    hash = $this.attr('href')
    $target = $(hash)

    if $target.length < 1
      $target = $("[name='#{hash.replace('#', '')}']")

    if $target.length > 0
      e.preventDefault()
      window.location.hash = hash

      scrollAction($target)

  ###
    Capture on load with hash
  ###
  hash = window.location.hash

  if hash
    $target = $(hash)
    if $target.length < 1
      $target = $("[name='#{hash.replace('#', '')}']")

    if $target.length > 0
      setTimeout =>
        scrollAction($target)
      , 200

  ###
    Move to element on page
  ###
  scrollAction = ($target) ->
    $body = $('html, body')

    $body.scrollTop( $target.offset().top - 70 )

