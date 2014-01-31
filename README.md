# CBOE

## Getting Started

After cloning the project, browse into the root of the project in [bash](http://git-scm.com/downloads) and follow these steps.

This project requires three global modules be installed, [Bower](http://bower.io/), [CoffeeScript](https://npmjs.org/package/coffee-script) and [Grunt-CLI](https://npmjs.org/package/grunt-cli). If you haven't installed these before please run:

```
npm install coffee-script -g && npm install grunt-cli -g && npm install bower@1.2.6 -g
```

Now install the dependencies for this project:

```
npm install
```

Since this is your first time running the project you will first need to install front-end dependencies, for which we use [Bower](http://bower.io/). This step will only need to be ran on initial setup and if a new front-end library is added to the project:

```
bower install
```

Lastly, with all dependencies installed, we can now simply start the project task manager - [Grunt](http://gruntjs.com/):

```
grunt
```

**Note:** The default `grunt` task will watch the project for changes and run appropriate tasks for those changes. For example, if a Coffee/JavaScript file changes our annotated documentation will be recompiled. For any details regarding specific tasks and/or modules we use please see the documentation for the `Gruntfile.coffee` at `http://<local>/docs/Gruntfile.html`.

## Project Standards

This is just a brief guideline for working on this project and some useful notes.

### Continuous Integration

We are using [Jenkins](http://jenkins-ci.org/) as our CI for this project. At the time of writing this README the CI is configured to:

- Build the site once every hour (15 mins past the hour) and deploy [here](http://dev-cboe.bgtpartners.com/)
- Poll GitHub for Pull Requests every 5 mins - when a pull request is made the CI will build, run our tests and report back branch integrity.

###  Unit Tests

**This document is being written before module development has started on the project so details of tests are not yet defined**. It is likely that our unit tests will be done with [Qunit](http://qunitjs.com/) and managed by Grunt. The tests themselves will likely reside in the same location as their module in a sub-folder `tests/`. Again, this is not yet defined and may change, this document will be updated to reflect that change.

### Code Standards

Code standards are defined in `./.editorconfig` and should be followed at all times - see [EditorConfig](http://editorconfig.org/). You can make this easier by installing IDE extensions for editor config - [Visual Studio](http://visualstudiogallery.msdn.microsoft.com/c8bccfe2-650c-4b42-bc5c-845e21f96328) - [Sublime](https://github.com/sindresorhus/editorconfig-sublime) - these extensions will make IDE configuration automated.

### Code Documentation

We are using [Docco](http://jashkenas.github.io/docco/) for annotated documentation. The process of building the documentation is automated by Grunt so will always be up to date locally (compiled = not in source control). The documentation can be read by simply going to `http://<local>/ui/docs/` and browsing using the menu at the top right.

With that said, please make sure to document any code submitted to this project properly and using [Markdown](http://daringfireball.net/projects/markdown/) syntax.

## Issue Tracker

[Jira](http://jira.bgtpartners.com) - For QA, client facing and such discussion.
Repository Issue Track - For general development discussion and/or tracking.

## Production vs Development

This project is setup in such a way that a production configuration can be mirrored quite simply by flagging your `NODE_ENV` variable to `production`. This can be done by entering the following in your console:

```
export NODE_ENV=production
```

This does a number of things:

* Our bundles are concatinated into single files
* Assets, including those not bundled, are minified
* All development logging stdout is disabled
* All debug modes are flagged disabled
* Variable `window.debug` is set false for client-side
* Compression is enabled
* Expiry cache for client-side set

**Note:** Remember to switch back to development env with `export NODE_ENV=development`.

## Project Contacts

- [David McKeown](mailto:david.j.mckeown@us.pwc.com) - Lead Developer
- [Kryssie Knowles](mailto:kryssie.c.knowles@pwc.us.com) - Project Manager
