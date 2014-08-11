# Lesson Nine: Custom Styles

> A borderless page...
>   It neither begins nor ends.
> Better add some styles!


By default, viewer.js doesn't apply any styling to pages (other than for sizing and layout). But don't worry, you can easily apply some CSS to customize your document viewer as much as you'd like! In this exercise, we'll play around with some ways you can style a viewer.


## Your Task

Write some CSS to do the following:
- use `padding` to give the pages more space (`200px`) on the left and right sides
- use `box-shadow` to apply a transparent black (`rgba(0, 0, 0, 0.5)`) shadow to each page
- use `background-color` to give the viewport a background color of `#fbfefa`
- use `background-image` to add [this loading indicator](https://raw.githubusercontent.com/lakenen/view-school-assets/master/spinner.gif) to show up when pages are loading

Put your solution in `custom-styles.css` in [this project's directory](/open/09-custom-styles).


## Custom Styles

You can apply custom styles to viewer.js pages very easily! Keep reading for some examples...

Add a red outline to each page:
```css
.crocodoc-page-content {
  outline: 1px solid red;
}
```

Add some more spacing between pages (this is most easily done with padding):
```css
.crocodoc-page {
  padding: 20px 100px;
}
```

Change the color of the viewport:
```css
.crocodoc-viewport {
  background-color: blue;
}
```


## Loading Indicators

When a page is loading in viewer.js, it will have the `.crocodoc-page-loading` class. This allows you to apply loading-specific styles, like a loading indicator or animation to your pages. In this exercise, the page loading has been artificially slowed down so you can more easily see your loading indicator.

Example:
```css
.crocodoc-page-loading .crocodoc-page-content {
  background-image: url('http://example.com/spinner.gif');
  background-position: center center;
  background-repeat: no-repeat
}
```


## Resources

* [custom styles](https://github.com/box/viewer.js/blob/master/README.md#styling-pages) documentation
