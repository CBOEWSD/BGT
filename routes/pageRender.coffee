q = require 'q'
_ = require 'lodash'

ModuleRender = require './moduleRender.coffee'

# ## PageRender Class
# Controls the action of attempting to find pages
# through request URLs. If it does not find a folder
# in the pages folder it will 404, likewise if it does not
# find a `index` or `_root/index` in the existing folder
# it will also return a 404.
class PageRender
  page: {}
  pr = {}
  req = undefined
  res = undefined
  deferred = undefined

  # ### Construct Class
  # Simply passes this to a that working around
  # namespace issues with this. Sets the initial
  # `folderPath` expectation and calls the next
  # step in the process.
  constructor: (request, response)->
    pr = @
    req = request
    res = response

    deferred = q.defer()

    pr.page.folderPath = './pages' + req.url
    # console.log pr.page

    return pr.findFolder()

  # ### findFolder
  # Step 1 in the process checks if the folder exists.
  # If it does not then no further action required
  # will result in a 404.
  findFolder: ->
    fs.exists pr.page.folderPath, (bool) ->
      if bool
        pr.getIndex()
      else
        pr.noLuck()

    deferred.promise

  # ### getIndex
  # This step attempts to identify an index file exists.
  # If it exists the file is read and passed into the
  # ModuleRender class to process its modules.
  # If it does not exist, the request is passed on to check if
  # there may be a `_root` folder which is useful for
  # subsections of the site where other pages may exist.
  getIndex: ->
    pr.page.indexPath = pr.page.folderPath + '/index.json'

    fs.exists pr.page.indexPath, (bool) ->
      if bool
        fs.readFile pr.page.indexPath, "utf-8", (err, content) ->
          if(err)
            deferred.reject new Error(error)
          else
            q(new ModuleRender(JSON.parse content)).then (modules) ->
              deferred.resolve _.extend modules, JSON.parse content
      else
        pr.rootFolder()

  # ### rootFolder
  # At this stage we know the folder exists and that there
  # is not an index.json there, so now we look for a `_root`
  # folder which may contain the page data. If we don't find
  # it then we'll return a 404.
  rootFolder: ->
    pr.page.folderPath = pr.page.folderPath + '_root'
    pr.page.indexPath = pr.page.folderPath + '/index.json'

    # console.log pr.page

    fs.exists pr.page.indexPath, (bool) ->
      if bool
        pr.getIndex()
      else
        pr.noLuck()

  # ### noLuck
  # We tried our best but... no luck, 404.
  noLuck: ->
    res.status(404).send('Page not found')

module.exports = PageRender