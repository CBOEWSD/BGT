###
  # Echo Class
  Makes use of the [echojs](https://github.com/toddmotto/echo)
  library to only load images when they are in the viewport
  ## Example:
  ```
  <img src="/ui/assets/images/placeholders/blank.gif" data-echo="{{src}}">
  ```
###

window.images = new Vimg {
  selector: '[data-echo]' # note: this could be [data-vimg]
  , interval: 1000  # default: 1000 - how often will be poll for changes
  , offset: 500 # default: 300 - how far below viewport to load
  , srcAttr: 'data-echo'
}

PubSub.subscribe 'LazyLoadPoll', ->
  images.poll();