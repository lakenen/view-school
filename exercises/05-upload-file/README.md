# Lesson Five: Uploading a Document

While uploading by URL is the easiest and most preferred method, sometimes it's not feasible within your application. This is why the document multipart upload endpoint exists. With this endpoint, you can upload files via multipart POST requests.


## Your Task

In this exercise, you'll write a node module `upload-file`:
- export a function that takes two arguments: a Buffer `file` and function `callback`
- when called, the function should upload the file to the View API, then call the callback function with the result

Put your solution in `upload-file.js` in [this project's directory](/open/05-upload-file).


## uploadFile

Aside from specifying a file rather than a URL, the `uploadFile` method behaves the same as `uploadURL`. You can specify the `file` argument in several ways.

Example:
```js
function handleResponse(err, doc) {
  // `doc` is the JSON-parsed response body
}

// by filename
var filename = process.cwd() + '/example/file.pdf';
client.documents.uploadFile(filename, handleResponse);

// by readable stream
var file = fs.createReadStream(filename);
client.documents.uploadFile(file, handleResponse);

// by buffer
var fileBuffer = fs.readFileSync(filename);
client.documents.uploadFile(fileBuffer, handleResponse);
```


## Multipart Requests

The multipart upload endpoint **uses a different base URL than the other API endpoints**. This is due to the blocking nature of multipart uploads. The URL to use if you are making requests with cURL or writing your own client is: `https://upload.view-api.box.com/1/documents`. Also, when uploading to this endpoint, you should specify the header: `Content-Type: multipart/form-data`. However, the `box-view` node package abstracts these things away, so you don't have to worry about it in this exercise.


## Resources

* [/documents POST](https://developers.box.com/view/#post-documents) View API documentation
* [documents.uploadFile](https://github.com/lakenen/node-box-view/blob/master/README.md#uploadfile) `box-view` documentation
