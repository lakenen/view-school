# Lesson Seven: Downloading Thumbnails

... informative and insightful intro ...

## Your Task

In this exercise, you'll write a node module `download-thumbnail`:
- export a function that takes a callback function as an argument
- when called, the function should make a request to the View API for a thumbnail for a document of your choice (hint: go back to [02-listing]('/02-listing') to get a document id), with a size of your choice, then call the callback function with the response object

Put your solution in `download-thumbnail.js` in [this project's directory](/open/06-thumbnails).

## getThumbnail

The `getThumbnail` method allows you to download the PNG representation of the the first page of a document. You must specify the document id and the desired size of the thumbnail.

*Thumbnails will always preserve the aspect ratio of the original document but will best fit the dimensions requested. For example, if a 16×16 thumbnail is requested for a document with a 2:1 aspect ratio, a 16×8 thumbnail will be returned.*

Example:
```js
var file = fs.createWriteStream('thumb.png')
var width = 240
var height = 320

// with a callback function
client.documents.getThumbnail(docId, width, height, function (err, res) {
  // do something with the response stream `res`
  res.pipe(file)
})
```

## Resources

* [/documents/{id}/thumbnail GET](https://developers.box.com/view/#get-documents-id-thumbnail) View API documentation
* [documents.getThumbnail](https://www.npmjs.org/package/box-view#getthumbnail) `box-view` documentation
