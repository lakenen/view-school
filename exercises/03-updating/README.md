# Lesson Three: Updating a Document

The `box-view` package can do much more than simply listing uploaded documents, of course. In this exercise, we'll combine a couple of API calls to fetch and rename a document.


## Your Task

In this exercise, you'll write a node module:

* `update-latest`
  - export a function that accepts two arguments: a string and a callback function
  - when called, the function should fetch the latest document, then update the document's name to be the provided string, calling the provided callback function with the updated document

Put your solution in `update-latest.js` in [this project's directory](/open/03-updating).


## Getting the Latest Document

The `/documents` endpoint allows you to specify a `limit` parameter. By default, the `{limit}` most recent documents will be returned. If you set the `limit` to `1`, you'll get only the most recently uploaded document.

A successful response should look like this:
```js
{
  "document_collection": {
    "total_count": 1,
    "entries": [
      {
        "type": "document",
        "id": "e95cb3009ab84908b1056dc22fc8a77d",
        "status": "done",
        "name": "",
        "created_at": "2014-08-12T02:22:44.256Z"
      }
    ]
  }
}
```


## Resources

* [/documents GET](http://developers.box.com/view/#get-documents) View API documentation
* [documents.list](https://github.com/lakenen/node-box-view/blob/master/README.md#list) `box-view` documentation
* [/documents PUT](http://developers.box.com/view/#put-documents-id) View API documentation
* [documents.update](https://github.com/lakenen/node-box-view/blob/master/README.md#update) `box-view` documentation
