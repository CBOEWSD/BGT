/*
  # query2object
  Coverts a query string (such as that in a URL) into
  an object that can be manipulated. The object can be
  converted back by using:
  ``` decodeURIComponent($.param(object)) ```
*/


(function() {
  window.query2object = function(query) {
    var data, i, item, result;
    data = query.split("&");
    result = {};
    i = 0;
    while (i < data.length) {
      item = data[i].split("=");
      result[item[0]] = item[1];
      i++;
    }
    return result;
  };

}).call(this);
