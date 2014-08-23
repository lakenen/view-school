# Lesson Six: Downloading Thumbnails

The View API automatically creates a full-size PNG representation of the first page of every document you upload. This can be used to generate thumbnail images for use in your applications. In this exercise, we'll generate a thumbnail and display it in the browser!

When you make a request to the thumbnail endpoint, the API will send back a thumbnail image of the first page of the document with the specified width and height. If the thumbnail is not already available, it will be generated on the fly. In this case, the API will respond with `202 Accepted`, which means basically:

> "We've acknowledged your request, but it's still processing... check back later."

In the View API, a `202` response will be accompanied by a `'Retry-After'` header, which specifies the time in seconds to wait before retrying your request.

When the thumbnail is ready, the API will respond with a `200` response, along with the image data.

## Your Task

In this exercise, you'll write a node module `download-thumbnail`:
- export a function that takes a document id, width, height and callback function as an arguments
- when called, the function should make a request to the View API for a thumbnail for the specified id and size, then call the callback function with the response object
- your function should retry the request after the specified `'Retry-After'` if the API returns a `202` response

Put your solution in `download-thumbnail.js` in [this project's directory](/open/06-thumbnails).

## getThumbnail

The `getThumbnail` method allows you to download the PNG representation of the the first page of a document. You must specify the document id and the desired size of the thumbnail.

*Thumbnails will always preserve the aspect ratio of the original document but will best fit the dimensions requested. For example, if a 16×16 thumbnail is requested for a document with a 2:1 aspect ratio, a 16×8 thumbnail will be returned.*

Example:
```js
var file = fs.createWriteStream('thumb.png');
var width = 240;
var height = 320;

// with a callback function
client.documents.getThumbnail(docId, width, height, function (err, res) {
  // do something with the response `res` (a readable stream)
  if (res.statusCode === 200) {
    res.pipe(file);
  } else if (res.statusCode === 202{
    // the thumbnail is still processing...
  }
});
```

## Resources

* [/documents/{id}/thumbnail GET](https://developers.box.com/view/#get-documents-id-thumbnail) View API documentation
* [documents.getThumbnail](https://github.com/lakenen/node-box-view/blob/master/README.md#getthumbnail) `box-view` documentation
