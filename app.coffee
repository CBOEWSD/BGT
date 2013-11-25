# # Core application file
# Ran using `coffee app.coffee`.

# Module dependencies.
express = require 'express'
routes = require './routes'
http = require 'http'
path = require 'path'
sass = require 'node-sass'
coffee = require 'coffee-middleware'
exphbs  = require 'express3-handlebars'
GLOBAL.fs = require 'fs'

# Load our package JSON file
pkg = require './package.json'

# Declase application as express
app = express()

# ### Configure environments settings
app.set 'port', process.env.PORT || pkg.server.port || 3000
app.set 'views', __dirname + '/views'
app.engine 'handlebars', exphbs
  defaultLayout: 'main'
  layoutsDir:  __dirname + '/views/layouts'
  partialsDir: [
    __dirname + '/modules'
  ]
app.set 'view engine', 'handlebars'

# ### Set Middleware
app.use sass.middleware(__dirname + '/public')
app.use coffee({
  src: __dirname + '/public'
  compress: false
})
# ### Set public dir
app.use express.static path.join(__dirname, 'public')

app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router

# development only
if 'development' == app.get('env')
  app.use express.errorHandler()

# Routing paths
app.get '*', routes.index

# Create server, use custom port if specified
# otherwise use port in package.json
http.createServer(app).listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')
