# Lesson Fourteen: The Realtime Plugin

By default, viewer.js assumes that all pages are available when you load up a document with it. Unfortunately, the Box View API can't convert documents instantly, so we built a realtime system that streams updates as pages become available during the conversion process. To use this system with viewer.js, you can simply use the realtime plugin!

## Your Task

In this exercise, you'll write a javascript module `streaming-viewer`:
- export a function that takes three arguments: an Element, a string viewURL, and a string downloadURL
- create, `load()`,  and return a viewer instance with the following plugins:
  + `fullscreen` - no configuration is necessary in this exercise (the defaults are fine)
  + `download` - use the URL provided to configure the download plugin
- your solution should bind click handlers to the provided buttons
  + `.fullscreen-btn` - when clicked, it should toggle fullscreen mode
  + `.download-btn` - when clicked, it should download the original document

Put your javascript solution in `viewer-with-plugins.js` in [this project's directory](/open/14-realtime-plugin).

Don't worry about the CSS for this one; we've got you covered! Also, we'll include the realtime plugin source and its dependencies, though in your own apps you'd have to include those files alongside viewer.js.

## View API Realtime



## Resources

* [realtime plugin](https://github.com/box/viewer.js/blob/master/plugins/realtime/README.md) documentation
