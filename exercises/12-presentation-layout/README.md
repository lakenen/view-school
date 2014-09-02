# Lesson Twelve: Presentation Layout

So far we've seen the basics of what viewer.js can do. In this exercise, we'll take it a step further and make a presentation viewer complete with custom page transitions!

## Your Task

In this exercise, you'll write a javascript module `presentation-viewer`:
- export a function that takes two arguments: an Element and string URL
- your function should create, `load()`, and return a viewer instance configured with the "presentation" layout
- use CSS to add page transitions to the viewer

Put your javascript solution in `presentation-viewer.js` in [this project's directory](/open/11-presentation-layout). The CSS will go in `transitions.css`.


## Viewer.js Presentation Mode Transitions

You can use CSS to add really cool transitions to your viewer while using the presentation layout.

Here's a simple example:

```css
/*
  NOTE: vendor prefixes have been
  removed in this example, but are
  still necessary in some browsers
*/

/* Make all pages visible and apply a
transition on opacity and transform */
.crocodoc-page {
  transition: opacity 0.2s,
              transform 0.4s;
  /* NOTE: !important is necessary here
  because the CSS selector specificity
  is lower than the default
  `.crocodoc-layout-presentation .crocodoc-page`
  styles */
  visibility: visible !important;
  opacity: 0;
}

.crocodoc-current-page {
  /* Current page should be visible */
  opacity: 1;
}

/* Transform 100% to the left and
transparentize */
.crocodoc-page-before {
  transform: translateX(-100%);
  transition-delay: 0.2s, 0s;
}

/* Transform 100% to the right and
transparentize */
.crocodoc-page-after {
  transform: translateX(100%);
  transition-delay: 0.2s, 0s;
}
```

The viewer.js repo contains several examples of custom presentation transitions, but the possibilities are endless! If you come up with a nifty transition that you'd like to share, please feel free to submit a pull request on Github.

## Resources

* [viewer.js layout](https://github.com/box/viewer.js#setting-the-layout-mode) documentation
* [viewer.js page transitions](https://github.com/box/viewer.js#presentation-transitions) documentation
* viewer.js transition examples:
  - ["carousel"](https://github.com/box/viewer.js/blob/master/examples/presentations/carousel.css)
  - ["fade"](https://github.com/box/viewer.js/blob/master/examples/presentations/fade.css)
  - ["pop"](https://github.com/box/viewer.js/blob/master/examples/presentations/pop.css)
  - ["slide"](https://github.com/box/viewer.js/blob/master/examples/presentations/slide.css)
  - ["spin"](https://github.com/box/viewer.js/blob/master/examples/presentations/spin.css)
