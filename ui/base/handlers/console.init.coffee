# # console.log
# Fix for browsers with lack of support for
# the console object.

# Empty method wrapper
->
  # Blank method to allow calls to each
  noop = ->
  methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ]
  length = methods.length

  # declare console
  console = (window.console = window.console or {})

  # Add methods if they do not exist
  while length--
    method = methods[length]

    # Simply setting an empty method for those
    # that do not exist
    if !console[method]
      console[method] = noop