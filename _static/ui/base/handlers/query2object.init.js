
/*
   * query2object
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

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkyb2JqZWN0LmluaXQuanMiLCJzb3VyY2VzIjpbInF1ZXJ5Mm9iamVjdC5pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFNBQUMsS0FBRCxHQUFBO0FBQ3BCLFFBQUEscUJBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosQ0FBUCxDQUFBO0FBQUEsSUFDQSxNQUFBLEdBQVMsRUFEVCxDQUFBO0FBQUEsSUFFQSxDQUFBLEdBQUksQ0FGSixDQUFBO0FBR0EsV0FBTSxDQUFBLEdBQUksSUFBSSxDQUFDLE1BQWYsR0FBQTtBQUNFLE1BQUEsSUFBQSxHQUFPLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFSLENBQWMsR0FBZCxDQUFQLENBQUE7QUFBQSxNQUNBLE1BQU8sQ0FBQSxJQUFLLENBQUEsQ0FBQSxDQUFMLENBQVAsR0FBa0IsSUFBSyxDQUFBLENBQUEsQ0FEdkIsQ0FBQTtBQUFBLE1BRUEsQ0FBQSxFQUZBLENBREY7SUFBQSxDQUhBO0FBT0EsV0FBTyxNQUFQLENBUm9CO0VBQUEsQ0FSdEIsQ0FBQTtBQUFBIn0=