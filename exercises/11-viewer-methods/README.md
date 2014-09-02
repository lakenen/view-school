# Lesson Eleven: Viewer Methods and Events

> How do I zoom in?
>   Oh crap, I should make controls.
> And stop writing poems!

The viewer.js instance comes with a bunch of nifty methods and events that you can use to build awesome stuff in your application! This exercise will give you a taste of writing your own simple controls for the viewer.

## Your Task

In this exercise, you'll write a javascript module `viewer-methods`:
- export a function that takes two arguments: an Element and string URL
- your function should create, `load()`, and return a viewer instance with the given element and url, then bind `click` events to the following elements:
  + `.zoom-in-btn` - on click, the viewer should zoom in
  + `.zoom-out-btn` - on click, the viewer should zoom out
  + `.prev-btn` - on click, the viewer should scroll to the previous page
  + `.next-btn` - on click, the viewer should scroll to the next page
- your function should also bind events on the viewer:
  + `zoom` - enable / disable the zoom buttons as appropriate (e.g., if you can't zoom in anymore, disable the zoom in button)
  + `pagefocus` - enable / disable the previous / next buttons as appropriate (e.g., if you are on page 1, disable the previous button)

Put your javascript solution in `simple-controls.js` in [this project's directory](/open/11-viewer-methods).

Don't worry about the CSS for this one; we've got you covered!

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
    // disable the "zoom in" button
    zoomInButton.disabled = true;
  }
});

// etc...
```


## Resources

* [viewer.js methods](https://github.com/box/viewer.js/blob/master/README.md#viewer-methods) documentation
* [viewer.js events](https://github.com/box/viewer.js/blob/master/README.md#event-handling) documentation
