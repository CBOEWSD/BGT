# Module Definitions

This document contains a list of modules and some brief notes regarding them. Document will always be a work in progress as development continues and changes.

## Overview

Modules are called into pages in the `index.json` and can accept a combination of json and/or markdown format data. Markdown allows copy to be written in a more content driven format and easily translated into other formats. The json format allows us to pas more data object driven content, such as lists, links, graphs, etc.

Modules will make use of AMD patterns when and where it makes sense to do so. This can lower the initial size of the site and also allow us to scale back functionality/size on mobile. Not all modules will use this pattern however, as some will have no need to scale back or may be loaded on every page. Modules, such as the widgets, will likely use this pattern to lower the load across the whole site and only load assets when they are required and not by default.

## Modules

Each module is in a self-contained folder. Within that folder you will find a mix of Handlebars template(s), Sass (scss) stylsheets, CoffeeScript (pre-compiled JavaScript) and in some cases additional assets strictly associated with the module.

### Handlebars

We are currently using [Handlebars](http://handlebarsjs.com/) as our View Engine. The Handlebars website has a great resource of documentation, but needless to say; it is much like any other templating language. A quick intro to some features:

### Variables and objects

Given we have an object - "data template" - as such:
```json
{
  "helloWorld": "hello, world.",
  "people": [
    {
      "name": "Joe",
      "age": 32
    }
  ]
}
```

```handlebars
{{helloWorld}} === hello, world.

{{#each people}}
  Hi, {{name}} this can also be {{this.name}}
  You are {{age}} years old.
{{/each}}

We can also do: {{people[0].name}} to get the first name.
```

### Partials

In Razor this is also a partial called with `@RenderPartial`.

```
{{> path/to/other/view}}
```

We use partials to abstract as much as possible in our view layer. For example, we may have a form "wrapper" which can contain various different forms. In this case we can have a partial for each individual form set, abstracting away specific styling or application logic from the wrapper and simlifying maintenance. We also tighten the scope of error from the wrapper down to the specific forms.

You will notice we utilize this quite often throughout the view layer, see `header` or `widgets/forms` for some examples.

We can also use `{{#with}}` or `{{#each}}` to render partials in a more effective manner. This means that the partial view can be called individually or be called within the scope of another module. We also give scope to our partial.

So for example, we want to integrate with an API - twitter, for example. In certain areas of our application we wish to show the latest tweet, nothing more, and in another area of our app we want to show that last 5 tweets containing a certain `#hashtag`.

In this case we can have an individual tweet template that we pass a single tweet object to. We can also call that template as a partial from our multitweet template. Example:

```handlebars
<div class="multitweet">
  <h3>Showing all tweets with: #hashtag</h3>
  {{#each tweets}}
    {{> twitter/tweet}}
  {{/each}}
</div>
```

We do not have to worry about scope here as each tweet is passed in with the scope of `this`.

## Sass

Our Sass stylesheets extend from base -> classes -> modules. So from here we can overwrite base or class styles without using `!important`. The goal is to have modules contain styling that is very specific to the scope of the module only with anything shared moving up in the classes and anything standard moving up to base.

Specifically, Sass allows us to use mixins to abstract the noise of browser specifics and reuse code across our stylesheets without repeat. We use variables (`$variable`), includes (`@include ...`) and mixins (`@mixin name {...}`) to achieve this.

**Note: we use the scss syntax.**