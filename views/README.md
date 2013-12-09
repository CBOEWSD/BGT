# Views

The views are written in Handlebars format. Each view is an extension of a layout - the default layout being `layouts/main.handlebars`.

The view to be used is defined on a page level in the `index.json`. Each view can call a module directly - by using the partial format - by simply doing:

``
{{> module/module}}
``

The views also have placeholder points that modules can be rendered to from the `index.json`. So for example, a main content placeholder and a sidebar placeholder may look something like:

```
<aside class="sidebar">
  {{{sidebar}}}
</aside>

<section class="main-content">
  {{{main}}}
</section>
```

These sections will be populated by the rendered HTML from our modules + content defined for that placeholder in the `index.json`.