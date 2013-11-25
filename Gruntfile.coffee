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
        files: ['*.coffee', './routes/**/*.coffee', './public/**/*.coffee']
        tasks: ['docco']

    # Docco compiles code into annotated web documents
    docco:
      docs:
        src: [
          '*.coffee',
          'public/**/*.coffee',
          'modules/**/*.coffee',
          '_application/**/*.coffee'
        ]
        options:
          output: './public/docs'

    # [Bower package manager](https://github.com/yatskevich/grunt-bower-task)
    bower:
      install:
        options:
          targetDir: './public/lib'

    # [CoffeeScript Linting](https://github.com/vojtajina/grunt-coffeelint)
    coffeelint:
      app: [
        '*.coffee',
        'public/**/*.coffee',
        'routes/**/*.coffee'
      ]

    # [Nodemon](https://github.com/ChrisWren/grunt-nodemon)
    nodemon:
      dev:
        options:
          file: 'app.coffee'
          nodeArgs: ['--debug']

    # [Grunt-Concurrent](https://github.com/sindresorhus/grunt-concurrent)
    concurrent:
      dev:
        tasks: ['nodemon', 'dev', 'watch']
        options:
          logConcurrentOutput: true

  }

  # ### Load Grunt Modules
  # [Matchdep](https://github.com/tkellen/node-matchdep) - used to load `grunt-` modules.
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  # ### Grunt Tasks
  grunt.registerTask 'default', ['concurrent:dev']
  grunt.registerTask 'dev', ['docco']
  grunt.registerTask 'setup', ['bower']


  # # Custom tasks
