# Lesson Eight: Viewer.JS

Using the `iframe` viewer is a great way to get up and running with the View API in no time. However, if you want to really customize and deeply integrate documents into your application, then you'll probably want to use viewer.js.

Viewer.js is a small client-side library for rendering and interacting with View API documents. In this exercise, we'll see how easy it is to view a document with viewer.js.


## Your Task

In this exercise, you'll write a javascript module `view-document`:
- export a function that takes two arguments: an Element and string **session assets** URL
- when called, the function should create a viewer instance with the given element and asset URL, then `load()` the document and return the viewer instance

Put your javascript solution in `view-document.js` in [this project's directory](/open/08-viewer-js). The CSS will go in `styles.css`.

_**NOTE**: in this exercise, the session has already been created for you, so you don't have to upload a document and create a viewing session._

## Viewer.js

Creating a viewer with viewer.js is very simple -- just a few lines of code!

```js
var viewer = Crocodoc.createViewer('.my-viewer', {
  url: mySessionAssetsURL
});

viewer.load();
```

Calling `load()` will load some metadata and styles required for the whole document immediately, but the viewer will continue to load pages for long documents on a lazy basis as necessary (i.e., as the user scrolls or pages through a document).

_**NOTE**: viewer.js does not enforce or set a specific width or height on its containing element. Because of the way elements are positioned inside the viewer, by default, the container will end up with a height of 0 if it's not explicitly set. To get around this, you can just make sure to set a height on the containing element:_
```css
.my-viewer {
  /* when using a percentage, remember to set a height on the parent element as well! */
  height: 100%;
}
```


## Crocodoc

You might be wondering *what's with the `Crocodoc` namespace?* Crocodoc originally created viewer.js and the core conversion technology behind the Box View API. After Box acquired Crocodoc in May, 2013, the Crocodoc team started working on the View API. Instead of going through the hassle of changing the entire namespace, we decided to keep it around. Besides, we think it's an awesome name! :)


## Node?

`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`

You might also be wondering what the deal is with `module.exports` in this browser code. This workshop is built using [browserify](http://browserify.org/), and writing modules with node's module syntax makes it much simpler to test the solutions!


## Resources

* [viewer.js](https://github.com/box/viewer.js/blob/master/README.md) documentation
