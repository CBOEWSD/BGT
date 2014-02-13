# # Static Generator
# A middleware which catches the final response events
# to save the response data into static files (eg: html, css)
# These files are saved to the static location set in the options.

fs = require 'fs'
mkdirp = require 'mkdirp'

# ## Options
# **TODO:** Abstract options layer to config
options =
  staticPath: './_static'

# ## Module
module.exports =

  # ### this.middleware
  # Middleware step that can be called into the application with:
  # ``` app.use require('static').middleware ```
  middleware: (req, res, next) ->
    accept = req.headers['accept-encoding']
    vary = res.getHeader('Vary')
    write = res.write
    end = res.end
    stream = undefined

    # Check vary set
    if (!vary)
      res.setHeader('Vary', 'Accept-Encoding')
    else if (!~vary.indexOf('Accept-Encoding'))
      res.setHeader('Vary', vary + ', Accept-Encoding')

    # On request close do nothing
    req.on 'close', ->
      res.write = res.end = ->
        return

    # #### Write
    # This method will capture and write data to static files
    # before finishing the request by sending data to the client
    res.write = (chunk, encoding) ->
      this._implicitHeader() unless this.headerSent or typeof this.implicitHeader == 'undefined'

      # Grab filename and path for creation and writing
      fileName = req.originalUrl.replace(/^.*[\\\/]/, '')
      path = req.originalUrl.replace fileName, ''

      # If we are on a html (root) page, change to index and write to folder
      if fileName.indexOf('.') == -1
        path = path+'/'+fileName+'/'
        fileName = 'index.html'

      # Create our directory path
      mkdirp options.staticPath + path, (err) ->
        throw err if err

        # If we're streaming and this is not the first chunk
        # then we're going to use the append method
        if stream and not stream.firstChunk
          method = fs.appendFile
        # Else we are going to use write to create and write chunk.
        # Also if we are streaming we'll flag firstChunk complete.
        else
          method = fs.writeFile
          if stream then stream.firstChunk = false

        # Use designated method to add chunk data to file.
        method options.staticPath + path + fileName, chunk, (err) ->
            throw err if err

            #console.log options.staticPath + path + fileName, 'appended!'

      # End process
      return write.call(res, chunk, encoding)

    # #### End
    # Captures the end event to be passed into the write method
    res.end = (chunk, encoding) ->
      this.write(chunk, encoding) if (chunk)
      return end.call(res)

    # ### Header event
    # On headers being sent intercept and pass appropriately.
    # This is used to capture streaming of data (larger files).
    res.on 'header', ->
      encoding = res.getHeader('Content-Encoding') or 'identify'

      if 'identify' != encoding
        return

      # Set our global var stream
      stream = res

      # Set `firstChunk` true, will be set false on
      # first write of data to file.
      stream.firstChunk = true

      # Capture data
      stream.on 'data', (chunk) ->
        write.call(res, chunk)

      # Write on end
      stream.on 'end', ->
        end.call(res)

    # Next middleware
    next()