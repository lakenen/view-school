# Lesson Zero: Hello, View API

Welcome to View School!

View School is a *go-at-your-own-pace* workshop devoted to teaching you how to use [Box View](http://developers.box.com/view) and [viewer.js](https://github.com/box/viewer.js).

In this first lesson, we'll get you setup with a brand new Box View API account.


## Your Task

1. [Create a Box account](https://box.com/developer_signup) (or [login](http://box.com/developers/services) if you already have one)
2. Once you're logged in, create a new Box application
3. Enter a name, select "Box View", and click "Create Application"
4. Click "Configure Your Application"
5. Copy the "View Api Key" and paste it into the correct place in `token.js` in [this project's directory](/open/00-hello-view-api).


## Node? Browser? Wat?

This workshop is written in node.js, but it runs in a browser through a lot of clever hackery and a bit of [wizardry](http://browserify.org/). In real applications, you'll be writing server code to make most API calls, and browser code just for viewing documents.
