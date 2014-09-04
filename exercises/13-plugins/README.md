# Lesson Thirteen: Plugins

Plugins are a very powerful way to add custom functionality to viewer instances. In this exercise, we'll use a couple plugins to do some interesting things.

## Your Task

In this exercise, you'll write a javascript module `draggy-viewer`:
- export a function that takes three arguments: an Element, a string "assets" URL, and a string "download" URL
- create, `load()`,  and return a viewer instance with the following plugins:
  + `fullscreen` - use the viewer element's parent container as the `element` option
  + `download` - use the URL provided to configure the download plugin
- your solution should bind click handlers to the provided buttons
  + `.fullscreen-btn` - when clicked, it should toggle fullscreen mode
  + `.download-btn` - when clicked, it should download the original document

Put your javascript solution in `viewer-with-plugins.js` in [this project's directory](/open/13-plugins).

Don't worry about the CSS for this one; we've got you covered!

Normally you would have to include additional JS/CSS files as required by each plugin, but in this exercise, the files are included for you. You can just focus on writing your solution!

## Plugins

Configuring viewer.js to use plugins is as easy as any other viewer.js config. Simply add a `plugins` object, where the keys are names of plugins you'd like viewer.js to load upon initialization. The value is the config you'd like to pass to the plugin itself.
```js
var viewer = Crocodoc.createViewer('.my-viewer', {
  plugins: {
    myplugin: {
      myconfig: 'hello',
      myotherconfig: 'world!'
    }
  }
});

viewer.load();
```


## Resources

* [viewer.js plugins](https://github.com/box/viewer.js#plugins) documentation
* [fullscreen plugin](https://github.com/box/viewer.js/blob/master/plugins/fullscreen/README.md) documentation
* [download plugin](https://github.com/box/viewer.js/blob/master/plugins/download/README.md) documentation
