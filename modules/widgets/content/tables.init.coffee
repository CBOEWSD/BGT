$el = $ 'article.content table'

if $el.length > 0
  ###
   ## Load
   Load depedencies and module for tables
  ###
  window.loadCss '/ui/libs/ReStable/jquery.restable.css'
  require ['restable', '/modules/widgets/content/tables.js'], (restable, tables) ->
    ct = new tables $el