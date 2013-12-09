# Pages

The pages folder is the entire mapping of the site. Subdirectories will be rendered to the client requests if they contain a valid `index.json`.

## _root Folders

This folder allows us to move the index.json and content into a subfolder allowing for nested subdirectories whilst maintaining a cleaner workspace. For example, if we have a section `/support/` with many subdirectories (`support/a` ... `/support/b` ... etc) our index and content would not sit at the same level as folder for A and B. Instead, we can group them in `_root` removing a level of complexity from our structure.

## index.json

The index file contains base information for each page. Things like the title, keywords, and such. It also contains the module list defined with their content and section they should be rendered to. A simple example of a index.json would be like this:

```
{
  "view": "index",
  "title": "Home",
  "meta": {
    "keywords": "some, keywords",
    "description": "This is a description"
  },
  "modules": {
    "sidebar": [
      {
        "_example": "content.json"
      },
      {
        "header":"header.json"
      }
    ],
    "main": [
      {
        "_example": "content.json"
      }
    ]
  }
}
```

This gives us some simple variables with our modules, their content and where to be rendered in the view. Notice also that the view is defined in this file. Views can be found in `../views/`.

## Content

The content folder is simple enough. This is the default location that the application will look for content files defined in the index.json

Content can be either markdown or json depending on the module in use.