# Lesson Six: Creating a Viewing Session

... informative and insightful intro ...

## Your Task

In this exercise, you'll write a node module `upload-file`:
- export a function that takes two arguments: a Buffer `file` and function `callback`
- when called, the function should upload the file to the View API with a specified thumbnail size, then call the callback function with the result

Put your solution in `upload-file.js` in [this project's directory](/open/05-upload-file).

## uploadFile

Aside from specifying a file rather than a URL, the `uploadFile` method behaves the same as `uploadURL`. You can specify the `file` argument in several ways.

Example:
```js
function response(err, doc) {
  // ...
}

// by filename
var filename = process.cwd() + '/example/file.pdf'
client.documents.uploadFile(filename, response)

// by file stream
var file = fs.createReadStream(filename)
client.documents.uploadFile(file, response)

// by buffer
var fileBuffer = fs.readFileSync(filename)
client.documents.uploadFile(fileBuffer, response)
```

## Resources

* [/documents POST](https://developers.box.com/view/#post-documents) View API documentation
* [documents.uploadFile](https://www.npmjs.org/package/box-view#uploadfile) `box-view` documentation
