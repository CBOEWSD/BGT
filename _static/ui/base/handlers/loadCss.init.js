(function() {
  var loadCss;

  loadCss = function(url) {
    var link;
    link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
    return link;
  };

  window.loadCss = loadCss;

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENzcy5pbml0LmpzIiwic291cmNlcyI6WyJsb2FkQ3NzLmluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BO0NBQUEsS0FBQSxDQUFBOztDQUFBLENBQUEsQ0FBVSxJQUFWLEVBQVc7Q0FDVCxHQUFBLElBQUE7Q0FBQSxFQUFPLENBQVAsRUFBTyxFQUFRLEtBQVI7Q0FBUCxFQUNZLENBQVosTUFEQTtDQUFBLEVBRUEsQ0FBQSxRQUZBO0NBQUEsRUFHWSxDQUFaO0NBSEEsR0FNQSxFQUFBLEVBQVEsR0FBUixTQUFBO0NBR0EsR0FBQSxPQUFPO0NBVlQsRUFBVTs7Q0FBVixDQWFBLENBQWlCLEdBQVgsQ0FBTjtDQWJBIn0=