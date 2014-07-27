# Lesson Six: Creating a Viewing Session

... informative and insightful intro ...

## Your Task

In this exercise, you'll write a node module `upload-and-view`:
- export a function that takes two arguments: a string `url` and function `callback`
- when called, the function should upload the URL to the View API, create a viewing session for the resulting document, then call the callback function with the session's `view` URL.

Put your solution in `upload-and-view.js` in [this project's directory](/open/06-sessions).

## sessions.create

The `sessions.create()` method makes a POST request to the `/sessions` endpoint. This will attempt to create a viewing session for the specified document.

Sessions can be created as soon as the document is `viewable`. This means that the necessary assets have been generated to view *at least* the first page of the document. As such, if your try to create a session immediately after uploading a document, it's likely not going to be viewable yet. In this case, the API will respond with a `202 Accepted`, which means basically:

> we've acknowledged your request, but it's still processing... check back later

In the View API, a `202` response will be accompanied by a `'retry-after'` header, which specifies the time in seconds to wait before retrying your request.


Example:
```js
var docId = 'some uuid'
var params = {
  duration: 1440, // minutes, default: 60
  // or e.g.,
  expires_at: new Date('Oct. 21, 2015'), // default: null

  is_downloadable: true, // default: false
  is_text_selectable: true // default: true
}
function response(err, session, response) {
  // ...
}
client.sessions.create(docId, params, response)
```

## Resources

* [/sessions POST](https://developers.box.com/view/#post-sessions) View API documentation
* [sessions.create](https://www.npmjs.org/package/box-view#create) `box-view` documentation
