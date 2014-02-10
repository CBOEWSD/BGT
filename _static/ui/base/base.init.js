/*
  # Base.coffee
  This file is the initial entry point into our application.
  It defines our dependency paths and loads the next step.
*/


/*
  ## Configure require base settings
  These are predefined library locations, meaning each
  module can simple call `libname` instead of paths.
*/


(function() {
  requirejs.config({
    paths: {
      jquery: '/ui/libs/jquery/jquery',
      echojs: '/ui/libs/echojs/dist/echo',
      pubsub: '/ui/libs/pubsub-js/src/pubsub',
      templates: '/ui/templates/templates',
      socketio: '/ui/libs/socket.io-client/dist/socket.io'
    }
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5pbml0LmpzIiwic291cmNlcyI6WyJiYXNlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztDQUFBOztDQU1BOzs7OztDQU5BO0NBQUE7Q0FBQTtDQUFBLENBV0EsSUFBQSxHQUFTO0NBQVEsQ0FFYixFQURGLENBQUE7Q0FDRSxDQUFRLElBQVIsa0JBQUE7Q0FBQSxDQUNRLElBQVIscUJBREE7Q0FBQSxDQUVRLElBQVIseUJBRkE7Q0FBQSxDQUdXLElBQVgsR0FBQSxnQkFIQTtDQUFBLENBSVUsSUFBVixFQUFBLGtDQUpBO01BRmE7Q0FYakIsR0FXQTtDQVhBIn0=