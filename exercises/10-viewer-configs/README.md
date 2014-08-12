# Lesson Ten: Viewer Configs

In the last couple exercises, we just used the default viewer.js config when creating viewers. Viewer.js is actually incredibly configurable! In this exercise, we'll explore some of the configuration options available.

## Your Task

In this exercise, you'll write a javascript module `draggy-viewer`:
- export a function that takes two arguments: an Element and string URL
- create, `load()`,  and return a viewer instance with the following configuration:
  + disable text selection
  + enable click + drag
  + set initial zoom to fit the document to the height of the viewport
  + use "horizontal" layout

Put your javascript solution in `draggy-viewer.js` in [this project's directory](/open/10-viewer-configs).

Don't worry about the CSS for this one; we've got you covered!

## Configuring Viewer.js

Configuring viewer.js is very easy. Simply add the desired configuration options to the config object when instantiating a new viewer:
```js
var viewer = Crocodoc.createViewer('.my-viewer', {
  url: mySessionAssetsURL,
  layout: Crocodoc.LAYOUT_VERTICAL,
  zoom: Crocodoc.ZOOM_AUTO,
  enableLinks: false
});

viewer.load();
```


## Resources

* [viewer.js config](https://github.com/box/viewer.js/blob/master/README.md#viewer-config) documentation
