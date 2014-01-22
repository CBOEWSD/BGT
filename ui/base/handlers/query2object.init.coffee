window.query2object = (query) ->
  data = query.split("&")
  result = {}
  i = 0
  while i < data.length
    item = data[i].split("=")
    result[item[0]] = item[1]
    i++
  return result