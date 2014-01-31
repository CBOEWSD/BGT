# Base UI

In this folder you will find global components of the site - items such as global Sass mixins, JavaScript, Handlers and global styling. Items in this folder are the first items to be loaded in terms of the global style and client-side application layer.

## `_includes`

In here you will find Sass components/mixins that can be included in any module, class or other layer of the site. It is also worth noting that [Compass](http://compass-style.org/) has been included in this folder giving you access to all CSS3 mixins. 

`_includes/grid_components` - is a port of [Foundation](http://foundation.zurb.com/) giving us access to quick responsive grid mixins. These mixins are used sporadically through the application but are useful to quickly lay out some components of the site.

## `handlers`

Handlers are global client-side application layer components. This includes items such as the LogHandler, Console object, controlled resize event, etc. Each is documented on an individual level and can be viewed also in the annotated documentation.