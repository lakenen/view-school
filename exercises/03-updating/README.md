# Lesson Four: Updating a Document

... informative and insightful intro ...

## Your Task

In this exercise, you'll write two node modules

* `get-latest`
  - export a function that takes two arguments: a box-view client and a callback function
  - when called, the function should fetch the latest document, then call the callback function with the document details as the first argument
* `update-latest`
  - export a function that accepts two arguments: a string and a callback function
  - when called, the function should fetch the latest document using `get-latest`, then update the document's name to be the provided string, calling the provided callback function with the updated document

Put your solutions in `get-latest.js` and `update-latest.js` in [this project's directory](/open/03-updating).

## Resources

* [/documents PUT](http://developers.box.com/view/#put-documents-id) View API documentation
* [documents.update](https://www.npmjs.org/package/box-view#update) `box-view` documentation
