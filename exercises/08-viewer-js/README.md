# Lesson Nine: Viewer.JS

*intro about viewer.js*


## Your Task

In this exercise, you'll write a javascript module `view-document.js`:
- export a function that takes two arguments: an Element and string URL
- when called, the function should create a viewer instance with the given element and asset URL, then `load()` the document and return the viewer instance

Put your javascript solution in `view-document.js` in [this project's directory](/open/08-viewer-js). The CSS will go in `styles.css`.


## Viewer.js

Creating a viewer with viewer.js is very simple -- just a few lines of code!

```js
var viewer = Crocodoc.createViewer('.my-viewer', {
  url: mySessionAssetsURL
})

viewer.load()
```

Calling `load()` will load some metadata and styles required for the whole document immediately, but the viewer will continue to load pages for long documents on a lazy basis as necessary (i.e., as the user scrolls or pages through a document).

**NOTE**: viewer.js does not enforce or set a specific width or height on its containing element. Because of the way elements are positioned inside the viewer, by default, the container will end up with a height of 0 if it's not explicitly set. To get around this, you can just make sure to set a height on the containing element:
```css
.my-viewer {
  /* when using a percentage, remember to set a height on the parent element as well! */
  height: 100%;
}
```


## Crocodoc

*why is it Crocodoc.createViewer?*


## Resources

* [viewer.js](https://github.com/box/viewer.js/blob/master/README.md) documentation
