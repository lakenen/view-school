# Lesson Five: Uploading a Document by URL

... informative and insightful intro ...

## Your Task

In this exercise, you'll write a node module `upload-url`:
- export a function that takes two arguments: a string `url` and function `callback`
- when called, the function should upload the URL to the View API and call the callback function with the result

Put your solution in `upload-url.js` in [this project's directory](/open/04-upload-url).

## uploadURL

The `uploadURL` method also accepts a `params` argument, with which you can specify additional upload parameters.

Example:
```js
// the `non_svg` param tells the View API to also
// generate PNG files for IE8 support
var params = {
  non_svg: true,
  name: 'my example file'
}
client.documents.uploadURL('http://example.com/file.pdf', params, function (err, doc) {
  // ...
})
```

See the documentation links below for more information.

## Resources

* [/documents POST](https://developers.box.com/view/#post-documents) View API documentation
* [documents.uploadURL](https://www.npmjs.org/package/box-view#uploadurl) `box-view` documentation
