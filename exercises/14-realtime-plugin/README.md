# Lesson Fourteen: The Realtime Plugin

By default, viewer.js assumes that all pages are available when you load up a document with it. Unfortunately, the Box View API can't convert documents instantly, so we built a realtime system that streams updates as pages become available during the conversion process. To use this system with viewer.js, you can simply use the realtime plugin!

## Your Task

In this exercise, you'll write a javascript module `streaming-viewer`:
- export a function that takes three arguments: an Element, a string "assets" URL, and a string "realtime" URL
- create, `load()`,  and return a viewer instance with the realtime plugin configured to use the realtime URL provided
- bind an event listener on the viewer that calls `updateConversionProgress` with a number from 0 to 100 that represents the progress of the conversion in percent (%)

Put your javascript solution in `streaming-viewer.js` in [this project's directory](/open/14-realtime-plugin).

Don't worry about the CSS for this one; we've got you covered! Also, we'll include the realtime plugin source and its dependencies, though in your own apps you'd have to include those files alongside viewer.js.

## View API Realtime

When you successfully create a session with the `/sessions` endpoint, the response will have a `urls` object with a `realtime` property. This is the URL that can be passed to the realtime plugin in viewer.js.

```js
var viewer = Crocodoc.createViewer(element, {
  url: '<the assets url>',
  plugins: {
    realtime: {
      url: '<the realtime url>'
    }
  }
})
```

The realtime plugin makes a connection to the View API's realtime event stream, which sends notifications as pages finish converting, which tells viewer.js that those pages are now available to load.

## Resources

* [realtime plugin](https://github.com/box/viewer.js/blob/master/plugins/realtime/README.md) documentation
