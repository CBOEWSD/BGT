# Views

## Layouts

Each view uses the parent `layout` which is defaulted to `./_layouts/main.handlebars`.

## Notes

Each view is contained in its own folder with specific styling contained their also. If no view is specified the `default` will be used. A view can be specified as `threecol` which will pull the `index.handlebars` from the default folder; you can also, however, specify `threecol/other` to pull another view from the folder - in this case `threecol/other.handlebars`.

## The view

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