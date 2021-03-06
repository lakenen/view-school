# Lesson Two: Listing Uploaded Documents

In this lesson, you will use the [box-view](https://www.npmjs.org/package/box-view) node package to fetch a list of your documents.

The `box-view` package is a high-level SDK that abstracts away the raw HTTP requests necessary to work with the View API. There are [several other SDKs](https://trello.com/c/RvAGjCA5/36-sdks) written in various languages, so you don't have to use JavaScript in your applications if you don't want to. For the purposes of this workshop, we'll be using the node module.

*Don't see an SDK in your preferred language? Write one, and we'll happily list it with the others.*

```js
var client = require('box-view').createClient('mytoken');

// client.documents contains methods
// for the /documents endpoint

// client.sessions contains methods
// for the /sessions endpoint
```

## Your Task

Using the `box-view` module, write a function that accepts a callback function as an argument. When called, your module should request a list of your uploaded documents from the View API and call the callback function with the JSON-parsed list response.

Put your solution in `list.js` in [this project's directory](/open/02-listing).

## Resources

* [/documents GET](http://developers.box.com/view/#get-documents) View API documentation
* [documents.list](https://github.com/lakenen/node-box-view/blob/master/README.md#list) `box-view` documentation
