# LoadCss
# This class allows for async loading of stylesheet assets.
# Unfortunately due to the nature of async loading of in
# certain browsers no clear event is fired for when the asset
# has finished loading (unlike JS assets which do).
# This limits the use of this method to only certain circumstances.

loadCss = (url) ->
  link = document.createElement 'link'
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url

  # Append the new element in the head
  document.getElementsByTagName('head')[0].appendChild link

  # Return the object
  return link

# Add method to global object
window.loadCss = loadCss