# Lesson Six: Creating a Viewing Session

Great work so far! At this point you're probably wondering _when will I get to see the converted documents?!_ You've completed five lessons so far and have yet to experience what the API is really good for... so let's get to it!

## Creating Sessions

When you upload a file for conversion, it goes into a queue for processing. While the View API is very fast, the document will not be instantly ready for viewing, so you can't create a session immediately following an upload. Sessions can be created as soon as the document is `viewable`. This means that the necessary assets have been generated to view *at least* the first page of the document. As such, if your try to create a session immediately after uploading a document, it's likely not going to be viewable yet. In this case, the API will respond with `202 Accepted`, which means basically:

> "We've acknowledged your request, but it's still processing... check back later."

In the View API, a `202` response will be accompanied by a `'Retry-After'` header, which specifies the time in seconds to wait before retrying your request.

While this approach is better than simply polling the `/documents/{id}` endpoint, there's actually an even better way: [web hooks](https://developers.box.com/view-webhooks/). Unfortunately, there's not an easy way to try out web hooks for this workshop, but please check them out if you plan to use the View API in production!

The `box-view` node package has the ability to auto-retry requests when the response contains the `Retry-After` header, so we'll use that functionality for this exercise.


## The `iframe` Viewer

The Box View API offers two ways to view your documents: the `iframe` viewer, and viewer.js. We'll get to viewer.js in the next several exercises, but for this exercise, we'll use the `iframe` viewer. When you receive a successful session response, there will be a set of URLs in the response body. The `view` URL can be used as the `src` of an `iframe` element to show the document in a simple viewer.

In this exercise, the workshop takes care of actually embedding the `iframe` for you, but normally it should take this form:

```html
<iframe
  src="https://view-api.box.com/1/sessions/{id}/view?theme=dark"
  allowfullscreen>
</iframe>
```

You can specify the dark theme by appending `?theme=dark` to the session `view` URL (`light` can also be specified, but it is the default theme, so it has no effect).


## Your Task

In this exercise, you'll write a node module `upload-and-view`:
- Export a function that takes two arguments: a string `url` and function `callback`.
- When called, the function should upload the URL to the View API, create a viewing session for the resulting document, then call the callback function with the session's `view` URL.
- The session should be created with a duration of 30 minutes and text selection disabled.

Put your solution in `upload-and-view.js` in [this project's directory](/open/06-sessions).

## sessions.create

The `sessions.create()` method makes a POST request to the `/sessions` endpoint. This will attempt to create a viewing session for the specified document.

The method also accepts an `options` argument with which you can specify session creation parameters `params`. You can also use the `options` argument to specify whether to auto-retry requests with `{ retry: true }`.

Example:
```js
var docId = 'some uuid';
var params = {
  duration: 1440, // minutes, default: 60
  // or e.g.,
  expires_at: new Date('Oct. 21, 2015'), // default: null

  is_downloadable: true, // default: false
  is_text_selectable: true // default: true
};
var options = {
  params: params,
  retry: true // auto-retry the request if necessry
};
function response(err, session, response) {
  // ...
};
client.sessions.create(docId, options, response);
```

## Resources

* [/sessions POST](https://developers.box.com/view/#post-sessions) View API documentation
* [sessions.create](https://www.npmjs.org/package/box-view#create) `box-view` documentation
* [iframe viewer](https://developers.box.com/view/#view-a-document) documentation
