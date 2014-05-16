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
