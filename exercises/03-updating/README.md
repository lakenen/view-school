# Lesson Four: Updating a Document

The `box-view` package can do much more than simply listing uploaded documents, of course. In this exercise, we'll combine a couple of API calls to fetch and rename a document.

## Your Task

In this exercise, you'll write a node module:

* `update-latest`
  - export a function that accepts two arguments: a string and a callback function
  - when called, the function should fetch the latest document, then update the document's name to be the provided string, calling the provided callback function with the updated document

Put your solution in `update-latest.js` in [this project's directory](/open/03-updating).

## Resources

* [/documents GET](http://developers.box.com/view/#get-documents) View API documentation
* [documents.list](https://www.npmjs.org/package/box-view#list) `box-view` documentation
* [/documents PUT](http://developers.box.com/view/#put-documents-id) View API documentation
* [documents.update](https://www.npmjs.org/package/box-view#update) `box-view` documentation
