# Module Definitions

This document contains a list of modules and some brief notes regarding them. Document will always be a work in progress as development continues and changes.

## Overview

Modules are called into pages in the `index.json` and can accept a combination of json and/or markdown format data. Markdown allows copy to be written in a more content driven format and easily translated into other formats. The json format allows us to pas more data object driven content, such as lists, links, graphs, etc.

Modules will make use of AMD patterns when and where it makes sense to do so. This can lower the initial size of the site and also allow us to scale back functionality/size on mobile. Not all modules will use this pattern however, as some will have no need to scale back or may be loaded on every page. Modules, such as the widgets, will likely use this pattern to lower the load across the whole site and only load assets when they are required and not by default.

## Module List

### Header

Contains site logo and quick search functionality.

#### Header - TopBar

Simple grey bar spanning the top of the site globally.

#### Header - Navigation

Global navigation menu.

### Footer

Global footer element.

### Search

Search related modules contained here.

#### Search - Quick Search

Quick search module that can be called into many locations. Currently only tested in the header and may require minor treatments for other locations.

### Widgets

Base widget wrapper uses the `.widget` class. There is also a `.nostyle` class to remove base styling for widgets but maintain module scope as a widget.

Widget titles can be added to modules using:

```
{{> widgets/widget-title}}
```

#### Widget - Hero

This widget will contain a single static background image and several callouts.

#### Widget - List(s)

List based widgets will be contained here. (example: blog widget on homepage)

#### Widget - Snapshot

Currently this module is populated with static data and image as placeholders for dynamic data later.

#### Widget - TV

Currently this module is populated with static data and image as placeholders for dynamic data later.


** This document will be updated periodically throughout development **