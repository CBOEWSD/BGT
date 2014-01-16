# ## Echo Class
# Makes use of the [echojs](https://github.com/toddmotto/echo)
# library to only load images when they are in the viewport
# #### Example:
# ```
# <img src="/ui/assets/images/placeholders/blank.gif" data-echo="{{src}}">
# ```

# Initialize echo
Echo.init {
  # Load 200px below viewport
  offset: 200
  # Load x milliseconds after scroll event
  # (performance check as to not spam events)
  throttle: 300
}