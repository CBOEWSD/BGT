# Module Definitions

This document contains a list of modules and some brief notes regarding them. Document will always be a work in progress as development continues and changes.

## Overview

Modules are called into pages in the `index.json` and can accept a combination of json and/or markdown format data. Markdown allows copy to be written in a more content driven format and easily translated into other formats. The json format allows us to pas more data object driven content, such as lists, links, graphs, etc.

Modules will make use of AMD patterns when and where it makes sense to do so. This can lower the initial size of the site and also allow us to scale back functionality/size on mobile. Not all modules will use this pattern however, as some will have no need to scale back or may be loaded on every page. Modules, such as the widgets, will likely use this pattern to lower the load across the whole site and only load assets when they are required and not by default.

## Module List

### TopBar


### Header

Contains site logo and quick search functionality.

### NavBar

Global navigation bar.

### Ad_FlyOut

Advert flyout. 

**Pre-dev notes:** Desktop only, default state to sit just beneath NavBar module.

### Ad_Bar

Thin ad bar at bottom of page just above footer.

**Pre-dev note:** Support for mobile? API?

### HeroBanner

Contains background image and dialog box sitting on top. **Functionality note:** must support multiple slides.

### Base_Widgets

Base point for which many modules will extend. Povides the base styling for widget containers.

### Widget_TVPlayer

Extends from `Base_Widgets`. Support for multiple videos. 

**Pre-dev note:** Need to identify data source/API and identify support level for non-flash devices.

### Widget_Market

Market snapshot widget. Will contain some base exchange information and graph.

**Pre-dev note:** Need to identify data source/API and support for mobile devices. Can the graph be modified as shown in design based on current implenetation?

### Widget_News

Top headlines for multiple categories. Must also have support for twitter integration.

**Pre-dev note:** Latest tweet or some more direct control over which tweet is shown?

### Widget_list

Will be used for simple list widgets with minor adjustments. Will support simple plain lists, links and possible thumbnail images.

### Widget_Content

A simple content based widget. Will use Markdown format for content data.

### Footer

Contains two link lists and a disclaimer block of content.