(function() {
  var StateSwitch;

  StateSwitch = (function() {
    var modules, self;

    self = void 0;

    modules = void 0;

    function StateSwitch() {
      self = this;
      modules = {};
    }

    StateSwitch.prototype.newModule = function(name, params) {
      modules[name] = modules[name] || {};
      if (typeof params === 'undefined') {
        return false;
      }
      if (typeof params.options === 'object') {
        modules[name].options = params.options;
      }
      if (typeof params.desktop === 'object') {
        modules[name].desktop = params.desktop;
      }
      if (typeof params.mobile === 'object') {
        modules[name].mobile = params.mobile;
      }
      return console.log(modules[name]);
    };

    return StateSwitch;

  })();

  window.stateSwitch = new StateSwitch;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzd2l0Y2guaW5pdC5qcyIsInNvdXJjZXMiOlsic3RhdGVzd2l0Y2guaW5pdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Q0FBQSxLQUFBLEtBQUE7O0NBQUEsQ0FBTTtDQUNKLE9BQUEsS0FBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FBQSxFQUNVLENBQVYsRUFEQSxDQUNBOztDQUVhLEVBQUEsQ0FBQSxpQkFBQTtDQUNYLEVBQU8sQ0FBUCxFQUFBO0NBQUEsQ0FBQSxDQUdVLEdBQVYsQ0FBQTtDQVBGLElBR2E7O0NBSGIsQ0FTa0IsQ0FBUCxDQUFBLEVBQUEsR0FBWDtDQUVFLENBQUEsQ0FBZ0IsQ0FBUixFQUFSLENBQVE7QUFHTCxDQUFILEdBQUcsQ0FBaUIsQ0FBcEIsS0FBQTtDQUNFLElBQUEsVUFBTztRQUpUO0FBT0csQ0FBSCxHQUFHLENBQXlCLENBQTVCLENBQUcsQ0FBSDtDQUNFLEVBQXdCLENBQWhCLEVBQXNCLENBQXRCLENBQVI7UUFSRjtBQVdHLENBQUgsR0FBRyxDQUF5QixDQUE1QixDQUFHLENBQUg7Q0FDRSxFQUF3QixDQUFoQixFQUFzQixDQUF0QixDQUFSO1FBWkY7QUFhRyxDQUFILEdBQUcsQ0FBd0IsQ0FBM0IsRUFBQTtDQUNFLEVBQXVCLENBQWYsRUFBUixDQUFRLENBQVI7UUFkRjtDQWdCUSxFQUFSLENBQW9CLEdBQWIsTUFBUDtDQTNCRixJQVNXOztDQVRYOztDQURGOztBQThCcUIsQ0E5QnJCLENBOEJBLENBQXFCLEdBQWYsS0FBTjtDQTlCQSJ9