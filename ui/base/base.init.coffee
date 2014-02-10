# # Base.coffee
# This file is the initial entry point into our application.
# It defines our dependency paths and loads the next step.

# ## Configure require base settings
# These are predefined library locations, meaning each
# module can simple call `libname` instead of paths.
requirejs.config {
  paths:
    jquery: '/ui/libs/jquery/jquery'
    echojs: '/ui/libs/echojs/dist/echo'
    pubsub: '/ui/libs/pubsub-js/src/pubsub'
    templates: '/ui/templates/templates'
    socketio: '/ui/libs/socket.io-client/dist/socket.io'
}
