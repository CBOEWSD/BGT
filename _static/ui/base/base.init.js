
/*
   * Base.coffee
  This file is the initial entry point into our application.
  It defines our dependency paths and loads the next step.
 */


/*
   *# Configure require base settings
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
      socketio: '/ui/libs/socket.io-client/dist/socket.io',
      restable: '/ui/libs/ReStable/jquery.restable'
    }
  });

  requirejs.config({
    paths: {
      gremlins: '/ui/libs/gremlins.js/gremlins.min'
    }
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5pbml0LmpzIiwic291cmNlcyI6WyJiYXNlLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7R0FBQTs7QUFNQTtBQUFBOzs7O0dBTkE7QUFBQTtBQUFBO0FBQUEsRUFXQSxTQUFTLENBQUMsTUFBVixDQUFpQjtBQUFBLElBQ2YsS0FBQSxFQUNFO0FBQUEsTUFBQSxNQUFBLEVBQVEsd0JBQVI7QUFBQSxNQUNBLE1BQUEsRUFBUSwyQkFEUjtBQUFBLE1BRUEsTUFBQSxFQUFRLCtCQUZSO0FBQUEsTUFHQSxTQUFBLEVBQVcseUJBSFg7QUFBQSxNQUlBLFFBQUEsRUFBVSwwQ0FKVjtBQUFBLE1BS0EsUUFBQSxFQUFVLG1DQUxWO0tBRmE7R0FBakIsQ0FYQSxDQUFBOztBQUFBLEVBdUJBLFNBQVMsQ0FBQyxNQUFWLENBQWlCO0FBQUEsSUFDZixLQUFBLEVBQU87QUFBQSxNQUNMLFFBQUEsRUFBVyxtQ0FETjtLQURRO0dBQWpCLENBdkJBLENBQUE7QUFBQSJ9