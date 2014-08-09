# Lesson Five: Uploading a Document by URL

When you make a well-formed upload request to the View API (whether it's a multi-part POST or a URL upload), the API will respond with `HTTP 202 Accepted`. This means that the API has received the request and it will be queued for processing. You can use the [/documents/{id} GET](https://developers.box.com/view/#get-documents-id) endpoint to later check the conversions status of a document, but we'll go more into that stuff in a little bit.

The `box-view` package abstracts both URL and multipart uploads. For this exercise, we'll take a look at URL uploads.

## Your Task

In this exercise, you'll write a node module `upload-url`:
- export a function that takes two arguments: a string `url` and function `callback`
- when called, the function should upload the URL to the View API with a name of your choice, then call the callback function with the resulting document object

Put your solution in `upload-url.js` in [this project's directory](/open/04-upload-url).

## uploadURL

The `uploadURL` method also accepts an `options` argument, with which you can specify additional upload parameters.

Example:
```js
// the `non_svg` param tells the View API to also
// generate PNG files for IE8 support
var params = {
  non_svg: true,
  name: 'my example file',
  thumbnails: '256×256' // pre-generate thumbnails
}
var options = {
  params: params
}
var url = 'http://example.com/file.pdf'
client.documents.uploadURL(url, options, function (err, doc) {
  // ...
})
```

See the documentation links below for more information.

## Resources

* [/documents POST](https://developers.box.com/view/#post-documents) View API documentation
* [documents.uploadURL](https://www.npmjs.org/package/box-view#uploadurl) `box-view` documentation
