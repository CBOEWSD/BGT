{spawn} = require('child_process')
Phantom = require('phantom')
Save = require('./save')(__dirname + '/../../_static/')

# Spawn new process for application server
#Server = spawn('coffee', ['app.coffee'])
#Server.stdout.on 'data', (data) ->
#  console.log(data.toString())

host = 'http://localhost:3001'

# Fetch list of page paths
pages = require('./pages')
pages.getFiles(
  __dirname + '/../../**/index.json',
  [
    'index.json',
    '_root/',
    (__dirname + '/pages/')
      .replace('_application/static/', '')
  ])

# When we recieve files continue
pages.on 'done', (files) ->

  # Create phantom server
  Phantom.create (ph) ->

    ph.createPage (page) ->
      i = 0

      page.set('settings.webSecurityEnabled', true)
      page.set('viewportSize', {width:1200,height:18000})

      openPages = ->
        console.log host + '/' + files[i]

        page.open host  + '/' +  files[i], (status) ->
          throw status unless status == 'success'

          page.getContent (data) ->
            # Not needing to use currently as static build handles this point
            # Save.file(data, files[i])

            if i < files.length - 1
              i++
              setTimeout ->
                openPages()
              , 5000
            else
              console.log('done!')
              ph.exit()


      openPages()