# # Core application file
# Ran using `coffee app.coffee`.

# Module dependencies.
express = require 'express'
routes = require './_application'
http = require 'http'
path = require 'path'
sass = require 'node-sass'
coffee = require 'coffee-middleware'
GLOBAL.exphbs  = require 'express3-handlebars'
GLOBAL.fs = require 'fs'
assetManager = require './_application/assets'
minify = require 'express-minify'
assetConnect = require 'connect-assetmanager'
handlers = require './_application/handlers'

# Load our package JSON file
pkg = require './package.json'

# Declase application as express
GLOBAL.app = express()

# Assets
# ### JS Bundle
assetManager.addBundle {
  name: 'initCoffee'
  files: [
    'ui/base/**/*.init.coffee'
    'ui/classes/**/*.init.coffee'
    'modules/**/*.init.coffee'
  ]
}

# ### CSS Bundle
assetManager.addBundle {
  name: 'css'
  files: [
    'ui/base/**/*.scss'
    'ui/views/**/*.scss'
    'ui/classes/**/*.scss'
    'modules/**/*.scss'
  ]
}

prodAssets = {
  'css':
    'route': /\/static\/styles.css/
    'path': './'
    'dataType': 'css'
    'files': assetManager.listFiles 'css'
    'preManipulate':
      '^': [handlers.sassRenderer]
  'js':
    'route': /\/static\/scripts.js/
    'path': './'
    'dataType': 'js'
    'files': assetManager.listFiles 'initCoffee'
    'preManipulate':
      '^': [handlers.coffeeRenderer]
}

assetsManagerMiddleware = assetConnect(prodAssets)

# Compress response data
app.use express.compress()
if 'production' == app.get('env')
  app.use minify()

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
app.use '/ui', sass.middleware {
  src: __dirname + '/ui'
  debug: true
}
app.use '/_compiled', sass.middleware {
  src: __dirname + '/_compiled'
  debug: true
}
app.use '/modules', sass.middleware {
  src: __dirname + '/modules'
  debug: true
}
app.use '/ui', coffee {
  src: __dirname + '/ui'
  compress: false
  debug: true
}
app.use '/_compiled', coffee {
  src: __dirname + '/_compiled'
  compress: false
  debug: true
}
app.use '/modules', coffee {
  src: __dirname + '/modules'
  compress: false
  debug: true
}
# ### Set public dir
app.use '/ui', express.static path.join(__dirname, 'ui')
app.use '/_compiled', express.static path.join(__dirname, '_compiled')
app.use '/modules', express.static path.join(__dirname, 'modules')

app.use(assetsManagerMiddleware)

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
  console.log 'Server listening on port ' + app.get('port')
