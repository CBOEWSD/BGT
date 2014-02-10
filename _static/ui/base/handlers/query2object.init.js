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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkyb2JqZWN0LmluaXQuanMiLCJzb3VyY2VzIjpbInF1ZXJ5Mm9iamVjdC5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtDQUFBLENBQUEsQ0FBc0IsRUFBQSxDQUFoQixHQUFpQixHQUF2QjtDQUNFLE9BQUEsYUFBQTtDQUFBLEVBQU8sQ0FBUCxDQUFZO0NBQVosQ0FBQSxDQUNTLENBQVQsRUFBQTtDQURBLEVBRUksQ0FBSjtDQUNBLEVBQVUsQ0FBSSxFQUFkLEtBQU07Q0FDSixFQUFPLENBQVAsQ0FBTyxDQUFQO0NBQUEsRUFDa0IsQ0FBTixFQUFaO0FBQ0EsQ0FGQSxDQUFBLElBRUE7Q0FORixJQUdBO0NBSUEsS0FBQSxLQUFPO0NBUlQsRUFBc0I7Q0FBdEIifQ==