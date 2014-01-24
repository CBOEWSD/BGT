# # Gruntfile.coffee
# Run via `grunt` or execute specific tasks with `grunt taskname`.

module.exports = (grunt) ->

  # Load package.json as `pkg` object
  pkg = grunt.file.readJSON 'package.json'

  # ### Project Configuration
  grunt.initConfig {
    pkg: pkg

    # Watch - will track file changes and executre approrpiate tasks
    watch:
      coffee:
        files: [
          '*.coffee'
          './_routes/**/*.coffee'
          './ui/**/*.coffee'
          './modules/**/*.coffee'
        ]
        tasks: ['dev']
      templates:
        files: [
          'modules/**/*.share.handlebars'
        ]
      tasks: ['handlebars']

    # Docco compiles code into annotated web documents
    docco:
      docs:
        src: [
          '*.coffee',
          'ui/**/*.coffee',
          'modules/**/*.coffee',
          '_application/**/*.coffee'
        ]
        options:
          output: './ui/docs'

    # [Grunt-Qunit-Junit](https://github.com/sbrandwoo/grunt-qunit-junit)
    qunit_junit:
      options:
        dest: '_tests'

    # [Qunit](https://github.com/gruntjs/grunt-contrib-qunit)
    qunit:
      options:
        urls: 'http://localhost:' + pkg.server.port

    # [Grunt-Contrib-Handlebars](https://npmjs.org/package/grunt-contrib-handlebars)
    handlebars:
      compile:
        options:
          namespace: 'JST'
        files:
          'ui/templates/templates.js': ['modules/**/*.share.handlebars']

    # [Nodemon](https://github.com/ChrisWren/grunt-nodemon)
    nodemon:
      dev:
        options:
          file: 'app.coffee'
          nodeArgs: ['--debug']
          legacyWatch: true
          ignoredFiles: [
            'node_modules/**/*'
            'ui/**/*'
            '_compiled/**/*'
            'modules/**/*'
            'views/**/*'
            'pages/**/*'
            '.git'
            ],

    # [Grunt-Concurrent](https://github.com/sindresorhus/grunt-concurrent)
    concurrent:
      dev:
        tasks: ['nodemon', 'dev', 'watch']
        options:
          logConcurrentOutput: true

    #
    hargen:
      qa:
        options:
          urls:
            'cboe_qa.har': 'http://qa-cboe.bgtpartners.com'
          output: './__benchmarks'
      dev:
        options:
          urls:
            'cboe_dev.har': 'http://dev-cboe.bgtpartners.com'
          output: './__benchmarks'
      local:
        options:
          urls:
            'cboe_local.har': 'http://localhost:3001'
          output: './__benchmarks'

  }

  # ### Load Grunt Modules
  # [Matchdep](https://github.com/tkellen/node-matchdep) - used to load `grunt-` modules.
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks
  grunt.loadNpmTasks 'grunt-har-gen'

  # ### Grunt Tasks
  grunt.registerTask 'default', ['concurrent:dev']
  grunt.registerTask 'dev', ['docco', 'handlebars']
  grunt.registerTask 'prod', ['handlebars']
  grunt.registerTask 'test', ['server', 'qunit_junit', 'qunit']


  # # Custom tasks
  # ### Server
  # This is used to directly run the server without monitoring
  # for changes. This is useful for quick runs - such as testing.
  grunt.registerTask 'server', 'Start our local web server.', ->
    grunt.log.writeln "Started server on port #{pkg.server.port}"
    require('./app.coffee')