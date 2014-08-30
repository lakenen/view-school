# Lesson Twelve: Presentation Layout


## Your Task

In this exercise, you'll write a javascript module `presentation-viewer`:
- export a function that takes two arguments: an Element and string URL
- your function should create and `load()`, and return a viewer instance...

https://github.com/box/viewer.js/blob/master/examples/presentations/


Put your javascript solution in `presentation-viewer.js` in [this project's directory](/open/11-presentation-layout). The CSS will go in `transitions.css`.

## Viewer.js Methods and Event Handling

Viewer.js acts like any event emitter, and has simple `on` and `off` methods for binding event handlers.

Here are a few examples:
```js
var viewer = Crocodoc.createViewer('.my-viewer', {
  url: mySessionAssetsURL
});

viewer.load();

viewer.on('ready', function (event) {
  // scroll to the last page when the viewer loads
  viewer.scrollTo(event.data.numPages);
});

// update a page number display when page changes
viewer.on('pagefocus', function (event) {
  // imaginary function to update a display
  updateNumberDisplay(event.data.page);
});

viewer.on('zoom', function (event) {
  if (!event.data.canZoomIn) {
    // disable an imaginary button
    zoomInButton.disabled = true;
  }
});

// etc...
```


## Resources

* [viewer.js methods](https://github.com/box/viewer.js/blob/master/README.md#viewer-methods) documentation
* [viewer.js events](https://github.com/box/viewer.js/blob/master/README.md#event-handling) documentation
