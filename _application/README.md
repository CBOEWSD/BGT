# Application

In this folder is the node application which handles routing for requests, module and page rendering. Documents within are well documented.

The root of the application process is `../app.coffee` which routes into this folder.

## `index.coffee`

Initial entry point of requests for pages. Handles the initial request, pass to handlers and then response to request. Request is initially sent to `pageRender.coffee`

## `pageRender.coffee`

Page render handles the pathing of the request. Using the URL path it will attempt to find an index in the `./pages/` directory. If there is no luck finding a page a 404 will be returned to the client.

In looking for pages it will first look in the root path, so for example:

```
http://...com/mypage/hello => ./pages/mypage/hello/index.json
```

If initially it does not find an `index.json` it will then attempt to find a `_root` folder with an index. This helps us when we start to get into subpages. It allows us to move the content and index into a self contained directory whilst having the other subpages in the same location. So for example:

```
pages/
  about/
    content/
    subpage1/
    subpage2/
    index.json
```
Will now be:
```
pages/
  about/
    _root/     # index and content located here
    subpage1/
    subpage2/
```

This just helps us keep a cleaner structure and easier to work on the root page.

## `moduleRender.coffee`

Module render handles the combining of content with their module as assigned in the `index.json`s. Currently their is only support for JSON content type - acting like a data template - but this will be extended soon to support Markdown for richtext content types.

## `assets.coffee`

Handles creation of "bundles" of assets. We can call these bundles into the view with `renderStyles` or `renderScripts`. In development the bundle will be output as individual files. In production the bundle should output a concatinated, minified and gzip compressed asset with expiry settings.